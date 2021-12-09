import type { ElementType } from '../../shared/types';
import type { Editor, Element, Node } from 'slate';
export declare class Builder {
    editor: Editor;
    constructor(editor: Editor);
    stages: Array<(node: Node) => boolean>;
    block(type?: ElementType | ElementType[]): this;
    notEquals(node: Node): this;
    equals(node: Node | Node[]): this;
    childOf(element: Element): this;
    compile(): (node: Node) => boolean;
}
export declare const builder: (editor: Editor) => Builder;
