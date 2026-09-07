import { t2vModels } from './models.js';
import { getFallbackPrivacyVideoModels } from './privacyVideoApi.js';

function orderedPrivacyVideoModels() {
  const models = getFallbackPrivacyVideoModels();
  if (typeof window === 'undefined') return models;

  const hasVenice = Boolean(localStorage.getItem('venice_api_key')?.trim());
  const hasOpenRouter = Boolean(localStorage.getItem('openrouter_api_key')?.trim());
  if (hasOpenRouter && !hasVenice) {
    models.sort((a, b) => Number(b.provider === 'openrouter') - Number(a.provider === 'openrouter'));
  }
  return models;
}

function toStudioModel(model) {
  const aspectRatios = model.supportedAspectRatios || [];
  const durations = model.supportedDurations || [];
  const resolutions = model.supportedResolutions || [];

  return {
    id: model.id,
    name: model.name,
    provider: model.provider,
    provider_name: model.provider === 'openrouter' ? 'OpenRouter' : 'Venice',
    promptRequired: true,
    required: ['prompt'],
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

const existing = new Set(t2vModels.map((model) => model.id));
const additions = orderedPrivacyVideoModels()
  .filter((model) => !existing.has(model.id))
  .map(toStudioModel);

t2vModels.unshift(...additions);
