import { createContext, useContext } from 'solid-js';
const ControlsContext = createContext({});
export const ControlsProvider = ControlsContext.Provider;
export function useControlsState() {
    return useContext(ControlsContext);
}
//# sourceMappingURL=context.js.map