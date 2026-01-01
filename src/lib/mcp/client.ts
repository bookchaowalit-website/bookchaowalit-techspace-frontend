export type Discovery = {
    name: string;
    version: string;
    description?: string;
    endpoints: string[];
};

export type StackPage = {
    total: number;
    limit: number;
    offset: number;
    items: Array<Record<string, unknown>>;
};

export type SchemaDocument = Record<string, unknown>;

function buildUrl(path: string, base?: string) {
    if (!base) return path; // relative
    return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

function buildQuery(params: Record<string, string | number | undefined>) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null && String(v) !== '') q.set(k, String(v));
    }
    const s = q.toString();
    return s ? `?${s}` : '';
}

export async function fetchDiscovery(baseUrl?: string, token?: string): Promise<Discovery> {
    const url = buildUrl('/api/mcp/discovery', baseUrl);
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Failed to fetch discovery: ${res.status} ${res.statusText}`);
    return (await res.json()) as Discovery;
}

export async function fetchSchema(baseUrl?: string, token?: string): Promise<SchemaDocument> {
    const url = buildUrl('/api/mcp/schema', baseUrl);
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Failed to fetch schema: ${res.status} ${res.statusText}`);
    return (await res.json()) as SchemaDocument;
}

export async function fetchStacks(
    opts?: { baseUrl?: string; token?: string; category?: string; status?: string; limit?: number; offset?: number }
): Promise<StackPage> {
    const { baseUrl, token, category, status, limit, offset } = opts || {};
    const q = buildQuery({ category, status, limit, offset });
    const url = buildUrl(`/api/mcp/data/stacks${q}`, baseUrl);
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Failed to fetch stacks: ${res.status} ${res.statusText}`);
    return (await res.json()) as StackPage;
}
