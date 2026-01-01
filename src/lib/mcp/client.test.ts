import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchDiscovery, fetchSchema, fetchStacks } from './client';

const mockFetch = (body: unknown, status = 200) => vi.fn().mockResolvedValue({ ok: status >= 200 && status < 300, status, statusText: 'OK', json: async () => body });

describe('MCP client', () => {
    let originalFetch: typeof globalThis.fetch | undefined;
    beforeEach(() => {
        originalFetch = globalThis.fetch;
    });
    afterEach(() => {
        if (originalFetch) globalThis.fetch = originalFetch;
        vi.restoreAllMocks();
    });

    it('fetchDiscovery returns discovery object', async () => {
        globalThis.fetch = mockFetch({ name: 'tech-space MCP', version: '1.0.0', endpoints: ['/api/mcp'] });
        const d = await fetchDiscovery();
        expect(d.name).toBe('tech-space MCP');
    });

    it('fetchSchema returns schema object', async () => {
        const schema = { openapi: '3.0.0' };
        globalThis.fetch = mockFetch(schema);
        const s = await fetchSchema();
        expect(s.openapi).toBe('3.0.0');
    });

    it('fetchStacks returns page and respects query params', async () => {
        const body = { total: 1, limit: 1, offset: 0, items: [{ id: 'react' }] };
        let recordedUrl: string | undefined;
        const fn = vi.fn().mockImplementation(async (url: string, _init?: Record<string, unknown>) => {
            recordedUrl = url;
            return ({ ok: true, status: 200, statusText: 'OK', json: async () => body } as unknown) as Response;
        });
        globalThis.fetch = fn as unknown as typeof fetch;
        const r = await fetchStacks({ category: 'Frontend', limit: 1 });
        expect(r.items[0].id).toBe('react');

        // ensure URL includes query string
        expect(recordedUrl?.includes('category=Frontend')).toBe(true);
        expect(recordedUrl?.includes('limit=1')).toBe(true);
    });

    it('passes Authorization when token provided', async () => {
        const body = { name: 'ok', endpoints: [] };
        const fn = vi.fn().mockResolvedValue({ ok: true, status: 200, statusText: 'OK', json: async () => body });
        globalThis.fetch = fn as unknown as typeof fetch;
        await fetchDiscovery(undefined, 's3cr3t');
        const call = (fn as unknown as { mock: Array<[string, Record<string, unknown> | undefined]> }).mock[0];
        const calledInit = call[1];
        expect((calledInit?.headers as Record<string, string>)?.Authorization).toBe('Bearer s3cr3t');
    });
});
