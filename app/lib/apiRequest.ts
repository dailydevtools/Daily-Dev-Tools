export type RequestPayload = {
    method: string;
    url: string;
    headers?: Record<string, string>;
    query?: Record<string, string>;
    body?: BodyInit;
    signal?: AbortSignal;
};

export type RequestResult = {
    status: number;
    ok: boolean;
    durationMs: number;
    size: string;
    headers: Record<string, string>;
    raw: string;
    contentType: string;
};

// Helper to format bytes
function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function runApiRequest(payload: RequestPayload): Promise<RequestResult> {
    const started = performance.now();

    // Construct URL with query parameters
    const query = new URLSearchParams(
        Object.entries(payload.query ?? {}).filter(([, value]) => value !== '')
    );
    const target = query.size ? `${payload.url}?${query.toString()}` : payload.url;

    try {
        const response = await fetch(target, {
            method: payload.method,
            headers: payload.headers,
            body: payload.body ? payload.body : undefined,
            signal: payload.signal,
        });

        const raw = await response.text();
        const durationMs = performance.now() - started;
        const headers: Record<string, string> = {};
        response.headers.forEach((val, key) => {
            headers[key] = val;
        });
        const contentType = response.headers.get('content-type') ?? '';
        const bytes = new TextEncoder().encode(raw).byteLength;

        return {
            status: response.status,
            ok: response.ok,
            durationMs,
            size: formatBytes(bytes),
            headers,
            raw,
            contentType,
        };
    } catch (error: any) {
        // Handle fetch errors (network issues, etc.)
        const durationMs = performance.now() - started;
        return {
            status: 0,
            ok: false,
            durationMs,
            size: '0 Bytes',
            headers: {},
            raw: error.message || 'Network Error',
            contentType: 'text/plain',
        }
    }
}

type SnippetInput = {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: string;
};

export function buildCurlSnippet(input: SnippetInput) {
    const headers = Object.entries(input.headers)
        .map(([k, v]) => `-H '${k}: ${v}'`)
        .join(' ');
    const body = input.body ? `--data '${input.body.replace(/'/g, "'\\''")}'` : '';
    return `curl -X ${input.method.toUpperCase()} '${input.url}' ${headers} ${body}`.trim();
}

export function buildFetchSnippet(input: SnippetInput) {
    return `fetch('${input.url}', {\n  method: '${input.method.toUpperCase()}',\n  headers: ${JSON.stringify(input.headers, null, 2)},\n  body: ${input.body ? JSON.stringify(input.body) : 'undefined'}\n});`;
}

export function buildAxiosSnippet(input: SnippetInput) {
    return `axios({\n  method: '${input.method}',\n  url: '${input.url}',\n  headers: ${JSON.stringify(input.headers, null, 2)},\n  data: ${input.body ? JSON.stringify(input.body) : 'undefined'}\n});`;
}
