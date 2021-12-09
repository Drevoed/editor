import { BaseEditor, Element, Editor } from 'slate';
import type { EditorValue } from '../../shared/types';

export function isEmpty(editor: BaseEditor, value: EditorValue) {
  return value.every((block) => Editor.isEmpty(editor, block as Element));
}
