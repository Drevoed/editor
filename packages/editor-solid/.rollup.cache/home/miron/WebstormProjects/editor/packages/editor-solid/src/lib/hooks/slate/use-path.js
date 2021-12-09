import { useEditor } from './use-editor';
import { SolidEditor } from 'slate-solid';
export function usePath(element) {
    const editor = useEditor();
    return SolidEditor.findPath(editor, element);
}
//# sourceMappingURL=use-path.js.map