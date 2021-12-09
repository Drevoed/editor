import 'react';
import { createHeading3Element } from '@cardbox-editor/core';
import { SettingsRegistry } from "../../../registries/settings";
export const Heading3Component = ({ attributes, children, }) => {
    return <h3 {...attributes}>{children}</h3>;
};
SettingsRegistry.set('heading-3', {
    type: 'heading-3',
    name: 'Heading-3',
    code: 'h3',
    aliases: ['heading-3', 'title'],
    allowedModifications: [],
    allowedTransformations: ['heading-1', 'heading-2', 'paragraph'],
    create: createHeading3Element,
});
//# sourceMappingURL=heading-3.jsx.map