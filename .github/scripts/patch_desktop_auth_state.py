from pathlib import Path


def replace_exact(text, old, new, label, expected=1):
    count = text.count(old)
    if count != expected:
        raise SystemExit(f"{label}: expected exactly {expected} match(es), found {count}")
    return text.replace(old, new, expected)


def patch(path, replacements):
    file_path = Path(path)
    text = file_path.read_text()
    for replacement in replacements:
        old, new, label, *rest = replacement
        expected = rest[0] if rest else 1
        text = replace_exact(text, old, new, label, expected)
    file_path.write_text(text)


patch('src/components/AuthModal.js', [
    (
        "import { syncPrivacyCompatibilitySentinel } from '../lib/privacyApi.js';",
        "import { PRIVACY_SENTINEL } from '../lib/privacyApi.js';",
        'AuthModal privacy import',
    ),
    (
        "    const existingMuapi = localStorage.getItem('muapi_key') || '';\n    muapiInput.value = existingMuapi === '__actually_open_byok__' ? '' : existingMuapi;",
        "    const existingMuapi = localStorage.getItem('muapi_key') || '';\n    if (existingMuapi === PRIVACY_SENTINEL) localStorage.removeItem('muapi_key');\n    muapiInput.value = existingMuapi === PRIVACY_SENTINEL ? '' : existingMuapi;",
        'AuthModal legacy sentinel migration',
    ),
    (
        "        syncPrivacyCompatibilitySentinel();\n        notifyProviderKeysChanged();",
        "        notifyProviderKeysChanged();",
        'AuthModal sentinel sync removal',
    ),
])

patch('src/components/SettingsModal.js', [
    (
        "import { PRIVACY_SENTINEL, syncPrivacyCompatibilitySentinel } from '../lib/privacyApi.js';",
        "import { PRIVACY_SENTINEL } from '../lib/privacyApi.js';",
        'SettingsModal privacy import',
    ),
    (
        "    const storedMuapiKey = localStorage.getItem('muapi_key') || '';\n    apiPanel.querySelector('#settings-muapi-key').value = storedMuapiKey === PRIVACY_SENTINEL ? '' : storedMuapiKey;",
        "    const storedMuapiKey = localStorage.getItem('muapi_key') || '';\n    if (storedMuapiKey === PRIVACY_SENTINEL) localStorage.removeItem('muapi_key');\n    apiPanel.querySelector('#settings-muapi-key').value = storedMuapiKey === PRIVACY_SENTINEL ? '' : storedMuapiKey;",
        'SettingsModal legacy sentinel migration',
    ),
    (
        "        syncPrivacyCompatibilitySentinel();\n        notifyProviderKeysChanged();",
        "        notifyProviderKeysChanged();",
        'SettingsModal sentinel sync removal',
    ),
])

patch('packages/studio/src/privacyApi.js', [
    (
        "export function hasPrivacyKey() {\n  const store = storage();\n  return Boolean(store?.getItem('venice_api_key')?.trim() || store?.getItem('openrouter_api_key')?.trim());\n}\n\nexport function syncPrivacyCompatibilitySentinel() {\n  const store = storage();\n  if (!store) return;\n  const current = store.getItem('muapi_key');\n  if (hasPrivacyKey()) {\n    if (!current) store.setItem('muapi_key', PRIVACY_SENTINEL);\n  } else if (current === PRIVACY_SENTINEL) {\n    store.removeItem('muapi_key');\n  }\n}",
        "export function hasPrivacyKey() {\n  const store = storage();\n  return Boolean(store?.getItem('venice_api_key')?.trim() || store?.getItem('openrouter_api_key')?.trim());\n}\n\nexport function hasPrivacyKeyForModel(modelId) {\n  const model = getPrivacyModel(modelId);\n  if (!model?.provider) return false;\n  const config = configFor(model.provider);\n  return Boolean(storage()?.getItem(config.keyStorage)?.trim());\n}\n\n// Backward-compatible migration hook. Older fork builds wrote a fake MuAPI\n// credential for BYOK-only sessions; current builds only remove that value.\nexport function syncPrivacyCompatibilitySentinel() {\n  const store = storage();\n  if (store?.getItem('muapi_key') === PRIVACY_SENTINEL) {\n    store.removeItem('muapi_key');\n  }\n}",
        'privacyApi provider-key helper and migration-only sentinel',
    ),
])

patch('packages/studio/src/privacyVideoApi.js', [
    (
        "export function isPrivacyVideoModelId(modelId) {\n  return Boolean(parseModelId(modelId));\n}\n\nexport function isPrivacyVideoJobId(value) {",
        "export function isPrivacyVideoModelId(modelId) {\n  return Boolean(parseModelId(modelId));\n}\n\nexport function hasPrivacyVideoKeyForModel(modelId) {\n  const parsed = parseModelId(modelId);\n  if (!parsed) return false;\n  const config = configFor(parsed.provider);\n  return Boolean(storage()?.getItem(config.keyStorage)?.trim());\n}\n\nexport function isPrivacyVideoJobId(value) {",
        'privacyVideoApi provider-key helper',
    ),
])

