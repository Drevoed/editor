import {
  Action,
  ActionParams,
  createActionController,
} from '@cardbox-editor/core';
import type { Editor } from 'slate';
import type React from 'react';

export const ActionsRegistry = createActionController<
  Action,
  React.KeyboardEvent | KeyboardEvent,
  ActionParams<Editor, React.KeyboardEvent | KeyboardEvent>
>();
