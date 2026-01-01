import crypto from 'crypto';

export function buildCorsHeaders(origin = '*') {
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
}

export function requireAuth(request: Request) {
    const token = process.env.MCP_API_TOKEN;
    if (!token) return { ok: true };
    const auth = request.headers.get('authorization') || '';
    if (!auth.startsWith('Bearer ')) return { ok: false, reason: 'missing bearer token' };
    const provided = auth.slice('Bearer '.length).trim();
    return provided === token ? { ok: true } : { ok: false, reason: 'invalid token' };
}

export function generateETag(obj: unknown) {
    const str = typeof obj === 'string' ? obj : JSON.stringify(obj as Record<string, unknown>);
    const hash = crypto.createHash('sha1').update(str).digest('hex');
    return `"${hash}"`;
}

export function cacheHeaders({ sMaxAge = 60, staleWhileRevalidate = 120 } = {}) {
    return {
        'Cache-Control': `s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
    };
}
