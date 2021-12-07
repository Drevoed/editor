import React from 'react'
import type { RenderElementProps } from 'slate-react'
import {
  createOrderedListElement,
  LINK_MODIFICATION,
  TEXT_MODIFICATIONS,
} from '@cardbox-editor/core'
import { SettingsRegistry } from "../../../registries/settings";

export const OrderedListComponent = ({
  attributes,
  children,
}: RenderElementProps) => {
  return <ol {...attributes}>{children}</ol>
}

SettingsRegistry.set('ordered-list', {
  type: 'ordered-list',
  name: 'Ordered List',
  code: 'ol',
  aliases: ['ordered-list'],
  allowedModifications: [...TEXT_MODIFICATIONS, LINK_MODIFICATION],
  allowedTransformations: ['unordered-list'],
  create: createOrderedListElement,
})
