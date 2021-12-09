import { Transforms } from 'slate';
import { GlobalMatchers, GlobalQueries, } from '@cardbox-editor/core';
export const copyAll = ({ editor, event }) => {
    const code = GlobalQueries.getAbove(editor, {
        type: 'block',
        match: GlobalMatchers.block(editor, 'code'),
    });
    if (!code) {
        return { skipped: true };
    }
    const [, codePath] = code;
    event.preventDefault();
    Transforms.select(editor, codePath);
};
//# sourceMappingURL=copy-all.js.map