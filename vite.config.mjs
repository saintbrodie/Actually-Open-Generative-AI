import { defineConfig } from 'vite';

const ALLOWED_PROVIDER_PATHS = {
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

function providerProxy(provider, prefix, target) {
    return {
        target,
        changeOrigin: true,
        secure: true,
        bypass(req) {
            const parsed = new URL(req.url || '/', 'http://localhost');
            const providerPath = parsed.pathname.startsWith(prefix)
                ? parsed.pathname.slice(prefix.length) || '/'
                : parsed.pathname;
            const allowed = ALLOWED_PROVIDER_PATHS[provider]?.some((pattern) =>
                pattern.test(providerPath)
            );
            return allowed ? undefined : false;
        },
        rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
    };
}

export default defineConfig({
    base: './',
    server: {
        proxy: {
            '/api/privacy/venice': providerProxy(
                'venice',
                '/api/privacy/venice',
                'https://api.venice.ai/api/v1'
            ),
            '/api/privacy/openrouter': providerProxy(
                'openrouter',
                '/api/privacy/openrouter',
                'https://openrouter.ai/api/v1'
            ),
            // Upstream compatibility API.
            '/api': {
                target: 'https://api.muapi.ai',
                changeOrigin: true,
                secure: true
            }
        }
    }
});
