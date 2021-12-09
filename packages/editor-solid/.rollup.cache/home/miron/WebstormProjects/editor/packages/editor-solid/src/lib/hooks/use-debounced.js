import debounce from 'just-debounce-it';
import { useMemo } from 'react';
export function useDebounced(fn, ms) {
    return useMemo(() => debounce(fn, ms), [fn, ms]);
}
//# sourceMappingURL=use-debounced.js.map