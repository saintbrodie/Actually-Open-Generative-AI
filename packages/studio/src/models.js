// Static fallbacks for Venice and OpenRouter models
export const t2iModels = [
  {
    id: "flux-dev",
    name: "Flux Dev",
    provider: "venice",
    inputs: {
      aspect_ratio: { default: "1:1" }
    }
  },
  {
    id: "fluently-xl",
    name: "Fluently XL",
    provider: "venice",
    inputs: {
      aspect_ratio: { default: "1:1" }
    }
  },
  {
    id: "black-forest-labs/flux-1.1-pro",
    name: "Flux 1.1 Pro (OR)",
    provider: "openrouter",
    inputs: {
      aspect_ratio: { default: "1:1" }
    }
  }
];

export const i2iModels = t2iModels;
export const t2vModels = [];
export const i2vModels = [];
export const v2vModels = [];
export const lipsyncModels = [];
export const imageLipSyncModels = [];
export const videoLipSyncModels = [];

export function getModelById(id) {
    return t2iModels.find(m => m.id === id) || { id, name: id, inputs: {} };
}

export function getAspectRatiosForModel(id) {
    return ["1:1", "16:9", "9:16", "3:4", "4:3"];
}

export function getResolutionsForModel(id) {
    return [];
}

export function getQualityFieldForModel(id) {
    return null;
}

export function getAspectRatiosForI2IModel(id) {
    return ["1:1", "16:9", "9:16", "3:4", "4:3"];
}

export function getResolutionsForI2IModel(id) {
    return [];
}

export function getQualityFieldForI2IModel(id) {
    return null;
}

export function getMaxImagesForI2IModel(id) {
    return 1;
}

export function getAspectRatiosForVideoModel(id) { return ["16:9", "9:16", "1:1"]; }
export function getDurationsForModel(id) { return ["5s"]; }
export function getResolutionsForVideoModel(id) { return ["720p"]; }

export function getAspectRatiosForI2VModel(id) { return ["16:9", "9:16", "1:1"]; }
export function getDurationsForI2VModel(id) { return ["5s"]; }
export function getResolutionsForI2VModel(id) { return ["720p"]; }

export function getModesForModel(id) { return ["standard"]; }

export function getLipSyncModelById(id) { return { id, name: id }; }
export function getResolutionsForLipSyncModel(id) { return ["720p"]; }
