import { Editor, Element, Node, Path } from 'slate';
declare type ChildOf<T extends Element> = T['children'][number];
export declare function moveChildren<TParent extends Element>(editor: Editor, { parent, match, to: destination, transform, willRemoveParent, }: {
    parent: {
        node: TParent;
        path: Path;
    };
    match?: (node: ChildOf<TParent>, index: number) => boolean;
    to: Path;
    transform?: (items: ChildOf<TParent>[]) => Node | Node[];
    willRemoveParent?: (moved: number) => boolean;
}): void;
export {};
