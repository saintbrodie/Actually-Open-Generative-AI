const PRIVACY_PREFIX = 'privacy:';
export const PRIVACY_SENTINEL = '__actually_open_byok__';

const PROVIDERS = {
    venice: {
        label: 'Venice',
        keyStorage: 'venice_api_key',
        baseUrl: 'https://api.venice.ai/api/v1',
        devBaseUrl: '/api/venice',
    },
    openrouter: {
        label: 'OpenRouter',
        keyStorage: 'openrouter_api_key',
        baseUrl: 'https://openrouter.ai/api/v1',
        devBaseUrl: '/api/openrouter',
    },
};

const FALLBACK_MODELS = [
    {
        id: 'privacy:venice:nano-banana-pro',
        rawId: 'nano-banana-pro',
        name: 'Nano Banana Pro · Venice',
        provider: 'venice',
        supportedParameters: {
            aspect_ratio: { type: 'enum', values: ['1:1', '16:9', '9:16', '4:3', '3:4'] },
            resolution: { type: 'enum', values: ['1K', '2K', '4K'] },
            seed: { type: 'boolean' },
        },
    },
    {
        id: 'privacy:openrouter:bytedance-seed/seedream-4.5',
        rawId: 'bytedance-seed/seedream-4.5',
        name: 'Seedream 4.5 · OpenRouter',
        provider: 'openrouter',
        supportedParameters: {
            aspect_ratio: { type: 'enum', values: ['1:1', '16:9', '9:16', '4:3', '3:4'] },
            resolution: { type: 'enum', values: ['1K', '2K', '4K'] },
            seed: { type: 'boolean' },
        },
    },
];

const modelRegistry = new Map(FALLBACK_MODELS.map((model) => [model.id, model]));

function getStorage() {
    return typeof window !== 'undefined' ? window.localStorage : null;
}

function providerConfig(provider) {
    const config = PROVIDERS[provider];
    if (!config) throw new Error(`Unsupported provider: ${provider}`);
    return config;
}

function getBaseUrl(provider) {
    const config = providerConfig(provider);
    const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
    return isDev ? config.devBaseUrl : config.baseUrl;
}

function getProviderKey(provider) {
    const storage = getStorage();
    const config = providerConfig(provider);
    const key = storage?.getItem(config.keyStorage)?.trim();
    if (!key) throw new Error(`${config.label} API key missing. Add it in Settings.`);
    return key;
}

function authHeaders(provider, key) {
    const headers = {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
    };
    if (provider === 'openrouter' && typeof window !== 'undefined') {
        headers['HTTP-Referer'] = window.location.origin;
        headers['X-Title'] = 'Actually Open Generative AI';
    }
    return headers;
}

async function readError(response, provider) {
    let detail = '';
    try {
        const body = await response.text();
        detail = body.slice(0, 500).replace(/\s+/g, ' ').trim();
    } catch (_) {
        // Ignore response parsing failures and fall back to status text.
    }
    const suffix = detail ? ` — ${detail}` : '';
    return new Error(`${providerConfig(provider).label} request failed (${response.status} ${response.statusText})${suffix}`);
}

function parsePrivacyId(modelId) {
    if (typeof modelId !== 'string' || !modelId.startsWith(PRIVACY_PREFIX)) return null;
    const rest = modelId.slice(PRIVACY_PREFIX.length);
    const separator = rest.indexOf(':');
    if (separator === -1) return null;
    const provider = rest.slice(0, separator);
    const rawId = rest.slice(separator + 1);
    if (!PROVIDERS[provider] || !rawId) return null;
    return { provider, rawId };
}

function registerModel(model) {
    modelRegistry.set(model.id, model);
    return model;
}

function normalizeOpenRouterModel(model) {
    return registerModel({
        id: `privacy:openrouter:${model.id}`,
        rawId: model.id,
        name: `${model.name || model.id} · OpenRouter`,
        provider: 'openrouter',
        supportedParameters: model.supported_parameters || {},
        supportsStreaming: Boolean(model.supports_streaming),
    });
}

function normalizeVeniceModel(model) {
    return registerModel({
        id: `privacy:venice:${model.id}`,
        rawId: model.id,
        name: `${model.model_spec?.name || model.id} · Venice`,
        provider: 'venice',
        supportedParameters: {},
        modelSpec: model.model_spec || {},
    });
}

function firstImageDataUrl(data, fallbackMediaType = 'image/png') {
    const item = data?.data?.[0];
    if (item?.url) return item.url;
    if (item?.b64_json) return `data:${item.media_type || fallbackMediaType};base64,${item.b64_json}`;
    return null;
}

function veniceImageDataUrl(data) {
    const image = data?.images?.[0] || firstImageDataUrl(data, 'image/webp');
    if (!image) return null;
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) return image;
    return `data:image/webp;base64,${image}`;
}

function hasParameter(model, parameter) {
    return Boolean(model?.supportedParameters?.[parameter]);
}

function pickEnumValue(model, parameter, requested) {
    if (!requested) return undefined;
    const descriptor = model?.supportedParameters?.[parameter];
    const values = descriptor?.values;
    if (!Array.isArray(values) || values.length === 0) return requested;
    return values.includes(requested) ? requested : values[0];
}

