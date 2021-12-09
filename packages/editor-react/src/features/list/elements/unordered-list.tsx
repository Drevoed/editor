import React from 'react';
import {
  createUnorderedListElement,
  LINK_MODIFICATION,
  TEXT_MODIFICATIONS,
} from '@cardbox-editor/core';
import { SettingsRegistry } from '../../../registries/settings';
import type { RenderElementProps } from 'slate-react';

export const UnorderedListComponent = ({
  attributes,
  children,
}: RenderElementProps) => {
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
