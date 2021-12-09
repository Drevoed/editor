import { useEditor } from './use-editor';
import { createEffect } from 'solid-js';
import { SolidEditor } from 'slate-solid';
export function useEditorNodeRef() {
    let editorNodeRef = null;
    createEffect(() => {
        const editor = useEditor();
        editorNodeRef = SolidEditor.toDOMNode(editor, editor);
    });
    return editorNodeRef;
}
//# sourceMappingURL=use-editor-node-ref.js.map