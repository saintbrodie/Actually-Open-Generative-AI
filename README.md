# Actually Open Generative AI

**Actually Open Generative AI** is a privacy-first, unrestricted open-source alternative to proprietary AI generation platforms. This fork focuses on removing closed-source backends and moving towards a fully transparent, "Bring Your Own Key" (BYOK) architecture.

## 🚀 The Mission: True Privacy & Freedom

Most "open" platforms still rely on proprietary middle-man APIs that log your prompts, track your usage, and enforce hidden guardrails. This fork changes that by:

- **Removing Proprietary Backends:** Completely stripped out `muapi.ai` and other closed-source connectors.
- **Privacy-First Routing:** All requests go directly to **Venice.ai** and **OpenRouter**, utilizing Zero Data Retention (ZDR) headers where available.
- **Unrestricted Access:** No nanny-filters, no prompt rejections, and no shadow-banning. Your keys, your rules.
- **Dynamic Discovery:** Models are fetched in real-time from providers, ensuring you always have access to the latest state-of-the-art releases (Flux, Nano Banana, etc.) without waiting for app updates.

## ✨ Key Features

- **Dual-Provider Architecture:** Switch instantly between **Venice.ai** and **OpenRouter** directly from the prompt bar.
- **Nano Banana Pro Interface:** A premium, dark-mode "Image Studio" designed for high-performance creative workflows.
- **Intelligent History:** All generation history and reference images are stored locally in your browser—never on our servers.
- **Glassmorphic UI:** A state-of-the-art interface built with Tailwind CSS v4, featuring smooth animations and a responsive layout.
- **Multi-Model Support:** Access 200+ models across image and chat modalities with standardized API handling.

## 🛠️ Tech Stack

This project has been refactored for simplicity and performance:
- **Core:** Vanilla JavaScript (No heavy framework overhead)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **State:** LocalStorage-based persistence

## 🚦 Quick Start

### 1. Prerequisites
You will need an API key from at least one of these providers:
- [Venice.ai](https://venice.ai)
- [OpenRouter.ai](https://openrouter.ai)

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/saintbrodie/Actually-Open-Generative-AI.git
cd Actually-Open-Generative-AI

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 3. Configuration
1. Open the app in your browser.
2. Click the **Settings** icon (or the **Auth** prompt).
3. Enter your Venice or OpenRouter API keys.
4. Select a provider and model in the Studio and start generating.

## 🏗️ Architecture

```tree
src/
├── components/   # Vanilla JS UI components (ImageStudio, AuthModal, etc.)
├── lib/          # Core logic (apiClient.js, model fallbacks)
├── styles/       # Tailwind v4 configuration and custom CSS variables
└── main.js       # Application entry point
```

## 📄 License

MIT - Feel free to fork, modify, and host your own instance.

---
*Built for creators who value privacy and unrestricted creative expression.*