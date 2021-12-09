import { useForceUpdate } from '../../../lib/hooks/use-force-update';
import { createContext, useContext, useRef, useState } from 'react';
export function useNewLinkPopupState() {
    const [href, setHref] = useState('');
    return {
        instance: useRef(null),
        input: useRef(null),
        selection: useRef(null),
        hadHref: useRef(false),
        href,
        setHref,
    };
}
export const LinkPopupContext = createContext({
    instance: { current: null },
    input: { current: null },
    selection: { current: null },
    hadHref: { current: false },
    href: '',
    setHref: () => { },
});
export function useLinkPopupState() {
    return useContext(LinkPopupContext);
}
export function useLinkPopupActions() {
    const state = useLinkPopupState();
    const forceUpdate = useForceUpdate();
    const show = ({ selection, href = '', }) => {
        if (!state.instance.current)
            return;
        state.selection.current = selection;
        state.instance.current.show();
        if (href) {
            state.setHref(href);
            state.hadHref.current = true;
        }
    };
    const reset = () => {
        state.selection.current = null;
        state.hadHref.current = false;
        state.setHref('');
    };
    const hide = () => {
        if (!state.instance.current)
            return;
        state.instance.current.hide();
    };
    const focus = () => {
        if (!state.input.current)
            return;
        state.input.current.focus();
    };
    const update = () => {
        forceUpdate();
    };
    return {
        show,
        hide,
        reset,
        focus,
        update,
    };
}
//# sourceMappingURL=link-popup-context.js.map