import { useEditor } from '../lib/hooks/slate';
import { useUI } from '../lib/hooks/use-ui';
import { useCallback, useEffect } from 'react';
import { ActionsRegistry } from '../registries/actions';
import { keybinds } from '../registries/keybinds';
const defaultKeybinds = {
    'delete-backward': 'backspace',
    'insert-soft-break': 'shift+enter',
    'insert-exit-break': 'enter',
    'indent': 'tab',
    'outdent': 'shift+tab',
    'get-out-the-leaf': 'arrowright',
    'make-bold': 'mod+b',
    'make-italic': 'mod+i',
    'make-underlined': 'mod+u',
    'make-inline-code': ['mod+e', 'mod+`'],
    'set-link-for-text': 'mod+k',
    'copy': 'mod+c',
    'copy-all': 'mod+a',
    'paste': 'mod+v',
    'exit-block': 'mod+enter',
};
export function useKeybinds(customKeybinds) {
    const editor = useEditor();
    const ui = useUI();
    useEffect(() => {
        const finalKeybinds = {
            ...defaultKeybinds,
            ...customKeybinds,
        };
        // clear possible previous keybinds
        keybinds.unregisterAll();
        const entries = Object.entries(finalKeybinds);
        entries.forEach(([action, keybind]) => {
            if (!keybind)
                return;
            const keys = typeof keybind === 'string' ? [keybind] : keybind;
            for (const key of keys) {
                keybinds.register(key, (editor, event) => {
                    ActionsRegistry.execute(action, {
                        editor,
                        event,
                        ui,
                    });
                });
            }
        });
    }, [customKeybinds]);
    const handleKeyDown = useCallback((event) => {
        keybinds.keyDown(event, editor);
    }, [editor]);
    return { handleKeyDown };
}
//# sourceMappingURL=use-keybinds.js.map