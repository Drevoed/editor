import type { ElementType } from '../../shared/types';
import { Editor, Node } from 'slate';
export declare function block<T extends ElementType>(editor: Editor, type?: T | T[]): (node: Node) => node is never;
