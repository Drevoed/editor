import { createRegistry } from '../../lib/registry'
import type { ElementSettings } from './types'
import type { Element } from 'slate'

export const SettingsRegistry = createRegistry<
  Element['type'],
  ElementSettings
>()
export * from './types'
