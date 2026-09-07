# Actually Open Generative AI

**Actually Open Generative AI** is a privacy-oriented fork of [Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI) focused on replacing single-vendor generation plumbing with transparent **Bring Your Own Key (BYOK)** provider adapters while continuing to inherit upstream UI and workflow improvements.

This branch is synced to upstream as of **September 6, 2026**.

## What makes this fork different

- **Direct-provider image generation** with your own **Venice** or **OpenRouter** key.
- **Local inference** remains available in the desktop/Electron build.
- **Upstream stays intact behind a compatibility layer** instead of deleting large parts of the application and breaking studios that depend on them.
- **No third-party promo banner** in the fork UI.
- **Provider adapters are isolated** so additional image/video/audio backends can be added without rewriting the studios.
- **No API keys are interpolated into HTML.** Browser key fields are populated through DOM properties/state rather than raw markup.

## Current provider coverage

The long-term goal is a fully provider-agnostic application. It is not there yet, and this README intentionally does not pretend otherwise.

| Capability | Venice BYOK | OpenRouter BYOK | Local desktop | Upstream compatibility |
|---|---:|---:|---:|---:|
| Text-to-image | ✅ | ✅ | ✅ | ✅ |
| Runtime image-model discovery API | ✅ adapter | ✅ adapter | n/a | n/a |
| Image-to-image / reference editing | 🚧 | 🚧 | model-dependent | ✅ |
| Text/image-to-video | 🚧 | 🚧 | ✅ Wan2GP models | ✅ |
| Lip sync / audio / clipping | 🚧 | 🚧 | model-dependent | ✅ |
| Layers / Recast / specialized tools | 🚧 | 🚧 | model-dependent | ✅ |
| Agents / workflow integrations | 🚧 | 🚧 | n/a | ✅ |

The UI currently exposes tested BYOK defaults for cloud T2I while the provider discovery layer is being integrated more deeply into the React model-family picker.

### Why keep the compatibility layer?

Earlier versions of this fork replaced the upstream API module with a small partial client. That made the image path simpler, but newer upstream releases expect a much larger API surface: uploads, polling, image editing, video generation, V2V, lip sync, Layers, Recast, and other workflows.

The current architecture keeps the mature upstream implementation in `upstreamMuapi.js` and routes only supported BYOK models through the direct provider adapter. This avoids a UI that looks functional while failing at runtime.

## Architecture

```text
Hosted Next.js app / React Studio
        │
        ├── BYOK image model ──> /api/privacy/{provider} ──> Venice / OpenRouter
        │                          allow-listed proxy
        │
        └── unported workflow ──> upstream compatibility client

Electron / Vite app
        │
        ├── BYOK image model ──> Venice / OpenRouter
        ├── local model ───────> sd.cpp / Wan2GP
        └── unported workflow ─> upstream compatibility client
```

Important files:

```text
packages/studio/src/privacyApi.js   Shared Venice/OpenRouter BYOK adapter
packages/studio/src/models.js       Fork model-catalog compatibility wrapper
packages/studio/src/upstreamModels.js
packages/studio/src/muapi.js        Provider router
packages/studio/src/upstreamMuapi.js
app/api/privacy/.../route.js        Hosted allow-listed provider proxy
src/lib/muapi.js                    Vite/Electron compatibility router
src/lib/upstreamMuapi.js
```

## Privacy notes

- Provider keys are stored in the browser profile's `localStorage` today. That is convenient, but it is **not equivalent to OS-keychain storage** and any successful same-origin XSS could read them.
- In the hosted Next.js app, provider calls pass through this app's own allow-listed `/api/privacy/...` proxy to avoid CORS problems. The application code does not persist or intentionally log the Authorization header, but operators should also configure reverse proxies and infrastructure logs not to record request headers.
- In Electron's `file://` renderer, provider calls can go directly to the provider.
- Venice/OpenRouter privacy, retention, moderation, and billing policies still apply to requests sent to those services.
- A MuAPI key is optional and is used only for features that have not yet been ported to direct-provider adapters.

## Quick start

### Hosted / Next.js

```bash
git clone --recurse-submodules https://github.com/saintbrodie/Actually-Open-Generative-AI.git
cd Actually-Open-Generative-AI
npm run setup
npm run dev
```

Open the app, add a Venice and/or OpenRouter key, then choose a BYOK model in Image Studio.

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

The BYOK adapter intentionally follows the providers' current media APIs instead of treating image generation as chat:

- **OpenRouter:** `POST /api/v1/images` with model capabilities from `GET /api/v1/images/models`.
- **Venice:** `POST /api/v1/image/generate` with image models from `GET /api/v1/models?type=image`.

Image sizing is capability-aware where the provider exposes structured metadata. Unknown Venice model families default conservatively rather than sending incompatible width/height/aspect-ratio fields.

## Roadmap

1. Wire live provider discovery into the React model-family picker with reactive refresh.
2. Add OpenRouter `input_references` image editing and Venice image-edit adapters.
3. Add OpenRouter/Venice video adapters with normalized async job lifecycle handling.
4. Replace the compatibility-key sentinel with first-class per-studio capability/auth state.
5. Move desktop secrets to OS-backed secure storage and offer session-only browser keys.
6. Add adapter unit tests with mocked provider responses plus CI smoke builds for Next/Vite.
7. Continue reducing compatibility-backend usage feature by feature instead of removing it all at once.

## Upstream

This fork deliberately tracks upstream because its UI, local inference, model controls, and workflow tooling are moving quickly. Fork-specific changes should remain small and isolated enough that future upstream syncs are routine rather than multi-month rewrites.

Upstream project: [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI)

## License

MIT. See `LICENSE`.
