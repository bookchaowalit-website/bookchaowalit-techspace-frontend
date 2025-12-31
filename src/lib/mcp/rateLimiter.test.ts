import { describe, it, expect, beforeEach } from 'vitest';
import { isRateLimited, _resetStore } from './rateLimiter';

describe('rateLimiter', () => {
  beforeEach(() => _resetStore());

  it('allows under limit and enforces limit', () => {
    const key = 'test-key';
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      const r = isRateLimited(key, limit, 1000);
      expect(r.ok).toBe(true);
    }
    const blocked = isRateLimited(key, limit, 1000);
    expect(blocked.ok).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.limit).toBe(limit);
  });
});