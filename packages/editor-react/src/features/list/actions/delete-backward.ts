import { LocalTransforms } from '../transforms';
import type { ActionCallback, ActionParams } from '@cardbox-editor/core';
import type React from 'react';
import type { Editor } from 'slate';

export const deleteBackward: ActionCallback<
  React.KeyboardEvent,
  ActionParams<Editor, React.KeyboardEvent>
> = ({ editor, event }) => {
  const { handled } = LocalTransforms.deleteBackward(editor);

  if (handled) event.preventDefault();
  else return { skipped: true };
};
