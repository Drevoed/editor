import { GlobalTransforms } from '../lib/global-transforms';
import type { Editor } from 'slate';
import type {
  ActionCallbackResult,
  ActionParams,
  KeyboardEventLike,
} from '../lib/action-controller';

export const getOutTheLeaf = <
  TEvent extends KeyboardEventLike = KeyboardEvent,
  TEditor extends import('slate').BaseEditor = Editor,
  TParams extends ActionParams<TEditor, TEvent> = ActionParams<TEditor, TEvent>,
>({
  editor,
  event,
}: TParams): void | ActionCallbackResult => {
  const { success } = GlobalTransforms.getOutTheLeaf(editor);
  if (success) event.preventDefault();
};
