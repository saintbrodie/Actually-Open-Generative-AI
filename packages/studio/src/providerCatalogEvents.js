let revision = 0;
const listeners = new Set();

export function getProviderCatalogRevision() {
  return revision;
}

export function getProviderCatalogServerSnapshot() {
  return 0;
}

export function subscribeProviderCatalog(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function publishProviderCatalogRefresh() {
  revision += 1;
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch (error) {
      console.warn('[Provider Catalog] subscriber failed:', error);
    }
  }
  return revision;
}
