import { MuapiClient as UpstreamMuapiClient } from './upstreamMuapi.js';
import { PRIVACY_SENTINEL, isPrivacyModelId, privacyApi } from './privacyApi.js';
import { isPrivacyVideoJobId, isPrivacyVideoModelId, privacyVideoApi } from 'studio/src/privacyVideoApi.js';
import { installProviderFetchBridge } from './providerFetchBridge.js';

// Electron keeps Chromium webSecurity enabled. Install the narrow provider
// transport before any user-initiated BYOK call so provider-origin requests use
// the preload/main-process IPC bridge instead of relying on file:// CORS.
installProviderFetchBridge();

/**
 * Compatibility router for the standalone Vite/Electron shell.
 *
 * The upstream client remains available for features that have not yet been
 * ported to direct-provider APIs. Privacy-prefixed image/video models bypass it
 * and go directly to Venice or OpenRouter using the user's own provider key.
 */
export class MuapiClient extends UpstreamMuapiClient {
    getKey() {
        const key = super.getKey();
        if (key === PRIVACY_SENTINEL) {
            throw new Error(
                'This feature is not yet available through the BYOK provider adapters. ' +
                'Choose a Venice/OpenRouter image or text-to-video model, a Venice image-to-video model, ' +
                'use local inference, or add a MuAPI key for compatibility features.'
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

    async generateI2I(params) {
        if (isPrivacyModelId(params?.model)) {
            return privacyApi.generateI2I(params);
        }
        return super.generateI2I(params);
    }

    async generateVideo(params) {
        if (isPrivacyVideoModelId(params?.model)) {
            return privacyVideoApi.generateVideo(params);
        }
        return super.generateVideo(params);
    }

    async generateI2V(params) {
        if (isPrivacyVideoModelId(params?.model)) {
            return privacyVideoApi.generateI2V(params);
        }
        return super.generateI2V(params);
    }

    async pollForResult(requestId, key, maxAttempts = 900, interval = 2000) {
        if (isPrivacyVideoJobId(requestId)) {
            return privacyVideoApi.pollForResult(requestId, { maxAttempts, interval });
        }
        return super.pollForResult(requestId, key, maxAttempts, interval);
    }

    async uploadFile(file) {
        // Do not send BYOK-only image references through the compatibility
        // uploader. Data URLs can be consumed directly by Venice image/edit
        // and video queue APIs.
        if (localStorage.getItem('muapi_key') === PRIVACY_SENTINEL) {
            return privacyApi.fileToDataUrl(file);
        }
        return super.uploadFile(file);
    }
}

export const muapi = new MuapiClient();
