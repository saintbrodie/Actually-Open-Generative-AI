const VIDEO_PREFIX = 'privacy-video:';
const JOB_PREFIX = 'privacy-video-job:';
const JOB_STORAGE_PREFIX = 'actually_open_video_job:';
const VIDEO_MODEL_CACHE_KEY = 'actually_open_video_models_v1';
const VIDEO_MODEL_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

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

const FALLBACK_T2V_MODELS = [
  {
    id: 'privacy-video:venice:seedance-2-0-fast-text-to-video',
    rawId: 'seedance-2-0-fast-text-to-video',
    name: 'Seedance 2.0 Fast · Venice',
    provider: 'venice',
    mode: 't2v',
    supportedDurations: [5],
    supportedResolutions: ['720p'],
    supportedAspectRatios: ['16:9'],
  },
  {
    id: 'privacy-video:openrouter:bytedance/seedance-2.0-fast',
    rawId: 'bytedance/seedance-2.0-fast',
    name: 'Seedance 2.0 Fast · OpenRouter',
    provider: 'openrouter',
    mode: 't2v',
    supportedDurations: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    supportedResolutions: ['480p', '720p'],
    supportedAspectRatios: ['1:1', '3:4', '9:16', '4:3', '16:9', '21:9', '9:21'],
  },
];

const FALLBACK_I2V_MODELS = [
  {
    id: 'privacy-video:venice:seedance-2-0-fast-image-to-video',
    rawId: 'seedance-2-0-fast-image-to-video',
    name: 'Seedance 2.0 Fast I2V · Venice',
    provider: 'venice',
    mode: 'i2v',
    imageField: 'image_url',
    maxImages: 1,
    supportedDurations: [5],
    supportedResolutions: ['720p'],
    supportedAspectRatios: ['16:9'],
  },
];

const FALLBACK_MODELS = [...FALLBACK_T2V_MODELS, ...FALLBACK_I2V_MODELS];
const modelRegistry = new Map(FALLBACK_MODELS.map((model) => [model.id, model]));

function storage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

function configFor(provider) {
  const config = PROVIDERS[provider];
  if (!config) throw new Error(`Unsupported video provider: ${provider}`);
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
  return new Error(`${configFor(provider).label} video request failed (${response.status} ${response.statusText})${detail ? ` — ${detail}` : ''}`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseModelId(modelId) {
  if (typeof modelId !== 'string' || !modelId.startsWith(VIDEO_PREFIX)) return null;
  const rest = modelId.slice(VIDEO_PREFIX.length);
  const split = rest.indexOf(':');
  if (split < 1) return null;
  const provider = rest.slice(0, split);
  const rawId = rest.slice(split + 1);
  return PROVIDERS[provider] && rawId ? { provider, rawId } : null;
}

function jobId(provider, remoteId, model = '') {
  return `${JOB_PREFIX}${provider}:${encodeURIComponent(model)}:${remoteId}`;
}

function parseJobId(value) {
  if (typeof value !== 'string' || !value.startsWith(JOB_PREFIX)) return null;
  const rest = value.slice(JOB_PREFIX.length);
  const providerSplit = rest.indexOf(':');
  if (providerSplit < 1) return null;
  const provider = rest.slice(0, providerSplit);
  const afterProvider = rest.slice(providerSplit + 1);
  const modelSplit = afterProvider.indexOf(':');
  if (modelSplit < 0 || !PROVIDERS[provider]) return null;
  return {
    provider,
    model: decodeURIComponent(afterProvider.slice(0, modelSplit)),
    remoteId: afterProvider.slice(modelSplit + 1),
  };
}

function rememberJob(id, data) {
  try {
    storage()?.setItem(`${JOB_STORAGE_PREFIX}${id}`, JSON.stringify(data));
  } catch {}
}

function readJob(id) {
  try {
    return JSON.parse(storage()?.getItem(`${JOB_STORAGE_PREFIX}${id}`) || 'null');
  } catch {
    return null;
  }
}

function forgetJob(id) {
  try {
    storage()?.removeItem(`${JOB_STORAGE_PREFIX}${id}`);
  } catch {}
}

function objectUrlFromBlob(blob) {
  if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
    return URL.createObjectURL(blob);
  }
  throw new Error('This runtime cannot create a local video URL.');
}

function normalizeDuration(value, provider) {
  if (value === undefined || value === null || value === '') return undefined;
  const numeric = typeof value === 'number' ? value : Number.parseInt(String(value), 10);
  if (!Number.isFinite(numeric)) return value;
  return provider === 'venice' ? `${numeric}s` : numeric;
}

function registerModel(model) {
  if (model?.id) modelRegistry.set(model.id, model);
  return model;
}

function modelFor(modelId) {
  const existing = modelRegistry.get(modelId);
  if (existing) return existing;
  const parsed = parseModelId(modelId);
  if (!parsed) return null;
  return registerModel({
    id: modelId,
    rawId: parsed.rawId,
    name: `${parsed.rawId} · ${configFor(parsed.provider).label}`,
    provider: parsed.provider,
    supportedDurations: [],
    supportedResolutions: [],
    supportedAspectRatios: [],
  });
}

function valueFromModel(model, names) {
  const spec = model?.model_spec || {};
  const capabilities = spec.capabilities || model?.capabilities || {};
  for (const source of [model || {}, spec, capabilities]) {
    for (const name of names) {
      if (source[name] !== undefined && source[name] !== null) return source[name];
    }
  }
  return undefined;
}

function stringArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((item) => String(item).trim()).filter(Boolean))];
}

