import { GlobalTransforms } from '../lib/global-transforms';
import type {
  ActionCallback,
  ActionParams,
  KeyboardEventLike,
} from '../lib/action-controller';

import type { Editor } from 'slate';

export const insertExitBreak = <
  TEvent extends KeyboardEventLike = KeyboardEvent,
  TEditor extends import('slate').BaseEditor = Editor,
  TParams extends ActionParams<TEditor, TEvent> = ActionParams<TEditor, TEvent>,
>({
  editor,
  event,
}: TParams) => {
  event.preventDefault();
  GlobalTransforms.insertExitBreak(editor);
};
