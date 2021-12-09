import { GlobalMatchers } from '../../../lib/global-matchers';
import { Editor, Transforms } from 'slate';
export function moveChildren(editor, { parent, match = () => true, to: destination, transform = (items) => items, willRemoveParent = (moved) => moved === parent.node.children.length, }) {
    const destinationRef = Editor.pathRef(editor, destination);
    const indexByItem = new Map();
    for (const [index, item] of parent.node.children.entries()) {
        indexByItem.set(item, index);
    }
    const children = parent.node.children;
    // take bottom items
    const itemsToMove = children.filter(match);
    const shouldRemoveParent = willRemoveParent(itemsToMove.length);
    if (itemsToMove.length > 0) {
        const isBlock = GlobalMatchers.block(editor);
        if (shouldRemoveParent) {
            Transforms.removeNodes(editor, { at: parent.path });
        }
        else {
            Transforms.removeNodes(editor, {
                at: parent.path,
                match(node) {
                    if (!isBlock(node))
                        return false;
                    const index = indexByItem.get(node);
                    if (typeof index !== 'number')
                        return false;
                    return match(node, index);
                },
            });
        }
        if (!destinationRef.current)
            return;
        Transforms.insertNodes(editor, transform(itemsToMove), {
            at: destinationRef.current,
        });
    }
}
//# sourceMappingURL=move-children.js.map