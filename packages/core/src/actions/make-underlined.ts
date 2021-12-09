import { GlobalTransforms } from '../lib/global-transforms';
import type { ActionCallback } from '../lib/action-controller/types';
import type { ActionParams } from '../registries/actions';

export const makeUnderlined: ActionCallback<ActionParams> = ({
  editor,
  event,
}) => {
  event.preventDefault();
  GlobalTransforms.toggleTextModification(editor, 'underlined');
};
