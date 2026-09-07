# Actually Open Generative AI

**Actually Open Generative AI** is a privacy-oriented fork of [Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI) focused on replacing single-vendor generation plumbing with transparent **Bring Your Own Key (BYOK)** provider adapters while continuing to inherit upstream UI and workflow improvements.

This branch is synced to upstream as of **September 6, 2026**.

## What makes this fork different

- **Direct-provider image generation and editing** with your own **Venice** or **OpenRouter** key.
- **Direct-provider text-to-video** with normalized async queue/poll handling for Venice and OpenRouter.
- **Direct Venice image-to-video** using local browser data-URL references rather than the compatibility uploader.
- **Local inference** remains available in the desktop/Electron build.
- **Upstream stays intact behind a compatibility layer** instead of deleting large parts of the application and breaking studios that depend on it.
- **No third-party promo banner** in the fork UI.
- **Provider adapters are isolated** so additional image/video/audio backends can be added without rewriting the studios.
- **No API keys are interpolated into HTML.** Browser key fields are populated through DOM properties/state rather than raw markup.

## Current provider coverage

The long-term goal is a fully provider-agnostic application. It is not there yet, and this README intentionally does not pretend otherwise.

| Capability | Venice BYOK | OpenRouter BYOK | Local desktop | Upstream compatibility |
|---|---:|---:|---:|---:|
| Text-to-image | ✅ | ✅ | ✅ | ✅ |
| Image-to-image / reference editing | ✅ | ✅ | model-dependent | ✅ |
| Runtime image-model discovery API | ✅ adapter | ✅ adapter | n/a | n/a |
| Text-to-video | ✅ | ✅ | ✅ Wan2GP models | ✅ |
| Image-to-video | ✅ | 🚧 | ✅ supported Wan2GP models | ✅ |
| Reference-to-video / V2V | 🚧 | 🚧 | model-dependent | ✅ |
| Lip sync / audio / clipping | 🚧 | 🚧 | model-dependent | ✅ |
| Layers / Recast / specialized image tools | 🚧 | 🚧 | model-dependent | ✅ |
| Agents / workflow integrations | 🚧 | 🚧 | n/a | ✅ |

The UI currently injects known-good BYOK image and video defaults into upstream's existing family pickers. Provider discovery helpers are implemented, but the React picker is not yet rebuilt reactively from live discovery results.

### Current direct-provider defaults

**Venice**
- T2I: `nano-banana-pro`
- I2I: `nano-banana-pro-edit` (single image)
- Multi-image edit: up to 3 input images
- T2V: `seedance-2-0-fast-text-to-video`
- I2V: `seedance-2-0-fast-image-to-video`

**OpenRouter**
- T2I: `bytedance-seed/seedream-4.5`
- I2I/reference: `bytedance-seed/seedream-4.5`, up to 14 references where supported
- T2V: `bytedance/seedance-2.0-fast`

These are conservative bootstrap entries, not a hardcoded statement that only those models can ever work. Live capability discovery is the intended source of truth as the picker integration matures.

### Why keep the compatibility layer?

Earlier versions of this fork replaced the upstream API module with a small partial client. That made the image path simpler, but newer upstream releases expect a much larger API surface: uploads, polling, image editing, video generation, V2V, lip sync, Layers, Recast, and other workflows.

The current architecture keeps the mature upstream implementation in `upstreamMuapi.js` and routes only supported BYOK models through direct-provider adapters. This avoids a UI that looks functional while failing at runtime.

## Architecture

```text
Hosted Next.js app / React Studio
        │
        ├── BYOK image/video model ──> /api/privacy/{provider} ──> Venice / OpenRouter
        │                                allow-listed streaming proxy
        │
        └── unported workflow ────────> upstream compatibility client

Vite development shell
        │
        ├── BYOK image/video model ──> /api/privacy/{provider}
        │                               └── allow-listed Vite dev proxy ──> provider
        └── unported workflow ────────> upstream compatibility proxy

Electron / packaged Vite app
        │
        ├── BYOK image/video model ──> renderer fetch bridge
        │                               └── narrow Electron IPC proxy ──> Venice / OpenRouter
        ├── local model ─────────────> sd.cpp / Wan2GP
        └── unported workflow ───────> upstream compatibility client
```

The Electron transport deliberately keeps Chromium `webSecurity` and context isolation enabled. Provider-origin requests are intercepted only for the Venice/OpenRouter API roots and sent through an IPC handler that independently validates the provider, endpoint, method, forwarded headers, and request size. Unrelated renderer `fetch()` traffic is not intercepted.

The Vite development server mirrors the same provider endpoint families instead of acting as an unrestricted Venice/OpenRouter proxy. Unsupported provider paths are rejected before Vite forwards the request.

Important files:

```text
packages/studio/src/privacyApi.js                  Shared Venice/OpenRouter image adapter
packages/studio/src/privacyModelsBootstrap.js      BYOK image catalog injection
packages/studio/src/privacyVideoApi.js             Shared Venice/OpenRouter async video adapter
packages/studio/src/privacyVideoModelsBootstrap.js BYOK video catalog injection
packages/studio/src/muapi.js                       React provider/compatibility router
packages/studio/src/upstreamMuapi.js               Preserved upstream API client
app/api/privacy/.../route.js                       Hosted allow-listed streaming provider proxy
vite.config.mjs                                    Allow-listed Vite development provider proxies
src/lib/muapi.js                                   Vite/Electron provider/compatibility router
src/lib/providerFetchBridge.js                     Electron renderer provider-fetch bridge
electron/lib/providerProxy.js                      Electron main-process endpoint allow-list/transport
src/lib/upstreamMuapi.js                           Preserved upstream Vite client
```

