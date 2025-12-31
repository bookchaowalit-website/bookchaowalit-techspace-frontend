import { NextResponse } from 'next/server';
import { getHealth } from '../../../../lib/mcp/controllers';

export async function GET(request: Request) {
    const res = getHealth(request);
    return NextResponse.json(res.body, { status: res.status, headers: res.headers });
}

export async function OPTIONS() {
    return new NextResponse(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' } });
}
