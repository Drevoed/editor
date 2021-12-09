import { LocalTransforms } from '../transforms';
export const insertExitBreak = ({ editor, event }) => {
    const { handled } = LocalTransforms.insertExitBreak(editor);
    if (handled)
        event.preventDefault();
    else
        return { skipped: true };
};
//# sourceMappingURL=insert-exit-break.js.map