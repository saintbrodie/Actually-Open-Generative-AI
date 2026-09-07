export const PRIVACY_SENTINEL = '__actually_open_byok__';
const PRIVACY_PREFIX = 'privacy:';
const IMAGE_MODEL_CACHE_KEY = 'actually_open_image_models_v1';
const IMAGE_MODEL_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

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

const OPENROUTER_ASPECT_RATIOS = [
  '1:1', '1:2', '2:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4',
  '9:16', '16:9', '9:19.5', '19.5:9', '9:20', '20:9', '9:21', '21:9', 'auto',
];
const VENICE_GENERATE_ASPECT_RATIOS = ['1:1', '3:2', '16:9', '21:9', '9:16', '2:3', '3:4', '4:5'];
const VENICE_EDIT_ASPECT_RATIOS = ['auto', '1:1', '3:2', '16:9', '21:9', '9:16', '2:3', '4:5'];
const COMMON_RESOLUTIONS = ['1K', '2K', '4K'];

const FALLBACK_T2I_MODELS = [
  {
    id: 'privacy:venice:nano-banana-pro',
    rawId: 'nano-banana-pro',
    name: 'Nano Banana Pro · Venice',
    provider: 'venice',
    mode: 't2i',
    supportedParameters: {
      aspect_ratio: { type: 'enum', values: VENICE_GENERATE_ASPECT_RATIOS },
      resolution: { type: 'enum', values: COMMON_RESOLUTIONS },
      seed: { type: 'boolean' },
    },
  },
  {
    id: 'privacy:openrouter:bytedance-seed/seedream-4.5',
    rawId: 'bytedance-seed/seedream-4.5',
    name: 'Seedream 4.5 · OpenRouter',
    provider: 'openrouter',
    mode: 't2i',
    supportedParameters: {
      aspect_ratio: { type: 'enum', values: OPENROUTER_ASPECT_RATIOS },
      resolution: { type: 'enum', values: COMMON_RESOLUTIONS },
      input_references: { type: 'range', min: 0, max: 14 },
      seed: { type: 'boolean' },
    },
  },
];

const FALLBACK_I2I_MODELS = [
  {
    id: 'privacy:venice:nano-banana-pro-edit',
    rawId: 'nano-banana-pro-edit',
    name: 'Nano Banana Pro Edit · Venice',
    provider: 'venice',
    mode: 'i2i',
    maxImages: 3,
    supportedParameters: {
      aspect_ratio: { type: 'enum', values: VENICE_EDIT_ASPECT_RATIOS },
      resolution: { type: 'enum', values: COMMON_RESOLUTIONS },
      input_references: { type: 'range', min: 1, max: 3 },
    },
  },
  {
    // OpenRouter uses the same Seedream model id for text-to-image and
    // reference-image generation. The synthetic -edit suffix exists only so
    // the studio can expose a distinct I2I variant in its family picker.
    id: 'privacy:openrouter:bytedance-seed/seedream-4.5-edit',
    rawId: 'bytedance-seed/seedream-4.5',
    name: 'Seedream 4.5 Edit · OpenRouter',
    provider: 'openrouter',
    mode: 'i2i',
    maxImages: 14,
    supportedParameters: {
      aspect_ratio: { type: 'enum', values: OPENROUTER_ASPECT_RATIOS },
      resolution: { type: 'enum', values: COMMON_RESOLUTIONS },
      input_references: { type: 'range', min: 1, max: 14 },
      seed: { type: 'boolean' },
    },
  },
];

const FALLBACK_MODELS = [...FALLBACK_T2I_MODELS, ...FALLBACK_I2I_MODELS];
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

function dedupeModels(models) {
  const seen = new Set();
  return models.filter((model) => {
    if (!model?.id || seen.has(model.id)) return false;
    seen.add(model.id);
    register(model);
    return true;
  });
}

