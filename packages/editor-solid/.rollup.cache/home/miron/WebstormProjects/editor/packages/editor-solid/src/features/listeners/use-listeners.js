import { useEditor } from '../../lib/hooks/slate';
import { useUI } from '../../lib/hooks/use-ui';
import { createListener, link, } from '@cardbox-editor/core';
export function useListeners() {
    const editor = useEditor();
    const ui = useUI();
    const handlePaste = createListener({
        editor,
        ui,
    }, [link]);
    return {
        handlePaste,
    };
}
//# sourceMappingURL=use-listeners.js.map