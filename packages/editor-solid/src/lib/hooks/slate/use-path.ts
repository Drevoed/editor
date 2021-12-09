import { useEditor } from './use-editor'
import type { Element } from 'slate'
import { SolidEditor } from 'slate-solid'

export function usePath(element: Element) {
  const editor = useEditor()
  return SolidEditor.findPath(editor, element)
}
