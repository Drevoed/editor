import {
  Component,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  on,
  splitProps,
} from 'solid-js'
import {
  Editor,
  Element,
  NodeEntry,
  Node,
  Range,
  Text,
  Transforms,
  Path,
} from 'slate'
import getDirection from 'direction'
import debounce from 'just-debounce-it'
import throttle from 'throttleit'
import scrollIntoView from 'scroll-into-view-if-needed'

import Hotkeys from '../utils/hotkeys'
import {
  HAS_BEFORE_INPUT_SUPPORT,
  IS_IOS,
  IS_CHROME,
  IS_FIREFOX,
  IS_FIREFOX_LEGACY,
  IS_QQBROWSER,
  IS_SAFARI,
  IS_UC_MOBILE,
  IS_WECHATBROWSER,
  CAN_USE_DOM,
} from '../utils/environment'
import { SolidEditor } from '..'
import { ReadOnlyContext } from '../hooks/use-read-only'
import { DecorateContext } from '../hooks/use-decorate'
import {
  DOMElement,
  DOMNode,
  DOMRange,
  getDefaultView,
  isDOMElement,
  isDOMNode,
  isPlainTextOnlyPaste,
} from '../utils/dom'

import {
  EDITOR_TO_ELEMENT,
  ELEMENT_TO_NODE,
  IS_READ_ONLY,
  NODE_TO_ELEMENT,
  IS_FOCUSED,
  PLACEHOLDER_SYMBOL,
  EDITOR_TO_WINDOW,
} from '../utils/weak-maps'
import { useSlate } from './slate'
import { createStore } from 'solid-js/store'
import { Dynamic } from 'solid-js/web'
import useChildren from '../hooks/use-children'
import type { EventProps } from '../domevents/types'
import { onBeforeInput } from '../domevents/beforeInput'
import { flushNativeEvents } from '../utils/native'

type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
        ? K
        : never
    }[keyof JSX.IntrinsicElements]
  | Component<P>

type DeferredOperation = () => void

const Children = (props: Parameters<typeof useChildren>[0]) => (
  <>{useChildren(props)}</>
)

/**
 * `RenderElementProps` are passed to the `renderElement` handler.
 */

export interface RenderElementProps {
  children: any
  element: Element
  attributes: {
    'data-slate-node': 'element'
    'data-slate-inline'?: true
    'data-slate-void'?: true
    'dir'?: 'rtl'
    'ref': any
  }
}

/**
 * `RenderLeafProps` are passed to the `renderLeaf` handler.
 */

export interface RenderLeafProps {
  children: any
  leaf: Text
  text: Text
  attributes: {
    'data-slate-leaf': true
  }
}

/**
 * `EditableProps` are passed to the `<Editable>` component.
 */

export type EditableProps = {
  decorate?: (entry: NodeEntry) => Range[]
  onDOMBeforeInput?: (event: InputEvent) => void
  placeholder?: string
  readOnly?: boolean
  role?: string
  style?: JSX.CSSProperties
  renderElement?: (props: RenderElementProps) => JSX.Element
  renderLeaf?: (props: RenderLeafProps) => JSX.Element
  renderPlaceholder?: (props: RenderPlaceholderProps) => JSX.Element
  scrollSelectionIntoView?: (editor: SolidEditor, domRange: DOMRange) => void
  as?: ElementType<JSX.TextareaHTMLAttributes<HTMLDivElement>>
} & JSX.TextareaHTMLAttributes<HTMLDivElement>

export interface EditableState {
  readOnly: boolean
  isComposing: boolean
  hasInsertPrefixInCompositon: boolean
  isUpdatingSelection: boolean
  isDraggingInternally: boolean
  latestElement: DOMElement | null
}

/**
 * Editable.
 */

