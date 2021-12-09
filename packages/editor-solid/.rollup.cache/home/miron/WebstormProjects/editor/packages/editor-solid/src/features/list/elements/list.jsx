import { createListItemElement, createOrderedListElement, createUnorderedListElement, } from '@cardbox-editor/core';
const mapTypeToCreate = {
    'ordered-list': createOrderedListElement,
    'unordered-list': createUnorderedListElement,
};
export const createListElement = (type, children = [createListItemElement()]) => {
    const fn = mapTypeToCreate[type];
    return fn(children);
};
//# sourceMappingURL=list.jsx.map