# Actually Open Generative AI

**Actually Open Generative AI** is a privacy-oriented fork of [Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI) focused on replacing single-vendor generation plumbing with transparent **Bring Your Own Key (BYOK)** provider adapters while continuing to inherit upstream UI, local-inference, and workflow improvements.

The current code sync target is upstream commit `9745e95` from **September 6, 2026**. Upstream's September 7 follow-up (`c50d5fd`) only changes README video links, so it has intentionally not been mixed into this architecture PR.

## What makes this fork different

- **Direct-provider image generation and editing** with your own **Venice** or **OpenRouter** key.
- **Direct-provider text-to-video** with normalized async queue/poll handling for Venice and OpenRouter.
- **Direct Venice image-to-video** using browser-local data-URL references rather than the compatibility uploader.
- **Live provider model discovery** for Venice and OpenRouter image/video catalogs. Fresh capabilities update mounted Image/Video pickers without a page reload, stale discovered-only entries are pruned when credentials/catalogs change, and metadata is cached locally for faster subsequent starts.
- **Model-aware upload routing.** Selecting a direct BYOK model keeps compatible image references local even when a real MuAPI compatibility key is also configured.
- **Provider auth and compatibility auth are separate states.** BYOK-only sessions no longer mint a fake MuAPI key; legacy sentinel values are migration-only and are removed when encountered. Compatibility-only studios are gated explicitly before network work.
- **Local inference** remains available in the desktop/Electron build.
- **Upstream stays intact behind a compatibility layer** instead of deleting large parts of the application and breaking studios that still depend on it.
- **No third-party promo banner** in the fork UI.
- **Provider adapters are isolated** so additional image/video/audio backends can be added without rewriting the studios.
- **No API keys are interpolated into HTML.** Browser key fields are populated through DOM properties/state rather than raw markup.

## Current provider coverage

The long-term goal is a fully provider-agnostic application. It is not there yet, and this README intentionally does not pretend otherwise.

| Capability | Venice BYOK | OpenRouter BYOK | Local desktop | MuAPI compatibility |
|---|---:|---:|---:|---:|
| Text-to-image | ✅ | ✅ | ✅ | ✅ |
| Image-to-image / reference editing | ✅ known-good adapters | ✅ capability-discovered | model-dependent | ✅ |
| Image model discovery | ✅ live + cached | ✅ live + cached | n/a | n/a |
| Text-to-video | ✅ | ✅ | ✅ Wan2GP models | ✅ |
| Video model discovery | ✅ live + cached | ✅ live + cached | n/a | n/a |
| Image-to-video | ✅ local references | 🚧 public-URL constraint | ✅ supported Wan2GP models | ✅ |
| Reference-to-video / V2V | 🚧 | 🚧 | model-dependent | ✅ |
| Lip sync / audio / clipping | 🚧 | 🚧 | model-dependent | ✅ |
| Layers / Recast / specialized image tools | 🚧 | 🚧 | model-dependent | ✅ |
| Agents / workflow integrations | 🚧 | 🚧 | n/a | ✅ |

Compatibility-only studios show a clear **MuAPI compatibility key required** state when the app is running with only Venice/OpenRouter keys. Image Studio and Video Studio remain mixed-provider surfaces because they contain direct BYOK routes as well as compatibility-backed models.

### Model discovery behavior

Known-good fallback entries are available immediately. When a Venice/OpenRouter key exists, the app refreshes provider image/video metadata in the background and stores normalized results in a 24-hour local cache.

The upstream family/picker system was originally built once at module load. Rather than replacing that system or forcing a page reload, this fork keeps the exported catalog objects, arrays, and maps **reference-stable** and rebuilds their contents in place after discovery. A tiny catalog revision store then notifies mounted React Image/Video studios with `useSyncExternalStore`, causing them to re-read the updated picker contents. The Vite/Electron shell shares the same mutable provider model arrays and refresh runtime, so newly discovered entries are available there as well.

Saving provider keys triggers discovery immediately. A normal page reload is no longer required just to expose newly discovered models. Each refresh reconstructs the direct-provider slice from current credentials and discovery results, so removed-provider or disappeared discovered-only entries do not linger in the picker arrays.

Discovery is deliberately conservative:

- OpenRouter image models only receive a synthetic I2I/edit variant when the provider advertises `input_references` support.
- Arbitrary Venice image models are not assumed to support edit/multi-edit merely because they appear in `/models?type=image`; known edit contracts stay explicit until their metadata can be normalized safely.
- OpenRouter video models can advertise frame-image capability, but that does **not** automatically enable local-file I2V because OpenRouter's video-reference path currently requires a stable public HTTPS asset.

