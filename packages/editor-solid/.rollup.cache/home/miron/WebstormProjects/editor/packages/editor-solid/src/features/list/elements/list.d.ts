import type { ListElement, ListItemElement } from './types';
export declare const createListElement: <TType extends "ordered-list" | "unordered-list", TElement extends ListElement = ReturnType<{
    'ordered-list': any;
    'unordered-list': any;
}[TType]>>(type: TType, children?: ListItemElement[]) => TElement;
