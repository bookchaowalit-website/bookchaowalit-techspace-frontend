import { z } from 'zod';
import { createMcpHandler, withMcpAuth } from 'mcp-handler';
import { rollDice, listStacks, getStack } from '@/lib/mcp/tools';

const handler = createMcpHandler((server) => {
  server.tool(
    'roll_dice',
    'Rolls an N-sided die',
    { sides: z.number().int().min(2) },
    async ({ sides }) => {
      return rollDice(sides as number);
    },
  );

  server.tool(
    'list_stacks',
    'List tech stacks (supports category)',
    { category: z.string().optional(), limit: z.number().int().min(1).optional(), offset: z.number().int().min(0).optional() },
    async ({ category, limit, offset }) => {
      return { content: [{ type: 'json', json: listStacks({ category, limit, offset }) }] };
    },
  );

  server.tool(
    'get_stack',
    'Get a single tech stack by id',
    { id: z.string() },
    async ({ id }) => {
      const s = getStack(id as string);
      return { content: [{ type: 'json', json: s }] };
    },
  );

  server.tool(
    'search_stacks',
    'Search stacks by query (name/description/tags)',
    { q: z.string().min(1), field: z.enum(['name','description','tags']).optional(), limit: z.number().int().min(1).optional() },
    async ({ q, field, limit }) => {
      const r = (await import('@/lib/mcp/tools')).searchStacks({ q: q as string, field: field as any, limit: limit as any });
      return { content: [{ type: 'json', json: r }] };
    },
  );

  server.tool(
    'site_summary',
    'Return summary info about the site and stacks',
    {},
    async () => {
      const r = (await import('@/lib/mcp/tools')).siteSummary();
      return { content: [{ type: 'json', json: r }] };
    },
  );

  server.tool(
    'page_summary',
    'Return a short summary for a content page',
    { path: z.string(), excerptLength: z.number().int().min(20).optional() },
    async ({ path: p, excerptLength }) => {
      const r = (await import('@/lib/mcp/tools')).pageSummary(p as string, excerptLength as any);
      return { content: [{ type: 'json', json: r }] };
    },
  );

  server.tool(
    'render_stack_markdown',
    'Render a markdown summary for a stack id',
    { id: z.string() },
    async ({ id }) => {
      const md = (await import('@/lib/mcp/tools')).renderStackMarkdown(id as string);
      return { content: [{ type: 'text', text: md }] };
    },
  );
});

// Simple token-based auth wrapper using MCP_API_TOKEN
const verifyToken = async (req: Request, bearerToken?: string) => {
  if (!process.env.MCP_API_TOKEN) return undefined; // public if not set
  if (!bearerToken) return undefined;
  return bearerToken === process.env.MCP_API_TOKEN ? { token: bearerToken, scopes: ['mcp:invoke'] } : undefined;
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
  return await (authHandler as any).GET(request);
}

export async function POST(request: Request) {
  const rl = await rateLimitGuard(request);
  if (rl) return rl;
  return await (authHandler as any).POST(request);
}

export async function DELETE(request: Request) {
  const rl = await rateLimitGuard(request);
  if (rl) return rl;
  return await (authHandler as any).DELETE(request);
}
