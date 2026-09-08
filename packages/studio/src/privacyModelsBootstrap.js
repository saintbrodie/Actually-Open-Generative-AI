import { i2iModels, t2iModels } from './models.js';
import { getBootstrapPrivacyModels } from './privacyApi.js';

function orderedPrivacyModels(mode, models = getBootstrapPrivacyModels(mode)) {
  const ordered = models.filter((model) => model.mode === mode).map((model) => ({ ...model }));
  if (typeof window === 'undefined') return ordered;

  const hasVenice = Boolean(localStorage.getItem('venice_api_key')?.trim());
  const hasOpenRouter = Boolean(localStorage.getItem('openrouter_api_key')?.trim());
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

function upsertModels(target, models, mapper) {
  const additions = [];
  for (const model of models) {
    const mapped = mapper(model);
    const index = target.findIndex((entry) => entry.id === mapped.id);
    if (index >= 0) target[index] = mapped;
    else additions.push(mapped);
  }
  target.unshift(...additions);
  return additions.length + models.length;
}

export function applyPrivacyModels(models) {
  const t2i = orderedPrivacyModels('t2i', models);
  const i2i = orderedPrivacyModels('i2i', models);
  upsertModels(t2iModels, t2i, toT2IModel);
  upsertModels(i2iModels, i2i, toI2IModel);
  return t2i.length + i2i.length;
}

applyPrivacyModels([
  ...getBootstrapPrivacyModels('t2i'),
  ...getBootstrapPrivacyModels('i2i'),
]);
