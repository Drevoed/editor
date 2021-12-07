import { LocalTransforms } from '../transforms'
import type React from 'react'
import type { Editor } from 'slate'
import type { ActionCallback, ActionParams } from '@cardbox-editor/core'

export const indent: ActionCallback<
  React.KeyboardEvent,
  ActionParams<Editor, React.KeyboardEvent>
> = ({ editor, event }) => {
  event.preventDefault()
  LocalTransforms.indent(editor)
}