### Current known-good direct-provider fallbacks

**Venice**
- T2I: `nano-banana-pro`
- I2I: `nano-banana-pro-edit`
- Multi-image edit: up to 3 input images
- T2V: `seedance-2-0-fast-text-to-video`
- I2V: `seedance-2-0-fast-image-to-video`

**OpenRouter**
- T2I: `bytedance-seed/seedream-4.5`
- I2I/reference: `bytedance-seed/seedream-4.5`, up to 14 references where supported
- T2V: `bytedance/seedance-2.0-fast`

These are bootstrap safety nets, not a hardcoded statement that only those models can work. Live provider discovery is the expanding catalog source; the cache simply makes discovered metadata available immediately on later starts.

### Why keep the compatibility layer?

Earlier versions of this fork replaced the upstream API module with a small partial client. That made one image path simpler, but current upstream expects a much larger API surface: uploads, polling, image editing, video generation, V2V, lip sync, Layers, Recast, agents, workflows, and other specialized tools.

The current architecture keeps the mature upstream implementation in `upstreamMuapi.js` and routes only supported BYOK models through direct-provider adapters. This avoids a UI that looks functional while failing at runtime.

The compatibility key is optional. When it is absent, compatibility-only studios are gated before their network logic runs. Hosted and Vite/Electron shells track direct-provider credentials separately from compatibility auth; no fake compatibility credential is created for BYOK-only sessions. Older `__actually_open_byok__` values are removed as a migration step. When both compatibility and BYOK keys exist, routing follows the **selected model**, not simply the broadest credential available in the session.

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

Provider catalog refresh is a separate control path:

```text
provider key saved / app startup
        │
        ├── discover image + video metadata
        ├── normalize + cache capabilities
        ├── update provider model arrays
        ├── rebuild family/picker catalogs in place
        └── publish catalog revision ──> mounted React studios re-render
```

For reference media, the routing decision is also model-aware:

```text
image reference + privacy:* / privacy-video:* model
        └── browser data URL ──> direct provider adapter

image/video/audio reference + compatibility model
        └── compatibility uploader ──> upstream workflow
```

The Electron transport deliberately keeps Chromium `webSecurity` and context isolation enabled. Provider-origin requests are intercepted only for the Venice/OpenRouter API roots and sent through an IPC handler that independently validates the provider, endpoint, method, forwarded headers, and request size. Unrelated renderer `fetch()` traffic is not intercepted.

The Vite development server mirrors the same provider endpoint families instead of acting as an unrestricted Venice/OpenRouter proxy. Unsupported provider paths are rejected before Vite forwards the request.

Important files:

```text
packages/studio/src/privacyApi.js                              Venice/OpenRouter image adapter + discovery
packages/studio/src/privacyModelsBootstrap.js                  BYOK image model normalization/injection
packages/studio/src/privacyVideoApi.js                         Venice/OpenRouter async video adapter + discovery
packages/studio/src/privacyVideoModelsBootstrap.js             BYOK video model normalization/injection
packages/studio/src/providerCatalogRuntime.js                  Discovery refresh + live catalog rebuild orchestration
packages/studio/src/providerCatalogEvents.js                   React-safe catalog revision store
packages/studio/src/modelFamilies.js                           Upstream family builder + in-place refresh seams
packages/studio/src/compatibilityAuth.js                       Compatibility capability/auth + upload-routing rules
packages/studio/src/components/CompatibilityStudioGate.jsx     BYOK-only lock state for compatibility-only studios
packages/studio/src/muapi.js                                   React provider/compatibility router
packages/studio/src/upstreamMuapi.js                           Preserved upstream API client
app/api/privacy/.../route.js                                   Hosted allow-listed streaming provider proxy
vite.config.mjs                                                Allow-listed Vite development provider proxies
src/lib/muapi.js                                               Vite/Electron provider/compatibility router
src/lib/providerFetchBridge.js                                 Electron renderer provider-fetch bridge
electron/lib/providerProxy.js                                  Electron main-process endpoint allow-list/transport
src/lib/upstreamMuapi.js                                       Preserved upstream Vite client
```

## Privacy notes

