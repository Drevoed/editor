import React from 'react';
import { CODE_MODIFICATION, createCodeLineElement } from '@cardbox-editor/core';
import { SettingsRegistry } from '../../../registries/settings';
import type { RenderElementProps } from 'slate-react';

export const CodeLineComponent = ({
  attributes,
  children,
}: RenderElementProps) => {
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
