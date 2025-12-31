export const mcpOpenApi = {
    openapi: '3.0.0',
    info: {
        title: 'Tech Space MCP API',
        version: '1.0.0',
        description: 'Minimal MCP endpoints exposing tech stack data for consumption by MCP clients',
    },
    paths: {
        '/api/mcp/discovery': {
            get: { summary: 'Discovery', responses: { '200': { description: 'Server metadata' } } },
        },
        '/api/mcp/schema': {
            get: { summary: 'OpenAPI schema', responses: { '200': { description: 'This OpenAPI document' } } },
        },
        '/api/mcp/data/stacks': {
            get: {
                summary: 'List tech stacks',
                parameters: [
                    { name: 'category', in: 'query', schema: { type: 'string' } },
                    { name: 'status', in: 'query', schema: { type: 'string' } },
                    { name: 'limit', in: 'query', schema: { type: 'integer' } },
                    { name: 'offset', in: 'query', schema: { type: 'integer' } },
                ],
                responses: { '200': { description: 'Array of tech stack items' } },
            },
        },
        '/api/mcp/health': {
            get: { summary: 'Health check', responses: { '200': { description: 'Service health' } } },
        },
    },
};
