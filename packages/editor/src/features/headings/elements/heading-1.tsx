import { SettingsRegistry } from '../../../registries/settings'
import type { Heading1Element } from './types'
import type { Text } from 'slate'
import type { RenderElementProps } from 'slate-react'

export const createHeading1Element = (
  children: Text[] = [{ text: '' }]
): Heading1Element => ({
  type: 'heading-1',
  children,
})

export const Heading1Component = ({
  attributes,
  children,
}: RenderElementProps) => {
  return <h1 {...attributes}>{children}</h1>
}

SettingsRegistry.set('heading-1', {
  type: 'heading-1',
  name: 'Heading-1',
  code: 'h1',
  aliases: ['heading-1', 'title'],
  allowedModifications: [],
  allowedTransformations: ['heading-2', 'heading-3', 'paragraph'],
  create: createHeading1Element,
})
