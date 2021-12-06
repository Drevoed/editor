import { GlobalMatchers } from '../../lib/global-matchers'
import type { Editor } from 'slate'

export function listNormalization(editor: Editor): Editor {
  const { normalizeNode } = editor

  const isList = GlobalMatchers.block(editor, [
    'ordered-list',
    'unordered-list',
  ])

  const isItem = GlobalMatchers.block(editor, 'list-item')

  function normalizeList() {}
  function normalizeItem() {}

  editor.normalizeNode = (entry) => {
    const [node] = entry

    if (isItem(node)) normalizeItem()
    if (isList(node)) normalizeList()

    return normalizeNode(entry)
  }

  return editor
}
