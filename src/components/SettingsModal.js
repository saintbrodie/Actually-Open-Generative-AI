import { LocalModelManager } from './LocalModelManager.js';
import { isLocalAIAvailable } from '../lib/localInferenceClient.js';
import { t } from '../lib/i18n.js';
import { PRIVACY_SENTINEL, syncPrivacyCompatibilitySentinel } from '../lib/privacyApi.js';

export function SettingsModal(onClose) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:100;';

    const modal = document.createElement('div');
    modal.style.cssText = 'background:var(--bg-card,#111);border-radius:1rem;border:1px solid rgba(255,255,255,0.08);width:min(90vw,40rem);max-height:85vh;display:flex;flex-direction:column;overflow:hidden;';

    const header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;';
    header.innerHTML = `
        <h2 style="font-size:1rem;font-weight:800;color:#fff;margin:0;">${t('settings.title')}</h2>
        <button id="settings-close-btn" aria-label="Close" style="color:rgba(255,255,255,0.4);background:none;border:none;cursor:pointer;padding:4px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
    `;
    modal.appendChild(header);

    const TABS = [
        { id: 'api', label: 'API Keys' },
        ...(isLocalAIAvailable() ? [{ id: 'local', label: t('settings.localModels') }] : []),
    ];

    const tabBar = document.createElement('div');
    tabBar.style.cssText = 'display:flex;gap:0.25rem;padding:0.75rem 1.5rem 0;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;';
    const tabBtns = {};

    TABS.forEach(({ id, label }) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.style.cssText = 'padding:0.4rem 0.75rem;border-radius:0.5rem 0.5rem 0 0;font-size:0.75rem;font-weight:700;border:none;cursor:pointer;transition:all 0.15s;';
        btn.onclick = () => switchTab(id);
        tabBtns[id] = btn;
        tabBar.appendChild(btn);
    });
    modal.appendChild(tabBar);

    const body = document.createElement('div');
    body.style.cssText = 'flex:1;overflow-y:auto;padding:1.5rem;';
    modal.appendChild(body);

    const apiPanel = document.createElement('div');
    apiPanel.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:1rem;">
            <div style="padding:0.9rem 1rem;border:1px solid rgba(34,211,238,0.16);background:rgba(34,211,238,0.04);border-radius:0.75rem;">
                <div style="font-size:0.75rem;font-weight:800;color:#fff;margin-bottom:0.25rem;">Direct-provider BYOK</div>
                <div style="font-size:0.7rem;color:rgba(255,255,255,0.45);line-height:1.5;">Venice and OpenRouter keys are used for supported image and video generation without sending those requests through the compatibility backend.</div>
            </div>

            <div>
                <label style="display:block;font-size:0.75rem;color:rgba(255,255,255,0.5);margin-bottom:0.4rem;font-weight:600;">Venice API Key</label>
                <input id="settings-venice-key" type="password" autocomplete="off"
                    style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:0.75rem;padding:0.6rem 0.9rem;color:#fff;font-size:0.875rem;outline:none;"
                    placeholder="Venice API key">
            </div>

            <div>
                <label style="display:block;font-size:0.75rem;color:rgba(255,255,255,0.5);margin-bottom:0.4rem;font-weight:600;">OpenRouter API Key</label>
                <input id="settings-openrouter-key" type="password" autocomplete="off"
                    style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:0.75rem;padding:0.6rem 0.9rem;color:#fff;font-size:0.875rem;outline:none;"
                    placeholder="OpenRouter API key">
            </div>

            <details style="border:1px solid rgba(255,255,255,0.06);border-radius:0.75rem;padding:0.8rem 0.9rem;background:rgba(255,255,255,0.02);">
                <summary style="cursor:pointer;font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.55);">Compatibility key (optional)</summary>
                <div style="padding-top:0.8rem;">
                    <label style="display:block;font-size:0.72rem;color:rgba(255,255,255,0.45);margin-bottom:0.4rem;font-weight:600;">MuAPI Key</label>
                    <input id="settings-muapi-key" type="password" autocomplete="off"
                        style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:0.75rem;padding:0.6rem 0.9rem;color:#fff;font-size:0.875rem;outline:none;"
                        placeholder="Required only for upstream-only workflows">
                    <p style="font-size:0.68rem;color:rgba(255,255,255,0.3);margin:0.5rem 0 0;line-height:1.5;">Some reference/V2V tools, lip-sync, agent, workflow, specialty image, and other upstream features have not been ported to direct providers yet.</p>
                </div>
            </details>

            <p style="font-size:0.7rem;color:rgba(255,255,255,0.3);margin:0;line-height:1.5;">Keys are stored in this app profile today. OS-keychain-backed desktop secret storage is still on the roadmap.</p>

            <div style="display:flex;justify-content:flex-end;gap:0.5rem;margin-top:0.25rem;">
                <button id="settings-cancel-btn" style="padding:0.5rem 1rem;border-radius:0.5rem;background:none;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);font-size:0.75rem;font-weight:700;cursor:pointer;">${t('common.cancel')}</button>
                <button id="settings-save-btn" style="padding:0.5rem 1rem;border-radius:0.5rem;background:var(--color-primary,#22d3ee);color:#000;font-size:0.75rem;font-weight:700;cursor:pointer;border:none;">${t('common.save')}</button>
            </div>
        </div>
    `;

    // Set secret values through DOM properties so localStorage content is never
    // interpreted as HTML markup.
    apiPanel.querySelector('#settings-venice-key').value = localStorage.getItem('venice_api_key') || '';
    apiPanel.querySelector('#settings-openrouter-key').value = localStorage.getItem('openrouter_api_key') || '';
    const storedMuapiKey = localStorage.getItem('muapi_key') || '';
    apiPanel.querySelector('#settings-muapi-key').value = storedMuapiKey === PRIVACY_SENTINEL ? '' : storedMuapiKey;

    const localPanel = LocalModelManager();

    const switchTab = (id) => {
        body.innerHTML = '';
        TABS.forEach(({ id: tid }) => {
            const btn = tabBtns[tid];
            if (tid === id) {
                btn.style.background = 'rgba(255,255,255,0.08)';
                btn.style.color = '#fff';
            } else {
                btn.style.background = 'transparent';
                btn.style.color = 'rgba(255,255,255,0.4)';
            }
        });
        if (id === 'api') body.appendChild(apiPanel);
        if (id === 'local') body.appendChild(localPanel);
    };

    switchTab('api');

    const close = () => {
        document.removeEventListener('keydown', onKeydown);
        if (document.body.contains(overlay)) document.body.removeChild(overlay);
        if (onClose) onClose();
    };

    const onKeydown = (event) => {
        if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeydown);

    apiPanel.querySelector('#settings-cancel-btn').onclick = close;
    apiPanel.querySelector('#settings-save-btn').onclick = () => {
        const veniceKey = apiPanel.querySelector('#settings-venice-key').value.trim();
        const openrouterKey = apiPanel.querySelector('#settings-openrouter-key').value.trim();
        const muapiKey = apiPanel.querySelector('#settings-muapi-key').value.trim();

        if (veniceKey) localStorage.setItem('venice_api_key', veniceKey);
        else localStorage.removeItem('venice_api_key');

        if (openrouterKey) localStorage.setItem('openrouter_api_key', openrouterKey);
        else localStorage.removeItem('openrouter_api_key');

        if (muapiKey) localStorage.setItem('muapi_key', muapiKey);
        else localStorage.removeItem('muapi_key');

        syncPrivacyCompatibilitySentinel();
        close();
    };

    header.querySelector('#settings-close-btn').onclick = close;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    overlay.appendChild(modal);
    return overlay;
}
