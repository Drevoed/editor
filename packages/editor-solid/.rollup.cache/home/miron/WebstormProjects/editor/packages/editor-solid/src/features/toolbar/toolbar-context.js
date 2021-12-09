import { useForceUpdate } from '../../lib/hooks/use-force-update';
import { createContext, useContext, useRef } from 'react';
import 'tippy.js';
export function useNewToolbarState() {
    return {
        instance: useRef(null),
        lastSelectedText: useRef(''),
    };
}
export const ToolbarContext = createContext({
    instance: { current: null },
    lastSelectedText: { current: '' },
});
export function useToolbarState() {
    return useContext(ToolbarContext);
}
export function useToolbarActions() {
    const state = useToolbarState();
    const forceUpdate = useForceUpdate();
    const update = () => {
        forceUpdate();
    };
    const hide = () => {
        if (!state.instance.current)
            return;
        state.instance.current.hide();
        state.lastSelectedText.current = '';
    };
    return {
        update,
        hide,
    };
}
//# sourceMappingURL=toolbar-context.js.map