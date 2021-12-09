import type { ControlsState } from './types';
export declare const ControlsProvider: (props: {
    value: ControlsState;
    children: any;
}) => any;
export declare function useControlsState(): ControlsState;
