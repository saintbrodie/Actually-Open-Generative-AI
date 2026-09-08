const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function source(relativePath) {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

test('hosted key modal no longer mints a fake MuAPI credential for BYOK-only sessions', () => {
    const modal = source('components/ApiKeyModal.js');

    assert.match(modal, /onSave\(muapi \|\| null\)/);
    assert.doesNotMatch(modal, /onSave\(muapi \|\| PRIVACY_SENTINEL\)/);
    assert.match(modal, /LEGACY_PRIVACY_SENTINEL/);
});

test('hosted shell mounts on either direct-provider or real compatibility auth', () => {
    const shell = source('components/StandaloneShell.js');

    assert.match(shell, /const \[hasProviderKey, setHasProviderKey\] = useState\(false\)/);
    assert.match(shell, /showKeyModal \|\| \(!apiKey && !hasProviderKey\)/);
    assert.match(shell, /localStorage\.getItem\('venice_api_key'\)/);
    assert.match(shell, /localStorage\.getItem\('openrouter_api_key'\)/);
});

test('legacy sentinel is removed instead of becoming a cookie or compatibility request key', () => {
    const shell = source('components/StandaloneShell.js');

    assert.match(shell, /stored === LEGACY_PRIVACY_SENTINEL/);
    assert.match(shell, /localStorage\.removeItem\(STORAGE_KEY\)/);
    assert.match(shell, /document\.cookie = "muapi_key=; path=\/; expires=Thu, 01 Jan 1970 00:00:00 GMT"/);
    assert.doesNotMatch(shell, /setApiKey\(LEGACY_PRIVACY_SENTINEL\)/);
    assert.doesNotMatch(shell, /muapi_key=\$\{LEGACY_PRIVACY_SENTINEL\}/);
});

test('BYOK-only settings guard compatibility-key formatting behind a null check', () => {
    const shell = source('components/StandaloneShell.js');

    assert.match(shell, /apiKey\s*\? `\$\{apiKey\.slice\(0, 8\)\}/);
    assert.match(shell, /Direct BYOK · no MuAPI compatibility key/);
});
