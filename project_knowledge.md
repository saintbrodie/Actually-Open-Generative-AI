# Open Generative AI: Technical Documentation & Context

This document serves as a comprehensive knowledge base for the Open Generative AI project. It details the architecture, key components, API integration patterns, and state management strategies used in the application.

## 1. Project Vision & Overview

**Open Generative AI** is an ambitious open-source project dedicated to **replicating the full functionality of the Higgsfield platform**.

- **Core Goal:** To build a feature-complete, self-hosted alternative to Higgsfield, starting with **Image Generation** (Nano) and expanding into **Video Generation** (Cinema) and other creative tools.
- **Current State:** The Image Studio ("Nano Banana Pro" interface) is fully operational, featuring a premium dark-mode UI, history management, and multi-model support via privacy-first, open APIs (**Venice.ai** and **OpenRouter**).
- **Future Direction:** The architecture is designed to scale for video generation, model training interfaces, and advanced editing tools, mirroring the evolving capabilities of Higgsfield.

- **Stack:** Vite, Vanilla JavaScript, Tailwind CSS v4.
- **Repository:** `https://github.com/Anil-matcha/Open-Generative-AI`
- **Primary Branch:** `main`

## 2. Architecture & File Structure

The project follows a component-based architecture using vanilla JS, where each component is a function that returns a DOM element.

```tree
src/
├── components/
│   ├── ImageStudio.js    # Core logic: Prompts, model picking, canvas, history.
│   ├── Header.js         # Navigation, user settings, auth status.
│   ├── AuthModal.js      # Modal for capturing and validating the API key.
│   ├── SettingsModal.js   # Panel for managing settings (clearing API key).
│   └── Sidebar.js        # (Currently unused/placeholder) Navigation sidebar.
├── lib/
│   ├── apiClient.js      # The API Client. Handles dynamic routing to Venice/OpenRouter.
│   └── models.js         # Source of truth for static model fallbacks and properties.
├── styles/
│   ├── global.css        # Global resets, fonts, and animation keyframes.
│   ├── studio.css        # Specific styles for the studio interface.
│   └── variables.css     # CSS custom properties (colors, blur amounts).
├── main.js               # Entry point. Renders the app layout and Header/Studio.
└── style.css             # Tailwind CSS entry file (imports other CSS).
```

## 3. Key Components & Logic

### `ImageStudio.js` (The Brain)
This is the most complex component. It handles:
- **State:** Selected model (`selectedModel`), aspect ratio (`selectedAr`), and generation status.
- **Prompt Input:** A textarea with auto-grow logic and max-height constraints (fixed in `bf2efdb`).
- **Dynamic Controls:**
    - **Provider Selector:** Allows toggling between `venice` and `openrouter`.
    - **Model Picker:** Lists models fetched dynamically from the selected provider.
    - **Quality/Resolution:** Only appears for models with explicit resolution support.
- **Generation Flow:**
    1. Checks for API key (`venice_api_key` or `openrouter_api_key`) in `localStorage`. If missing, opens `AuthModal`.
    2. Calls `apiClient.generateImage()`.
    3. On success, adds result to `generationHistory` and displays it (no polling required for these standard endpoints).
- **History:**
    - Stored in `localStorage` key `muapi_history`.
    - Slides in from the right sidebar.
    - Thumbnails are clickable to re-view; hover to download.

### `apiClient.js` (The Engine)
Encapsulates all communication with Venice.ai and OpenRouter.
- **Authentication:** Uses `Authorization: Bearer` with the respective keys. OpenRouter also includes `HTTP-Referer` and `X-Title` for Zero Data Retention (ZDR) routing.
- **Pattern:** Direct async/await standard HTTP REST calls without proprietary polling.
    - **Venice:** `POST` to `/image/generations`.
    - **OpenRouter:** `POST` to `/chat/completions` with image modalities.
- **Dynamic Discovery:** Queries `/v1/models` from the providers to dynamically populate the Image Studio.

### `models.js` (The Data)
Contains static fallbacks (`t2iModels`, `i2iModels`, etc.).
- Serves as a fallback if the dynamic `/models` fetch from the provider fails.
- Maps basic model settings (like default aspect ratio) and provides dummy helper functions for other studios.

## 4. UI & Styling (Tailwind v4)

- **Theme:** Dark mode by default (`bg-app-bg` = `#050505`).
- **Accent:** Neon Yellow-Green (`#d9ff00`) used for primary actions and glows.
- **Glassmorphism:** Extensive use of `backdrop-blur` and `bg-white/5` or `bg-black/60` for panels, headers, and modals.
- **Responsiveness:**
    - **Mobile:** Stacked layout, simplified controls, hidden sidebar.
    - **Desktop:** Wide canvas, floating prompt bar, side-by-side history.
- **Animations:** Custom keyframes in `global.css` for `fade-in-up`, `pulse-glow`, etc.

## 5. Development Setup

- **Vite Proxy:** Local development uses proxies in `vite.config.mjs` to route `/api/venice` to `https://api.venice.ai/api/v1` and `/api/openrouter` to `https://openrouter.ai/api/v1` to avoid CORS issues.
- **Environment:** `apiClient.js` detects `import.meta.env.DEV` to decide whether to use the relative `/api/...` path (proxy) or the full URL (production).

## 6. Known Gotchas & Fixes

- **Prompt Bar Overflow:** Fixed by limiting textarea max-height and enabling scrolling.
- **Flux Resolution Picker:** Fixed logic to only show the resolution picker if the model *explicitly* lists enum values for resolution/megapixels.
- **Hero Visibility:** The "Nano Banana Pro" hero text is completely hidden (`display: none`) when an image is shown to prevent bleed-through.
- **API Key Logging:** Debug logs printing the API key were removed for security.

## 7. Future Roadmap (Potential)

- **Video Generation:** Expand `models.js` and `ImageStudio.js` to support video models (already present in `schema_data` but not wired up).
- **In-painting/Out-painting:** Add canvas editing tools.
- **User Accounts:** Move beyond local storage for history.
