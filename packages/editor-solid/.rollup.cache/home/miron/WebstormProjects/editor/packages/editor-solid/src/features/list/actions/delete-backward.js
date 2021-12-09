import { LocalTransforms } from '../transforms';
export const deleteBackward = ({ editor, event }) => {
    const { handled } = LocalTransforms.deleteBackward(editor);
    if (handled)
        event.preventDefault();
    else
        return { skipped: true };
};
//# sourceMappingURL=delete-backward.js.map