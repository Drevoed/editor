import { LocalQueries } from '../queries';
import { mergeSiblings } from './merge-siblings';
import { Range, Transforms } from 'slate';
export function indent(editor, options = {}) {
    const { at = editor.selection } = options;
    if (!at)
        return;
    if (Range.isRange(at) && Range.isExpanded(at))
        return;
    const info = LocalQueries.info(editor, { at });
    if (!info)
        return;
    const { lists, items } = info;
    if (items.current.meta.isFirst)
        return;
    if (!items.previous)
        return;
    Transforms.wrapNodes(editor, { type: lists.current.node.type, children: [] }, {
        at: items.current.path,
    });
    Transforms.moveNodes(editor, {
        at: items.current.path,
        to: items.previous.path.concat(items.previous.node.children.length),
    });
    mergeSiblings(editor, { at: items.previous.path });
}
//# sourceMappingURL=indent.js.map