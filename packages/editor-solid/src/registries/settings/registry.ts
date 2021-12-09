import { createRegistry } from '@cardbox-editor/core'
import type { ElementSettings } from './types'
import type { Element } from 'slate'

export const SettingsRegistry = createRegistry<
  Element['type'],
  ElementSettings
>()
