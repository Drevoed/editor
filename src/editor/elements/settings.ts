import { ElementSettings, ElementType } from '../types'
import { CODE_LINE_SETTINGS, CODE_SETTINGS } from './elements/code'
import { HEADING_1_SETTINGS } from './elements/heading-1'
import { HEADING_2_SETTINGS } from './elements/heading-2'
import { HEADING_3_SETTINGS } from './elements/heading-3'
import {
  LIST_ITEM_SETTINGS,
  ORDERED_LIST_SETTINGS,
  UNORDERED_LIST_SETTINGS,
} from './elements/list'
import { PARAGRAPH_SETTINGS } from './elements/paragraph'

type ElementSettingsMapper = {
  [KElementType in ElementType]: ElementSettings
}

export const ELEMENT_SETTINGS_MAPPER: ElementSettingsMapper = {
  'paragraph': PARAGRAPH_SETTINGS,
  'heading-1': HEADING_1_SETTINGS,
  'heading-2': HEADING_2_SETTINGS,
  'heading-3': HEADING_3_SETTINGS,
  'ordered-list': ORDERED_LIST_SETTINGS,
  'unordered-list': UNORDERED_LIST_SETTINGS,
  'list-item': LIST_ITEM_SETTINGS,
  'code': CODE_SETTINGS,
  'code-line': CODE_LINE_SETTINGS,
}
