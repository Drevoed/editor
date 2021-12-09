import 'react';
import { createUnorderedListElement, LINK_MODIFICATION, TEXT_MODIFICATIONS, } from '@cardbox-editor/core';
import { SettingsRegistry } from "../../../registries/settings";
export const UnorderedListComponent = ({ attributes, children, }) => {
    return <ul {...attributes}>{children}</ul>;
};
SettingsRegistry.set('unordered-list', {
    type: 'unordered-list',
    name: 'Unordered List',
    code: 'ul',
    aliases: ['unordered-list'],
    allowedModifications: [...TEXT_MODIFICATIONS, LINK_MODIFICATION],
    allowedTransformations: ['ordered-list'],
    create: createUnorderedListElement,
});
//# sourceMappingURL=unordered-list.jsx.map