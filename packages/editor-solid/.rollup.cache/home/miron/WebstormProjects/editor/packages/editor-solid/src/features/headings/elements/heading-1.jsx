import { createHeading1Element } from '@cardbox-editor/core';
import 'react';
import { SettingsRegistry } from "../../../registries/settings";
export const Heading1Component = ({ attributes, children, }) => {
    return <h1 {...attributes}>{children}</h1>;
};
SettingsRegistry.set('heading-1', {
    type: 'heading-1',
    name: 'Heading-1',
    code: 'h1',
    aliases: ['heading-1', 'title'],
    allowedModifications: [],
    allowedTransformations: ['heading-2', 'heading-3', 'paragraph'],
    create: createHeading1Element,
});
//# sourceMappingURL=heading-1.jsx.map