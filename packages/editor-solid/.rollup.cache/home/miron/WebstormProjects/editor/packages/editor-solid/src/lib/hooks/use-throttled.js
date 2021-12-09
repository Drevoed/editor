import { useMemo } from 'react';
import throttle from 'throttleit';
export function useThrottled(fn, ms) {
    return useMemo(() => throttle(fn, ms), [fn, ms]);
}
//# sourceMappingURL=use-throttled.js.map