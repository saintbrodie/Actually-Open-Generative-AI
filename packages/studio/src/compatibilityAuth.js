import { PRIVACY_SENTINEL } from './privacyApi.js';

export const COMPATIBILITY_KEY_REQUIRED_MESSAGE =
  'This tool has not been ported to direct BYOK providers yet. Add a MuAPI compatibility key in Settings, or choose a Venice/OpenRouter model in a directly supported studio.';

export function hasCompatibilityKey(apiKey) {
  return Boolean(apiKey && apiKey !== PRIVACY_SENTINEL);
}

export function requireCompatibilityKey(apiKey) {
  if (!hasCompatibilityKey(apiKey)) {
    throw new Error(COMPATIBILITY_KEY_REQUIRED_MESSAGE);
  }
  return apiKey;
}

export function isDirectByokModelId(modelId) {
  return Boolean(
    typeof modelId === 'string' &&
      (modelId.startsWith('privacy:') || modelId.startsWith('privacy-video:')),
  );
}

export function shouldKeepReferenceUploadLocal(apiKey, modelId, fileType) {
  if (!String(fileType || '').startsWith('image/')) return false;
  return apiKey === PRIVACY_SENTINEL || isDirectByokModelId(modelId);
}
