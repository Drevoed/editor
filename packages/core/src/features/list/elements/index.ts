import type { Element } from 'slate'
import type {
  ListElement,
  ListItemElement,
  OrderedListElement,
  UnorderedListElement,
} from './types'

export * from './types'

export const createListItemElement = (
  children: Element[] = [{ type: 'paragraph', children: [{ text: '' }] }]
): ListItemElement => ({
  type: 'list-item',
  children,
})

export const createOrderedListElement = (
  children: ListItemElement[] = [createListItemElement()]
): OrderedListElement => ({
  type: 'ordered-list',
  children,
})

export const createUnorderedListElement = (
  children: ListItemElement[] = [createListItemElement()]
): UnorderedListElement => ({
  type: 'unordered-list',
  children,
})

const mapTypeToCreate = {
  'ordered-list': createOrderedListElement,
  'unordered-list': createUnorderedListElement,
}

export const createListElement = <
  TType extends ListElement['type'],
  TElement extends ListElement = ReturnType<typeof mapTypeToCreate[TType]>
>(
  type: TType,
  children: ListItemElement[] = [createListItemElement()]
): TElement => {
  const fn = mapTypeToCreate[type]
  return fn(children) as TElement
}
