const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function makeStorage(initial = {}) {
    const values = new Map(Object.entries(initial));
    return {
        getItem(key) {
            return values.has(key) ? values.get(key) : null;
        },
        setItem(key, value) {
            values.set(key, String(value));
        },
        removeItem(key) {
            values.delete(key);
        },
    };
}

async function importSource(relativePath) {
    const source = fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
    const encoded = Buffer.from(source).toString('base64');
    return import(`data:text/javascript;base64,${encoded}#${Date.now()}-${Math.random()}`);
}

async function withBrowserGlobals(keys, fn) {
    const previous = {
        window: global.window,
        fetch: global.fetch,
        FileReader: global.FileReader,
    };
    const storage = makeStorage(keys);
    global.window = {
        localStorage: storage,
        location: {
            protocol: 'file:',
            origin: 'null',
        },
    };

    try {
        return await fn(storage);
    } finally {
        if (previous.window === undefined) delete global.window;
        else global.window = previous.window;
        global.fetch = previous.fetch;
        if (previous.FileReader === undefined) delete global.FileReader;
        else global.FileReader = previous.FileReader;
    }
}

function jsonResponse(value, init = {}) {
    return new Response(JSON.stringify(value), {
        status: init.status || 200,
        statusText: init.statusText || 'OK',
        headers: { 'content-type': 'application/json', ...(init.headers || {}) },
    });
}

test('OpenRouter T2I sends capability-aware payload and normalizes base64 output', async () => {
    await withBrowserGlobals({ openrouter_api_key: 'or-test-key' }, async () => {
        const calls = [];
        global.fetch = async (url, init = {}) => {
            calls.push({ url: String(url), init });
            return jsonResponse({
                id: 'image-job',
                data: [{ b64_json: 'YWJj', media_type: 'image/png' }],
            });
        };

        const { privacyApi } = await importSource('packages/studio/src/privacyApi.js');
        const result = await privacyApi.generateImage({
            model: 'privacy:openrouter:bytedance-seed/seedream-4.5',
            prompt: 'a test image',
            aspect_ratio: '16:9',
            resolution: '2K',
            seed: 42,
        });

        assert.equal(calls.length, 1);
        assert.equal(calls[0].url, 'https://openrouter.ai/api/v1/images');
        assert.equal(calls[0].init.method, 'POST');
        assert.equal(calls[0].init.headers.Authorization, 'Bearer or-test-key');
        assert.deepEqual(JSON.parse(calls[0].init.body), {
            model: 'bytedance-seed/seedream-4.5',
            prompt: 'a test image',
            aspect_ratio: '16:9',
            resolution: '2K',
            seed: 42,
        });
        assert.equal(result.url, 'data:image/png;base64,YWJj');
        assert.equal(result.id, 'image-job');
    });
});

test('OpenRouter I2I encodes data-URL references and enforces the model reference cap', async () => {
    await withBrowserGlobals({ openrouter_api_key: 'or-test-key' }, async () => {
        let capturedPayload;
        global.fetch = async (_url, init = {}) => {
            capturedPayload = JSON.parse(init.body);
            return jsonResponse({ data: [{ b64_json: 'ZWRpdA==', media_type: 'image/png' }] });
        };

        const { privacyApi } = await importSource('packages/studio/src/privacyApi.js');
        const references = Array.from(
            { length: 16 },
            (_, index) => `data:image/png;base64,cmVm${index}`,
        );
        await privacyApi.generateI2I({
            model: 'privacy:openrouter:bytedance-seed/seedream-4.5-edit',
            prompt: 'edit the references',
            images_list: references,
            aspect_ratio: '1:1',
        });

        assert.equal(capturedPayload.model, 'bytedance-seed/seedream-4.5');
        assert.equal(capturedPayload.input_references.length, 14);
        assert.deepEqual(capturedPayload.input_references[0], {
            type: 'image_url',
            image_url: { url: references[0] },
        });
        assert.equal(capturedPayload.input_references[13].image_url.url, references[13]);
    });
});

test('Venice multi-edit uses modelId, strips data-URL prefixes, and normalizes binary output', async () => {
    await withBrowserGlobals({ venice_api_key: 'venice-test-key' }, async () => {
        class TestFileReader {
            readAsDataURL(blob) {
                blob.arrayBuffer().then((buffer) => {
                    this.result = `data:${blob.type || 'application/octet-stream'};base64,${Buffer.from(buffer).toString('base64')}`;
                    this.onload?.();
                }, (error) => {
                    this.error = error;
                    this.onerror?.();
                });
            }
        }
        global.FileReader = TestFileReader;

        const calls = [];
        global.fetch = async (url, init = {}) => {
            calls.push({ url: String(url), init });
            return new Response(Buffer.from('png-bytes'), {
                status: 200,
                headers: { 'content-type': 'image/png' },
            });
        };

        const { privacyApi } = await importSource('packages/studio/src/privacyApi.js');
        const result = await privacyApi.generateI2I({
            model: 'privacy:venice:nano-banana-pro-edit',
            prompt: 'combine these references',
            images_list: [
                'data:image/png;base64,QUFB',
                'data:image/jpeg;base64,QkJC',
            ],
            aspect_ratio: '16:9',
            resolution: '2K',
        });

        assert.equal(calls[0].url, 'https://api.venice.ai/api/v1/image/multi-edit');
        const payload = JSON.parse(calls[0].init.body);
        assert.equal(payload.modelId, 'nano-banana-pro-edit');
        assert.deepEqual(payload.images, ['QUFB', 'QkJC']);
        assert.equal(payload.output_format, 'png');
        assert.equal(payload.aspect_ratio, '16:9');
        assert.equal(payload.resolution, '2K');
        assert.match(result.url, /^data:image\/png;base64,/);
    });
});

