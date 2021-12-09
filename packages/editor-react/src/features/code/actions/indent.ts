import { LocalTransforms } from '../transforms';
import type { ActionCallback, ActionParams } from '@cardbox-editor/core';
import type React from 'react';
import type { Editor } from 'slate';

export const indent: ActionCallback<
  React.KeyboardEvent,
  ActionParams<Editor, React.KeyboardEvent>
> = ({ event, editor }) => {
  event.preventDefault();
  LocalTransforms.indent(editor);
};
