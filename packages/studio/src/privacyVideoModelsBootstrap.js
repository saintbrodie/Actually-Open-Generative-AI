import { i2vModels, t2vModels } from './models.js';
import { getBootstrapPrivacyVideoModels, getFallbackPrivacyVideoModels } from './privacyVideoApi.js';

function providerConfigured(provider) {
  if (typeof window === 'undefined') return false;
  if (provider === 'venice') return Boolean(localStorage.getItem('venice_api_key')?.trim());
  if (provider === 'openrouter') return Boolean(localStorage.getItem('openrouter_api_key')?.trim());
  return false;
}

function orderedPrivacyVideoModels(mode, models = getBootstrapPrivacyVideoModels(mode)) {
  const fallbackIds = new Set(getFallbackPrivacyVideoModels(mode).map((model) => model.id));
  const ordered = models
    .filter((model) => fallbackIds.has(model.id) || providerConfigured(model.provider))
    .filter((model) => model.mode === mode)
    .map((model) => ({ ...model }));

  if (typeof window === 'undefined') return ordered;

  const hasVenice = providerConfigured('venice');
  const hasOpenRouter = providerConfigured('openrouter');
  if (hasOpenRouter && !hasVenice) {
    ordered.sort((a, b) => Number(b.provider === 'openrouter') - Number(a.provider === 'openrouter'));
  }
  return ordered;
}

function baseStudioModel(model) {
  const aspectRatios = model.supportedAspectRatios || [];
  const durations = model.supportedDurations || [];
  const resolutions = model.supportedResolutions || [];

  return {
    id: model.id,
    name: model.name,
    provider: model.provider,
    provider_name: model.provider === 'openrouter' ? 'OpenRouter' : 'Venice',
    promptRequired: true,
    inputs: {
      prompt: {
        type: 'string',
        title: 'Prompt',
        name: 'prompt',
        description: 'Describe the video you want to generate.',
      },
      ...(aspectRatios.length
        ? {
            aspect_ratio: {
              type: 'string',
              title: 'Aspect Ratio',
              name: 'aspect_ratio',
              default: aspectRatios[0],
              enum: aspectRatios,
            },
          }
        : {}),
      ...(durations.length
        ? {
            duration: {
              type: 'int',
              title: 'Duration',
              name: 'duration',
              default: durations[0],
              enum: durations,
            },
          }
        : {}),
      ...(resolutions.length
        ? {
            resolution: {
              type: 'string',
              title: 'Resolution',
              name: 'resolution',
              default: resolutions[0],
              enum: resolutions,
            },
          }
        : {}),
    },
  };
}

function toT2VModel(model) {
  return {
    ...baseStudioModel(model),
    required: ['prompt'],
  };
}

function toI2VModel(model) {
  const base = baseStudioModel(model);
  const imageField = model.imageField || 'image_url';
  return {
    ...base,
    imageField,
    maxImages: model.maxImages || 1,
    required: ['prompt', imageField],
    inputs: {
      ...base.inputs,
      [imageField]: {
        type: 'string',
        field: 'image',
        title: 'Start frame',
        name: imageField,
      },
    },
  };
}

function syncProviderModels(target, models, mapper) {
  const providerModels = models.map(mapper);
  const upstreamModels = target.filter((entry) => !entry?.id?.startsWith('privacy-video:'));
  target.splice(0, target.length, ...providerModels, ...upstreamModels);
}

export function applyPrivacyVideoModels(models = [
  ...getBootstrapPrivacyVideoModels('t2v'),
  ...getBootstrapPrivacyVideoModels('i2v'),
]) {
  const t2v = orderedPrivacyVideoModels('t2v', models);
  const i2v = orderedPrivacyVideoModels('i2v', models);
  syncProviderModels(t2vModels, t2v, toT2VModel);
  syncProviderModels(i2vModels, i2v, toI2VModel);
  return t2v.length + i2v.length;
}

applyPrivacyVideoModels();
