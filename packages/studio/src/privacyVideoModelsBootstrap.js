import { i2vModels, t2vModels } from './models.js';
import { getBootstrapPrivacyVideoModels } from './privacyVideoApi.js';

function orderedPrivacyVideoModels(mode, models = getBootstrapPrivacyVideoModels(mode)) {
  const ordered = models.filter((model) => model.mode === mode).map((model) => ({ ...model }));
  if (typeof window === 'undefined') return ordered;

  const hasVenice = Boolean(localStorage.getItem('venice_api_key')?.trim());
  const hasOpenRouter = Boolean(localStorage.getItem('openrouter_api_key')?.trim());
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

function upsertModels(target, models, mapper) {
  const additions = [];
  for (const model of models) {
    const mapped = mapper(model);
    const index = target.findIndex((entry) => entry.id === mapped.id);
    if (index >= 0) target[index] = mapped;
    else additions.push(mapped);
  }
  target.unshift(...additions);
}

export function applyPrivacyVideoModels(models) {
  const t2v = orderedPrivacyVideoModels('t2v', models);
  const i2v = orderedPrivacyVideoModels('i2v', models);
  upsertModels(t2vModels, t2v, toT2VModel);
  upsertModels(i2vModels, i2v, toI2VModel);
  return t2v.length + i2v.length;
}

applyPrivacyVideoModels([
  ...getBootstrapPrivacyVideoModels('t2v'),
  ...getBootstrapPrivacyVideoModels('i2v'),
]);
