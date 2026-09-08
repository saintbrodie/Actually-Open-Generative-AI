const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function importCompatibilityAuth() {
    const filename = path.join(process.cwd(), 'packages/studio/src/compatibilityAuth.js');
    const source = fs.readFileSync(filename, 'utf8').replace(
        "import { PRIVACY_SENTINEL } from './privacyApi.js';",
        "const PRIVACY_SENTINEL = '__actually_open_byok__';",
    );
    const encoded = Buffer.from(source).toString('base64');
    return import(`data:text/javascript;base64,${encoded}#${Date.now()}-${Math.random()}`);
}

test('compatibility auth rejects missing and BYOK sentinel keys locally', async () => {
    const {
        COMPATIBILITY_KEY_REQUIRED_MESSAGE,
        hasCompatibilityKey,
        requireCompatibilityKey,
    } = await importCompatibilityAuth();

    assert.equal(hasCompatibilityKey(null), false);
    assert.equal(hasCompatibilityKey(''), false);
    assert.equal(hasCompatibilityKey('__actually_open_byok__'), false);
    assert.throws(
        () => requireCompatibilityKey('__actually_open_byok__'),
        (error) => error.message === COMPATIBILITY_KEY_REQUIRED_MESSAGE,
    );
});

test('compatibility auth accepts a real compatibility key unchanged', async () => {
    const { hasCompatibilityKey, requireCompatibilityKey } = await importCompatibilityAuth();
    const key = 'muapi-real-key';
    assert.equal(hasCompatibilityKey(key), true);
    assert.equal(requireCompatibilityKey(key), key);
});

test('reference upload routing follows the selected direct-provider model, not the broadest session key', async () => {
    const {
        isDirectByokModelId,
        shouldKeepReferenceUploadLocal,
    } = await importCompatibilityAuth();

    assert.equal(isDirectByokModelId('privacy:venice:nano-banana-pro-edit'), true);
    assert.equal(isDirectByokModelId('privacy-video:venice:seedance-i2v'), true);
    assert.equal(isDirectByokModelId('nano-banana-pro-edit'), false);

    // A real compatibility key must not force direct-provider image references
    // through the compatibility uploader.
    assert.equal(
        shouldKeepReferenceUploadLocal(
            'muapi-real-key',
            'privacy:openrouter:bytedance-seed/seedream-4.5-edit',
            'image/png',
        ),
        true,
    );
    assert.equal(
        shouldKeepReferenceUploadLocal(
            'muapi-real-key',
            'privacy-video:venice:seedance-2-0-fast-image-to-video',
            'image/jpeg',
        ),
        true,
    );

    assert.equal(
        shouldKeepReferenceUploadLocal('muapi-real-key', 'nano-banana-edit', 'image/png'),
        false,
    );
    assert.equal(
        shouldKeepReferenceUploadLocal(
            '__actually_open_byok__',
            'privacy-video:venice:seedance-2-0-fast-image-to-video',
            'video/mp4',
        ),
        false,
    );
});
