Rate limiter design notes

- Purpose: lightweight sliding-window rate limiter to protect MCP endpoints from abuse.
- Strategy: sliding window per-key (where key = Bearer token if present, otherwise client IP)
- Defaults: limit = 60 requests / 60s (configurable with env vars `MCP_RATE_LIMIT` and `MCP_RATE_WINDOW_MS`)

Vercel-specific deployment notes (what to configure in Vercel dashboard)

- Set `MCP_RATE_LIMIT` and `MCP_RATE_WINDOW_MS` as environment variables in Vercel if you want to change default behavior.
- If you need global, highly available rate limiting across instances, use Vercel KV or Redis (Upstash) and implement a store-backed limiter instead of the in-memory default.
- Use Vercel Firewall and WAF rules for additional filtering and protection against exploit signatures.