function filterMode(models, mode) {
  if (mode === 'all') return models;
  return models.filter((model) => model.mode === mode);
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

export function getFallbackPrivacyModels(mode = 't2i') {
  const source = mode === 'i2i' ? FALLBACK_I2I_MODELS : FALLBACK_T2I_MODELS;
  return source.map((model) => ({ ...model }));
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

export function normalizeOpenRouterImageModel(model) {
  if (!model?.id) return null;
  return register({
    id: `privacy:openrouter:${model.id}`,
    rawId: model.id,
    name: `${model.name || model.id} · OpenRouter`,
    provider: 'openrouter',
    mode: 't2i',
    supportedParameters: model.supported_parameters || {},
  });
}

export function normalizeOpenRouterEditModel(model) {
  const base = normalizeOpenRouterImageModel(model);
  const inputReferences = base?.supportedParameters?.input_references;
  if (!base || !inputReferences) return null;
  const declaredMax = Number.parseInt(String(inputReferences.max ?? ''), 10);
  const maxImages = Number.isFinite(declaredMax) && declaredMax > 0 ? declaredMax : 1;
  return register({
    ...base,
    id: `${PRIVACY_PREFIX}openrouter:${model.id}-edit`,
    name: `${model.name || model.id} Edit · OpenRouter`,
    mode: 'i2i',
    maxImages,
    supportedParameters: {
      ...base.supportedParameters,
      input_references: {
        ...inputReferences,
        min: Math.max(1, Number.parseInt(String(inputReferences.min ?? 1), 10) || 1),
        max: maxImages,
      },
    },
  });
}

export function normalizeVeniceImageModel(model) {
  if (!model?.id || /(?:^|[-_])edit(?:[-_]|$)/i.test(model.id)) return null;
  return register({
    id: `privacy:venice:${model.id}`,
    rawId: model.id,
    name: `${model.model_spec?.name || model.name || model.id} · Venice`,
    provider: 'venice',
    mode: 't2i',
    supportedParameters: {},
    modelSpec: model.model_spec || {},
  });
}

async function fetchDiscoveredPrivacyModels() {
  const found = [];
  const store = storage();

  if (store?.getItem('venice_api_key')?.trim()) {
    try {
      const response = await fetch(`${baseUrlFor('venice')}/models?type=image`, {
        headers: headersFor('venice', keyFor('venice')),
      });
      if (!response.ok) throw await requestError(response, 'venice');
      const body = await response.json();
      for (const item of body.data || []) {
        if (item.type && item.type !== 'image') continue;
        const model = normalizeVeniceImageModel(item);
        if (model) found.push(model);
      }
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
      for (const item of body.data || []) {
        const t2i = normalizeOpenRouterImageModel(item);
        if (t2i) found.push(t2i);
        const i2i = normalizeOpenRouterEditModel(item);
        if (i2i) found.push(i2i);
      }
    } catch (error) {
      console.warn('[Privacy API] OpenRouter model discovery failed:', error.message);
    }
  }

  return found;
}

function readImageModelCache() {
  try {
    const cached = JSON.parse(storage()?.getItem(IMAGE_MODEL_CACHE_KEY) || 'null');
    if (!cached || !Array.isArray(cached.models) || !Number.isFinite(cached.updatedAt)) return [];
    if (Date.now() - cached.updatedAt > IMAGE_MODEL_CACHE_MAX_AGE_MS) return [];
    return dedupeModels(cached.models);
  } catch {
    return [];
  }
}

function writeImageModelCache(models) {
  try {
    storage()?.setItem(IMAGE_MODEL_CACHE_KEY, JSON.stringify({
      updatedAt: Date.now(),
      models,
    }));
  } catch {}
}

export function getBootstrapPrivacyModels(mode = 't2i') {
  return dedupeModels([
    ...filterMode(readImageModelCache(), mode),
    ...getFallbackPrivacyModels(mode),
  ]).map((model) => ({ ...model }));
}

export async function discoverPrivacyModels(mode = 't2i') {
  const found = filterMode(await fetchDiscoveredPrivacyModels(), mode);
  return (found.length ? dedupeModels(found) : getFallbackPrivacyModels(mode))
    .map((model) => ({ ...model }));
}

export async function refreshPrivacyModelCache() {
  const found = dedupeModels(await fetchDiscoveredPrivacyModels());
  if (found.length) writeImageModelCache(found);
  return found.map((model) => ({ ...model }));
}

function supports(model, parameter) {
  return Boolean(model?.supportedParameters?.[parameter]);
}

function validEnum(model, parameter, value) {
  const values = model?.supportedParameters?.[parameter]?.values;
  if (!Array.isArray(values) || !values.length) return value;
  return values.includes(value) ? value : values[0];
}

function inputReferenceLimit(model) {
  const max = model?.supportedParameters?.input_references?.max;
  return Number.isInteger(max) && max > 0 ? max : (model?.maxImages || 1);
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

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Failed to read image response.'));
    reader.readAsDataURL(blob);
  });
}

