import type { Editor } from 'slate'
import type { UI } from '../../registries/actions'

export interface EditorListenerParams {
  editor: Editor
  ui: UI
}
