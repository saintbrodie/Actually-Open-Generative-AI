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
    const previousWindow = global.window;
    const previousFetch = global.fetch;
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
        if (previousWindow === undefined) delete global.window;
        else global.window = previousWindow;
        global.fetch = previousFetch;
    }
}

function jsonResponse(value) {
    return new Response(JSON.stringify(value), {
        status: 200,
        headers: { 'content-type': 'application/json' },
    });
}

test('image discovery normalizes OpenRouter references and conservatively filters Venice edit IDs', async () => {
    const {
        normalizeOpenRouterImageModel,
        normalizeOpenRouterEditModel,
        normalizeVeniceImageModel,
    } = await importSource('packages/studio/src/privacyApi.js');

    const providerModel = {
        id: 'google/gemini-image-next',
        name: 'Gemini Image Next',
        supported_parameters: {
            aspect_ratio: { type: 'enum', values: ['1:1', '16:9'] },
            resolution: { type: 'enum', values: ['1K', '2K'] },
            input_references: { type: 'range', min: 0, max: 4 },
        },
    };

    const t2i = normalizeOpenRouterImageModel(providerModel);
    const i2i = normalizeOpenRouterEditModel(providerModel);
    assert.equal(t2i.id, 'privacy:openrouter:google/gemini-image-next');
    assert.equal(t2i.rawId, 'google/gemini-image-next');
    assert.equal(i2i.id, 'privacy:openrouter:google/gemini-image-next-edit');
    assert.equal(i2i.rawId, 'google/gemini-image-next');
    assert.equal(i2i.mode, 'i2i');
    assert.equal(i2i.maxImages, 4);
    assert.equal(i2i.supportedParameters.input_references.min, 1);

    const noReferences = normalizeOpenRouterEditModel({
        id: 'provider/text-only-image',
        supported_parameters: { aspect_ratio: { type: 'enum', values: ['1:1'] } },
    });
    assert.equal(noReferences, null);

    const venice = normalizeVeniceImageModel({
        id: 'flux-2-pro',
        type: 'image',
        model_spec: { name: 'Flux 2 Pro' },
    });
    assert.equal(venice.id, 'privacy:venice:flux-2-pro');
    assert.equal(venice.mode, 't2i');

    assert.equal(normalizeVeniceImageModel({
        id: 'future-image-edit',
        type: 'image',
        model_spec: { name: 'Future Edit' },
    }), null);
});

test('image discovery refresh caches safe provider models and bootstrap preserves fallbacks', async () => {
    await withBrowserGlobals(
        { venice_api_key: 'venice-image-key', openrouter_api_key: 'or-image-key' },
        async (storage) => {
            const calls = [];
            global.fetch = async (url) => {
                calls.push(String(url));
                if (String(url).includes('api.venice.ai')) {
                    return jsonResponse({
                        data: [
                            {
                                id: 'flux-2-pro',
                                type: 'image',
                                model_spec: { name: 'Flux 2 Pro' },
                            },
                            {
                                id: 'unknown-provider-edit',
                                type: 'image',
                                model_spec: { name: 'Unknown Provider Edit' },
                            },
                        ],
                    });
                }
                return jsonResponse({
                    data: [
                        {
                            id: 'google/gemini-image-next',
                            name: 'Gemini Image Next',
                            supported_parameters: {
                                aspect_ratio: { type: 'enum', values: ['1:1', '16:9'] },
                                input_references: { type: 'range', min: 0, max: 4 },
                            },
                        },
                    ],
                });
            };

            const {
                refreshPrivacyModelCache,
                getBootstrapPrivacyModels,
            } = await importSource('packages/studio/src/privacyApi.js');
            const refreshed = await refreshPrivacyModelCache();

            assert.equal(calls.length, 2);
            assert.ok(refreshed.some((model) => model.id === 'privacy:venice:flux-2-pro'));
            assert.ok(refreshed.some((model) => model.id === 'privacy:openrouter:google/gemini-image-next'));
            assert.ok(refreshed.some((model) => model.id === 'privacy:openrouter:google/gemini-image-next-edit'));
            assert.equal(refreshed.some((model) => model.id === 'privacy:venice:unknown-provider-edit'), false);
            assert.ok(storage.getItem('actually_open_image_models_v1'));

            const t2i = getBootstrapPrivacyModels('t2i');
            assert.ok(t2i.some((model) => model.id === 'privacy:venice:flux-2-pro'));
            assert.ok(t2i.some((model) => model.id === 'privacy:openrouter:google/gemini-image-next'));
            assert.ok(t2i.some((model) => model.id === 'privacy:venice:nano-banana-pro'));
            assert.ok(t2i.some((model) => model.id === 'privacy:openrouter:bytedance-seed/seedream-4.5'));

            const i2i = getBootstrapPrivacyModels('i2i');
            assert.ok(i2i.some((model) => model.id === 'privacy:openrouter:google/gemini-image-next-edit'));
            assert.ok(i2i.some((model) => model.id === 'privacy:venice:nano-banana-pro-edit'));
            assert.ok(i2i.some((model) => model.id === 'privacy:openrouter:bytedance-seed/seedream-4.5-edit'));
        },
    );
});
