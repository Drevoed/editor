import type { CodeElement, CodeLineElement } from '../features/code'
import type {
  Heading1Element,
  Heading2Element,
  Heading3Element,
} from '../features'
import type { ListElement, ListItemElement } from '../features/list'
import type { ParagraphElement } from '../features/paragraph'

export type CustomElement =
  | ParagraphElement
  | Heading1Element
  | Heading2Element
  | Heading3Element
  | ListElement
  | ListItemElement
  | CodeElement
  | CodeLineElement
