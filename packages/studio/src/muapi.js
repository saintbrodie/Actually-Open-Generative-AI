import * as upstream from './upstreamMuapi.js';
import { isPrivacyModelId, privacyApi } from './privacyApi.js';

export * from './upstreamMuapi.js';

/**
 * Direct-provider override for text-to-image. All other functions continue to
 * use the upstream implementation until a matching provider adapter exists.
 */
export async function generateImage(apiKey, params) {
  if (isPrivacyModelId(params?.model)) {
    return privacyApi.generateImage(params);
  }
  return upstream.generateImage(apiKey, params);
}
