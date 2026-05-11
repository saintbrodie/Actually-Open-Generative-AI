import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        proxy: {
            '/api/venice': {
                target: 'https://api.venice.ai/api/v1',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api\/venice/, '')
            },
            '/api/openrouter': {
                target: 'https://openrouter.ai/api/v1',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api\/openrouter/, '')
            }
        }
    }
});
