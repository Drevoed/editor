import type { ActionParams, KeyboardEventLike } from '../lib/action-controller'
import type { Editor } from 'slate'
import { GlobalTransforms } from '../lib/global-transforms'

export const insertSoftBreak = <
  TEvent extends KeyboardEventLike = KeyboardEvent,
  TEditor extends import('slate').BaseEditor = Editor,
  TParams extends ActionParams<TEditor, TEvent> = ActionParams<TEditor, TEvent>
>({
  editor,
  event,
}: TParams) => {
  event.preventDefault()
  GlobalTransforms.insertSoftBreak(editor)
}
