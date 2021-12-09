import {
  createListener,
  link,
  ClipboardListenerParams,
} from '@cardbox-editor/core';
import { useEditor } from '../../lib/hooks/slate';
import { useUI } from '../../lib/hooks/use-ui';

export function useListeners() {
  const editor = useEditor();
  const ui = useUI();

  const handlePaste = createListener<ClipboardEvent, ClipboardListenerParams>(
    {
      editor,
      ui,
    },
    [link],
  );

  return {
    handlePaste,
  };
}
