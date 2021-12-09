import { deleteBackward } from './delete-backward';
import { indent } from './indent';
import { indentParagraph } from './indent-paragraph';
import { insertExitBreak } from './insert-exit-break';
import { mergeSiblings } from './merge-siblings';
import { moveChildren } from './move-children';
import { outdent } from './outdent';
export declare const LocalTransforms: {
    insertExitBreak: typeof insertExitBreak;
    deleteBackward: typeof deleteBackward;
    indent: typeof indent;
    indentParagraph: typeof indentParagraph;
    outdent: typeof outdent;
    mergeSiblings: typeof mergeSiblings;
    moveChildren: typeof moveChildren;
};
