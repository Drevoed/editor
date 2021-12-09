import type { Editor, Node } from 'slate';
export declare function equals<T extends Node>(editor: Editor, node: T | T[]): (another: Node) => another is T;
