const PROVIDER_BASES = [
    {
        provider: 'venice',
        origin: 'https://api.venice.ai',
        basePath: '/api/v1',
    },
    {
        provider: 'openrouter',
        origin: 'https://openrouter.ai',
        basePath: '/api/v1',
    },
];

let installed = false;

function providerRoute(input) {
    let url;
    try {
        const raw = typeof input === 'string' || input instanceof URL
            ? input
            : input?.url;
        if (!raw) return null;
        url = new URL(raw);
    } catch {
        return null;
    }

    const match = PROVIDER_BASES.find(({ origin, basePath }) =>
        url.origin === origin &&
        (url.pathname === basePath || url.pathname.startsWith(`${basePath}/`))
    );
    if (!match) return null;

    const path = url.pathname.slice(match.basePath.length) || '/';
    return {
        provider: match.provider,
        path: `${path}${url.search}`,
    };
}

function normalizeHeaders(headers) {
    if (!headers) return {};
    return Object.fromEntries(new Headers(headers).entries());
}

function responseBody(value) {
    if (value == null) return null;
    if (value instanceof ArrayBuffer) return value;
    if (ArrayBuffer.isView(value)) {
        return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    }
    if (value?.type === 'Buffer' && Array.isArray(value.data)) {
        return Uint8Array.from(value.data);
    }
    if (Array.isArray(value)) return Uint8Array.from(value);
    return value;
}

/**
 * Electron keeps webSecurity enabled, so file:// renderer requests should not
 * depend on provider CORS behavior. The preload bridge exposes a deliberately
 * narrow IPC request API; the main process independently validates the provider,
 * endpoint, method, headers, and body size before performing the network call.
 *
 * Hosted/Vite-dev traffic is unaffected because those adapters use same-origin
 * /api/privacy or Vite proxy URLs rather than the provider origins below.
 */
export function installProviderFetchBridge() {
    if (installed || typeof window === 'undefined') return false;
    if (!window.providerAPI?.isElectron || typeof window.providerAPI.request !== 'function') {
        return false;
    }

    const originalFetch = globalThis.fetch.bind(globalThis);
    globalThis.fetch = async (input, init = {}) => {
        const route = providerRoute(input);
        if (!route) return originalFetch(input, init);

        const method = String(init.method || input?.method || 'GET').toUpperCase();
        if (!['GET', 'POST'].includes(method)) {
            throw new Error(`Unsupported provider request method: ${method}`);
        }

        const result = await window.providerAPI.request({
            provider: route.provider,
            path: route.path,
            method,
            headers: normalizeHeaders(init.headers || input?.headers),
            body: init.body == null ? null : String(init.body),
        });

        return new Response(responseBody(result?.body), {
            status: result?.status || 500,
            statusText: result?.statusText || '',
            headers: result?.headers || {},
        });
    };

    installed = true;
    return true;
}
