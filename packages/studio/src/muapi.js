import * as upstream from './upstreamMuapi.js';
import { PRIVACY_SENTINEL, isPrivacyModelId, privacyApi } from './privacyApi.js';
import { isPrivacyVideoModelId, privacyVideoApi } from './privacyVideoApi.js';

export * from './upstreamMuapi.js';

/**
 * Compatibility router for the React/Next studio package.
 *
 * Privacy-prefixed image/video models bypass the upstream API entirely. Other
 * cloud tools continue through the upstream compatibility client until a
 * matching direct-provider adapter exists.
 */
export async function generateImage(apiKey, params) {
  if (isPrivacyModelId(params?.model)) {
    return privacyApi.generateImage(params);
  }
  return upstream.generateImage(apiKey, params);
}

export async function generateI2I(apiKey, params) {
  if (isPrivacyModelId(params?.model)) {
    return privacyApi.generateI2I(params);
  }
  return upstream.generateI2I(apiKey, params);
}

export async function generateVideo(apiKey, params) {
  if (isPrivacyVideoModelId(params?.model)) {
    return privacyVideoApi.generateVideo(params);
  }
  return upstream.generateVideo(apiKey, params);
}

export async function generateI2V(apiKey, params) {
  if (isPrivacyVideoModelId(params?.model)) {
    return privacyVideoApi.generateI2V(params);
  }
  return upstream.generateI2V(apiKey, params);
}

export function uploadFile(apiKey, file, onProgress) {
  // In a BYOK-only session, keep image references in the browser as data URLs.
  // This prevents the source image from being uploaded to the compatibility
  // backend merely to obtain a temporary public URL.
  if (apiKey === PRIVACY_SENTINEL) {
    return privacyApi.fileToDataUrl(file, onProgress);
  }
  return upstream.uploadFile(apiKey, file, onProgress);
}

export async function getUserBalance(apiKey) {
  if (!apiKey || apiKey === PRIVACY_SENTINEL) return { balance: null };
  return upstream.getUserBalance(apiKey);
}
