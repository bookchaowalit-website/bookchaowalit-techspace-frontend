import { mcpOpenApi } from './schema';
import { buildCorsHeaders, requireAuth } from './utils';
import { techStacks } from '../../data/tech-stacks';

export function getDiscovery(_request: Request) {
    const body = {
        name: 'tech-space MCP',
        version: process.env.npm_package_version || 'unspecified',
        description: 'A simple MCP server exposing tech stacks',
        endpoints: ['/api/mcp/discovery', '/api/mcp/schema', '/api/mcp/data/stacks', '/api/mcp/health'],
    };
    return { status: 200, body, headers: buildCorsHeaders() };
}

export function getSchema(_request: Request) {
    return { status: 200, body: mcpOpenApi, headers: buildCorsHeaders() };
}

export function getStacks(request: Request) {
    const url = new URL(request.url);
    const q = url.searchParams;
    const category = q.get('category');
    const status = q.get('status');
    const limit = Number(q.get('limit') || 100);
    const offset = Number(q.get('offset') || 0);

    let items = techStacks;
    if (category) items = items.filter((s) => s.category === category);
    if (status) items = items.filter((s) => s.status === status);

    const page = items.slice(offset, offset + limit);
    return {
        status: 200,
        body: {
            total: items.length,
            limit,
            offset,
            items: page,
        },
        headers: buildCorsHeaders(),
    };
}

export function getHealth(_request: Request) {
    return { status: 200, body: { status: 'ok', uptime: process.uptime(), ts: new Date().toISOString() }, headers: buildCorsHeaders() };
}

export function authGuard(_request: Request) {
    const check = requireAuth(_request);
    if (!check.ok) {
        return { status: 401, body: { error: 'Unauthorized', reason: check.reason }, headers: buildCorsHeaders() };
    }
    return null;
}
