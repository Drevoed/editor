import type { BaseEditor, BaseRange } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

export { Editor, useExtendedEditor } from './editor';
export { GlobalStyles as EditorGlobalStyles } from './global-styles';

declare module '@cardbox-editor/core' {
  interface CustomTypesEditor {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
  }
}
