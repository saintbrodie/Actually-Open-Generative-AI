const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function source(relativePath) {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

test('desktop auth editors migrate legacy sentinel values but never mint new ones', () => {
    const auth = source('src/components/AuthModal.js');
    const settings = source('src/components/SettingsModal.js');
    const privacy = source('packages/studio/src/privacyApi.js');

    assert.match(auth, /existingMuapi === PRIVACY_SENTINEL/);
    assert.match(auth, /localStorage\.removeItem\('muapi_key'\)/);
    assert.doesNotMatch(auth, /syncPrivacyCompatibilitySentinel\(\)/);

    assert.match(settings, /storedMuapiKey === PRIVACY_SENTINEL/);
    assert.doesNotMatch(settings, /syncPrivacyCompatibilitySentinel\(\)/);

    assert.match(privacy, /syncPrivacyCompatibilitySentinel\(\)/);
    assert.match(privacy, /getItem\('muapi_key'\) === PRIVACY_SENTINEL/);
    assert.doesNotMatch(privacy, /setItem\('muapi_key', PRIVACY_SENTINEL\)/);
});

test('desktop direct-provider auth is scoped to the selected image or video provider', () => {
    const imageStudio = source('src/components/ImageStudio.js');
    const videoStudio = source('src/components/VideoStudio.js');
    const privacy = source('packages/studio/src/privacyApi.js');
    const privacyVideo = source('packages/studio/src/privacyVideoApi.js');

    assert.match(privacy, /export function hasPrivacyKeyForModel\(modelId\)/);
    assert.match(privacy, /config\.keyStorage/);
    assert.match(imageStudio, /hasPrivacyKeyForModel\(selectedModel\)/);
    assert.match(imageStudio, /directProviderModel = isPrivacyModelId\(selectedModel\)/);

    assert.match(privacyVideo, /export function hasPrivacyVideoKeyForModel\(modelId\)/);
    assert.match(privacyVideo, /config\.keyStorage/);
    assert.match(videoStudio, /hasPrivacyVideoKeyForModel\(selectedModel\)/);
    assert.match(videoStudio, /directProviderModel = isPrivacyVideoModelId\(selectedModel\)/);
});

test('desktop reference uploads route by selected model rather than a fake session credential', () => {
    const muapi = source('src/lib/muapi.js');
    const imageStudio = source('src/components/ImageStudio.js');
    const videoStudio = source('src/components/VideoStudio.js');

    assert.match(muapi, /async uploadFile\(file, modelId = null\)/);
    assert.match(muapi, /isPrivacyModelId\(modelId\) \|\| isPrivacyVideoModelId\(modelId\)/);
    assert.doesNotMatch(muapi, /getItem\('muapi_key'\) === PRIVACY_SENTINEL[\s\S]*?fileToDataUrl/);

    assert.match(imageStudio, /muapi\.uploadFile\(file, selectedModel\)/);
    assert.match(imageStudio, /requireApiKey: \(\) => !useLocalModel && !isPrivacyModelId\(selectedModel\)/);

    const videoUploadMatches = videoStudio.match(/muapi\.uploadFile\(file, selectedModel\)/g) || [];
    assert.equal(videoUploadMatches.length, 2);
    assert.match(videoStudio, /requireApiKey: \(\) => !isWan2gpModelId\(selectedModel\) && !isPrivacyVideoModelId\(selectedModel\)/);
});

test('desktop direct-provider video jobs resume without MuAPI compatibility auth', () => {
    const videoStudio = source('src/components/VideoStudio.js');
    const muapi = source('src/lib/muapi.js');

    assert.match(videoStudio, /pending\.filter\(\(job\) => isPrivacyVideoJobId\(job\.requestId\) \|\| apiKey\)/);
    assert.match(videoStudio, /resumable\.forEach\(async \(job\) =>/);
    assert.match(muapi, /if \(isPrivacyVideoJobId\(requestId\)\)/);
    assert.match(muapi, /privacyVideoApi\.pollForResult\(requestId, \{ maxAttempts, interval \}\)/);
});
