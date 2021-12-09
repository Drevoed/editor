import { createKeybindController } from '@cardbox-editor/core';
import type { Editor } from 'slate';
import type React from 'react';

export const keybinds = createKeybindController<Editor, React.KeyboardEvent>({
  scope: 'slate-editor-react',
});