## Privacy notes

- Provider keys are stored in the browser/app profile's `localStorage` today. That is convenient, but it is **not equivalent to OS-keychain storage** and any successful same-origin XSS could read them.
- In the hosted Next.js app, provider calls pass through this app's own allow-listed `/api/privacy/...` proxy to avoid CORS problems. The application code does not persist or intentionally log the Authorization header, but operators should also configure reverse proxies and infrastructure logs not to record request headers.
- Vite development uses scoped `/api/privacy/...` proxies with the same media/model endpoint families rather than exposing arbitrary provider API paths.
- In Electron, provider calls cross the context-isolated preload IPC bridge and are issued by the main process. This avoids weakening `webSecurity` or relying on providers to accept `file://`/`Origin: null` renderer requests.
- Hosted, Vite-development, and Electron provider transports all restrict the provider API surface they can reach. The Electron proxy additionally filters renderer-supplied headers and enforces its request-size ceiling in the main process.
- BYOK-only image reference uploads are converted to browser data URLs rather than being uploaded to the compatibility backend first. Venice's image-edit and video-queue APIs can consume those data URLs directly.
- **BYOK does not mean zero retention.** Provider privacy, retention, moderation, and billing policies still apply. In particular, OpenRouter's asynchronous video API is not eligible for Zero Data Retention because generated video must be retained briefly for polling and download.
- Venice currently labels the bootstrap Seedance video models as **Anonymized**, not Private. Direct-provider routing removes the fork's compatibility middleman; it does not change the provider's own privacy classification.
- A MuAPI key is optional and is used only for features that have not yet been ported to direct-provider adapters.

## Quick start

### Hosted / Next.js

```bash
git clone --recurse-submodules https://github.com/saintbrodie/Actually-Open-Generative-AI.git
cd Actually-Open-Generative-AI
npm run setup
npm run dev
```

Open the app, add a Venice and/or OpenRouter key, then choose a BYOK entry in Image Studio or Video Studio.

### Vite development shell

```bash
npm run vite:dev
```

### Desktop / Electron

```bash
npm run electron:dev
```

Linux, Windows, and macOS packaging scripts are inherited from upstream; see `package.json` for the available targets.

## Provider APIs

The BYOK adapters intentionally follow the providers' current media APIs rather than treating media generation as chat.

### Images

- **OpenRouter:** `POST /api/v1/images`, with model capabilities from `GET /api/v1/images/models`; reference editing uses `input_references`.
- **Venice:** `POST /api/v1/image/generate`, `POST /api/v1/image/edit`, and `POST /api/v1/image/multi-edit`, with image models from `GET /api/v1/models?type=image`.

Image sizing is capability-aware where the provider exposes structured metadata. Unknown Venice model families default conservatively rather than sending incompatible width/height/aspect-ratio fields.

### Video

- **OpenRouter:** `POST /api/v1/videos`, then poll `GET /api/v1/videos/{jobId}` until completion. Completed assets are fetched through the authenticated `GET /api/v1/videos/{jobId}/content?index=0` endpoint and exposed to the UI as a local blob URL. The adapter does not hand an OpenRouter-hosted `unsigned_urls` value directly to `<video>` because current OpenRouter content URLs still require bearer authentication.
- **Venice:** `POST /api/v1/video/queue`, then poll `POST /api/v1/video/retrieve`; the same queue accepts `image_url` data URLs for supported I2V models. Completion can return either raw `video/mp4` or JSON plus the pre-signed `download_url` returned at queue time.

The standalone Vite shell wraps provider job IDs in a small synthetic ID so its existing pending-generation resume mechanism can resume direct-provider jobs after a reload.

## Validation

GitHub Actions runs on every pull request and on pushes to `main`:

```text
npm ci
node --test tests/*.test.js
npm run build:packages
npm run build
npm run vite:build
```

The Node suite includes security-contract checks for the Electron provider proxy: endpoint allow-listing, fixed provider origins, method rejection, and header filtering. CI also parses the Vite proxy configuration and catches workspace, Next.js, and Vite integration regressions. Provider adapters still need mocked request/response contract tests and manual live-key smoke tests because a build cannot validate billing, authorization, or real provider behavior.

## Roadmap

1. Wire live provider discovery into the React image/video family pickers with reactive refresh.
2. Design a privacy-preserving hosted-reference strategy before enabling OpenRouter I2V/reference video paths that require stable externally reachable media URLs.
3. Expand direct video coverage to Venice/OpenRouter reference-to-video, V2V, and provider-specific multimodal controls through capability metadata rather than studio-specific conditionals.
4. Replace the compatibility-key sentinel with first-class per-studio capability/auth state so BYOK-only users are not presented compatibility-only studios as if they were authenticated.
5. Move desktop secrets to OS-backed secure storage and offer session-only browser keys.
6. Add adapter contract tests with mocked provider responses and payload assertions.
7. Make mixed compatibility+BYOK sessions use model-aware upload routing so selecting a BYOK model always keeps compatible references local.
8. Continue reducing compatibility-backend usage feature by feature instead of removing it all at once.

## Upstream

This fork deliberately tracks upstream because its UI, local inference, model controls, and workflow tooling are moving quickly. Fork-specific changes should remain small and isolated enough that future upstream syncs are routine rather than multi-month rewrites.

Upstream project: [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI)

## License

MIT. See `LICENSE`.
