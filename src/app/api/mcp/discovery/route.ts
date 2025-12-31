import { NextResponse } from 'next/server';
import { getDiscovery, authGuard } from '../../../../lib/mcp/controllers';

export async function GET(request: Request) {
    const guarded = authGuard(request);
    if (guarded) return NextResponse.json(guarded.body, { status: guarded.status, headers: guarded.headers });
    const res = getDiscovery(request);
    return NextResponse.json(res.body, { status: res.status, headers: res.headers });
}

export async function OPTIONS() {
    return new NextResponse(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' } });
}
