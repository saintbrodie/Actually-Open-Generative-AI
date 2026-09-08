import { hasPrivacyKey, refreshPrivacyModelCache } from './privacyApi.js';
import { refreshPrivacyVideoModelCache } from './privacyVideoApi.js';
import { applyPrivacyModels } from './privacyModelsBootstrap.js';
import { applyPrivacyVideoModels } from './privacyVideoModelsBootstrap.js';
import { publishProviderCatalogRefresh } from './providerCatalogEvents.js';

export const PROVIDER_KEYS_CHANGED_EVENT = 'actually-open:provider-keys-changed';

let refreshPromise = null;

export async function refreshProviderCatalogs() {
  if (typeof window === 'undefined' || !hasPrivacyKey()) return false;
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const [imageModels, videoModels] = await Promise.all([
      refreshPrivacyModelCache(),
      refreshPrivacyVideoModelCache(),
    ]);

    let changed = false;
    if (imageModels.length) {
      applyPrivacyModels(imageModels);
      changed = true;
    }
    if (videoModels.length) {
      applyPrivacyVideoModels(videoModels);
      changed = true;
    }

    if (!changed) return false;

    // Import lazily so the initial bootstrap can populate the upstream model
    // arrays before modelFamilies.js performs its first synchronous build.
    const catalogs = await import('./modelFamilies.js');
    if (imageModels.length) catalogs.refreshImageModelCatalog();
    if (videoModels.length) catalogs.refreshVideoModelCatalog();
    publishProviderCatalogRefresh();
    return true;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

export function notifyProviderKeysChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(PROVIDER_KEYS_CHANGED_EVENT));
}

if (typeof window !== 'undefined') {
  window.addEventListener(PROVIDER_KEYS_CHANGED_EVENT, () => {
    refreshProviderCatalogs().catch((error) => {
      console.warn('[Provider Catalog] key-change refresh failed:', error.message);
    });
  });

  if (hasPrivacyKey()) {
    window.setTimeout(() => {
      refreshProviderCatalogs().catch((error) => {
        console.warn('[Provider Catalog] initial refresh failed:', error.message);
      });
    }, 0);
  }
}
