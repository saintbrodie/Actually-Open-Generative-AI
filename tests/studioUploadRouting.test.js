const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function source(relativePath) {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

test('Image Studio supplies the resolved direct-provider model to every reference upload path', () => {
    const imageStudio = source('packages/studio/src/components/ImageStudio.jsx');

    assert.match(
        imageStudio,
        /function UploadButton\(\{ apiKey, targetModelId = null,/,
    );
    assert.match(
        imageStudio,
        /uploadFile\(apiKey, file, \(pct\) => \{[\s\S]*?\}, targetModelId\);/,
    );
    assert.match(
        imageStudio,
        /uploadFile\(apiKey, file, undefined, editor\.model\.id\)/,
    );
    assert.match(
        imageStudio,
        /targetModelId=\{referenceVariant\.model\.id\}/,
    );
});

test('Video Studio supplies the resolved model for references, workflow slots, and end frames', () => {
    const videoStudio = source('packages/studio/src/components/VideoStudio.jsx');

    assert.match(
        videoStudio,
        /targetModelId = null/,
    );
    assert.match(
        videoStudio,
        /uploadFile\(apiKey, file, \(value\) => \{[\s\S]*?\}, targetModelId\)/,
    );
    assert.match(
        videoStudio,
        /options\.targetModelId = targetModel\?\.id \|\| null/,
    );
    assert.match(
        videoStudio,
        /options\.targetModelId = target\.variant\.model\.id/,
    );
    assert.match(
        videoStudio,
        /uploadFile\(apiKey, file, \(pct\) => \{[\s\S]*?\}, selectionAtStart\.selectedModel\)/,
    );
});
