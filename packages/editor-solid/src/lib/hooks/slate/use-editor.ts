import { EditorContext } from '../../editor-context'
import { useContext } from 'solid-js'

export function useEditor() {
  return useContext(EditorContext)
}
