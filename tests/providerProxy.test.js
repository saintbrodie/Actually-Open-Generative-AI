const test = require('node:test');
const assert = require('node:assert/strict');

const {
    validatePath,
    validHttpReferer,
    filteredHeaders,
    prepareProviderRequest,
} = require('../electron/lib/providerProxy');

test('provider proxy allows only expected Venice media/model paths', () => {
    assert.equal(validatePath('venice', '/models?type=image'), '/models?type=image');
    assert.equal(validatePath('venice', '/image/generate'), '/image/generate');
    assert.equal(validatePath('venice', '/image/edit'), '/image/edit');
    assert.equal(validatePath('venice', '/image/multi-edit'), '/image/multi-edit');
    assert.equal(validatePath('venice', '/video/queue'), '/video/queue');
    assert.equal(validatePath('venice', '/video/retrieve'), '/video/retrieve');
    assert.throws(() => validatePath('venice', '/account'), /not allowed/);
});

test('provider proxy allows only expected OpenRouter media/model paths', () => {
    assert.equal(validatePath('openrouter', '/images/models'), '/images/models');
    assert.equal(validatePath('openrouter', '/images'), '/images');
    assert.equal(validatePath('openrouter', '/videos'), '/videos');
    assert.equal(validatePath('openrouter', '/videos/job-123'), '/videos/job-123');
    assert.equal(
        validatePath('openrouter', '/videos/job-123/content?index=0'),
        '/videos/job-123/content?index=0'
    );
    assert.throws(() => validatePath('openrouter', '/chat/completions'), /not allowed/);
});

test('provider proxy never honors a caller-supplied external origin', () => {
    const request = prepareProviderRequest({
        provider: 'openrouter',
        path: 'https://evil.example/images?x=1',
        method: 'GET',
    });
    assert.equal(request.url, 'https://openrouter.ai/api/v1/images?x=1');
});

test('provider proxy accepts only HTTP(S) OpenRouter referers', () => {
    assert.equal(validHttpReferer('https://example.test/app'), 'https://example.test/app');
    assert.equal(validHttpReferer('http://localhost:5173'), 'http://localhost:5173/');
    assert.equal(validHttpReferer('null'), null);
    assert.equal(validHttpReferer('file:///tmp/index.html'), null);
    assert.equal(validHttpReferer('javascript:alert(1)'), null);
    assert.equal(validHttpReferer('not a url'), null);
});

test('provider proxy filters headers and normalizes casing', () => {
    assert.deepEqual(
        filteredHeaders('openrouter', {
            Authorization: 'Bearer secret',
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://example.test',
            'X-Title': 'Actually Open',
            Cookie: 'do-not-forward=1',
            'X-Api-Key': 'do-not-forward',
        }),
        {
            authorization: 'Bearer secret',
            'content-type': 'application/json',
            'http-referer': 'https://example.test/',
            'x-title': 'Actually Open',
        }
    );

    assert.deepEqual(
        filteredHeaders('openrouter', {
            Authorization: 'Bearer secret',
            'HTTP-Referer': 'null',
            'X-Title': 'Actually Open',
        }),
        {
            authorization: 'Bearer secret',
            'x-title': 'Actually Open',
        }
    );

    assert.deepEqual(
        filteredHeaders('venice', {
            Authorization: 'Bearer secret',
            'Content-Type': 'application/json',
            'X-Title': 'not-for-venice',
        }),
        {
            authorization: 'Bearer secret',
            'content-type': 'application/json',
        }
    );
});

test('provider proxy rejects unsupported providers and methods', () => {
    assert.throws(() => validatePath('unknown', '/images'), /Unsupported provider/);
    assert.throws(
        () => prepareProviderRequest({ provider: 'openrouter', path: '/images', method: 'DELETE' }),
        /Unsupported provider request method/
    );
});
