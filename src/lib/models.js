import * as upstream from 'studio/src/models.js';
import {
    discoverPrivacyModels,
    getFallbackPrivacyModels,
    getPrivacyModel,
    isPrivacyModelId,
} from './privacyApi.js';

// Keep every upstream export available to existing consumers. Explicit exports
// below intentionally override only the text-to-image catalog helpers.
export * from 'studio/src/models.js';

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
    return {
        id: model.id,
        name: model.name,
        provider: model.provider,
        family: 'byok',
        inputs: {
            aspect_ratio: {
                default: Array.isArray(aspectValues) && aspectValues.length ? aspectValues[0] : '1:1',
                ...(Array.isArray(aspectValues) && aspectValues.length ? { enum: aspectValues } : {}),
            },
        },
        privacyModel: model,
    };
}

const privacyFallbacks = orderedFallbacks().map(toStudioModel);
export const t2iModels = [...privacyFallbacks, ...upstream.t2iModels];

function replacePrivacyModels(models) {
    const next = models.map(toStudioModel);
    for (let i = t2iModels.length - 1; i >= 0; i -= 1) {
        if (isPrivacyModelId(t2iModels[i]?.id)) t2iModels.splice(i, 1);
    }
    t2iModels.unshift(...next);
}

export async function refreshPrivacyModels() {
    const models = await discoverPrivacyModels();
    replacePrivacyModels(models);
    return models;
}

export const getModelById = (id) => {
    if (isPrivacyModelId(id)) {
        const studioModel = t2iModels.find((model) => model.id === id);
        if (studioModel) return studioModel;
        const privacyModel = getPrivacyModel(id);
        return privacyModel ? toStudioModel(privacyModel) : undefined;
    }
    return upstream.getModelById(id);
};

export const getAspectRatiosForModel = (modelId) => {
    if (!isPrivacyModelId(modelId)) return upstream.getAspectRatiosForModel(modelId);
    const model = getPrivacyModel(modelId);
    const values = model?.supportedParameters?.aspect_ratio?.values;
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

// Model discovery is best-effort. Static fallbacks remain available if either
// provider is offline or rejects the catalog request.
if (typeof window !== 'undefined') {
    queueMicrotask(() => {
        refreshPrivacyModels().catch((error) => {
            console.warn('[Privacy API] Model refresh failed:', error.message);
        });
    });
}