function durationArray(value) {
  if (!Array.isArray(value)) return [];
  const values = value
    .map((item) => typeof item === 'number' ? item : Number.parseInt(String(item), 10))
    .filter((item) => Number.isFinite(item) && item > 0);
  return [...new Set(values)];
}

function inferVeniceMode(rawId) {
  if (/image-to-video/i.test(rawId)) return 'i2v';
  if (/text-to-video/i.test(rawId)) return 't2v';
  return null;
}

export function normalizeVeniceVideoModel(model) {
  const rawId = model?.id;
  const mode = rawId ? inferVeniceMode(rawId) : null;
  if (!rawId || !mode) return null;

  const displayName = model?.model_spec?.name || model?.name || rawId;
  const supportedDurations = durationArray(valueFromModel(model, [
    'supported_durations',
    'supportedDurations',
    'durations',
  ]));
  const supportedResolutions = stringArray(valueFromModel(model, [
    'supported_resolutions',
    'supportedResolutions',
    'resolutions',
  ]));
  const supportedAspectRatios = stringArray(valueFromModel(model, [
    'supported_aspect_ratios',
    'supportedAspectRatios',
    'aspect_ratios',
    'aspectRatios',
  ]));
  const supportsAudio = Boolean(valueFromModel(model, [
    'supportsAudioConfig',
    'supports_audio',
    'supportsAudio',
  ]));

  return registerModel({
    id: `${VIDEO_PREFIX}venice:${rawId}`,
    rawId,
    name: `${displayName} · Venice`,
    provider: 'venice',
    mode,
    ...(mode === 'i2v' ? { imageField: 'image_url', maxImages: 1 } : {}),
    supportedDurations,
    supportedResolutions,
    supportedAspectRatios,
    supportsAudio,
    modelSpec: model.model_spec || {},
  });
}

export function normalizeOpenRouterVideoModel(model) {
  const rawId = model?.id;
  if (!rawId) return null;
  const supportedFrameImages = stringArray(model.supported_frame_images);

  return registerModel({
    id: `${VIDEO_PREFIX}openrouter:${rawId}`,
    rawId,
    name: `${model.name || rawId} · OpenRouter`,
    provider: 'openrouter',
    mode: 't2v',
    supportedDurations: durationArray(model.supported_durations),
    supportedResolutions: stringArray(model.supported_resolutions),
    supportedAspectRatios: stringArray(model.supported_aspect_ratios),
    supportedFrameImages,
    supportsAudio: Boolean(model.supports_audio ?? model.supportsAudio ?? model.supported_audio),
    requiresPublicReferenceUrl: supportedFrameImages.length > 0,
    pricing: model.pricing || null,
    providerParameters: model.provider_parameters || model.providerParameters || null,
  });
}

async function fetchDiscoveredPrivacyVideoModels() {
  const found = [];
  const store = storage();

  if (store?.getItem('venice_api_key')?.trim()) {
    try {
      const response = await fetch(`${baseUrlFor('venice')}/models?type=video`, {
        headers: headersFor('venice', keyFor('venice')),
      });
      if (!response.ok) throw await requestError(response, 'venice');
      const body = await response.json();
      for (const item of body.data || []) {
        const model = normalizeVeniceVideoModel(item);
        if (model) found.push(model);
      }
    } catch (error) {
      console.warn('[Privacy Video API] Venice model discovery failed:', error.message);
    }
  }

  if (store?.getItem('openrouter_api_key')?.trim()) {
    try {
      const response = await fetch(`${baseUrlFor('openrouter')}/videos/models`, {
        headers: headersFor('openrouter', keyFor('openrouter')),
      });
      if (!response.ok) throw await requestError(response, 'openrouter');
      const body = await response.json();
      for (const item of body.data || []) {
        const model = normalizeOpenRouterVideoModel(item);
        if (model) found.push(model);
      }
    } catch (error) {
      console.warn('[Privacy Video API] OpenRouter model discovery failed:', error.message);
    }
  }

  return found;
}

