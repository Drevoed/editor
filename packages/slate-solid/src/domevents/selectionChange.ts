import throttle from 'throttleit'
import { SolidEditor } from '..'
import type { EventProps } from './types'
import { IS_FOCUSED } from '../utils/weak-maps'
import { Transforms } from 'slate'
import { hasEditableTarget, isTargetInsideVoid } from "../components/editable";

const onSelectionChange = throttle((props: EventProps, _: InputEvent) => {
  const { editor, editableState, setEditableState } = props
  if (
    !editableState.readOnly &&
    !editableState.isComposing &&
    !editableState.isUpdatingSelection &&
    !editableState.isDraggingInternally
  ) {
    const root = SolidEditor.findDocumentOrShadowRoot(editor)
    const { activeElement } = root
    const element = SolidEditor.toDOMNode(editor, editor)
    const domSelection = (root as Document).getSelection()

    if (activeElement === element) {
      setEditableState('latestElement', activeElement)
      IS_FOCUSED.set(editor, true)
    } else {
      IS_FOCUSED.delete(editor)
    }

    if (!domSelection) {
      return Transforms.deselect(editor)
    }

    const { anchorNode, focusNode } = domSelection

    const anchorNodeSelectable =
      hasEditableTarget(editor, anchorNode) ||
      isTargetInsideVoid(editor, anchorNode)

    const focusNodeSelectable =
      hasEditableTarget(editor, focusNode) ||
      isTargetInsideVoid(editor, focusNode)

    if (anchorNodeSelectable && focusNodeSelectable) {
      const range = SolidEditor.toSlateRange(editor, domSelection, {
        exactMatch: false,
        suppressThrow: false,
      })
      Transforms.select(editor, range)
    }
  }
}, 100)

export default onSelectionChange
