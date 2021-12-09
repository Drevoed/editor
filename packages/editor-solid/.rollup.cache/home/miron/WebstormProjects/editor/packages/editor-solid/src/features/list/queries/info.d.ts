import { Editor, Path, Element, Location } from "slate";
import type { ListItemElement } from '../elements/types';
interface Options {
    at?: Location;
}
interface Info<TElement extends Element = Element, TMeta extends unknown = unknown> {
    node: TElement;
    path: Path;
    meta: TMeta;
}
interface BlockMeta {
    isList: boolean;
    isFirst: boolean;
    isLast: boolean;
    isOnStart: boolean;
    isOnEnd: boolean;
    isEmpty: boolean;
}
declare type BlockInfo = Info<Element, BlockMeta>;
export declare function info(editor: Editor, options?: Options): {
    lists: {
        current: {
            node: import("slate").BaseElement;
            path: Path;
            meta: {
                isNested: boolean;
            };
        };
        above: {
            node: import("slate").BaseElement;
            path: Path;
            meta: {};
        } | null;
    };
    items: {
        current: {
            node: ListItemElement;
            path: Path;
            meta: {
                isSimple: boolean;
                index: number;
                isFirst: boolean;
                isLast: boolean;
                isEmpty: any;
                hasList: any;
            };
        };
        previous: {
            node: ListItemElement;
            path: Path;
            meta: {
                isSimple: boolean;
                index: number;
                isFirst: boolean;
                isLast: boolean;
                isEmpty: any;
                hasList: any;
            };
        } | null;
        next: {
            node: ListItemElement;
            path: Path;
            meta: {
                isSimple: boolean;
                index: number;
                isFirst: boolean;
                isLast: boolean;
                isEmpty: any;
                hasList: any;
            };
        } | null;
        above: {
            node: import("slate").BaseElement;
            path: Path;
            meta: {};
        } | null;
    };
    blocks: {
        current: {
            node: import("slate").BaseElement;
            path: Path;
            meta: {
                isFirst: boolean;
                isLast: boolean;
                isOnStart: any;
                isOnEnd: any;
                isEmpty: boolean;
                isList: any;
            };
        };
        previous: {
            node: import("slate").BaseElement;
            path: Path;
            meta: {
                isFirst: boolean;
                isLast: boolean;
                isOnStart: any;
                isOnEnd: any;
                isEmpty: boolean;
                isList: any;
            };
        } | null;
        next: {
            node: import("slate").BaseElement;
            path: Path;
            meta: {
                isFirst: boolean;
                isLast: boolean;
                isOnStart: any;
                isOnEnd: any;
                isEmpty: boolean;
                isList: any;
            };
        } | null;
        first: BlockInfo | null;
        second: BlockInfo | null;
        third: BlockInfo | null;
    };
} | undefined;
export declare type FullInfo = Exclude<ReturnType<typeof info>, undefined>;
export {};
