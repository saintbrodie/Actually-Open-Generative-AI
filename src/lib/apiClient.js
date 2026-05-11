export class ApiClient {
    constructor() {}

    getKey(provider) {
        const key = localStorage.getItem(`${provider}_api_key`);
        if (!key) throw new Error(`${provider.toUpperCase()} API Key missing. Please set it in Settings.`);
        return key;
    }

    getBaseUrl(provider) {
        if (provider === 'venice') {
            return import.meta.env.DEV ? '/api/venice' : 'https://api.venice.ai/api/v1';
        } else if (provider === 'openrouter') {
            return import.meta.env.DEV ? '/api/openrouter' : 'https://openrouter.ai/api/v1';
        }
        throw new Error(`Unknown provider: ${provider}`);
    }

    getHeaders(provider, key) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        };
        
        if (provider === 'openrouter') {
            headers['HTTP-Referer'] = window.location.href;
            headers['X-Title'] = 'Open Generative AI';
        }
        
        return headers;
    }

    async getModels(provider) {
        const key = this.getKey(provider);
        const url = `${this.getBaseUrl(provider)}/models`;
        
        try {
            const res = await fetch(url, { headers: this.getHeaders(provider, key) });
            if (!res.ok) throw new Error(`Failed to fetch models for ${provider}`);
            const data = await res.json();
            
            // Format models to our internal standard
            return data.data
                .filter(m => {
                    // For OpenRouter, we only want image modalities if possible, but let's filter heuristically or if output_modalities exists
                    if (provider === 'openrouter') {
                        // Some endpoints might not have output_modalities. Fallback to name checking or allow all.
                        // Actually, OpenRouter does provide architecture.modality
                        if (m.architecture && m.architecture.modality && m.architecture.modality.includes('image')) return true;
                        // Some models might just be known for images
                        if (m.id.includes('flux') || m.id.includes('midjourney') || m.id.includes('dall-e') || m.id.includes('recraft')) return true;
                        return false; 
                    } else if (provider === 'venice') {
                        // Venice models: type="image"
                        return m.type === 'image';
                    }
                    return true;
                })
                .map(m => ({
                    id: m.id,
                    name: m.name || m.id,
                    provider: provider
                }));
        } catch (e) {
            console.error(`Error fetching models for ${provider}:`, e);
            return []; // Fallback to empty or static list handled in UI
        }
    }

    async generateImage(params) {
        const { provider, model, prompt, aspect_ratio, width, height, seed, negative_prompt } = params;
        const key = this.getKey(provider);
        const baseUrl = this.getBaseUrl(provider);

        // For Venice, it usually uses /image/generations or /images/generations
        // For OpenRouter, it's /chat/completions with modalities: ["image"]
        let url = '';
        let payload = {};

        if (provider === 'venice') {
            url = `${baseUrl}/image/generations`;
            payload = {
                model: model,
                prompt: prompt,
                negative_prompt: negative_prompt,
                width: width || 1024,
                height: height || 1024,
                seed: seed && seed !== -1 ? seed : undefined,
                return_binary: false // Ensure we get URL
            };
        } else if (provider === 'openrouter') {
            url = `${baseUrl}/chat/completions`;
            payload = {
                model: model,
                messages: [{ role: 'user', content: prompt }],
                // Instruct OpenRouter to return an image
                // See OpenRouter docs: Some models accept image_config
                provider: {
                    require_parameters: true // ensures it routes properly if needed
                }
            };
        }

        console.log(`[ApiClient] Requesting ${provider}:`, url, payload);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders(provider, key),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`${provider} API Error: ${response.status} - ${errText}`);
            }

            const data = await response.json();
            
            // Normalize result
            let imageUrl = '';
            if (provider === 'venice') {
                imageUrl = data.data?.[0]?.url || data.images?.[0] || data.data?.[0]?.b64_json;
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
                    imageUrl = `data:image/png;base64,${imageUrl}`;
                }
            } else if (provider === 'openrouter') {
                // OpenRouter typically returns image URL in choices[0].message.content (as a markdown image or direct text)
                // But wait, the standard for image output on OpenRouter might put it in an image object.
                // It's often standard chat completions text format, or sometimes choices[0].message.content is the image URL.
                // Let's check both
                const content = data.choices?.[0]?.message?.content || '';
                // Sometimes it's markdown `![image](https://...)`
                const mdMatch = content.match(/!\[.*?\]\((.*?)\)/);
                if (mdMatch) {
                    imageUrl = mdMatch[1];
                } else if (content.startsWith('http')) {
                    imageUrl = content;
                } else {
                    // Fallback just in case
                    imageUrl = content;
                }
            }

            if (!imageUrl) throw new Error(`Failed to extract image URL from ${provider} response.`);

            return { url: imageUrl, raw: data };
        } catch (e) {
            console.error('[ApiClient] Generate Error:', e);
            throw e;
        }
    }

    async generateI2I() { throw new Error("Not implemented for this provider yet."); }
    async generateVideo() { throw new Error("Not implemented for this provider yet."); }
    async processV2V() { throw new Error("Not implemented for this provider yet."); }
    async generateI2V() { throw new Error("Not implemented for this provider yet."); }
    async processLipSync() { throw new Error("Not implemented for this provider yet."); }
    async pollForResult() { throw new Error("Polling not required for OpenRouter/Venice."); }
    async uploadFile() { throw new Error("Upload not supported. Pass URLs or base64."); }
}

export const apiClient = new ApiClient();
// Export muapi alias for other studios to compile
export const muapi = apiClient;
