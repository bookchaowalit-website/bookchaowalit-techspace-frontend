import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Both ignore flags were on, silently, which is exactly how 10 real
  // `implicit any` TypeScript errors (see PRODUCT.md / git history)
  // accumulated in app/api/mcp/route.ts without `next build` ever
  // failing. Now that those are fixed, removed — a real regression
  // should fail the build again, not slip through quietly.
  // /api/mcp is called cross-origin from bookchaowalit-devhub-frontend's
  // Playground. Without this, the browser blocks reading the response
  // even though the route itself works — see devhub's PRODUCT.md.
  async headers() {
    return [
      {
        source: '/api/mcp',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
