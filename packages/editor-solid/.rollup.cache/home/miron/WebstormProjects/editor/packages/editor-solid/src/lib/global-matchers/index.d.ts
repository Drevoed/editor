import { block } from './block';
import { childOf } from './child-of';
import { equals } from './equals';
import { notEquals } from './not-equals';
export declare const GlobalMatchers: {
    builder: (editor: import("slate").BaseEditor) => import("./builder").Builder;
    block: typeof block;
    equals: typeof equals;
    notEquals: typeof notEquals;
    childOf: typeof childOf;
};
