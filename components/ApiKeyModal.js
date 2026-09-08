'use client';

import { useEffect, useState } from 'react';
import { getCommonCopy } from '@/lib/locales';
import { notifyProviderKeysChanged } from 'studio';

const LEGACY_PRIVACY_SENTINEL = '__actually_open_byok__';

export default function ApiKeyModal({ onSave, onClose, overlay = false, title, subtitle, locale = 'en' }) {
  const [veniceKey, setVeniceKey] = useState('');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [muapiKey, setMuapiKey] = useState('');
  const [error, setError] = useState('');
  const copy = getCommonCopy(locale).apiKeyModal;

  useEffect(() => {
    setVeniceKey(localStorage.getItem('venice_api_key') || '');
    setOpenRouterKey(localStorage.getItem('openrouter_api_key') || '');
    const existingMuapi = localStorage.getItem('muapi_key') || '';
    // Hide the legacy sentinel during migration; the shell removes it rather
    // than treating it as a compatibility credential.
    setMuapiKey(existingMuapi === LEGACY_PRIVACY_SENTINEL ? '' : existingMuapi);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const venice = veniceKey.trim();
    const openrouter = openRouterKey.trim();
    const muapi = muapiKey.trim();

    if (!venice && !openrouter && !muapi) {
      setError(copy.missingKeyError);
      return;
    }

    if (venice) localStorage.setItem('venice_api_key', venice);
    else localStorage.removeItem('venice_api_key');

    if (openrouter) localStorage.setItem('openrouter_api_key', openrouter);
    else localStorage.removeItem('openrouter_api_key');

    // A direct-provider session no longer needs a fake MuAPI credential. The
    // shell tracks provider-key presence separately and only persists/cookies a
    // real compatibility key when the user supplies one.
    onSave(muapi || null);
    notifyProviderKeysChanged();
  };

  const wrapperClass = overlay
    ? 'fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 font-inter animate-fade-in-up'
    : 'min-h-screen bg-[#030303] flex items-center justify-center px-4 font-inter';

  return (
    <div className={wrapperClass}>
      <div className="w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {overlay && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="absolute top-3 right-3 w-8 h-8 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="flex flex-col items-center text-center mb-7">
          <div className="w-14 h-14 bg-[#22d3ee]/5 rounded-2xl flex items-center justify-center border border-[#22d3ee]/10 mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L12 17.25l-4.5-4.5L15.5 7.5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mb-2">
            {title || 'Bring Your Own Key'}
          </h1>
          <p className="text-white/40 text-[13px] leading-relaxed px-4">
            {subtitle || 'Use Venice or OpenRouter directly for supported image and video generation. Add a compatibility key only for tools that have not been ported yet.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-white/40 ml-1">Venice API Key</label>
            <input
              type="password"
              autoComplete="off"
              value={veniceKey}
              onChange={(e) => { setVeniceKey(e.target.value); setError(''); }}
              placeholder="Venice API key"
              className="w-full bg-white/5 border border-white/[0.05] rounded-md px-5 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-[#22d3ee]/30"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-white/40 ml-1">OpenRouter API Key</label>
            <input
              type="password"
              autoComplete="off"
              value={openRouterKey}
              onChange={(e) => { setOpenRouterKey(e.target.value); setError(''); }}
              placeholder="OpenRouter API key"
              className="w-full bg-white/5 border border-white/[0.05] rounded-md px-5 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-[#22d3ee]/30"
            />
          </div>

          <details className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-wide text-white/35">Compatibility key (optional)</summary>
            <div className="pt-3 space-y-2">
              <label className="block text-xs font-bold text-white/30 ml-1">MuAPI Key</label>
              <input
                type="password"
                autoComplete="off"
                value={muapiKey}
                onChange={(e) => { setMuapiKey(e.target.value); setError(''); }}
                placeholder="Unported video tools, lip-sync, agents, workflows, and specialty studios"
                className="w-full bg-white/5 border border-white/[0.05] rounded-md px-5 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-[#22d3ee]/30"
              />
            </div>
          </details>

          {error && <p className="text-red-500/80 text-[11px] font-medium ml-1">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#22d3ee] text-black font-medium py-2.5 rounded-md hover:bg-[#e5ff33] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#22d3ee]/5"
          >
            Save keys
          </button>

          <div className="flex justify-center gap-5 pt-1 text-[11px] font-medium">
            <a href="https://venice.ai" target="_blank" rel="noreferrer" className="text-white/35 hover:text-[#22d3ee]">Venice ↗</a>
            <a href="https://openrouter.ai" target="_blank" rel="noreferrer" className="text-white/35 hover:text-[#22d3ee]">OpenRouter ↗</a>
          </div>
        </form>
      </div>
    </div>
  );
}
