import type { Range } from 'slate';
export declare function useNewLinkPopupState(): {
    instance: any;
    input: any;
    selection: any;
    hadHref: any;
    href: any;
    setHref: any;
};
export declare type LinkPopupState = ReturnType<typeof useNewLinkPopupState>;
export declare const LinkPopupContext: any;
export declare function useLinkPopupState(): any;
export declare function useLinkPopupActions(): {
    show: ({ selection, href, }: {
        selection: Range;
        href?: string | undefined;
    }) => void;
    hide: () => void;
    reset: () => void;
    focus: () => void;
    update: () => void;
};
export declare type LinkPopupActions = ReturnType<typeof useLinkPopupActions>;
