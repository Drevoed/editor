import { LINK_MODIFICATION, TEXT_MODIFICATIONS, createParagraphElement, } from '@cardbox-editor/core';
import 'react';
import { SettingsRegistry } from "../../../registries/settings";
export const ParagraphComponent = ({ attributes, children, }) => {
    return <p {...attributes}>{children}</p>;
};
SettingsRegistry.set('paragraph', {
    type: 'paragraph',
    name: 'Paragraph',
    code: 'p',
    aliases: ['paragraph', 'text'],
    allowedModifications: [...TEXT_MODIFICATIONS, LINK_MODIFICATION],
    allowedTransformations: ['heading-1', 'heading-2', 'heading-3'],
    create: createParagraphElement,
});
//# sourceMappingURL=paragraph.jsx.map