import { i2vModels, t2vModels } from './models.js';
import {
  getBootstrapPrivacyVideoModels,
  refreshPrivacyVideoModelCache,
} from './privacyVideoApi.js';

function orderedPrivacyVideoModels(mode) {
  const models = getBootstrapPrivacyVideoModels(mode);
  if (typeof window === 'undefined') return models;

  const hasVenice = Boolean(localStorage.getItem('venice_api_key')?.trim());
  const hasOpenRouter = Boolean(localStorage.getItem('openrouter_api_key')?.trim());
  if (hasOpenRouter && !hasVenice) {
    models.sort((a, b) => Number(b.provider === 'openrouter') - Number(a.provider === 'openrouter'));
  }
  return models;
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
  return {
    ...baseStudioModel(model),
    imageField: model.imageField || 'image_url',
    maxImages: model.maxImages || 1,
    required: ['prompt', model.imageField || 'image_url'],
    inputs: {
      ...baseStudioModel(model).inputs,
      [model.imageField || 'image_url']: {
        type: 'string',
        field: 'image',
        title: 'Start frame',
        name: model.imageField || 'image_url',
      },
    },
  };
}

function prependMissing(target, models, mapper) {
  const existing = new Set(target.map((model) => model.id));
  const additions = models
    .filter((model) => !existing.has(model.id))
    .map(mapper);
  target.unshift(...additions);
}

prependMissing(t2vModels, orderedPrivacyVideoModels('t2v'), toT2VModel);
prependMissing(i2vModels, orderedPrivacyVideoModels('i2v'), toI2VModel);

// The upstream family/catalog maps are still created synchronously at module
// load, so discovery refreshes a short-lived cache rather than mutating those
// maps underneath mounted React components. Fresh provider metadata is picked
// up on the next load; conservative fallback entries remain available now.
if (typeof window !== 'undefined') {
  const hasProviderKey = Boolean(
    localStorage.getItem('venice_api_key')?.trim() ||
    localStorage.getItem('openrouter_api_key')?.trim(),
  );
  if (hasProviderKey) {
    window.setTimeout(() => {
      refreshPrivacyVideoModelCache().catch((error) => {
        console.warn('[Privacy Video Bootstrap] model refresh failed:', error.message);
      });
    }, 0);
  }
}
