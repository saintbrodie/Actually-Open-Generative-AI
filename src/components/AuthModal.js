export function AuthModal(onSuccess) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6';

    const modal = document.createElement('div');
    modal.className = 'w-full max-w-md bg-panel-bg border border-white/10 rounded-3xl p-8 shadow-3xl animate-fade-in-up';

    modal.innerHTML = `
        <div class="flex flex-col items-center text-center mb-8">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-glow mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d9ff00" stroke-width="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.25-2.25"/>
                </svg>
            </div>
            <h2 class="text-2xl font-black text-white uppercase tracking-wider mb-2">API Key Required</h2>
            <p class="text-secondary text-sm">Please provide an API key to start creating. You can provide one or both.</p>
        </div>

        <div class="space-y-4">
            <div class="space-y-2">
                <label class="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Venice.ai API Key</label>
                <input 
                    type="password" 
                    id="venice-key-input"
                    placeholder="Enter your Venice API key..."
                    class="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                >
            </div>
            <div class="space-y-2">
                <label class="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">OpenRouter API Key</label>
                <input 
                    type="password" 
                    id="openrouter-key-input"
                    placeholder="Enter your OpenRouter API key..."
                    class="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                >
            </div>

            <div class="flex flex-col gap-3 mt-4">
                <button id="save-key-btn" class="w-full bg-primary text-black font-black py-4 rounded-2xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Initialize Studio
                </button>
                <div class="flex justify-between px-2">
                    <a href="https://venice.ai" target="_blank" class="text-center text-[11px] font-bold text-muted hover:text-white transition-colors py-2 uppercase tracking-tighter">
                        Get Venice Key →
                    </a>
                    <a href="https://openrouter.ai" target="_blank" class="text-center text-[11px] font-bold text-muted hover:text-white transition-colors py-2 uppercase tracking-tighter">
                        Get OpenRouter Key →
                    </a>
                </div>
            </div>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const veniceInput = modal.querySelector('#venice-key-input');
    const openrouterInput = modal.querySelector('#openrouter-key-input');
    const btn = modal.querySelector('#save-key-btn');

    btn.onclick = () => {
        const vKey = veniceInput.value.trim();
        const orKey = openrouterInput.value.trim();
        
        if (vKey || orKey) {
            if (vKey) localStorage.setItem('venice_api_key', vKey);
            if (orKey) localStorage.setItem('openrouter_api_key', orKey);
            
            document.body.removeChild(overlay);
            if (onSuccess) onSuccess();
        } else {
            veniceInput.classList.add('border-red-500/50');
            openrouterInput.classList.add('border-red-500/50');
            setTimeout(() => {
                veniceInput.classList.remove('border-red-500/50');
                openrouterInput.classList.remove('border-red-500/50');
            }, 2000);
        }
    };

    return overlay;
}
