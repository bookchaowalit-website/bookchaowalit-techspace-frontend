import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getDiscovery, getSchema, getStacks, getHealth, authGuard } from './controllers';
import { techStacks } from '../../data/tech-stacks';

describe('MCP controllers', () => {
    it('getDiscovery returns metadata and endpoints', () => {
        const res = getDiscovery(new Request('http://localhost'));
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.endpoints)).toBe(true);
    });

    it('getSchema returns an OpenAPI-like document', () => {
        const res = getSchema(new Request('http://localhost'));
        expect(res.status).toBe(200);
        expect(res.body.openapi).toBe('3.0.0');
        expect(res.body.paths).toBeDefined();
    });

    it('getStacks returns paginated results and supports filters', () => {
        const url = 'http://localhost/?limit=2&offset=0';
        const res = getStacks(new Request(url));
        expect(res.status).toBe(200);
        expect(res.body.items.length).toBeLessThanOrEqual(2);
        expect(res.body.total).toBeGreaterThanOrEqual(res.body.items.length);

        // category filter
        const cat = techStacks.find((t) => t.category === 'AI/ML')?.category;
        if (cat) {
            const r2 = getStacks(new Request(`http://localhost/?category=${encodeURIComponent(cat)}`));
            expect(r2.status).toBe(200);
            expect(r2.body.items.every((i: any) => i.category === cat)).toBe(true);
        }
    });

    it('getHealth returns ok status and timestamp', () => {
        const res = getHealth(new Request('http://localhost'));
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
        expect(typeof res.body.ts).toBe('string');
    });

    describe('authGuard behavior', () => {
        let originalToken: string | undefined;
        beforeEach(() => {
            originalToken = process.env.MCP_API_TOKEN;
        });
        afterEach(() => {
            process.env.MCP_API_TOKEN = originalToken;
        });

        it('allows when MCP_API_TOKEN is not set', () => {
            delete process.env.MCP_API_TOKEN;
            const guarded = authGuard(new Request('http://localhost'));
            expect(guarded).toBeNull();
        });

        it('rejects when token is set but missing in request', () => {
            process.env.MCP_API_TOKEN = 'secret';
            const guarded = authGuard(new Request('http://localhost'));
            expect(guarded).not.toBeNull();
            expect(guarded?.status).toBe(401);
        });

        it('accepts when valid token is presented', () => {
            process.env.MCP_API_TOKEN = 'secret';
            const req = new Request('http://localhost', { headers: { Authorization: 'Bearer secret' } });
            const guarded = authGuard(req);
            expect(guarded).toBeNull();
        });
    });
});
