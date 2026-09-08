import {
  getBootstrapPrivacyModels,
  hasPrivacyKey,
  refreshPrivacyModelCache,
} from './privacyApi.js';
import {
  getBootstrapPrivacyVideoModels,
  refreshPrivacyVideoModelCache,
} from './privacyVideoApi.js';
import { applyPrivacyModels } from './privacyModelsBootstrap.js';
import { applyPrivacyVideoModels } from './privacyVideoModelsBootstrap.js';
import { publishProviderCatalogRefresh } from './providerCatalogEvents.js';

export const PROVIDER_KEYS_CHANGED_EVENT = 'actually-open:provider-keys-changed';

let refreshPromise = null;

function currentImageModels() {
  return [
    ...getBootstrapPrivacyModels('t2i'),
    ...getBootstrapPrivacyModels('i2i'),
  ];
}

function currentVideoModels() {
  return [
    ...getBootstrapPrivacyVideoModels('t2v'),
    ...getBootstrapPrivacyVideoModels('i2v'),
  ];
}

export async function refreshProviderCatalogs() {
  if (typeof window === 'undefined') return false;
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    // With provider credentials, refresh caches first. Without credentials we
    // still rebuild from fallbacks/current cache policy so discovered-only
    // entries from removed providers are pruned immediately.
    if (hasPrivacyKey()) {
      await Promise.all([
        refreshPrivacyModelCache(),
        refreshPrivacyVideoModelCache(),
      ]);
    }

    applyPrivacyModels(currentImageModels());
    applyPrivacyVideoModels(currentVideoModels());

    // Import lazily so the initial bootstrap can populate the upstream model
    // arrays before modelFamilies.js performs its first synchronous build.
    const catalogs = await import('./modelFamilies.js');
    catalogs.refreshImageModelCatalog();
    catalogs.refreshVideoModelCatalog();
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

  // Run once after startup even when no provider key exists so stale cached
  // discovery entries cannot survive a previous credential removal.
  window.setTimeout(() => {
    refreshProviderCatalogs().catch((error) => {
      console.warn('[Provider Catalog] initial refresh failed:', error.message);
    });
  }, 0);
}