export function fileToDataUrl(file, onProgress) {
  if (!file?.type?.startsWith('image/')) {
    return Promise.reject(new Error('BYOK reference uploads currently support images only.'));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.min(99, Math.round((event.loaded / event.total) * 100)));
    };
    reader.onload = () => {
      onProgress?.(100);
      resolve(reader.result);
    };
    reader.onerror = () => reject(reader.error || new Error('Failed to read local image.'));
    reader.readAsDataURL(file);
  });
}

function referenceUrls(params) {
  const urls = Array.isArray(params?.images_list) && params.images_list.length
    ? params.images_list
    : (params?.image_url ? [params.image_url] : []);
  return urls.filter((value) => typeof value === 'string' && value.length > 0);
}

function stripDataUrl(value) {
  if (!value?.startsWith('data:')) return value;
  const comma = value.indexOf(',');
  return comma >= 0 ? value.slice(comma + 1) : value;
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
    payload.resolution = COMMON_RESOLUTIONS.includes(resolution) ? resolution : '1K';
    return;
  }
  if (rawId === 'qwen-image-2' && params.aspect_ratio) payload.aspect_ratio = params.aspect_ratio;
}

function addOpenRouterControls(payload, model, params) {
  if (supports(model, 'aspect_ratio') && params.aspect_ratio) payload.aspect_ratio = validEnum(model, 'aspect_ratio', params.aspect_ratio);
  if (supports(model, 'resolution') && params.resolution) payload.resolution = validEnum(model, 'resolution', params.resolution);
  if (supports(model, 'quality') && params.quality) payload.quality = validEnum(model, 'quality', params.quality);
  if (supports(model, 'seed') && Number.isInteger(params.seed) && params.seed !== -1) payload.seed = params.seed;
}

async function generateOpenRouter(model, params, references = []) {
  const payload = { model: model.rawId, prompt: params.prompt };
  addOpenRouterControls(payload, model, params);
  if (references.length) {
    const limited = references.slice(0, inputReferenceLimit(model));
    payload.input_references = limited.map((url) => ({
      type: 'image_url',
      image_url: { url },
    }));
  }

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

async function editOpenRouter(model, params) {
  const references = referenceUrls(params);
  if (!references.length) throw new Error('OpenRouter image editing requires at least one reference image.');
  return generateOpenRouter(model, params, references);
}

async function editVenice(model, params) {
  const references = referenceUrls(params).slice(0, model.maxImages || 3);
  if (!references.length) throw new Error('Venice image editing requires at least one reference image.');
  if (!params.prompt?.trim()) throw new Error('Venice image editing requires a prompt.');

  const isMulti = references.length > 1;
  const payload = isMulti
    ? {
        modelId: model.rawId,
        prompt: params.prompt,
        images: references.map(stripDataUrl),
        output_format: 'png',
      }
    : {
        model: model.rawId,
        prompt: params.prompt,
        image: stripDataUrl(references[0]),
      };

  if (params.aspect_ratio) payload.aspect_ratio = validEnum(model, 'aspect_ratio', params.aspect_ratio);
  if (isMulti && params.resolution && COMMON_RESOLUTIONS.includes(params.resolution)) payload.resolution = params.resolution;

  const response = await fetch(`${baseUrlFor('venice')}${isMulti ? '/image/multi-edit' : '/image/edit'}`, {
    method: 'POST',
    headers: headersFor('venice', keyFor('venice')),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw await requestError(response, 'venice');
  const url = await blobToDataUrl(await response.blob());
  return { url, id: String(Date.now()), provider: 'venice' };
}

export const privacyApi = {
  async generateImage(params) {
    const model = getPrivacyModel(params?.model);
    if (!model) throw new Error(`Unknown privacy model: ${params?.model}`);
    if (model.provider === 'openrouter') return generateOpenRouter(model, params);
    if (model.provider === 'venice') return generateVenice(model, params);
    throw new Error(`Unsupported privacy provider: ${model.provider}`);
  },

  async generateI2I(params) {
    const model = getPrivacyModel(params?.model);
    if (!model) throw new Error(`Unknown privacy model: ${params?.model}`);
    if (model.provider === 'openrouter') return editOpenRouter(model, params);
    if (model.provider === 'venice') return editVenice(model, params);
    throw new Error(`Unsupported privacy provider: ${model.provider}`);
  },

  fileToDataUrl,
};

syncPrivacyCompatibilitySentinel();