- Provider keys are stored in the browser/app profile's `localStorage` today. That is convenient, but it is **not equivalent to OS-keychain storage** and any successful same-origin XSS could read them.
- In the hosted Next.js app, provider calls pass through this app's own allow-listed `/api/privacy/...` proxy to avoid CORS problems. The application code does not persist or intentionally log the Authorization header, but operators should also configure reverse proxies and infrastructure logs not to record request headers.
- Vite development uses scoped `/api/privacy/...` proxies with the same media/model endpoint families rather than exposing arbitrary provider API paths.
- In Electron, provider calls cross the context-isolated preload IPC bridge and are issued by the main process. This avoids weakening `webSecurity` or relying on providers to accept `file://`/`Origin: null` renderer requests.
- Hosted, Vite-development, and Electron provider transports all restrict the provider API surface they can reach. The Electron proxy additionally filters renderer-supplied headers, drops invalid/non-HTTP(S) OpenRouter referers, and enforces its request-size ceiling in the main process.
- **Direct-provider image references stay local as browser data URLs even in mixed MuAPI+BYOK sessions.** Image Studio passes the resolved reference/edit model into upload routing; Video Studio does the same for reference slots and end-frame uploads. A compatibility key therefore no longer causes a selected direct-provider model's image reference to be uploaded to MuAPI first.
- Venice's image-edit and video-queue APIs can consume those local data URLs directly.
- OpenRouter image reference generation can use data-URL references, but OpenRouter video frame/reference inputs currently require stable publicly downloadable HTTPS media. The fork therefore does not pretend local-file OpenRouter I2V is privacy-preserving today.
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

Open the app, add a Venice and/or OpenRouter key, then choose a BYOK entry in Image Studio or Video Studio. Provider model metadata refreshes in the background and the mounted model pickers update when fresh capabilities arrive.

Add a MuAPI compatibility key only if you also want studios/features that have not yet been ported to direct-provider adapters.

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

- **OpenRouter:** `POST /api/v1/videos`, then poll `GET /api/v1/videos/{jobId}` until completion. Completed assets are fetched through the authenticated `GET /api/v1/videos/{jobId}/content?index=0` endpoint and exposed to the UI as a local blob URL. The adapter does not hand an OpenRouter-hosted `unsigned_urls` value directly to `<video>` because current OpenRouter content URLs still require bearer authentication. Video capabilities are discovered from `GET /api/v1/videos/models`.
- **Venice:** `POST /api/v1/video/queue`, then poll `POST /api/v1/video/retrieve`; the same queue accepts `image_url` data URLs for supported I2V models. Completion can return either raw `video/mp4` or JSON plus the pre-signed `download_url` returned at queue time. Video models are discovered through `GET /api/v1/models?type=video`.

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

The Node suite now covers more than build smoke tests. It includes:

- Electron provider-proxy endpoint allow-listing, fixed provider origins, method rejection, request ceilings, and header filtering.
- OpenRouter T2I/I2I request shaping and base64 output normalization.
- Venice multi-image edit payloads and binary image normalization.
- OpenRouter video submit/poll/authenticated-content download behavior and terminal failures.
- Venice I2V data-URL queue behavior.
- Venice/OpenRouter image and video discovery normalization/cache behavior.
- Live provider-catalog revision notifications and source-level in-place refresh/subscription contracts.
- Legacy compatibility-sentinel rejection/migration, with provider and compatibility auth kept separate in hosted and desktop shells.
- Provider-specific desktop generation auth, mixed-session model-aware reference-upload routing, and direct-provider pending-video resume without a MuAPI key.

CI also parses/builds the Vite proxy configuration and catches workspace, Next.js, and Vite integration regressions. Manual live-key smoke testing is still necessary because mocked contracts cannot validate provider billing, account permissions, transient availability, or undocumented production changes.

## Roadmap

1. Expose provider-catalog refresh/loading/error state in the UI and optionally provide a manual refresh control; stale discovered-only pruning is already handled by the runtime rebuild.
2. Design a privacy-preserving hosted-reference strategy before enabling OpenRouter I2V/reference-video paths that require stable externally reachable media URLs.
3. Expand direct video coverage to Venice/OpenRouter reference-to-video, V2V, and provider-specific multimodal controls through capability metadata rather than studio-specific conditionals.
4. Continue consolidating per-studio provider/compatibility capability checks behind a shared auth/capability context instead of localStorage reads spread across shell and standalone studios; active fake-key sentinel plumbing has been removed.
5. Move desktop secrets to OS-backed secure storage and offer session-only browser keys.
6. Continue broadening mocked provider contract coverage and add a repeatable opt-in live-key smoke-test harness.
7. Port compatibility-only studios feature by feature so Layers, Recast, lip sync, audio, clipping, agents, and workflows can use direct/local backends where practical.
8. Keep future upstream syncs narrow by maintaining provider-specific changes behind adapters, bootstraps, capability metadata, and gates rather than forking large studio components.

## Upstream

This fork deliberately tracks upstream because its UI, local inference, model controls, and workflow tooling are moving quickly. Fork-specific changes should remain small and isolated enough that future upstream syncs are routine rather than multi-month rewrites.

Upstream project: [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI)

## License

MIT. See `LICENSE`.
