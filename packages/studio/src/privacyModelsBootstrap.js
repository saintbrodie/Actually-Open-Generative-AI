import { i2iModels, t2iModels } from './models.js';
import { getFallbackPrivacyModels } from './privacyApi.js';

function orderedPrivacyModels(mode) {
  const models = getFallbackPrivacyModels(mode);
  if (typeof window === 'undefined') return models;

  const hasVenice = Boolean(localStorage.getItem('venice_api_key')?.trim());
  const hasOpenRouter = Boolean(localStorage.getItem('openrouter_api_key')?.trim());
  if (hasOpenRouter && !hasVenice) {
    models.sort((a, b) => Number(b.provider === 'openrouter') - Number(a.provider === 'openrouter'));
  }
  return models;
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

function prependMissing(target, models, mapper) {
  const existing = new Set(target.map((model) => model.id));
  const additions = models
    .filter((model) => !existing.has(model.id))
    .map(mapper);
  target.unshift(...additions);
}

prependMissing(t2iModels, orderedPrivacyModels('t2i'), toT2IModel);
prependMissing(i2iModels, orderedPrivacyModels('i2i'), toI2IModel);