export const Editable = (props: EditableProps) => {
  let [local, attributes] = splitProps(props, [
    'autofocus',
    'decorate',
    'onDOMBeforeInput',
    'placeholder',
    'readOnly',
    'renderElement',
    'renderLeaf',
    'renderPlaceholder',
    'scrollSelectionIntoView',
    'style',
    'as',
  ])
  local = mergeProps(
    {
      decorate: defaultDecorate,
      readOnly: false,
      renderPlaceholder: (props) => (
        <DefaultPlaceholder attributes {...props} />
      ),
      scrollSelectionIntoView: defaultScrollSelectionIntoView,
      style: {},
    },
    local
  )
  const ref: HTMLDivElement | null = null
  const deferredOperations: DeferredOperation[] = []
  const { getEditor } = useSlate()
  const editor = getEditor()
  // Rerender editor when composition status changed
  const [isComposing, setIsComposing] = createSignal(false)
  const [decorations, setDecorations] = createSignal(
    local.decorate([getEditor(), []])
  )

  // Update internal state on each render.
  createEffect(
    on(
      local.readOnly,
      () => {
        IS_READ_ONLY.set(editor, local.readOnly)
      },
      { defer: true }
    )
  )

  // Keep track of some state for the event handler logic.
  const [state, setState] = createStore<EditableState>({
    readOnly: false,
    isComposing: false,
    hasInsertPrefixInCompositon: false,
    isDraggingInternally: false,
    isUpdatingSelection: false,
    latestElement: null as DOMElement | null,
  })

  const eventProps: EventProps = {
    editableState: state,
    setEditableState: setState,
    editor: getEditor(),
    get eventHandlers() {
      return {
        onCompositionStart: props.onCompositionStart,
        onKeyDown: props.onKeyDown,
        onCompositionUpdate: props.onCompositionStart,
        onCompositionEnd: props.onCompositionStart,
        onBeforeInput: props.onBeforeInput,
        onClick: props.onClick,
      }
    },
  }

  const onInput = (props: EventProps, _: any) => {
    const { editor } = props
    flushNativeEvents(editor)
  }

  // Whenever the editor updates...
  createEffect(() => {
    // Update element-related weak maps with the DOM element ref.
    let window
    if (ref && (window = getDefaultView(ref))) {
      EDITOR_TO_WINDOW.set(editor, window)
      EDITOR_TO_ELEMENT.set(editor, ref)
      NODE_TO_ELEMENT.set(editor, ref)
      ELEMENT_TO_NODE.set(ref, editor)
    } else {
      NODE_TO_ELEMENT.delete(editor)
    }

    // Make sure the DOM selection state is in sync.
    const { selection } = editor
    const root = SolidEditor.findDocumentOrShadowRoot(editor)
    const domSelection = (root as Document).getSelection()

    if (state.isComposing || !domSelection || !SolidEditor.isFocused(editor)) {
      return
    }

    const hasDomSelection = domSelection.type !== 'None'

    // If the DOM selection is properly unset, we're done.
    if (!selection && !hasDomSelection) {
      return
    }

    // verify that the dom selection is in the editor
    const editorElement = EDITOR_TO_ELEMENT.get(editor)!
    let hasDomSelectionInEditor = false
    if (
      editorElement.contains(domSelection.anchorNode) &&
      editorElement.contains(domSelection.focusNode)
    ) {
      hasDomSelectionInEditor = true
    }

    // If the DOM selection is in the editor and the editor selection is already correct, we're done.
    if (hasDomSelection && hasDomSelectionInEditor && selection) {
      const slateRange = SolidEditor.toSlateRange(editor, domSelection, {
        exactMatch: true,

        // domSelection is not necessarily a valid Slate range
        // (e.g. when clicking on contentEditable:false element)
        suppressThrow: true,
      })
      if (slateRange && Range.equals(slateRange, selection)) {
        return
      }
    }

    // when <Editable/> is being controlled through external value
    // then its children might just change - DOM responds to it on its own
    // but Slate's value is not being updated through any operation
    // and thus it doesn't transform selection on its own
    if (selection && !SolidEditor.hasRange(editor, selection)) {
      editor.selection = SolidEditor.toSlateRange(editor, domSelection, {
        exactMatch: false,
        suppressThrow: false,
      })
      return
    }

    // Otherwise the DOM selection is out of sync, so update it.
    state.isUpdatingSelection = true

    const newDomRange = selection && SolidEditor.toDOMRange(editor, selection)

    if (newDomRange) {
      if (Range.isBackward(selection!)) {
        domSelection.setBaseAndExtent(
          newDomRange.endContainer,
          newDomRange.endOffset,
          newDomRange.startContainer,
          newDomRange.startOffset
        )
      } else {
        domSelection.setBaseAndExtent(
          newDomRange.startContainer,
          newDomRange.startOffset,
          newDomRange.endContainer,
          newDomRange.endOffset
        )
      }
      local.scrollSelectionIntoView(editor, newDomRange)
    } else {
      domSelection.removeAllRanges()
    }

    setTimeout(() => {
      // COMPAT: In Firefox, it's not enough to create a range, you also need
      // to focus the contenteditable element too. (2016/11/16)
      if (newDomRange && IS_FIREFOX) {
        const element = SolidEditor.toDOMNode(editor, editor)
        element.focus()
      }

      state.isUpdatingSelection = false
    })
  })

  // The autoFocus TextareaHTMLAttribute doesn't do anything on a div, so it
  // needs to be manually focused.
  createEffect(() => {
    if (ref && local.autofocus) {
      ref.focus()
    }
  })

  createEffect(
    on([local.placeholder, editor, isComposing], () => {
      if (
        local.placeholder &&
        editor.children.length === 1 &&
        Array.from(Node.texts(editor)).length === 1 &&
        Node.string(editor) === '' &&
        !isComposing()
      ) {
        const start = Editor.start(getEditor(), [])
        setDecorations((decorations) => [
          ...decorations,
          {
            [PLACEHOLDER_SYMBOL]: true,
            placeholder: local.placeholder,
            anchor: start,
            focus: start,
          },
        ])
      }
    })
  )

  return (
    <ReadOnlyContext.Provider value={local.readOnly}>
      <DecorateContext.Provider value={local.decorate}>
        <Dynamic
          component={local.as}
          role={local.readOnly ? undefined : 'textbox'}
          {...attributes}
          data-slate-editor
          data-slate-node="value"
          contentEditable={!local.readOnly}
          ref={ref}
          style={{
            'position': 'relative',
            'outline': 'none',
            'white-space': 'pre-wrap',
            'word-wrap': 'break-word',
            ...(local.style as JSX.CSSProperties),
          }}
          onBeforeInput={[onBeforeInput, eventProps]}
          onInput={[onInput, eventProps]}
        >
          <Children
            decorations={decorations()}
            node={editor}
            renderPlaceholder={local.renderPlaceholder}
            selection={editor.selection}
          />
        </Dynamic>
      </DecorateContext.Provider>
    </ReadOnlyContext.Provider>
  )
}

