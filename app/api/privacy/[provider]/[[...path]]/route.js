const PROVIDER_TARGETS = {
  venice: 'https://api.venice.ai/api/v1',
  openrouter: 'https://openrouter.ai/api/v1',
};

async function proxyProviderRequest(request, context) {
  const { provider, path = [] } = await context.params;
  const target = PROVIDER_TARGETS[provider];
  if (!target) {
    return Response.json({ error: 'Unsupported provider' }, { status: 404 });
  }

  const segments = Array.isArray(path) ? path : [path];
  const suffix = segments.filter(Boolean).map(encodeURIComponent).join('/');
  const upstreamUrl = `${target}${suffix ? `/${suffix}` : ''}${request.nextUrl.search}`;

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
    init.body = await request.arrayBuffer();
  }

  try {
    const upstream = await fetch(upstreamUrl, init);
    const responseHeaders = new Headers();
    const responseContentType = upstream.headers.get('content-type');
    if (responseContentType) responseHeaders.set('content-type', responseContentType);
    responseHeaders.set('cache-control', 'no-store');

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
