type WindowEntry = number[];

const store = new Map<string, WindowEntry>();

export interface RateResult {
    ok: boolean;
    remaining: number;
    limit: number;
    reset: number; // epoch ms
}

export function isRateLimited(key: string, limit = 60, windowMs = 60_000): RateResult {
    const now = Date.now();
    const windowStart = now - windowMs;
    let arr = store.get(key);
    if (!arr) arr = [];
    // prune old
    while (arr.length && arr[0] <= windowStart) arr.shift();
    if (arr.length >= limit) {
        const oldest = arr[0];
        return { ok: false, remaining: 0, limit, reset: oldest + windowMs };
    }
    // allow
    arr.push(now);
    store.set(key, arr);
    return { ok: true, remaining: Math.max(0, limit - arr.length), limit, reset: windowStart + windowMs };
}

// For tests and cleanup
export function _resetStore() {
    store.clear();
}
