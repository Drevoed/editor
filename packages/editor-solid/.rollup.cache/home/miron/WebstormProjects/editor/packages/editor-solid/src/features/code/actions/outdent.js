import { LocalTransforms } from '../transforms';
export const outdent = ({ event, editor }) => {
    event.preventDefault();
    LocalTransforms.outdent(editor);
};
//# sourceMappingURL=outdent.js.map