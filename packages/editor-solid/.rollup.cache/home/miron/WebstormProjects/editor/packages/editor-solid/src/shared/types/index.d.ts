import type { Element } from 'slate';
export declare type ElementType = Element['type'];
export declare type ElementByType<T extends ElementType, K extends Element = Element> = K extends {
    type: T;
} ? K : never;
