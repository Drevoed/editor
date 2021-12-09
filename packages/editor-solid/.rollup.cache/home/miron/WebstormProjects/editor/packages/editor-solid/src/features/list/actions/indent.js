import { LocalTransforms } from '../transforms';
export const indent = ({ editor, event }) => {
    event.preventDefault();
    LocalTransforms.indent(editor);
};
//# sourceMappingURL=indent.js.map