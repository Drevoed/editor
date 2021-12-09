import { block } from './block';
import { childOf } from './child-of';
import { equals } from './equals';
import { notEquals } from './not-equals';
export class Builder {
    editor;
    constructor(editor) {
        this.editor = editor;
    }
    stages = [];
    block(type) {
        this.stages.push(block(this.editor, type));
        return this;
    }
    notEquals(node) {
        this.stages.push(notEquals(this.editor, node));
        return this;
    }
    equals(node) {
        this.stages.push(equals(this.editor, node));
        return this;
    }
    childOf(element) {
        this.stages.push(childOf(this.editor, element));
        return this;
    }
    compile() {
        return (node) => {
            return this.stages.every((stage) => stage(node));
        };
    }
}
export const builder = (editor) => new Builder(editor);
//# sourceMappingURL=builder.js.map