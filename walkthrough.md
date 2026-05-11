# Walkthrough: Migrating to Privacy-First APIs

This walkthrough covers the completion of the migration from the proprietary `muapi.ai` backend to the new, fully open architecture utilizing **Venice.ai** and **OpenRouter**.

## Overview of Changes

1. **Replaced Muapi with `ApiClient`**
   - The proprietary `src/lib/muapi.js` was completely removed.
   - A new `src/lib/apiClient.js` was introduced to handle requests to both Venice and OpenRouter using standardized endpoints.
   - For Venice, we implemented `/v1/image/generations`.
   - For OpenRouter, we implemented standard OpenAI-compatible `/v1/chat/completions` with modalities enabled.
   - Implemented dynamic model fetching (`/v1/models`) to allow real-time discovery of available models.

2. **UI & UX Refinements**
   - **Authentication:** `AuthModal` was updated to allow entering either (or both) `venice_api_key` and `openrouter_api_key` without being gated to a single service.
   - **Settings Management:** `SettingsModal` now fully supports storing, managing, and toggling API keys independently.
   - **Provider Selection:** A new control toggle was embedded directly in the `ImageStudio`'s prompt bar, allowing users to switch between Venice and OpenRouter instantly.

3. **Fallback Resiliency**
   - Refactored `packages/studio/src/models.js` to serve as a static fallback in case of dynamic model loading failure.
   - Temporarily shimmed video and lip-sync endpoints via `apiClient` to ensure the project safely compiles, letting other components fail gracefully without crashing the app until Venice/OR fully support these modalities.

4. **Network Routing**
   - Updated `vite.config.mjs` with new proxy routes: `/api/venice` and `/api/openrouter` to securely handle local development requests without CORS issues.

## Verification

> [!TIP]
> The app was successfully rebuilt with `npm run vite:build`. All components compile without unresolved dependency errors.

To test the application locally:
1. `npm run dev`
2. Open settings and add your API keys.
3. Switch the Provider dropdown in the Image Studio and try out the new models.

---
*Ready for the next phase!*
