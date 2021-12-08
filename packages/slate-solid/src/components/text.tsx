import { Range, Element, Text as SlateText } from 'slate'
import type { JSX } from 'solid-js'
import Leaf from './leaf'
import { SolidEditor, useSlateStatic } from '..'
import type { RenderLeafProps, RenderPlaceholderProps } from './editable'
import {
  NODE_TO_ELEMENT,
  ELEMENT_TO_NODE,
  EDITOR_TO_KEY_TO_ELEMENT,
} from '../utils/weak-maps'
import { createEffect } from 'solid-js'

/**
 * Text.
 */

const Text = (props: {
  decorations: Range[]
  isLast: boolean
  parent: Element
  renderPlaceholder: (props: RenderPlaceholderProps) => JSX.Element
  renderLeaf?: (props: RenderLeafProps) => JSX.Element
  text: SlateText
}) => {
  let ref: HTMLSpanElement | null
  const { getEditor } = useSlateStatic()
  const editor = getEditor()
  const leaves = SlateText.decorations(props.text, props.decorations)
  const key = SolidEditor.findKey(editor, props.text)
  const children = []

  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i]

    children.push(
      <Leaf
        isLast={props.isLast && i === leaves.length - 1}
        key={`${key.id}-${i}`}
        renderPlaceholder={props.renderPlaceholder}
        leaf={leaf}
        text={props.text}
        parent={parent}
        renderLeaf={props.renderLeaf}
      />
    )
  }

  // Update element-related weak maps with the DOM element ref.
  createEffect(() => {
    const KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor)
    if (ref) {
      KEY_TO_ELEMENT?.set(key, ref)
      NODE_TO_ELEMENT.set(props.text, ref)
      ELEMENT_TO_NODE.set(ref, props.text)
    } else {
      KEY_TO_ELEMENT?.delete(key)
      NODE_TO_ELEMENT.delete(props.text)
    }
  })

  return (
    <span data-slate-node="text" ref={ref}>
      {children}
    </span>
  )
}

export default Text
