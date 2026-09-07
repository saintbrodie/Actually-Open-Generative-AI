const { ipcMain } = require('electron');

const PROVIDER_TARGETS = {
    venice: 'https://api.venice.ai/api/v1',
    openrouter: 'https://openrouter.ai/api/v1',
};

const MAX_REQUEST_BYTES = 50 * 1024 * 1024;

const ALLOWED_PATHS = {
    venice: [
        /^\/models$/,
        /^\/image\/(?:generate|edit|multi-edit)$/,
        /^\/video\/(?:queue|retrieve)$/,
    ],
    openrouter: [
        /^\/images(?:\/models)?$/,
        /^\/videos(?:\/models)?$/,
        /^\/videos\/[^/]+$/,
        /^\/videos\/[^/]+\/content$/,
    ],
};

function validatePath(provider, rawPath) {
    if (!PROVIDER_TARGETS[provider]) throw new Error('Unsupported provider');
    const url = new URL(rawPath, 'https://local.invalid');
    if (!ALLOWED_PATHS[provider]?.some((pattern) => pattern.test(url.pathname))) {
        throw new Error('Provider endpoint is not allowed');
    }
    return `${url.pathname}${url.search}`;
}

function validHttpReferer(value) {
    if (!value) return null;
    try {
        const url = new URL(String(value));
        return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
    } catch {
        return null;
    }
}

function filteredHeaders(provider, input = {}) {
    const normalized = Object.fromEntries(
        Object.entries(input).map(([key, value]) => [String(key).toLowerCase(), value])
    );
    const headers = {};
    for (const key of ['authorization', 'content-type']) {
        if (normalized[key]) headers[key] = String(normalized[key]);
    }
    if (provider === 'openrouter') {
        const referer = validHttpReferer(normalized['http-referer']);
        if (referer) headers['http-referer'] = referer;
        if (normalized['x-title']) headers['x-title'] = String(normalized['x-title']);
    }
    return headers;
}

function prepareProviderRequest(request = {}) {
    const provider = request.provider;
    const path = validatePath(provider, request.path || '/');
    const method = String(request.method || 'GET').toUpperCase();
    if (!['GET', 'POST'].includes(method)) throw new Error('Unsupported provider request method');

    const body = request.body == null ? null : String(request.body);
    if (body && Buffer.byteLength(body, 'utf8') > MAX_REQUEST_BYTES) {
        throw new Error('Provider request body is too large');
    }

    return {
        url: `${PROVIDER_TARGETS[provider]}${path}`,
        init: {
            method,
            headers: filteredHeaders(provider, request.headers),
            body: method === 'POST' ? body : undefined,
            redirect: 'follow',
            cache: 'no-store',
        },
    };
}

function register() {
    ipcMain.handle('provider-api:request', async (_event, request = {}) => {
        const { url, init } = prepareProviderRequest(request);
        const response = await fetch(url, init);

        // Returning raw bytes through structured clone keeps JSON, images, and
        // video on one transport without teaching the main process provider-
        // specific response schemas.
        const bytes = Buffer.from(await response.arrayBuffer());
        return {
            status: response.status,
            statusText: response.statusText,
            headers: {
                'content-type': response.headers.get('content-type') || 'application/octet-stream',
                'cache-control': 'no-store',
            },
            body: bytes,
        };
    });
}

module.exports = {
    register,
    validatePath,
    validHttpReferer,
    filteredHeaders,
    prepareProviderRequest,
    MAX_REQUEST_BYTES,
};