patch('src/lib/muapi.js', [
    (
        "        if (key === PRIVACY_SENTINEL) {\n            throw new Error(",
        "        if (key === PRIVACY_SENTINEL) {\n            localStorage.removeItem('muapi_key');\n            throw new Error(",
        'desktop muapi legacy sentinel cleanup',
    ),
    (
        "    async uploadFile(file) {\n        // Do not send BYOK-only image references through the compatibility\n        // uploader. Data URLs can be consumed directly by Venice image/edit\n        // and video queue APIs.\n        if (localStorage.getItem('muapi_key') === PRIVACY_SENTINEL) {\n            return privacyApi.fileToDataUrl(file);\n        }\n        return super.uploadFile(file);\n    }",
        "    async uploadFile(file, modelId = null) {\n        // Direct-provider reference routing follows the selected model rather\n        // than a session-wide fake compatibility credential. Venice/OpenRouter\n        // image models and Venice I2V keep eligible images browser-local.\n        if (isPrivacyModelId(modelId) || isPrivacyVideoModelId(modelId)) {\n            return privacyApi.fileToDataUrl(file);\n        }\n        return super.uploadFile(file);\n    }",
        'desktop model-aware upload routing',
    ),
])

patch('src/components/ImageStudio.js', [
    (
        "import { AuthModal } from './AuthModal.js';",
        "import { AuthModal } from './AuthModal.js';\nimport { hasPrivacyKeyForModel, isPrivacyModelId } from '../lib/privacyApi.js';",
        'ImageStudio privacy auth import',
    ),
    (
        "        uploadFn: (file) => useLocalModel ? URL.createObjectURL(file) : muapi.uploadFile(file),\n        requireApiKey: () => !useLocalModel,",
        "        uploadFn: (file) => useLocalModel ? URL.createObjectURL(file) : muapi.uploadFile(file, selectedModel),\n        requireApiKey: () => !useLocalModel && !isPrivacyModelId(selectedModel),",
        'ImageStudio model-aware reference upload',
    ),
    (
        "        const apiKey = localStorage.getItem('muapi_key');\n        if (!apiKey) {\n            AuthModal(() => generateBtn.click());\n            return;\n        }",
        "        const apiKey = localStorage.getItem('muapi_key');\n        const directProviderModel = isPrivacyModelId(selectedModel);\n        const hasRequiredAuth = directProviderModel\n            ? hasPrivacyKeyForModel(selectedModel)\n            : Boolean(apiKey);\n        if (!hasRequiredAuth) {\n            AuthModal(() => generateBtn.click());\n            return;\n        }",
        'ImageStudio provider-aware generation auth',
    ),
])

patch('src/components/VideoStudio.js', [
    (
        "import { isWan2gpModelId, getLocalModelById, localT2VModels, localI2VModels } from '../lib/localModels.js';",
        "import { isWan2gpModelId, getLocalModelById, localT2VModels, localI2VModels } from '../lib/localModels.js';\nimport { hasPrivacyVideoKeyForModel, isPrivacyVideoJobId, isPrivacyVideoModelId } from 'studio/src/privacyVideoApi.js';",
        'VideoStudio privacy auth import',
    ),
    (
        "        uploadFn: (file) => isWan2gpModelId(selectedModel) ? localAI.uploadFileToWan2gp(file) : muapi.uploadFile(file),\n        requireApiKey: () => !isWan2gpModelId(selectedModel),",
        "        uploadFn: (file) => isWan2gpModelId(selectedModel) ? localAI.uploadFileToWan2gp(file) : muapi.uploadFile(file, selectedModel),\n        requireApiKey: () => !isWan2gpModelId(selectedModel) && !isPrivacyVideoModelId(selectedModel),",
        'VideoStudio start/end-frame upload routing',
        2,
    ),
    (
        "        const apiKey = localStorage.getItem('muapi_key');\n        if (!apiKey) return; // can't poll without key; jobs remain for next time\n\n        const banner = document.createElement('div');\n        banner.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-[#111] border border-white/10 text-white text-sm px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3';\n        banner.innerHTML = `<span class=\"animate-spin text-primary\">◌</span> <span class=\"banner-text\">Resuming ${pending.length} pending generation${pending.length > 1 ? 's' : ''}…</span>`;\n        document.body.appendChild(banner);\n\n        let remaining = pending.length;\n        pending.forEach(async (job) => {",
        "        const apiKey = localStorage.getItem('muapi_key');\n        const resumable = pending.filter((job) => isPrivacyVideoJobId(job.requestId) || apiKey);\n        if (!resumable.length) return; // compatibility-only jobs wait until a real key is restored\n\n        const banner = document.createElement('div');\n        banner.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-[#111] border border-white/10 text-white text-sm px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3';\n        banner.innerHTML = `<span class=\"animate-spin text-primary\">◌</span> <span class=\"banner-text\">Resuming ${resumable.length} pending generation${resumable.length > 1 ? 's' : ''}…</span>`;\n        document.body.appendChild(banner);\n\n        let remaining = resumable.length;\n        resumable.forEach(async (job) => {",
        'VideoStudio BYOK pending-job resume',
    ),
    (
        "        // Local Wan2GP generations don't go through Muapi — skip the auth gate.\n        if (!isLocal) {\n            const apiKey = localStorage.getItem('muapi_key');\n            if (!apiKey) {\n                AuthModal(() => generateBtn.click());\n                return;\n            }\n        }",
        "        // Local Wan2GP generations don't need cloud auth. Direct-provider\n        // models require their own provider key; compatibility models require a\n        // real MuAPI key.\n        if (!isLocal) {\n            const apiKey = localStorage.getItem('muapi_key');\n            const directProviderModel = isPrivacyVideoModelId(selectedModel);\n            const hasRequiredAuth = directProviderModel\n                ? hasPrivacyVideoKeyForModel(selectedModel)\n                : Boolean(apiKey);\n            if (!hasRequiredAuth) {\n                AuthModal(() => generateBtn.click());\n                return;\n            }\n        }",
        'VideoStudio provider-aware generation auth',
    ),
])
