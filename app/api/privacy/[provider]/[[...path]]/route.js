const PROVIDER_TARGETS = {
  venice: 'https://api.venice.ai/api/v1',
  openrouter: 'https://openrouter.ai/api/v1',
};

const MAX_REQUEST_BYTES = 25 * 1024 * 1024;

const ALLOWED_PATHS = {
  venice: [
    /^models$/,
    /^image\/(?:generate|edit|multi-edit)$/,
    /^video\/(?:queue|retrieve)$/,
  ],
  openrouter: [
    /^images(?:\/models)?$/,
    /^videos(?:\/models)?$/,
    /^videos\/[^/]+$/,
    /^videos\/[^/]+\/content$/,
  ],
};

function isAllowedPath(provider, path) {
  return ALLOWED_PATHS[provider]?.some((pattern) => pattern.test(path)) || false;
}

async function proxyProviderRequest(request, context) {
  const { provider, path = [] } = await context.params;
  const target = PROVIDER_TARGETS[provider];
  if (!target) {
    return Response.json({ error: 'Unsupported provider' }, { status: 404 });
  }

  const segments = Array.isArray(path) ? path : [path];
  const rawPath = segments.filter(Boolean).join('/');
  if (!isAllowedPath(provider, rawPath)) {
    return Response.json({ error: 'Provider endpoint is not allowed by this proxy' }, { status: 404 });
  }

  const contentLength = Number.parseInt(request.headers.get('content-length') || '0', 10);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: 'Request body too large' }, { status: 413 });
  }

  const suffix = segments.filter(Boolean).map(encodeURIComponent).join('/');
  const upstreamUrl = `${target}/${suffix}${request.nextUrl.search}`;

  // Deliberately forward only the headers required by the provider. Cookies,
  // internal auth headers, and other browser metadata never leave the app.
  const headers = new Headers();
  const authorization = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');
  if (authorization) headers.set('authorization', authorization);
  if (contentType) headers.set('content-type', contentType);

  if (provider === 'openrouter') {
    const referer = request.headers.get('http-referer');
    const title = request.headers.get('x-title');
    if (referer) headers.set('http-referer', referer);
    if (title) headers.set('x-title', title);
  }

  const method = request.method.toUpperCase();
  const init = {
    method,
    headers,
    cache: 'no-store',
    redirect: 'follow',
  };

  if (method !== 'GET' && method !== 'HEAD') {
    const body = await request.arrayBuffer();
    if (body.byteLength > MAX_REQUEST_BYTES) {
      return Response.json({ error: 'Request body too large' }, { status: 413 });
    }
    init.body = body;
  }

  try {
    const upstream = await fetch(upstreamUrl, init);
    const responseHeaders = new Headers();
    const responseContentType = upstream.headers.get('content-type');
    if (responseContentType) responseHeaders.set('content-type', responseContentType);
    responseHeaders.set('cache-control', 'no-store');
    responseHeaders.set('x-content-type-options', 'nosniff');

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`[privacy-proxy] ${provider} request failed:`, error?.message || error);
    return Response.json({ error: 'Provider request failed' }, { status: 502 });
  }
}

export const GET = proxyProviderRequest;
export const POST = proxyProviderRequest;
