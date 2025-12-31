# MCP API (tech-space)

This repository exposes a minimal MCP-style API under `/api/mcp/` for discovery and consuming tech-stack data.

Endpoints

- GET /api/mcp/discovery
  - Returns server metadata and available endpoints.
- GET /api/mcp/schema
  - Returns a small OpenAPI-like JSON describing the API.
- GET /api/mcp/data/stacks
  - Returns the tech stacks. Query params: `category`, `status`, `limit`, `offset`.
- GET /api/mcp/health
  - Returns a health object with uptime and timestamp.

Authentication

- By default endpoints are public. To restrict access set `MCP_API_TOKEN` in environment, and clients must provide `Authorization: Bearer <token>`.

CORS

- CORS is enabled with `Access-Control-Allow-Origin: *` by default. Change in `src/lib/mcp/utils.ts` if you want to restrict origins.

Examples

- Discovery
  curl https://your-site.com/api/mcp/discovery

- Fetch stacks in "AI/ML" category
  curl "https://your-site.com/api/mcp/data/stacks?category=AI/ML&limit=20"

Client usage (TypeScript)

```ts
import { fetchDiscovery, fetchStacks } from '@/lib/mcp/client';

// fetch discovery from the same origin
const discovery = await fetchDiscovery();

// fetch the first 20 stacks in AI/ML category
const stacks = await fetchStacks({ category: 'AI/ML', limit: 20 });

// fetch from a remote MCP server (absolute base)
const remoteStacks = await fetchStacks({ baseUrl: 'https://example.com', limit: 10 });
```

Adapter usage (MCP tools)

This project also provides an MCP Server adapter at `/api/mcp` using `mcp-handler` and `zod`.

- Tools provided:
  - `roll_dice` — params: `{ sides: number }`
  - `list_stacks` — params: `{ category?: string, limit?: number, offset?: number }`
  - `get_stack` — params: `{ id: string }`

- Token auth: set `MCP_API_TOKEN` to require a Bearer token for tool invocation.

- Test locally with the MCP Inspector (Streamable HTTP):
  pnpm dlx @modelcontextprotocol/inspector@latest http://localhost:3000 undefined
  Connect to: http://localhost:3000/api/mcp
  If `MCP_API_TOKEN` is set, supply it when connecting.
