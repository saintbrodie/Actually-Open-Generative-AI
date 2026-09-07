import { t2iModels } from './models.js';
import { getFallbackPrivacyModels } from './privacyApi.js';

function orderedPrivacyModels() {
  const models = getFallbackPrivacyModels();
  if (typeof window === 'undefined') return models;

  const hasVenice = Boolean(localStorage.getItem('venice_api_key')?.trim());
  const hasOpenRouter = Boolean(localStorage.getItem('openrouter_api_key')?.trim());
  if (hasOpenRouter && !hasVenice) {
    models.sort((a, b) => Number(b.provider === 'openrouter') - Number(a.provider === 'openrouter'));
  }
  return models;
}

function toStudioModel(model) {
  const aspectRatios = model.supportedParameters?.aspect_ratio?.values;
  const resolutions = model.supportedParameters?.resolution?.values;

  return {
    id: model.id,
    name: model.name,
    provider: model.provider,
    provider_name: model.provider === 'openrouter' ? 'OpenRouter' : 'Venice',
    inputs: {
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

const existing = new Set(t2iModels.map((model) => model.id));
const additions = orderedPrivacyModels()
  .filter((model) => !existing.has(model.id))
  .map(toStudioModel);

t2iModels.unshift(...additions);
