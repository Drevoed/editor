import { LocalTransforms } from '../transforms';
export const indent = ({ event, editor }) => {
    event.preventDefault();
    LocalTransforms.indent(editor);
};
//# sourceMappingURL=indent.js.map