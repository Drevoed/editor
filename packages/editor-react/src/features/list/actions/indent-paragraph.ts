import { LocalTransforms } from '../transforms'
import type { ActionCallback, ActionParams } from '@cardbox-editor/core'
import type React from 'react'
import type { Editor } from 'slate'

export const indentParagraph: ActionCallback<
  React.KeyboardEvent,
  ActionParams<Editor, React.KeyboardEvent>
> = ({ editor, event }) => {
  event.preventDefault()
  LocalTransforms.indentParagraph(editor)
}
