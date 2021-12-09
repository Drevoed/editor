declare type AnyFunction = (...args: unknown[]) => unknown;
export declare function useDebounced<T extends AnyFunction>(fn: T, ms: number): any;
export {};
