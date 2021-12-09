import type { BaseEditor } from 'slate';
import type { SolidEditor } from 'slate-solid';
import type { HistoryEditor } from 'slate-history';
export { Editor, useExtendedEditor } from './editor';
export { GlobalStyles as EditorGlobalStyles } from './global-styles';
declare module '@cardbox-editor/core' {
    interface CustomTypesEditor {
        Editor: BaseEditor & SolidEditor & HistoryEditor;
    }
}
