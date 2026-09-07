import { MuapiClient as UpstreamMuapiClient } from './upstreamMuapi.js';
import { PRIVACY_SENTINEL, isPrivacyModelId, privacyApi } from './privacyApi.js';

/**
 * Compatibility router.
 *
 * The upstream client remains available for features that have not yet been
 * ported to direct-provider APIs. Privacy-prefixed image models bypass it and
 * go directly to Venice or OpenRouter using the user's own provider key.
 */
export class MuapiClient extends UpstreamMuapiClient {
    getKey() {
        const key = super.getKey();
        if (key === PRIVACY_SENTINEL) {
            throw new Error(
                'This feature is not yet available through the BYOK provider adapters. ' +
                'Choose a Venice/OpenRouter image model, use local inference, or add a MuAPI key for compatibility features.'
            );
        }
        return key;
    }

    async generateImage(params) {
        if (isPrivacyModelId(params?.model)) {
            return privacyApi.generateImage(params);
        }
        return super.generateImage(params);
    }
}

export const muapi = new MuapiClient();
