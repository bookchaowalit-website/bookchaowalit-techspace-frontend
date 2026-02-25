import { NextRequest, NextResponse } from 'next/server';
import { techStacks, categories, statuses, experienceLevels } from '@/data/tech-stacks';

export async function POST(request: NextRequest) {
  let requestId: number | string = 0;

  try {
    const body = await request.json();
    const { method, params } = body;

    let result;

    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {}
          },
          serverInfo: {
            name: 'Tech Space API',
            version: '1.0.0',
            description: 'Technology stacks and development platforms directory'
          }
        };
        break;

      case 'tools/list':
        result = {
          tools: [
            {
              name: 'get_tech_stacks',
              description: 'Get all technology stacks with filtering options',
              inputSchema: {
                type: 'object',
                properties: {
                  category: {
                    type: 'string',
                    enum: [...categories],
                    description: 'Filter by category'
                  },
                  status: {
                    type: 'string',
                    enum: [...statuses],
                    description: 'Filter by status'
                  },
                  experienceLevel: {
                    type: 'string',
                    enum: [...experienceLevels],
                    description: 'Filter by experience level'
                  }
                }
              }
            },
            {
              name: 'get_tech_stack_by_id',
              description: 'Get a specific technology stack by ID',
              inputSchema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'Technology stack ID'
                  }
                },
                required: ['id']
              }
            },
            {
              name: 'search_tech_stacks',
              description: 'Search technology stacks by name or description',
              inputSchema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'Search query'
                  }
                },
                required: ['query']
              }
            },
            {
              name: 'get_categories',
              description: 'Get all available categories',
              inputSchema: {
                type: 'object',
                properties: {}
              }
            },
            {
              name: 'get_statuses',
              description: 'Get all available statuses',
              inputSchema: {
                type: 'object',
                properties: {}
              }
            }
          ]
        };
        break;

      case 'tools/call':
        const toolName = params?.name;

        switch (toolName) {
          case 'get_tech_stacks':
            const category = params?.arguments?.category;
            const status = params?.arguments?.status;
            const experienceLevel = params?.arguments?.experienceLevel;

            let filteredStacks = techStacks;
            if (category) filteredStacks = filteredStacks.filter(s => s.category === category);
            if (status) filteredStacks = filteredStacks.filter(s => s.status === status);
            if (experienceLevel) filteredStacks = filteredStacks.filter(s => s.experience === experienceLevel);

            result = filteredStacks;
            break;

          case 'get_tech_stack_by_id':
            const id = params?.arguments?.id;
            result = techStacks.find(s => s.id === id) || null;
            break;

          case 'search_tech_stacks':
            const query = params?.arguments?.query?.toLowerCase() || '';
            result = techStacks.filter(s =>
              s.name.toLowerCase().includes(query) ||
              s.description?.toLowerCase().includes(query)
            );
            break;

          case 'get_categories':
            result = categories;
            break;

          case 'get_statuses':
            result = statuses;
            break;

          default:
            throw new Error(`Unknown tool: ${toolName}`);
        }
        break;

      default:
        throw new Error(`Unknown method: ${method}`);
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id: requestId,
      result
    });

  } catch (error) {
    return NextResponse.json({
      jsonrpc: '2.0',
      id: requestId || 1,
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : 'Unknown error',
        data: error
      }
    }, { status: 500 });
  }
}
