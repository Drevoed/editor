import 'react';
import { LINK_MODIFICATION, TEXT_MODIFICATIONS, createListItemElement, } from '@cardbox-editor/core';
import { SettingsRegistry } from "../../../registries/settings";
export const ListItemComponent = ({ attributes, children, }) => {
    return <li {...attributes}>{children}</li>;
};
SettingsRegistry.set('list-item', {
    type: 'list-item',
    name: 'List Item',
    code: 'li',
    aliases: ['list-item'],
    canBeAdded: false,
    allowedModifications: [...TEXT_MODIFICATIONS, LINK_MODIFICATION],
    allowedTransformations: [],
    create: createListItemElement,
});
//# sourceMappingURL=list-item.jsx.map