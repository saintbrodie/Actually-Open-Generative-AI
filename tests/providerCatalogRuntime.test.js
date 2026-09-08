const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function source(relativePath) {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

async function importCatalogEvents() {
    const filename = path.join(process.cwd(), 'packages/studio/src/providerCatalogEvents.js');
    const encoded = Buffer.from(fs.readFileSync(filename, 'utf8')).toString('base64');
    return import(`data:text/javascript;base64,${encoded}#${Date.now()}-${Math.random()}`);
}

test('provider catalog revision store publishes once per refresh and unsubscribes cleanly', async () => {
    const events = await importCatalogEvents();
    const initial = events.getProviderCatalogRevision();
    let notifications = 0;
    const unsubscribe = events.subscribeProviderCatalog(() => {
        notifications += 1;
    });

    assert.equal(events.publishProviderCatalogRefresh(), initial + 1);
    assert.equal(events.getProviderCatalogRevision(), initial + 1);
    assert.equal(notifications, 1);

    unsubscribe();
    events.publishProviderCatalogRefresh();
    assert.equal(notifications, 1);
    assert.equal(events.getProviderCatalogServerSnapshot(), 0);
});

test('model family catalogs refresh in place so existing imports remain live', () => {
    const families = source('packages/studio/src/modelFamilies.js');

    assert.match(families, /export function refreshImageModelCatalog\(\)/);
    assert.match(families, /export function refreshVideoModelCatalog\(\)/);
    assert.match(
        families,
        /target\.families\.splice\(0, target\.families\.length, \.\.\.source\.families\)/,
    );
    assert.match(families, /target\.clear\(\)/);
    assert.match(
        families,
        /imageModelPickerEntries\.splice\([\s\S]*?\.\.\.nextEntries/,
    );
    assert.match(
        families,
        /videoModelPickerEntries\.splice\([\s\S]*?\.\.\.nextEntries/,
    );
});

test('mounted React studios subscribe to provider catalog revisions', () => {
    for (const relativePath of [
        'packages/studio/src/components/ImageStudio.jsx',
        'packages/studio/src/components/VideoStudio.jsx',
    ]) {
        const studio = source(relativePath);
        assert.match(studio, /useSyncExternalStore/);
        assert.match(studio, /subscribeProviderCatalog/);
        assert.match(studio, /getProviderCatalogRevision/);
    }
});

test('provider key changes refresh catalogs without forcing a page reload', () => {
    const hostedModal = source('components/ApiKeyModal.js');
    const desktopAuth = source('src/components/AuthModal.js');
    const desktopSettings = source('src/components/SettingsModal.js');
    const desktopModels = source('src/lib/models.js');

    assert.match(hostedModal, /notifyProviderKeysChanged\(\)/);
    assert.doesNotMatch(hostedModal, /location\.reload\(/);
    assert.match(desktopAuth, /notifyProviderKeysChanged\(\)/);
    assert.match(desktopSettings, /notifyProviderKeysChanged\(\)/);
    assert.match(desktopModels, /providerCatalogRuntime\.js/);
});

test('runtime rebuilds from current bootstrap state before publishing one React revision', () => {
    const runtime = source('packages/studio/src/providerCatalogRuntime.js');

    const applyImage = runtime.indexOf('applyPrivacyModels(currentImageModels())');
    const applyVideo = runtime.indexOf('applyPrivacyVideoModels(currentVideoModels())');
    const refreshImage = runtime.indexOf('catalogs.refreshImageModelCatalog()');
    const refreshVideo = runtime.indexOf('catalogs.refreshVideoModelCatalog()');
    const publish = runtime.indexOf('publishProviderCatalogRefresh()');

    assert.ok(applyImage >= 0 && refreshImage > applyImage);
    assert.ok(applyVideo >= 0 && refreshVideo > applyVideo);
    assert.ok(publish > refreshImage && publish > refreshVideo);
    assert.match(runtime, /if \(refreshPromise\) return refreshPromise/);
    assert.doesNotMatch(runtime, /!hasPrivacyKey\(\).*return false/);
});

test('provider bootstrap sync removes stale discovered-only models while retaining upstream models', () => {
    const imageBootstrap = source('packages/studio/src/privacyModelsBootstrap.js');
    const videoBootstrap = source('packages/studio/src/privacyVideoModelsBootstrap.js');

    assert.match(imageBootstrap, /getFallbackPrivacyModels/);
    assert.match(imageBootstrap, /fallbackIds\.has\(model\.id\) \|\| providerConfigured\(model\.provider\)/);
    assert.match(imageBootstrap, /!entry\?\.id\?\.startsWith\('privacy:'\)/);
    assert.match(imageBootstrap, /target\.splice\(0, target\.length, \.\.\.providerModels, \.\.\.upstreamModels\)/);

    assert.match(videoBootstrap, /getFallbackPrivacyVideoModels/);
    assert.match(videoBootstrap, /fallbackIds\.has\(model\.id\) \|\| providerConfigured\(model\.provider\)/);
    assert.match(videoBootstrap, /!entry\?\.id\?\.startsWith\('privacy-video:'\)/);
    assert.match(videoBootstrap, /target\.splice\(0, target\.length, \.\.\.providerModels, \.\.\.upstreamModels\)/);
});