test('OpenRouter T2V polls status then downloads completed video through authenticated content endpoint', async () => {
    await withBrowserGlobals({ openrouter_api_key: 'or-video-key' }, async () => {
        const calls = [];
        global.fetch = async (url, init = {}) => {
            calls.push({ url: String(url), init });
            if (calls.length === 1) return jsonResponse({ id: 'video-job-123', status: 'queued' });
            if (calls.length === 2) {
                return jsonResponse({
                    id: 'video-job-123',
                    status: 'completed',
                    unsigned_urls: ['https://openrouter.ai/api/v1/videos/video-job-123/content?index=0'],
                });
            }
            return new Response(Buffer.from('video-bytes'), {
                status: 200,
                headers: { 'content-type': 'video/mp4' },
            });
        };

        const { privacyVideoApi } = await importSource('packages/studio/src/privacyVideoApi.js');
        let syntheticId;
        const result = await privacyVideoApi.generateVideo({
            model: 'privacy-video:openrouter:bytedance/seedance-2.0-fast',
            prompt: 'a moving test scene',
            duration: 5,
            resolution: '720p',
            aspect_ratio: '16:9',
            onRequestId: (value) => { syntheticId = value; },
        });

        assert.equal(calls.length, 3);
        assert.equal(calls[0].url, 'https://openrouter.ai/api/v1/videos');
        assert.equal(calls[1].url, 'https://openrouter.ai/api/v1/videos/video-job-123');
        assert.equal(calls[2].url, 'https://openrouter.ai/api/v1/videos/video-job-123/content?index=0');
        assert.equal(calls[2].init.headers.Authorization, 'Bearer or-video-key');
        assert.match(syntheticId, /^privacy-video-job:openrouter:/);
        assert.match(result.url, /^blob:/);
        assert.notEqual(result.url, 'https://openrouter.ai/api/v1/videos/video-job-123/content?index=0');
    });
});

test('OpenRouter T2V surfaces provider terminal failures without attempting content download', async () => {
    await withBrowserGlobals({ openrouter_api_key: 'or-video-key' }, async () => {
        let calls = 0;
        global.fetch = async () => {
            calls += 1;
            if (calls === 1) return jsonResponse({ id: 'failed-job', status: 'queued' });
            return jsonResponse({ status: 'failed', error: 'provider rejected the request' });
        };

        const { privacyVideoApi } = await importSource('packages/studio/src/privacyVideoApi.js');
        await assert.rejects(
            privacyVideoApi.generateVideo({
                model: 'privacy-video:openrouter:bytedance/seedance-2.0-fast',
                prompt: 'a failing test scene',
            }),
            /failed: provider rejected the request/,
        );
        assert.equal(calls, 2);
    });
});

test('Venice I2V keeps the local data URL in the queue payload and uses queue-time download URL', async () => {
    await withBrowserGlobals({ venice_api_key: 'venice-video-key' }, async () => {
        const calls = [];
        global.fetch = async (url, init = {}) => {
            calls.push({ url: String(url), init });
            if (calls.length === 1) {
                return jsonResponse({
                    queue_id: 'venice-job',
                    model: 'seedance-2-0-fast-image-to-video',
                    download_url: 'https://download.example/video.mp4',
                });
            }
            return jsonResponse({ status: 'COMPLETED' });
        };

        const { privacyVideoApi } = await importSource('packages/studio/src/privacyVideoApi.js');
        const imageUrl = 'data:image/png;base64,c3RhcnQtZnJhbWU=';
        const result = await privacyVideoApi.generateI2V({
            model: 'privacy-video:venice:seedance-2-0-fast-image-to-video',
            prompt: 'animate the frame',
            image_url: imageUrl,
            duration: 5,
            resolution: '720p',
            aspect_ratio: '16:9',
        });

        assert.equal(calls[0].url, 'https://api.venice.ai/api/v1/video/queue');
        assert.equal(calls[1].url, 'https://api.venice.ai/api/v1/video/retrieve');
        const queued = JSON.parse(calls[0].init.body);
        assert.equal(queued.image_url, imageUrl);
        assert.equal(queued.duration, '5s');
        assert.equal(queued.model, 'seedance-2-0-fast-image-to-video');
        assert.equal(result.url, 'https://download.example/video.mp4');
    });
});
