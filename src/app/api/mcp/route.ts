import { z } from 'zod';
import { createMcpHandler, withMcpAuth } from 'mcp-handler';
import { rollDice, listStacks, getStack, searchStacks, siteSummary, pageSummary, renderStackMarkdown } from '@/lib/mcp/tools';

const handler = createMcpHandler((server) => {
    server.tool(
        'roll_dice',
        { sides: z.number().int().min(2) },
        { title: 'Roll a die with the given number of sides' },
        async ({ sides }: { sides: number }) => rollDice(sides),
    );

    server.tool(
        'list_stacks',
        { category: z.string().optional(), limit: z.number().int().min(1).optional(), offset: z.number().int().min(0).optional() },
        { title: 'List tech stacks (supports category)' },
        async ({ category, limit, offset }: { category?: string; limit?: number; offset?: number }) => {
            const res = listStacks({ category, limit, offset });
            return { content: [{ type: 'text' as const, text: JSON.stringify(res) }] };
        },
    );

    server.tool(
        'get_stack',
        { id: z.string() },
        { title: 'Get a single tech stack by id' },
        async ({ id }: { id: string }) => {
            const s = getStack(id as string);
            return { content: [{ type: 'text' as const, text: JSON.stringify(s) }] };
        },
    );

    server.tool(
        'search_stacks',
        { q: z.string().min(1), field: z.enum(['name', 'description', 'tags']).optional(), limit: z.number().int().min(1).optional() },
        { title: 'Search stacks by query (name/description/tags)' },
        async ({ q, field, limit }: { q: string; field?: 'name' | 'description' | 'tags'; limit?: number }) => {
            const r = searchStacks({ q: q as string, field: field as ('name' | 'description' | 'tags') | undefined, limit: limit as number | undefined });
            return { content: [{ type: 'text' as const, text: JSON.stringify(r) }] };
        },
    );

    server.tool(
        'site_summary',
        {},
        { title: 'Return summary info about the site and stacks' },
        async () => {
            const r = siteSummary();
            return { content: [{ type: 'text' as const, text: JSON.stringify(r) }] };
        },
    );

    server.tool(
        'page_summary',
        { path: z.string(), excerptLength: z.number().int().min(20).optional() },
        { title: 'Return a short summary for a content page' },
        async ({ path: p, excerptLength }: { path: string; excerptLength?: number }) => {
            const r = pageSummary(p as string, excerptLength as number | undefined);
            return { content: [{ type: 'text' as const, text: JSON.stringify(r) }] };
        },
    );

    server.tool(
        'render_stack_markdown',
        { id: z.string() },
        { title: 'Render a markdown summary for a stack id' },
        async ({ id }: { id: string }) => {
            const md = renderStackMarkdown(id as string);
            return { content: [{ type: 'text' as const, text: md }] };
        },
    );
}, {}, {
    // mcp-handler's default streamableHttpEndpoint is "/mcp", derived from
    // basePath "". This route is mounted at /api/mcp, so without this the
    // handler's internal `url.pathname === streamableHttpEndpoint` check
    // never matches a real request and every call 404s inside the handler.
    basePath: '/api',
});

// Simple token-based auth wrapper using MCP_API_TOKEN
const verifyToken = async (req: Request, bearerToken?: string) => {
    if (!process.env.MCP_API_TOKEN) return undefined; // public if not set
    if (!bearerToken) return undefined;
    return bearerToken === process.env.MCP_API_TOKEN ? { token: bearerToken, scopes: ['mcp:invoke'], clientId: 'mcp' } : undefined;
};

const authHandler = withMcpAuth(handler, verifyToken, { required: !!process.env.MCP_API_TOKEN, requiredScopes: ['mcp:invoke'], resourceMetadataPath: '/.well-known/oauth-protected-resource' });

import { isRateLimited } from '@/lib/mcp/rateLimiter';

async function rateLimitGuard(req: Request) {
    const authHeader = req.headers.get('authorization') || '';
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length).trim() : undefined;
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const key = bearer || ip || 'anon';
    const res = isRateLimited(key, Number(process.env.MCP_RATE_LIMIT || 60), Number(process.env.MCP_RATE_WINDOW_MS || 60000));
    if (!res.ok) {
        return new Response(JSON.stringify({ error: 'Too Many Requests' }), { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': String(Math.ceil((res.reset - Date.now()) / 1000)) } });
    }
    return null;
}

export async function GET(request: Request) {
    const rl = await rateLimitGuard(request);
    if (rl) return rl;
    return await authHandler(request);
}

export async function POST(request: Request) {
    const rl = await rateLimitGuard(request);
    if (rl) return rl;
    return await authHandler(request);
}

export async function DELETE(request: Request) {
    const rl = await rateLimitGuard(request);
    if (rl) return rl;
    return await authHandler(request);
}
