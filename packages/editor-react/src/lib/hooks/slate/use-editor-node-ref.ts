import { useLayoutEffect, useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { useEditor } from './use-editor';

export function useEditorNodeRef() {
  const editor = useEditor();
  const editorNodeRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    editorNodeRef.current = ReactEditor.toDOMNode(editor, editor);
  }, [editor]);

  return editorNodeRef;
}
