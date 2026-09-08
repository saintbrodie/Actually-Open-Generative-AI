import { i2iModels, t2iModels } from './models.js';
import { getBootstrapPrivacyModels, getFallbackPrivacyModels } from './privacyApi.js';

function providerConfigured(provider) {
  if (typeof window === 'undefined') return false;
  if (provider === 'venice') return Boolean(localStorage.getItem('venice_api_key')?.trim());
  if (provider === 'openrouter') return Boolean(localStorage.getItem('openrouter_api_key')?.trim());
  return false;
}

function orderedPrivacyModels(mode, models = getBootstrapPrivacyModels(mode)) {
  const fallbackIds = new Set(getFallbackPrivacyModels(mode).map((model) => model.id));
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

function commonModelFields(model) {
  const aspectRatios = model.supportedParameters?.aspect_ratio?.values;
  const resolutions = model.supportedParameters?.resolution?.values;

  return {
    id: model.id,
    name: model.name,
    provider: model.provider,
    provider_name: model.provider === 'openrouter' ? 'OpenRouter' : 'Venice',
    inputs: {
      prompt: {
        type: 'string',
        title: 'Prompt',
        name: 'prompt',
      },
      aspect_ratio: {
        type: 'string',
        default: Array.isArray(aspectRatios) && aspectRatios.length ? aspectRatios[0] : '1:1',
        ...(Array.isArray(aspectRatios) && aspectRatios.length ? { enum: aspectRatios } : {}),
      },
      ...(Array.isArray(resolutions) && resolutions.length
        ? {
            resolution: {
              type: 'string',
              default: resolutions[0],
              enum: resolutions,
            },
          }
        : {}),
    },
  };
}

function toT2IModel(model) {
  return commonModelFields(model);
}

function toI2IModel(model) {
  return {
    ...commonModelFields(model),
    imageField: 'images_list',
    hasPrompt: true,
    promptRequired: true,
    maxImages: model.maxImages || model.supportedParameters?.input_references?.max || 1,
    required: ['images_list', 'prompt'],
  };
}

function syncProviderModels(target, models, mapper) {
  const providerModels = models.map(mapper);
  const upstreamModels = target.filter((entry) => !entry?.id?.startsWith('privacy:'));
  target.splice(0, target.length, ...providerModels, ...upstreamModels);
}

export function applyPrivacyModels(models = [
  ...getBootstrapPrivacyModels('t2i'),
  ...getBootstrapPrivacyModels('i2i'),
]) {
  const t2i = orderedPrivacyModels('t2i', models);
  const i2i = orderedPrivacyModels('i2i', models);
  syncProviderModels(t2iModels, t2i, toT2IModel);
  syncProviderModels(i2iModels, i2i, toI2IModel);
  return t2i.length + i2i.length;
}

applyPrivacyModels();
