Vercel deployment & runtime configuration for MCP server

This file lists Vercel-specific configuration and runtime steps that you should apply on the Vercel side (dashboard or CLI). Keep these separate from your repository code to avoid confusion.

Recommended Environment Variables (set in Vercel project > Settings > Environment Variables):
- MCP_API_TOKEN: (optional) a bearer token required to call tools.
- MCP_RATE_LIMIT: number of requests allowed per window (default 60)
- MCP_RATE_WINDOW_MS: window in milliseconds (default 60000)
- ENABLE_VERCEL_KV: set to `1` if you wire up Vercel KV for global rate limiting or caching (optional)

Vercel dashboard protections (recommended):
- Enable "Standard Protection" on preview deployments to avoid exposing previews to the public.
- Configure Vercel Firewall rules to block abusive traffic patterns.
- Use the Security Actions dashboard to monitor potential vulnerabilities and apply fixes.

Secrets rotation & post-exposure steps:
1. If a vulnerability or potential exposure occurred, rotate `MCP_API_TOKEN` immediately.
2. Re-deploy with the new token.
3. Invalidate any caches if needed.

Optional managed services (integration examples):
- Vercel KV / Upstash Redis for a global rate limiter and caching.
- Managed vector DB (e.g., Redis Vector, Pinecone) for embeddings and RAG if you implement a semantic pipeline.

Notes:
- Do not add secrets directly into source files. Keep them in Vercel env vars.
- The repository already contains the in-memory rate limiter as a safe fallback for single-instance testing. For production, prefer a KV-backed limiter.
