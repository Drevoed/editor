import { Editor } from 'slate';
export function block(editor, type) {
    return (node) => {
        if (!Editor.isBlock(editor, node))
            return false;
        if (!type)
            return true;
        const array = Array.isArray(type) ? type : [type];
        return array.includes(node.type);
    };
}
//# sourceMappingURL=block.js.map