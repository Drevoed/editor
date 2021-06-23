import { nanoid } from 'nanoid'
import React from 'react'
import { RenderElementProps } from 'slate-react'
import { ALL_LEAF_MODIFICATIONS } from '../../constants'
import { ElementSettings } from '../../types'
import { createListItemElement } from './list-item'
import { ListItemElement, UnorderedListElement } from './types'

export const createUnorderedListElement = (
  children: ListItemElement[] = [createListItemElement()]
): UnorderedListElement => ({
  id: nanoid(),
  type: 'unordered-list',
  children,
})

export const UnorderedListComponent = ({
  attributes,
  children,
}: RenderElementProps) => {
  return <ul {...attributes}>{children}</ul>
}

export const UNORDERED_LIST_SETTINGS: ElementSettings = {
  name: 'Unordered List',
  code: 'unordered-list',
  aliases: ['ul'],
  allowedModifications: Array.from(ALL_LEAF_MODIFICATIONS),
  allowedTransformations: [],
}
