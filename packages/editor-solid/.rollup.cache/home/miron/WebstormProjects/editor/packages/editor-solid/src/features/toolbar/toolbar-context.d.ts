export declare function useNewToolbarState(): {
    instance: any;
    lastSelectedText: any;
};
export declare type ToolbarState = ReturnType<typeof useNewToolbarState>;
export declare const ToolbarContext: any;
export declare function useToolbarState(): any;
export declare function useToolbarActions(): {
    update: () => void;
    hide: () => void;
};
export declare type ToolbarActions = ReturnType<typeof useToolbarActions>;