function filterMode(models, mode) {
  if (mode === 'all') return models;
  return models.filter((model) => model.mode === mode);
}

function dedupeModels(models) {
  const seen = new Set();
  return models.filter((model) => {
    if (!model?.id || seen.has(model.id)) return false;
    seen.add(model.id);
    registerModel(model);
    return true;
  });
}

function readVideoModelCache() {
  try {
    const cached = JSON.parse(storage()?.getItem(VIDEO_MODEL_CACHE_KEY) || 'null');
    if (!cached || !Array.isArray(cached.models) || !Number.isFinite(cached.updatedAt)) return [];
    if (Date.now() - cached.updatedAt > VIDEO_MODEL_CACHE_MAX_AGE_MS) return [];
    return dedupeModels(cached.models);
  } catch {
    return [];
  }
}

function writeVideoModelCache(models) {
  try {
    storage()?.setItem(VIDEO_MODEL_CACHE_KEY, JSON.stringify({
      updatedAt: Date.now(),
      models,
    }));
  } catch {}
}

export function isPrivacyVideoModelId(modelId) {
  return Boolean(parseModelId(modelId));
}

export function isPrivacyVideoJobId(value) {
  return Boolean(parseJobId(value));
}

export function getFallbackPrivacyVideoModels(mode = 't2v') {
  const source = mode === 'i2v' ? FALLBACK_I2V_MODELS : FALLBACK_T2V_MODELS;
  return source.map((model) => ({ ...model }));
}

export function getBootstrapPrivacyVideoModels(mode = 't2v') {
  return dedupeModels([
    ...filterMode(readVideoModelCache(), mode),
    ...getFallbackPrivacyVideoModels(mode),
  ]).map((model) => ({ ...model }));
}

export async function discoverPrivacyVideoModels(mode = 't2v') {
  const found = filterMode(await fetchDiscoveredPrivacyVideoModels(), mode);
  return (found.length ? dedupeModels(found) : getFallbackPrivacyVideoModels(mode))
    .map((model) => ({ ...model }));
}

export async function refreshPrivacyVideoModelCache() {
  const found = dedupeModels(await fetchDiscoveredPrivacyVideoModels());
  if (found.length) writeVideoModelCache(found);
  return found.map((model) => ({ ...model }));
}

function addVideoControls(payload, model, params) {
  const duration = normalizeDuration(params.duration, model.provider);
  if (duration !== undefined) payload.duration = duration;
  if (params.resolution) payload.resolution = params.resolution;
  if (params.aspect_ratio) payload.aspect_ratio = params.aspect_ratio;
  if (Number.isInteger(params.seed) && params.seed !== -1) payload.seed = params.seed;
  if (params.negative_prompt && model.provider === 'venice') payload.negative_prompt = params.negative_prompt;
}

async function openRouterContent(remoteId) {
  const response = await fetch(`${baseUrlFor('openrouter')}/videos/${remoteId}/content?index=0`, {
    headers: headersFor('openrouter', keyFor('openrouter')),
  });
  if (!response.ok) throw await requestError(response, 'openrouter');
  return objectUrlFromBlob(await response.blob());
}

async function pollOpenRouter(job, maxAttempts = 120, interval = 5000) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const response = await fetch(`${baseUrlFor('openrouter')}/videos/${job.remoteId}`, {
      headers: headersFor('openrouter', keyFor('openrouter')),
    });
    if (!response.ok) throw await requestError(response, 'openrouter');
    const data = await response.json();
    const status = String(data.status || '').toLowerCase();
    if (status === 'completed') {
      // OpenRouter's `unsigned_urls` name is misleading: current video docs
      // explicitly say OpenRouter API content URLs still require the bearer
      // token. A <video src> cannot attach that header, so always download the
      // completed asset through authenticated fetch and expose a local blob URL.
      const url = await openRouterContent(job.remoteId);
      return { ...data, id: job.remoteId, request_id: job.syntheticId, url };
    }
    if (['failed', 'cancelled', 'expired'].includes(status)) {
      throw new Error(`OpenRouter video generation ${status}${data.error ? `: ${data.error}` : '.'}`);
    }
    await sleep(interval);
  }
  throw new Error('OpenRouter video generation timed out.');
}

