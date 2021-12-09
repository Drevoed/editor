import { LocalTransforms } from '../transforms';
export const insertSoftBreak = ({ editor, event }) => {
    event.preventDefault();
    LocalTransforms.insertExitBreak(editor);
};
//# sourceMappingURL=insert-soft-break.js.map