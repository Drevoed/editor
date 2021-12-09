declare type AnyFunction = (...args: unknown[]) => unknown;
export declare function useThrottled<T extends AnyFunction>(fn: T, ms: number): any;
export {};
