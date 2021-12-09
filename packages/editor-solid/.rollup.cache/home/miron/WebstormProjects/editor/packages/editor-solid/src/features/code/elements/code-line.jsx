import 'react';
import { CODE_MODIFICATION, createCodeLineElement } from '@cardbox-editor/core';
import { SettingsRegistry } from '../../../registries/settings';
export const CodeLineComponent = ({ attributes, children, }) => {
    return <div {...attributes}>{children}</div>;
};
SettingsRegistry.set('code-line', {
    type: 'code-line',
    name: 'Code Line',
    code: 'code-line',
    allowedModifications: [CODE_MODIFICATION],
    allowedTransformations: [],
    create: createCodeLineElement,
    canBeAdded: false,
});
//# sourceMappingURL=code-line.jsx.map