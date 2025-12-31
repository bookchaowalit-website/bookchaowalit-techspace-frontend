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