/**
 * The props that get passed to renderPlaceholder
 */
export interface RenderPlaceholderProps {
  children: any
  attributes: {
    'data-slate-placeholder': boolean
    'dir'?: 'rtl'
    'contentEditable': boolean
    'ref': any
    'style': JSX.CSSProperties
  }
}

/**
 * The default placeholder element
 */

export const DefaultPlaceholder = ({
  attributes,
  children,
}: RenderPlaceholderProps) => <span {...attributes}>{children}</span>

/**
 * A default memoized decorate function.
 */

export const defaultDecorate: (entry: NodeEntry) => Range[] = () => []

/**
 * A default implement to scroll dom range into view.
 */

const defaultScrollSelectionIntoView = (
  editor: SolidEditor,
  domRange: DOMRange
) => {
  // This was affecting the selection of multiple blocks and dragging behavior,
  // so enabled only if the selection has been collapsed.
  if (
    !editor.selection ||
    (editor.selection && Range.isCollapsed(editor.selection))
  ) {
    const leafElement = domRange.startContainer.parentElement!
    leafElement.getBoundingClientRect =
      domRange.getBoundingClientRect.bind(domRange)
    scrollIntoView(leafElement, {
      scrollMode: 'if-needed',
    })
    delete leafElement.getBoundingClientRect
  }
}

/**
 * Check if two DOM range objects are equal.
 */

export const isRangeEqual = (a: DOMRange, b: DOMRange) => {
  return (
    (a.startContainer === b.startContainer &&
      a.startOffset === b.startOffset &&
      a.endContainer === b.endContainer &&
      a.endOffset === b.endOffset) ||
    (a.startContainer === b.endContainer &&
      a.startOffset === b.endOffset &&
      a.endContainer === b.startContainer &&
      a.endOffset === b.startOffset)
  )
}

/**
 * Check if the target is in the editor.
 */

export const hasTarget = (
  editor: SolidEditor,
  target: EventTarget | null
): target is DOMNode => {
  return isDOMNode(target) && SolidEditor.hasDOMNode(editor, target)
}

/**
 * Check if the target is editable and in the editor.
 */

export const hasEditableTarget = (
  editor: SolidEditor,
  target: EventTarget | null
): target is DOMNode => {
  return (
    isDOMNode(target) &&
    SolidEditor.hasDOMNode(editor, target, { editable: true })
  )
}

/**
 * Check if the target is inside void and in the editor.
 */

export const isTargetInsideVoid = (
  editor: SolidEditor,
  target: EventTarget | null
): boolean => {
  const slateNode =
    hasTarget(editor, target) && SolidEditor.toSlateNode(editor, target)
  return Editor.isVoid(editor, slateNode)
}

/**
 * Check if an event is overrided by a handler.
 */

export const isEventHandled = <EventType extends UIEvent>(
  event: EventType,
  handler?: (event: EventType) => void | boolean
) => {
  if (!handler) {
    return false
  }
  // The custom event handler may return a boolean to specify whether the event
  // shall be treated as being handled or not.
  const shouldTreatEventAsHandled = handler(event)

  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled
  }

  return event.defaultPrevented
}

/**
 * Check if a DOM event is overrided by a handler.
 */

export const isDOMEventHandled = <E extends Event>(
  event: E,
  handler?: (event: E) => void | boolean
) => {
  if (!handler) {
    return false
  }

  // The custom event handler may return a boolean to specify whether the event
  // shall be treated as being handled or not.
  const shouldTreatEventAsHandled = handler(event)

  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled
  }

  return event.defaultPrevented
}
