import { useLinkPopupActions } from '../../features/link';
import { useToolbarActions } from '../../features/toolbar';
export function useUI() {
    return {
        toolbar: useToolbarActions(),
        linkPopup: useLinkPopupActions(),
    };
}
//# sourceMappingURL=use-ui.js.map