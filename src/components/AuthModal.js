import { t } from '../lib/i18n.js';
import { syncPrivacyCompatibilitySentinel } from '../lib/privacyApi.js';

export function AuthModal(onSuccess) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6';

    const modal = document.createElement('div');
    modal.className = 'relative w-full max-w-md bg-panel-bg border border-white/10 rounded-3xl p-8 shadow-3xl animate-fade-in-up';

    modal.innerHTML = `
        <button id="auth-modal-close-btn" type="button" aria-label="Close" class="absolute top-4 right-4 w-8 h-8 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
            </svg>
        </button>
        <div class="flex flex-col items-center text-center mb-7">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-glow mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.25-2.25"/>
                </svg>
            </div>
            <h2 class="text-2xl font-black text-white uppercase tracking-wider mb-2">${t('auth.title')}</h2>
            <p class="text-secondary text-sm">Bring your own key for direct image generation.</p>
        </div>

        <div class="space-y-4">
            <div class="space-y-2">
                <label class="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Venice API Key</label>
                <input type="password" id="venice-key-input" autocomplete="off" placeholder="Venice API key"
                    class="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-inner">
            </div>
            <div class="space-y-2">
                <label class="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">OpenRouter API Key</label>
                <input type="password" id="openrouter-key-input" autocomplete="off" placeholder="OpenRouter API key"
                    class="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-inner">
            </div>
            <details class="group rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <summary class="cursor-pointer text-[11px] font-bold text-muted uppercase tracking-wider">Compatibility key (optional)</summary>
                <div class="space-y-2 pt-3">
                    <label class="text-[10px] text-muted">MuAPI — currently required by upstream-only video, lip-sync, agent, and some editing workflows.</label>
                    <input type="password" id="muapi-key-input" autocomplete="off" placeholder="MuAPI key"
                        class="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-inner">
                </div>
            </details>

            <p class="text-[11px] text-muted px-1">Keys stay in this browser profile. Direct-provider support currently covers text-to-image; local inference remains available in the desktop build.</p>

            <div class="flex flex-col gap-3 pt-1">
                <button id="save-key-btn" class="w-full bg-primary text-black font-black py-4 rounded-2xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all">
                    ${t('auth.initBtn')}
                </button>
                <div class="flex items-center justify-center gap-5 text-[11px] font-bold uppercase tracking-tighter">
                    <a href="https://venice.ai" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-white transition-colors">Venice ↗</a>
                    <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-white transition-colors">OpenRouter ↗</a>
                </div>
            </div>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const veniceInput = modal.querySelector('#venice-key-input');
    const openrouterInput = modal.querySelector('#openrouter-key-input');
    const muapiInput = modal.querySelector('#muapi-key-input');
    const btn = modal.querySelector('#save-key-btn');
    const closeBtn = modal.querySelector('#auth-modal-close-btn');

    // Assign values as DOM properties rather than interpolating secrets into HTML.
    veniceInput.value = localStorage.getItem('venice_api_key') || '';
    openrouterInput.value = localStorage.getItem('openrouter_api_key') || '';
    const existingMuapi = localStorage.getItem('muapi_key') || '';
    muapiInput.value = existingMuapi === '__actually_open_byok__' ? '' : existingMuapi;

    const close = () => {
        document.removeEventListener('keydown', onKeydown);
        if (overlay.parentNode) document.body.removeChild(overlay);
    };

    const onKeydown = (e) => {
        if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeydown);

    closeBtn.onclick = close;
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    btn.onclick = () => {
        const veniceKey = veniceInput.value.trim();
        const openrouterKey = openrouterInput.value.trim();
        const muapiKey = muapiInput.value.trim();

        if (!veniceKey && !openrouterKey && !muapiKey) {
            [veniceInput, openrouterInput, muapiInput].forEach((input) => input.classList.add('border-red-500/50'));
            setTimeout(() => [veniceInput, openrouterInput, muapiInput].forEach((input) => input.classList.remove('border-red-500/50')), 2000);
            return;
        }

        if (veniceKey) localStorage.setItem('venice_api_key', veniceKey);
        else localStorage.removeItem('venice_api_key');

        if (openrouterKey) localStorage.setItem('openrouter_api_key', openrouterKey);
        else localStorage.removeItem('openrouter_api_key');

        if (muapiKey) localStorage.setItem('muapi_key', muapiKey);
        else localStorage.removeItem('muapi_key');

        syncPrivacyCompatibilitySentinel();
        close();
        if (onSuccess) onSuccess();
    };

    return overlay;
}
