import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        proxy: {
            '/api/privacy/venice': {
                target: 'https://api.venice.ai/api/v1',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api\/privacy\/venice/, '')
            },
            '/api/privacy/openrouter': {
                target: 'https://openrouter.ai/api/v1',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api\/privacy\/openrouter/, '')
            },
            // Upstream compatibility API.
            '/api': {
                target: 'https://api.muapi.ai',
                changeOrigin: true,
                secure: true
            }
        }
    }
});
