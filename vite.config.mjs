import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        proxy: {
            // Upstream compatibility API.
            '/api/venice': {
                target: 'https://api.venice.ai/api/v1',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api\/venice/, '')
            },
            '/api/openrouter': {
                target: 'https://openrouter.ai/api/v1',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api\/openrouter/, '')
            },
            '/api': {
                target: 'https://api.muapi.ai',
                changeOrigin: true,
                secure: true
            }
        }
    }
});
