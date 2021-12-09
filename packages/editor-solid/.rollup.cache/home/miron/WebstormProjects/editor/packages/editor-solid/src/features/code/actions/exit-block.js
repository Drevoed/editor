import { Path, Transforms } from 'slate';
import { createParagraphElement, GlobalMatchers, GlobalQueries, } from '@cardbox-editor/core';
export const exitBlock = ({ editor, event }) => {
    const code = GlobalQueries.getAbove(editor, {
        type: 'block',
        match: GlobalMatchers.block(editor, 'code'),
    });
    if (!code) {
        return { skipped: true };
    }
    const [, codePath] = code;
    event.preventDefault();
    Transforms.insertNodes(editor, createParagraphElement(), {
        at: Path.next(codePath),
        select: true,
    });
};
//# sourceMappingURL=exit-block.js.map