async function generateOpenRouter(model, params) {
  const payload = { model: model.rawId, prompt: params.prompt };
  addVideoControls(payload, model, params);
  if (typeof params.generate_audio === 'boolean') payload.generate_audio = params.generate_audio;

  const response = await fetch(`${baseUrlFor('openrouter')}/videos`, {
    method: 'POST',
    headers: headersFor('openrouter', keyFor('openrouter')),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw await requestError(response, 'openrouter');
  const submitted = await response.json();
  if (!submitted.id) throw new Error('OpenRouter returned no video job id.');

  const syntheticId = jobId('openrouter', submitted.id, model.rawId);
  rememberJob(syntheticId, { provider: 'openrouter', remoteId: submitted.id, model: model.rawId });
  params.onRequestId?.(syntheticId);
  try {
    return await pollOpenRouter({ provider: 'openrouter', remoteId: submitted.id, model: model.rawId, syntheticId });
  } finally {
    forgetJob(syntheticId);
  }
}

async function pollVenice(job, maxAttempts = 180, interval = 5000) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const response = await fetch(`${baseUrlFor('venice')}/video/retrieve`, {
      method: 'POST',
      headers: headersFor('venice', keyFor('venice')),
      body: JSON.stringify({
        model: job.model,
        queue_id: job.remoteId,
        delete_media_on_completion: false,
      }),
    });
    if (!response.ok) throw await requestError(response, 'venice');

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('video/')) {
      return {
        id: job.remoteId,
        request_id: job.syntheticId,
        url: objectUrlFromBlob(await response.blob()),
        provider: 'venice',
      };
    }

    const data = await response.json();
    if (String(data.status || '').toUpperCase() === 'COMPLETED') {
      const remembered = readJob(job.syntheticId);
      const url = remembered?.downloadUrl;
      if (url) return { ...data, id: job.remoteId, request_id: job.syntheticId, url, provider: 'venice' };
      throw new Error('Venice completed the video but no download URL was available.');
    }
    await sleep(interval);
  }
  throw new Error('Venice video generation timed out.');
}

async function queueVenice(model, params) {
  const payload = { model: model.rawId, prompt: params.prompt };
  addVideoControls(payload, model, params);
  if (typeof params.audio === 'boolean') payload.audio = params.audio;
  if (params.image_url) payload.image_url = params.image_url;
  if (params.last_image) payload.end_image_url = params.last_image;

  const response = await fetch(`${baseUrlFor('venice')}/video/queue`, {
    method: 'POST',
    headers: headersFor('venice', keyFor('venice')),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw await requestError(response, 'venice');
  const submitted = await response.json();
  if (!submitted.queue_id) throw new Error('Venice returned no video queue id.');

  const syntheticId = jobId('venice', submitted.queue_id, submitted.model || model.rawId);
  rememberJob(syntheticId, {
    provider: 'venice',
    remoteId: submitted.queue_id,
    model: submitted.model || model.rawId,
    downloadUrl: submitted.download_url || null,
  });
  params.onRequestId?.(syntheticId);
  try {
    return await pollVenice({
      provider: 'venice',
      remoteId: submitted.queue_id,
      model: submitted.model || model.rawId,
      syntheticId,
    });
  } finally {
    forgetJob(syntheticId);
  }
}

export const privacyVideoApi = {
  async generateVideo(params) {
    const model = modelFor(params?.model);
    if (!model) throw new Error(`Unknown privacy video model: ${params?.model}`);
    if (!params?.prompt?.trim()) throw new Error('A prompt is required for text-to-video generation.');
    if (model.provider === 'openrouter') return generateOpenRouter(model, params);
    if (model.provider === 'venice') return queueVenice(model, params);
    throw new Error(`Unsupported privacy video provider: ${model.provider}`);
  },

  async generateI2V(params) {
    const model = modelFor(params?.model);
    if (!model) throw new Error(`Unknown privacy video model: ${params?.model}`);
    if (model.provider !== 'venice') {
      throw new Error('Direct BYOK image-to-video is currently enabled for Venice only.');
    }
    if (!params?.image_url) throw new Error('A start-frame image is required for Venice image-to-video.');
    if (!params?.prompt?.trim()) throw new Error('A prompt is required for Venice image-to-video.');
    return queueVenice(model, params);
  },

  async pollForResult(requestId, { maxAttempts = 180, interval = 5000 } = {}) {
    const parsed = parseJobId(requestId);
    if (!parsed) throw new Error(`Unknown privacy video job: ${requestId}`);
    const remembered = readJob(requestId) || {};
    const job = {
      provider: parsed.provider,
      remoteId: parsed.remoteId,
      model: parsed.model || remembered.model,
      syntheticId: requestId,
    };
    if (parsed.provider === 'openrouter') return pollOpenRouter(job, maxAttempts, interval);
    if (parsed.provider === 'venice') return pollVenice(job, maxAttempts, interval);
    throw new Error(`Unsupported privacy video provider: ${parsed.provider}`);
  },
};
