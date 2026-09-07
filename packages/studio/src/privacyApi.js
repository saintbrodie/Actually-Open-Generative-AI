export const PRIVACY_SENTINEL = '__actually_open_byok__';
const PRIVACY_PREFIX = 'privacy:';

const PROVIDERS = {
  venice: {
    label: 'Venice',
    keyStorage: 'venice_api_key',
    directBaseUrl: 'https://api.venice.ai/api/v1',
  },
  openrouter: {
    label: 'OpenRouter',
    keyStorage: 'openrouter_api_key',
    directBaseUrl: 'https://openrouter.ai/api/v1',
  },
};

const FALLBACK_MODELS = [
  {
    id: 'privacy:venice:nano-banana-pro',
    rawId: 'nano-banana-pro',
    name: 'Nano Banana Pro · Venice',
    provider: 'venice',
    supportedParameters: {
      aspect_ratio: { type: 'enum', values: ['1:1', '3:2', '16:9', '21:9', '9:16', '2:3', '3:4', '4:5'] },
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
      aspect_ratio: { type: 'enum', values: ['1:1', '1:2', '2:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '9:19.5', '19.5:9', '9:20', '20:9', '9:21', '21:9', 'auto'] },
      resolution: { type: 'enum', values: ['1K', '2K', '4K'] },
      seed: { type: 'boolean' },
    },
  },
];

const modelRegistry = new Map(FALLBACK_MODELS.map((model) => [model.id, model]));

function storage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

function configFor(provider) {
  const config = PROVIDERS[provider];
  if (!config) throw new Error(`Unsupported provider: ${provider}`);
  return config;
}

function baseUrlFor(provider) {
  const config = configFor(provider);
  if (typeof window !== 'undefined' && window.location?.protocol?.startsWith('http')) {
    return `/api/privacy/${provider}`;
  }
  return config.directBaseUrl;
}

function keyFor(provider) {
  const config = configFor(provider);
  const key = storage()?.getItem(config.keyStorage)?.trim();
  if (!key) throw new Error(`${config.label} API key missing. Add it in Settings.`);
  return key;
}

function headersFor(provider, key) {
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

async function requestError(response, provider) {
  let detail = '';
  try {
    detail = (await response.text()).slice(0, 500).replace(/\s+/g, ' ').trim();
  } catch {}
  const suffix = detail ? ` — ${detail}` : '';
  return new Error(`${configFor(provider).label} request failed (${response.status} ${response.statusText})${suffix}`);
}

function parsePrivacyModelId(modelId) {
  if (typeof modelId !== 'string' || !modelId.startsWith(PRIVACY_PREFIX)) return null;
  const rest = modelId.slice(PRIVACY_PREFIX.length);
  const split = rest.indexOf(':');
  if (split < 1) return null;
  const provider = rest.slice(0, split);
  const rawId = rest.slice(split + 1);
  return PROVIDERS[provider] && rawId ? { provider, rawId } : null;
}

function register(model) {
  modelRegistry.set(model.id, model);
  return model;
}

export function isPrivacyModelId(modelId) {
  return Boolean(parsePrivacyModelId(modelId));
}

export function getPrivacyModel(modelId) {
  const existing = modelRegistry.get(modelId);
  if (existing) return existing;
  const parsed = parsePrivacyModelId(modelId);
  if (!parsed) return null;
  return register({
    id: modelId,
    rawId: parsed.rawId,
    name: `${parsed.rawId} · ${configFor(parsed.provider).label}`,
    provider: parsed.provider,
    supportedParameters: {},
  });
}

export function getFallbackPrivacyModels() {
  return FALLBACK_MODELS.map((model) => ({ ...model }));
}

export function hasPrivacyKey() {
  const store = storage();
  return Boolean(store?.getItem('venice_api_key')?.trim() || store?.getItem('openrouter_api_key')?.trim());
}

export function syncPrivacyCompatibilitySentinel() {
  const store = storage();
  if (!store) return;
  const current = store.getItem('muapi_key');
  if (hasPrivacyKey()) {
    if (!current) store.setItem('muapi_key', PRIVACY_SENTINEL);
  } else if (current === PRIVACY_SENTINEL) {
    store.removeItem('muapi_key');
  }
}

function normalizeOpenRouterModel(model) {
  return register({
    id: `privacy:openrouter:${model.id}`,
    rawId: model.id,
    name: `${model.name || model.id} · OpenRouter`,
    provider: 'openrouter',
    supportedParameters: model.supported_parameters || {},
  });
}

function normalizeVeniceModel(model) {
  return register({
    id: `privacy:venice:${model.id}`,
    rawId: model.id,
    name: `${model.model_spec?.name || model.id} · Venice`,
    provider: 'venice',
    supportedParameters: {},
    modelSpec: model.model_spec || {},
  });
}

export async function discoverPrivacyModels() {
  const found = [];
  const store = storage();

  if (store?.getItem('venice_api_key')?.trim()) {
    try {
      const response = await fetch(`${baseUrlFor('venice')}/models?type=image`, {
        headers: headersFor('venice', keyFor('venice')),
      });
      if (!response.ok) throw await requestError(response, 'venice');
      const body = await response.json();
      (body.data || []).filter((model) => model.type === 'image').forEach((model) => found.push(normalizeVeniceModel(model)));
    } catch (error) {
      console.warn('[Privacy API] Venice model discovery failed:', error.message);
    }
  }

  if (store?.getItem('openrouter_api_key')?.trim()) {
    try {
      const response = await fetch(`${baseUrlFor('openrouter')}/images/models`, {
        headers: headersFor('openrouter', keyFor('openrouter')),
      });
      if (!response.ok) throw await requestError(response, 'openrouter');
      const body = await response.json();
      (body.data || []).forEach((model) => found.push(normalizeOpenRouterModel(model)));
    } catch (error) {
      console.warn('[Privacy API] OpenRouter model discovery failed:', error.message);
    }
  }

  return found.length ? found : getFallbackPrivacyModels();
}

function supports(model, parameter) {
  return Boolean(model?.supportedParameters?.[parameter]);
}

function validEnum(model, parameter, value) {
  const values = model?.supportedParameters?.[parameter]?.values;
  if (!Array.isArray(values) || !values.length) return value;
  return values.includes(value) ? value : values[0];
}

function openRouterImageUrl(data) {
  const image = data?.data?.[0];
  if (image?.url) return image.url;
  if (image?.b64_json) return `data:${image.media_type || 'image/png'};base64,${image.b64_json}`;
  return null;
}

function veniceImageUrl(data) {
  const image = data?.images?.[0];
  if (!image) return null;
  if (/^(https?:|data:)/.test(image)) return image;
  return `data:image/webp;base64,${image}`;
}

function addVeniceSizing(payload, rawId, params) {
  const resolution = params.resolution || params.quality;
  if (rawId === 'venice-sd35' || rawId === 'qwen-image') {
    if (params.width && params.height) {
      payload.width = params.width;
      payload.height = params.height;
    }
    return;
  }
  if (/^(gpt-image-2|nano-banana-(2|pro))/.test(rawId)) {
    if (params.aspect_ratio) payload.aspect_ratio = params.aspect_ratio;
    payload.resolution = ['1K', '2K', '4K'].includes(resolution) ? resolution : '1K';
    return;
  }
  if (rawId === 'qwen-image-2' && params.aspect_ratio) payload.aspect_ratio = params.aspect_ratio;
}

async function generateOpenRouter(model, params) {
  const payload = { model: model.rawId, prompt: params.prompt };
  if (supports(model, 'aspect_ratio') && params.aspect_ratio) payload.aspect_ratio = validEnum(model, 'aspect_ratio', params.aspect_ratio);
  if (supports(model, 'resolution') && params.resolution) payload.resolution = validEnum(model, 'resolution', params.resolution);
  if (supports(model, 'quality') && params.quality) payload.quality = validEnum(model, 'quality', params.quality);
  if (supports(model, 'seed') && Number.isInteger(params.seed) && params.seed !== -1) payload.seed = params.seed;

  const response = await fetch(`${baseUrlFor('openrouter')}/images`, {
    method: 'POST',
    headers: headersFor('openrouter', keyFor('openrouter')),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw await requestError(response, 'openrouter');
  const data = await response.json();
  const url = openRouterImageUrl(data);
  if (!url) throw new Error('OpenRouter returned no image data.');
  return { ...data, url, id: data.id || String(Date.now()) };
}

async function generateVenice(model, params) {
  const payload = { model: model.rawId, prompt: params.prompt, return_binary: false };
  if (params.negative_prompt) payload.negative_prompt = params.negative_prompt;
  if (Number.isInteger(params.seed) && params.seed !== -1) payload.seed = params.seed;
  addVeniceSizing(payload, model.rawId, params);

  const response = await fetch(`${baseUrlFor('venice')}/image/generate`, {
    method: 'POST',
    headers: headersFor('venice', keyFor('venice')),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw await requestError(response, 'venice');
  const data = await response.json();
  const url = veniceImageUrl(data);
  if (!url) throw new Error('Venice returned no image data.');
  return { ...data, url, id: data.id || String(Date.now()) };
}

export const privacyApi = {
  async generateImage(params) {
    const model = getPrivacyModel(params?.model);
    if (!model) throw new Error(`Unknown privacy model: ${params?.model}`);
    if (model.provider === 'openrouter') return generateOpenRouter(model, params);
    if (model.provider === 'venice') return generateVenice(model, params);
    throw new Error(`Unsupported privacy provider: ${model.provider}`);
  },
};

syncPrivacyCompatibilitySentinel();
