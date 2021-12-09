export declare function useUI(): {
    toolbar: {
        update: () => void;
        hide: () => void;
    };
    linkPopup: {
        show: ({ selection, href, }: {
            selection: import("slate").BaseRange;
            href?: string | undefined;
        }) => void;
        hide: () => void;
        reset: () => void;
        focus: () => void;
        update: () => void;
    };
};
