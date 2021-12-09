import { outdent } from './outdent';
import { Range } from 'slate';
import { GlobalMatchers, GlobalQueries } from "@cardbox-editor/core";
export function deleteBackward(editor) {
    const handled = { handled: true };
    const skipped = { handled: false };
    if (!editor.selection) {
        return skipped;
    }
    if (Range.isExpanded(editor.selection)) {
        return skipped;
    }
    const itemEntry = GlobalQueries.getAbove(editor, {
        type: 'block',
        mode: 'lowest',
        match: GlobalMatchers.block(editor, 'list-item'),
    });
    if (!itemEntry)
        return skipped;
    const [, itemPath] = itemEntry;
    const [isStart] = GlobalQueries.isOnEdges(editor, { of: itemPath });
    if (!isStart) {
        return skipped;
    }
    outdent(editor);
    return handled;
}
//# sourceMappingURL=delete-backward.js.map