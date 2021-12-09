import type { Editor } from 'slate';
import type { UI } from '../../lib/action-controller';

export interface EditorListenerParams {
  editor: Editor;
  ui: UI;
}
