import { createContext } from 'react';
import type { Editor } from 'slate';
import type { ReactEditor } from 'slate-react';

// it's supposed to be used only with hook, so cast is ok
export const EditorContext = createContext<Editor & ReactEditor>(
  {} as Editor & ReactEditor,
);
