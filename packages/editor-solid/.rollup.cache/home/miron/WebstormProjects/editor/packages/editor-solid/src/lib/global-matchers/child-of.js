import { Editor } from 'slate';
export function childOf(editor, element) {
    return (node) => {
        if (Editor.isEditor(node))
            return false;
        return element.children.includes(node);
    };
}
//# sourceMappingURL=child-of.js.map