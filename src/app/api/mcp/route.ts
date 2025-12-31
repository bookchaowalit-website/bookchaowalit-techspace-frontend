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
});

// Simple token-based auth wrapper using MCP_API_TOKEN
const verifyToken = async (req: Request, bearerToken?: string) => {
  if (!process.env.MCP_API_TOKEN) return undefined; // public if not set
  if (!bearerToken) return undefined;
  return bearerToken === process.env.MCP_API_TOKEN ? { token: bearerToken, scopes: ['mcp:invoke'] } : undefined;
};

const authHandler = withMcpAuth(handler, verifyToken, { required: !!process.env.MCP_API_TOKEN, requiredScopes: ['mcp:invoke'], resourceMetadataPath: '/.well-known/oauth-protected-resource' });

export { authHandler as GET, authHandler as POST, authHandler as DELETE };