function veniceSizing(payload, rawId, params) {
    const aspectRatio = params.aspect_ratio;
    const resolution = params.resolution || params.quality;

    // Venice documents these families with explicit sizing contracts. For unknown
    // future models, omit sizing rather than sending incompatible fields.
    if (rawId === 'venice-sd35' || rawId === 'qwen-image') {
        if (params.width && params.height) {
            payload.width = params.width;
            payload.height = params.height;
        }
        return;
    }

    if (/^(gpt-image-2|nano-banana-(2|pro))/.test(rawId)) {
        if (aspectRatio) payload.aspect_ratio = aspectRatio;
        payload.resolution = ['1K', '2K', '4K'].includes(resolution) ? resolution : '1K';
        return;
    }

    if (rawId === 'qwen-image-2' && aspectRatio) {
        payload.aspect_ratio = aspectRatio;
    }
}

export function isPrivacyModelId(modelId) {
    return Boolean(parsePrivacyId(modelId));
}

export function getPrivacyModel(modelId) {
    const registered = modelRegistry.get(modelId);
    if (registered) return registered;
    const parsed = parsePrivacyId(modelId);
    if (!parsed) return null;
    return registerModel({
        id: modelId,
        rawId: parsed.rawId,
        name: `${parsed.rawId} · ${providerConfig(parsed.provider).label}`,
        provider: parsed.provider,
        supportedParameters: {},
    });
}

export function getFallbackPrivacyModels() {
    return FALLBACK_MODELS.map((model) => ({ ...model }));
}

export function hasPrivacyKey() {
    const storage = getStorage();
    return Boolean(storage?.getItem('venice_api_key')?.trim() || storage?.getItem('openrouter_api_key')?.trim());
}

export function syncPrivacyCompatibilitySentinel() {
    const storage = getStorage();
    if (!storage) return;
    const existing = storage.getItem('muapi_key');
    if (hasPrivacyKey()) {
        if (!existing) storage.setItem('muapi_key', PRIVACY_SENTINEL);
    } else if (existing === PRIVACY_SENTINEL) {
        storage.removeItem('muapi_key');
    }
}

export async function discoverPrivacyModels() {
    const discovered = [];

    if (getStorage()?.getItem('venice_api_key')?.trim()) {
        try {
            const key = getProviderKey('venice');
            const response = await fetch(`${getBaseUrl('venice')}/models?type=image`, {
                headers: authHeaders('venice', key),
            });
            if (!response.ok) throw await readError(response, 'venice');
            const body = await response.json();
            (body.data || []).filter((model) => model.type === 'image').forEach((model) => discovered.push(normalizeVeniceModel(model)));
        } catch (error) {
            console.warn('[Privacy API] Venice model discovery failed:', error.message);
        }
    }

    if (getStorage()?.getItem('openrouter_api_key')?.trim()) {
        try {
            const key = getProviderKey('openrouter');
            const response = await fetch(`${getBaseUrl('openrouter')}/images/models`, {
                headers: authHeaders('openrouter', key),
            });
            if (!response.ok) throw await readError(response, 'openrouter');
            const body = await response.json();
            (body.data || []).forEach((model) => discovered.push(normalizeOpenRouterModel(model)));
        } catch (error) {
            console.warn('[Privacy API] OpenRouter model discovery failed:', error.message);
        }
    }

    return discovered.length ? discovered : getFallbackPrivacyModels();
}

async function generateOpenRouter(model, params) {
    const key = getProviderKey('openrouter');
    const payload = {
        model: model.rawId,
        prompt: params.prompt,
    };

    if (hasParameter(model, 'aspect_ratio') && params.aspect_ratio) {
        payload.aspect_ratio = pickEnumValue(model, 'aspect_ratio', params.aspect_ratio);
    }
    if (hasParameter(model, 'resolution') && params.resolution) {
        payload.resolution = pickEnumValue(model, 'resolution', params.resolution);
    }
    if (hasParameter(model, 'quality') && params.quality) {
        payload.quality = pickEnumValue(model, 'quality', params.quality);
    }
    if (hasParameter(model, 'seed') && Number.isInteger(params.seed) && params.seed !== -1) {
        payload.seed = params.seed;
    }

    const response = await fetch(`${getBaseUrl('openrouter')}/images`, {
        method: 'POST',
        headers: authHeaders('openrouter', key),
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw await readError(response, 'openrouter');
    const data = await response.json();
    const url = firstImageDataUrl(data);
    if (!url) throw new Error('OpenRouter returned no image data.');
    return { ...data, url, id: data.id || `${Date.now()}` };
}

async function generateVenice(model, params) {
    const key = getProviderKey('venice');
    const payload = {
        model: model.rawId,
        prompt: params.prompt,
        return_binary: false,
    };

    if (params.negative_prompt) payload.negative_prompt = params.negative_prompt;
    if (Number.isInteger(params.seed) && params.seed !== -1) payload.seed = params.seed;
    veniceSizing(payload, model.rawId, params);

    const response = await fetch(`${getBaseUrl('venice')}/image/generate`, {
        method: 'POST',
        headers: authHeaders('venice', key),
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw await readError(response, 'venice');
    const data = await response.json();
    const url = veniceImageDataUrl(data);
    if (!url) throw new Error('Venice returned no image data.');
    return { ...data, url, id: data.id || `${Date.now()}` };
}

export const privacyApi = {
    async generateImage(params) {
        const model = getPrivacyModel(params.model);
        if (!model) throw new Error(`Unknown privacy model: ${params.model}`);
        if (model.provider === 'openrouter') return generateOpenRouter(model, params);
        if (model.provider === 'venice') return generateVenice(model, params);
        throw new Error(`Unsupported privacy provider: ${model.provider}`);
    },
};

syncPrivacyCompatibilitySentinel();
