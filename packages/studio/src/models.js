import * as upstream from './upstreamModels.js';
import { getFallbackPrivacyModels, getPrivacyModel, isPrivacyModelId } from './privacyApi.js';

export * from './upstreamModels.js';

const DEFAULT_ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3', '21:9'];

function orderedFallbacks() {
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
  const aspectValues = model.supportedParameters?.aspect_ratio?.values;
  const resolutionValues = model.supportedParameters?.resolution?.values;
  return {
    id: model.id,
    name: model.name,
    provider: model.provider,
    provider_name: model.provider === 'openrouter' ? 'OpenRouter' : 'Venice',
    family: 'byok',
    inputs: {
      aspect_ratio: {
        type: 'string',
        default: Array.isArray(aspectValues) && aspectValues.length ? aspectValues[0] : '1:1',
        ...(Array.isArray(aspectValues) && aspectValues.length ? { enum: aspectValues } : {}),
      },
      ...(Array.isArray(resolutionValues) && resolutionValues.length
        ? { resolution: { type: 'string', default: resolutionValues[0], enum: resolutionValues } }
        : {}),
    },
    privacyModel: model,
  };
}

const privacyModels = orderedFallbacks().map(toStudioModel);
export const t2iModels = [...privacyModels, ...upstream.t2iModels];

export const getModelById = (id) => {
  if (!isPrivacyModelId(id)) return upstream.getModelById(id);
  return t2iModels.find((model) => model.id === id) || toStudioModel(getPrivacyModel(id));
};

export const getAspectRatiosForModel = (modelId) => {
  if (!isPrivacyModelId(modelId)) return upstream.getAspectRatiosForModel(modelId);
  const values = getPrivacyModel(modelId)?.supportedParameters?.aspect_ratio?.values;
  return Array.isArray(values) && values.length ? values : DEFAULT_ASPECT_RATIOS;
};

export const getResolutionsForModel = (modelId) => {
  if (!isPrivacyModelId(modelId)) return upstream.getResolutionsForModel(modelId);
  const values = getPrivacyModel(modelId)?.supportedParameters?.resolution?.values;
  return Array.isArray(values) ? values : [];
};

export const getQualityFieldForModel = (modelId) => {
  if (!isPrivacyModelId(modelId)) return upstream.getQualityFieldForModel(modelId);
  return getResolutionsForModel(modelId).length ? 'resolution' : null;
};
