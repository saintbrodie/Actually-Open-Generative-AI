// Auto-generated from models_dump.json
export const t2iModels = [
  {
    id: "flux-dev",
    name: "Flux Dev",
    provider: "venice",
    inputs: {
      aspect_ratio: { default: "1:1" }
    }
  },
  {
    id: "fluently-xl",
    name: "Fluently XL",
    provider: "venice",
    inputs: {
      aspect_ratio: { default: "1:1" }
    }
  },
  {
    id: "black-forest-labs/flux-1.1-pro",
    name: "Flux 1.1 Pro (OR)",
    provider: "openrouter",
    inputs: {
      aspect_ratio: { default: "1:1" }
    }
  }
];

export const getModelById = (id) => t2iModels.find(m => m.id === id);

export const getAspectRatiosForModel = (modelId) => {
  const model = getModelById(modelId);
  if (!model) return ['1:1'];

  const arInput = model.inputs?.aspect_ratio;
  if (arInput && arInput.enum) {
    return arInput.enum;
  }

  return ['1:1', '16:9', '9:16', '4:3', '3:2', '21:9'];
};

// ==========================================
// Text-to-Video Models
// ==========================================
export const t2vModels = [
  {
    "id": "seedance-lite-t2v",
    "name": "Seedance Lite",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9", "9:21"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 3, "maxValue": 12, "step": 1 },
      "resolution": { "enum": ["480p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "480p" }
    }
  },
  {
    "id": "seedance-pro-t2v",
    "name": "Seedance Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9", "9:21"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 3, "maxValue": 12, "step": 1 },
      "resolution": { "enum": ["480p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "480p" }
    }
  },
  {
    "id": "seedance-pro-t2v-fast",
    "name": "Seedance Pro Fast",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 2, "maxValue": 12, "step": 1 },
      "resolution": { "enum": ["480p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "480p" }
    }
  },
  {
    "id": "seedance-v1.5-pro-t2v",
    "name": "Seedance v1.5 Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "3:4", "4:3", "21:9"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 4, "maxValue": 12, "step": 1 },
      "resolution": { "enum": ["480p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "720p" }
    }
  },
  {
    "id": "seedance-v1.5-pro-t2v-fast",
    "name": "Seedance v1.5 Pro Fast",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "3:4", "4:3", "21:9"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 4, "maxValue": 12, "step": 1 },
      "resolution": { "enum": ["720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "720p" }
    }
  },
  {
    "id": "seedance-v2.0-t2v",
    "name": "Seedance 2.0",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "4:3", "3:4"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [5, 10, 15], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5 },
      "quality": { "enum": ["high", "basic"], "title": "Quality", "name": "quality", "type": "string", "description": "Quality of the generated video.", "default": "basic" }
    }
  },
  {
    "id": "seedance-v2.0-extend",
    "name": "Seedance 2.0 Extend",
    "requiresRequestId": true,
    "inputs": {
      "request_id": { "type": "string", "title": "Request ID", "name": "request_id", "description": "Request ID of the original Seedance 2.0 video generation.", "placeholder": "abcdefg-123-456-789-a1b2c3d4e5f6" },
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Optional prompt to guide the extension. If omitted, the model continues with the original scene." },
      "duration": { "enum": [5, 10, 15], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video extension in seconds", "default": 5 },
      "quality": { "enum": ["high", "basic"], "title": "Quality", "name": "quality", "type": "string", "description": "Quality of the generated video.", "default": "basic" }
    }
  },
  {
    "id": "kling-v2.1-master-t2v",
    "name": "Kling v2.1 Master",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 5, "maxValue": 10, "step": 5 }
    }
  },
  {
    "id": "kling-v2.5-turbo-pro-t2v",
    "name": "Kling v2.5 Turbo Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "9:16" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 5, "maxValue": 10, "step": 5 }
    }
  },
  {
    "id": "kling-v2.6-pro-t2v",
    "name": "Kling v2.6 Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [5, 10], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds.", "default": 5 }
    }
  },
  {
    "id": "kling-o1-text-to-video",
    "name": "Kling O1 Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [5, 10], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5 }
    }
  },
  {
    "id": "kling-v3.0-pro-text-to-video",
    "name": "Kling v3.0 Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "The aspect ratio of the generated video", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 3, "maxValue": 15, "step": 1 }
    }
  },
  {
    "id": "kling-v3.0-standard-text-to-video",
    "name": "Kling v3.0 Standard",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "The aspect ratio of the generated video", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 3, "maxValue": 15, "step": 1 }
    }
  },
  {
    "id": "veo3-text-to-video",
    "name": "Veo 3",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the desired video content." },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" }
    }
  },
  {
    "id": "veo3-fast-text-to-video",
    "name": "Veo 3 Fast",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the desired video content." },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" }
    }
  },
  {
    "id": "veo3.1-text-to-video",
    "name": "Veo 3.1",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [8], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 8 },
      "resolution": { "enum": ["1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "1080p" }
    }
  },
  {
    "id": "veo3.1-fast-text-to-video",
    "name": "Veo 3.1 Fast",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [8], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 8 },
      "resolution": { "enum": ["1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "1080p" }
    }
  },
  {
    "id": "veo3.1-lite-text-to-video",
    "name": "Veo 3.1 Lite",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [8], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 8 },
      "resolution": { "enum": ["1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "1080p" }
    }
  },
  {
    "id": "runway-text-to-video",
    "name": "Runway Gen-3",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to be used to generate a video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "4:3", "3:4"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [5, 8], "title": "Duration", "name": "duration", "type": "int", "description": "The duration in seconds. If 8-second video is selected, 1080p resolution cannot be used.", "default": 5 },
      "resolution": { "enum": ["720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video. If 1080p is selected, 8-second video cannot be generated.", "default": "720p" }
    }
  },
  {
    "id": "wan2.1-text-to-video",
    "name": "Wan 2.1",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 5, "maxValue": 10, "step": 5 },
      "resolution": { "enum": ["480p", "720p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "480p" },
      "quality": { "enum": ["medium", "high"], "title": "Quality", "name": "quality", "type": "string", "description": "The quality of the generated video.", "default": "medium" }
    }
  },
  {
    "id": "wan2.2-text-to-video",
    "name": "Wan 2.2",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds.", "default": 5, "minValue": 5, "maxValue": 8, "step": 3 },
      "resolution": { "enum": ["480p", "720p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "480p" },
      "quality": { "enum": ["medium", "high"], "title": "Quality", "name": "quality", "type": "string", "description": "The quality of the generated video.", "default": "medium" }
    }
  },
  {
    "id": "wan2.2-5b-fast-t2v",
    "name": "Wan 2.2 Fast",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "resolution": { "enum": ["480p", "580p", "720p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "480p" }
    }
  },
  {
    "id": "wan2.5-text-to-video",
    "name": "Wan 2.5",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 5, "maxValue": 10, "step": 5 },
      "resolution": { "enum": ["480p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "480p" }
    }
  },
  {
    "id": "wan2.5-text-to-video-fast",
    "name": "Wan 2.5 Fast",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 5, "maxValue": 10, "step": 5 },
      "resolution": { "enum": ["720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "720p" }
    }
  },
  {
    "id": "wan2.6-text-to-video",
    "name": "Wan 2.6",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [5, 10, 15], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5 },
      "resolution": { "enum": ["720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "720p" }
    }
  },
  {
    "id": "hunyuan-text-to-video",
    "name": "Hunyuan",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" }
    }
  },
  {
    "id": "hunyuan-fast-text-to-video",
    "name": "Hunyuan Fast",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" }
    }
  },
  {
    "id": "pixverse-v4.5-t2v",
    "name": "Pixverse v4.5",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "4:3", "3:4"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds. 8s not supported for 1080p resolution.", "default": 5, "minValue": 5, "maxValue": 8, "step": 3 },
      "resolution": { "enum": ["360p", "540p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "720p" }
    }
  },
  {
    "id": "pixverse-v5-t2v",
    "name": "Pixverse v5",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "4:3", "3:4"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 5, "maxValue": 8, "step": 3 },
      "resolution": { "enum": ["360p", "540p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "720p" }
    }
  },
  {
    "id": "pixverse-v5.5-t2v",
    "name": "Pixverse v5.5",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1", "4:3", "3:4"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [5, 8, 10], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds.", "default": 5 },
      "resolution": { "enum": ["360p", "540p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "360p" }
    }
  },
  {
    "id": "minimax-hailuo-02-standard-t2v",
    "name": "Hailuo 02 Standard",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "duration": { "enum": [6, 10], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 6 },
      "resolution": { "enum": ["768P"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "768P" }
    }
  },
  {
    "id": "minimax-hailuo-02-pro-t2v",
    "name": "Hailuo 02 Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "duration": { "enum": [6], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 6 },
      "resolution": { "enum": ["1080P"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "1080P" }
    }
  },
  {
    "id": "minimax-hailuo-2.3-pro-t2v",
    "name": "Hailuo 2.3 Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "resolution": { "enum": ["1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "1080p" }
    }
  },
  {
    "id": "minimax-hailuo-2.3-standard-t2v",
    "name": "Hailuo 2.3 Standard",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "duration": { "enum": [6, 10], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 6 }
    }
  },
  {
    "id": "openai-sora",
    "name": "Sora",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "resolution": { "enum": ["480p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "480p" }
    }
  },
  {
    "id": "openai-sora-2-text-to-video",
    "name": "Sora 2",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [10, 15], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 10 }
    }
  },
  {
    "id": "openai-sora-2-pro-text-to-video",
    "name": "Sora 2 Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" },
      "duration": { "enum": [10, 15, 25], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds. Currently 25 seconds supports 720p only.", "default": 10 },
      "resolution": { "enum": ["720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "720p" }
    }
  },
  {
    "id": "vidu-v2.0-t2v",
    "name": "Vidu v2.0",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "The prompt to generate the video" },
      "aspect_ratio": { "enum": ["9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "9:16" },
      "duration": { "enum": [4], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds.", "default": 4 },
      "resolution": { "enum": ["1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "1080p" }
    }
  },
  {
    "id": "ovi-text-to-video",
    "name": "OVI",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "16:9" }
    }
  },
  {
    "id": "grok-imagine-text-to-video",
    "name": "Grok Imagine",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["9:16", "16:9", "2:3", "3:2", "1:1"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "Aspect ratio of the output video.", "default": "1:1" },
      "mode": { "enum": ["fun", "normal", "spicy"], "title": "Mode", "name": "mode", "type": "string", "description": "Generation style: normal = standard output; fun = more creative/expressive; spicy = edgier content (text-to-video only).", "default": "normal" },
      "duration": { "enum": [6, 10, 15], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds.", "default": 6 }
    }
  },
  {
    "id": "ltx-2-pro-text-to-video",
    "name": "LTX 2 Pro",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "duration": { "enum": [6, 8, 10], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 6 }
    }
  },
  {
    "id": "ltx-2-fast-text-to-video",
    "name": "LTX 2 Fast",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "duration": { "enum": [6, 8, 10, 12, 14, 16, 18, 20], "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 6 }
    }
  },
  {
    "id": "ltx-2-19b-text-to-video",
    "name": "LTX 2 19B",
    "inputs": {
      "prompt": { "type": "string", "title": "Prompt", "name": "prompt", "description": "Text prompt describing the video." },
      "aspect_ratio": { "enum": ["16:9", "9:16"], "title": "Aspect Ratio", "name": "aspect_ratio", "type": "string", "description": "The aspect ratio of the generated video", "default": "16:9" },
      "duration": { "title": "Duration", "name": "duration", "type": "int", "description": "The duration of the generated video in seconds", "default": 5, "minValue": 5, "maxValue": 20, "step": 1 },
      "resolution": { "enum": ["480p", "720p", "1080p"], "title": "Resolution", "name": "resolution", "type": "string", "description": "The resolution of the generated video.", "default": "720p" }
    }
  }
];

export const getVideoModelById = (id) => t2vModels.find(m => m.id === id);

export const getAspectRatiosForVideoModel = (modelId) => {
  const model = getVideoModelById(modelId);
  if (!model) return ['16:9'];
  const arInput = model.inputs?.aspect_ratio;
  if (arInput && arInput.enum) return arInput.enum;
  return ['16:9', '9:16', '1:1'];
};

export const getDurationsForModel = (modelId) => {
  const model = getVideoModelById(modelId);
  if (!model) return [5];
  const durInput = model.inputs?.duration;
  if (durInput && durInput.enum) return durInput.enum;
  if (durInput) return [durInput.default || 5];
  return [];
};

export const getResolutionsForVideoModel = (modelId) => {
  const model = getVideoModelById(modelId);
  if (!model) return [];
  const resInput = model.inputs?.resolution;
  if (resInput && resInput.enum) return resInput.enum;
  return [];
};
// Auto-generated from schema_data.json — Image to Image models
export const i2iModels = t2iModels;

export const i2vModels = [
  {
    "id": "ai-video-effects",
    "name": "AI Video Effects",
    "endpoint": "generate_wan_ai_effects",
    "family": "effects",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to insert into the predefined prompt template for the selected effect.",
        "examples": [
          "a cute kitten"
        ]
      },
      "name": {
        "type": "string",
        "title": "Effect Type",
        "name": "name",
        "description": "The type of effect to apply to the video.",
        "enum": [
          "360 Rotation",
          "Abandoned Places",
          "Angry",
          "Animal Documentary",
          "Assassin It",
          "Baby It",
          "Boxing",
          "Bride It",
          "Cakeify",
          "Cartoon Jaw Drop",
          "Cats",
          "Crush It",
          "Crying",
          "Cyberpunk 2077",
          "Deflate It",
          "Disney Princess It",
          "Dogs",
          "Eye Close-Up",
          "Fantasy Landscapes",
          "Film Noir",
          "Fire",
          "Glamor",
          "Goblin",
          "Gun Reveal",
          "Hug Jesus",
          "Hulk Transformation",
          "Inflate It",
          "Jungle It",
          "Jumpscare",
          "Kamehameha",
          "Kiss Cam",
          "Kissing",
          "Lego",
          "Laughing",
          "Little Planet",
          "Live Wallpaper",
          "Looping Pixel Art",
          "Melt It",
          "Mona Lisa It",
          "Museum It",
          "Muscle Show Off",
          "Orc",
          "Pixar",
          "Pirate Captain",
          "POV Driving",
          "Princess It",
          "Puppy it",
          "Robotic Face Reveal",
          "Samurai It",
          "Sharingan Eyes",
          "Skyrim Fus-Ro-Dah",
          "Snow White It",
          "Squish It",
          "Steamboat Willie",
          "Super Saiyan Transformation",
          "Tsunami",
          "Ultra Wide",
          "VHS Footage",
          "VIP It",
          "Warrior It",
          "Wind Blast",
          "Younger Self Selfie",
          "Zen It",
          "Zoom Call"
        ],
        "default": "Cakeify"
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p"
        ],
        "default": "480p"
      },
      "quality": {
        "type": "string",
        "title": "Quality",
        "name": "quality",
        "description": "The quality of the generated video.",
        "enum": [
          "medium",
          "high"
        ],
        "default": "medium"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          5,
          10
        ],
        "default": 5
      }
    }
  },
  {
    "id": "motion-controls",
    "name": "Motion Controls",
    "endpoint": "generate_wan_ai_effects",
    "family": "effects",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to insert into the predefined prompt template for the selected effect.",
        "examples": [
          "a blueberry person"
        ]
      },
      "name": {
        "type": "string",
        "title": "Effect Type",
        "name": "name",
        "description": "The type of effect to apply to the video.",
        "enum": [
          "360 Orbit",
          "Arc Shot",
          "Car Chase",
          "Car Mount Cam",
          "Crash Zoom In",
          "Crash Zoom Out",
          "Crane Down",
          "Crane Overhead",
          "Crane Punch-In",
          "Crane Up",
          "Dirty Lens",
          "Dolly In",
          "Dolly Left",
          "Dolly Out",
          "Dolly Right",
          "Dolly Zoom In",
          "Dolly Zoom Out",
          "Dutch Angle",
          "Fast Dolly Zoom In",
          "Fast Dolly Zoom Out",
          "Fisheye Lens",
          "Focus Shift",
          "FPV Drone Cam",
          "Handheld Cam",
          "Head Tracking",
          "Hero Run",
          "Human Timelapse",
          "Landscape Timelapse",
          "Lazy Susan",
          "Lens Crac",
          "Lens Flare",
          "Matrix Shot",
          "Motion Blur",
          "Object POV",
          "Overhead",
          "Rap Video Cam",
          "Robotic Cam",
          "Snorricam",
          "Tilt Down",
          "Tilt Up",
          "Whip Pan",
          "Wiggle",
          "Zoom In",
          "Zoom In Through Object",
          "Zoom Into Mouth",
          "Zoom Out",
          "Zoom Out Through Object"
        ],
        "default": "360 Orbit"
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p"
        ],
        "default": "480p"
      },
      "quality": {
        "type": "string",
        "title": "Quality",
        "name": "quality",
        "description": "The quality of the generated video.",
        "enum": [
          "medium",
          "high"
        ],
        "default": "medium"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          5,
          10
        ],
        "default": 5
      }
    }
  },
  {
    "id": "vfx",
    "name": "VFX",
    "endpoint": "generate_wan_ai_effects",
    "family": "effects",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to insert into the predefined prompt template for the selected effect.",
        "examples": [
          "a Mercedes bench car"
        ]
      },
      "name": {
        "type": "string",
        "title": "Effect Type",
        "name": "name",
        "description": "The type of effect to apply to the video.",
        "enum": [
          "Building Explosion",
          "Car Explosion",
          "Decay Time-Lapse",
          "Disintegration",
          "Electricity",
          "Flying",
          "Huge Explosion",
          "Levitate",
          "Tornado"
        ],
        "default": "Car Explosion"
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p"
        ],
        "default": "480p"
      },
      "quality": {
        "type": "string",
        "title": "Quality",
        "name": "quality",
        "description": "The quality of the generated video.",
        "enum": [
          "medium",
          "high"
        ],
        "default": "medium"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          5,
          10
        ],
        "default": 5
      }
    }
  },
  {
    "id": "veo3-image-to-video",
    "name": "Veo3 Image To Video",
    "endpoint": "veo3-image-to-video",
    "family": "veo",
    "imageField": "images_list",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the desired video content.",
        "examples": [
          "On a neon-lit street corner, a hyped street performer with a mic shouts: 'Yo! Big drop today! VEO3 just launched on muapi!' A crowd cheers as holograms of videos burst into the air and the muapi logo spins above."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      }
    }
  },
  {
    "id": "veo3-fast-image-to-video",
    "name": "Veo3 Fast Image To Video",
    "endpoint": "veo3-fast-image-to-video",
    "family": "veo",
    "imageField": "images_list",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the desired video content.",
        "examples": [
          "A spaceship hovers over Earth. A digital billboard beams out: 'MuAPI is broadcasting creativity across the galaxy.' A robot host floats in zero gravity holding a prompt card: 'Let’s turn this into a story.' Suddenly, video panels fly around the ship with generated content."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      }
    }
  },
  {
    "id": "runway-image-to-video",
    "name": "Runway Image To Video",
    "endpoint": "runway-image-to-video",
    "family": "runway",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to be used to generate a video",
        "examples": [
          "The camera smoothly zooms in on the sleek, futuristic race car as it speeds through a neon-lit urban tunnel at twilight, its glossy white surface reflecting the vibrant pink and blue lights streaking past. The precise detailing of the car’s aerodynamic curves and glowing accents is highlighted as droplets of water spray from the spinning tires, adding a palpable sense of motion and intensity. The driver’s black helmet, contrasted against the car’s gleaming body, remains sharply in focus, emphasizing the thrilling high-speed chase through the city. The blurred cityscape and illuminated digital billboards in the background create a high-tech, cyberpunk atmosphere, intensifying the scene’s adrenaline and futuristic vibe."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1",
          "4:3",
          "3:4"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video. If 1080p is selected, 8-second video cannot be generated.",
        "enum": [
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration in seconds. If 8-second video is selected, 1080p resolution cannot be used.",
        "enum": [
          5,
          8
        ],
        "default": 5
      }
    }
  },
  {
    "id": "wan2.1-image-to-video",
    "name": "Wan2.1 Image To Video",
    "endpoint": "wan2.1-image-to-video",
    "family": "wan2.1",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Animate the girl in the painting to blink and look around while her hair moves gently in the wind."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p"
        ],
        "default": "480p"
      },
      "quality": {
        "type": "string",
        "title": "Quality",
        "name": "quality",
        "description": "The quality of the generated video.",
        "enum": [
          "medium",
          "high"
        ],
        "default": "medium"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "midjourney-v7-image-to-video",
    "name": "Midjourney v7 Image To Video",
    "endpoint": "midjourney-v7-image-to-video",
    "family": "midjourney",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Add slow drifting fog, glowing mushrooms pulsating softly, and subtle camera zoom"
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output image.",
        "enum": [
          "1:1",
          "16:9",
          "9:16",
          "3:4",
          "4:3",
          "1:2",
          "2:1",
          "2:3",
          "3:2",
          "5:6",
          "6:5"
        ],
        "default": "1:1"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "1080p"
        ],
        "default": "480p"
      },
      "num_videos": {
        "type": "int",
        "title": "Number of videos",
        "name": "num_videos",
        "description": "Number of videos generated in single request. Each number will charge separately",
        "enum": [
          1,
          2,
          4
        ],
        "default": 1
      },
      "variety": {
        "type": "int",
        "title": "Variety",
        "name": "variety",
        "description": "Controls the diversity of generated images. Increment by 5 each time. Higher values create more diverse results. Lower values create more consistent results.",
        "default": 5,
        "minValue": 0,
        "maxValue": 100,
        "step": 5
      },
      "stylization": {
        "type": "int",
        "title": "Stylization",
        "name": "stylization",
        "description": "Controls the artistic style intensity. Higher values create more stylized results. Lower values create more realistic results.",
        "default": 1,
        "minValue": 0,
        "maxValue": 1000,
        "step": 1
      },
      "weirdness": {
        "type": "int",
        "title": "Weirdness",
        "name": "weirdness",
        "description": "Controls the creativity and uniqueness. Higher values create more unusual results. Lower values create more conventional results.",
        "default": 1,
        "minValue": 0,
        "maxValue": 3000,
        "step": 1
      }
    }
  },
  {
    "id": "hunyuan-image-to-video",
    "name": "Hunyuan Image To Video",
    "endpoint": "hunyuan-image-to-video",
    "family": "hunyuan",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "The camera begins with a slow, deliberate zoom out from the figure standing on the rain-soaked rooftop, revealing the sleek, armored silhouette clutching a glowing katana that pulses with ominous red light. The deep blues and purples of the wet cityscape set a moody, cyberpunk atmosphere, with neon signs in vibrant pinks, blues, and oranges casting reflections on the glistening surfaces below. The mist and rain softly blur the distant buildings and streetlights, emphasizing the isolation of the lone warrior framed against the sprawling urban expanse. As the camera pulls back, the subtle hum of the futuristic city grows louder, immersing the viewer in a world of tension and anticipation, where danger lurks in the glowing depths of the rain-drenched streets."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1"
        ],
        "default": "16:9"
      }
    }
  },
  {
    "id": "kling-v2.1-master-i2v",
    "name": "Kling v2.1 Master I2V",
    "endpoint": "kling-v2.1-master-i2v",
    "family": "kling-v2.1",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Animates wind effects, camera panning, and subtle movements like blinking or background motion, transforming the image into a compelling cinematic shot."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "kling-v2.1-standard-i2v",
    "name": "Kling v2.1 Standard I2V",
    "endpoint": "kling-v2.1-standard-i2v",
    "family": "kling-v2.1",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "A female explorer stands at the edge of a cliff overlooking a dense jungle, her hair and cape rustling gently in the wind as the dramatic sunset casts warm, golden hues across the sky and landscape, capturing a moment of awe and adventure."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "kling-v2.1-pro-i2v",
    "name": "Kling v2.1 Pro I2V",
    "endpoint": "kling-v2.1-pro-i2v",
    "family": "kling-v2.1",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "A cyberpunk woman with neon tattoos stands in a rainy alley as glowing signs reflect vividly in puddles around her. Her coat flutters slightly in the breeze, and she makes subtle head movements, capturing the moody, futuristic atmosphere without any scene changes."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "wan2.2-image-to-video",
    "name": "Wan2.2 Image To Video",
    "endpoint": "wan2.2-image-to-video",
    "family": "wan2.2",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "A close-up video of a young woman smiling gently in the rain, with raindrops glistening on her face and eyelashes. The camera focuses on the delicate details of her expression and the shimmering water droplets, while soft light softly reflects off her skin, emphasizing the rainy atmosphere."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p"
        ],
        "default": "480p"
      },
      "quality": {
        "type": "string",
        "title": "Quality",
        "name": "quality",
        "description": "The quality of the generated video.",
        "enum": [
          "medium",
          "high"
        ],
        "default": "medium"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds.",
        "default": 5,
        "minValue": 5,
        "maxValue": 8,
        "step": 3
      }
    }
  },
  {
    "id": "runway-act-two-i2v",
    "name": "Runway Act Two I2V",
    "endpoint": "runway-act-two-i2v",
    "family": "runway",
    "imageField": "image_url",
    "hasPrompt": false,
    "inputs": {
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1",
          "4:3",
          "3:4",
          "21:9"
        ],
        "default": "16:9"
      }
    }
  },
  {
    "id": "pixverse-v4.5-i2v",
    "name": "Pixverse v4.5 I2V",
    "endpoint": "pixverse-v4.5-i2v",
    "family": "pixverse-v4.5",
    "imageField": "images_list",
    "lastImageField": "images_list",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "A cat dressed in a sharp business suit stands confidently on a TED Talk stage, delivering an engaging lecture on quantum physics. The audience is filled with attentive dogs wearing glasses, reacting thoughtfully to the presentation. The video features dramatic camera zooms that highlight the cat speaker’s expressions and the intrigued faces of the canine audience, maintaining the setting and characters without altering the scene."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1",
          "4:3",
          "3:4"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "360p",
          "540p",
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds. 8s not supported for 1080p resolution.",
        "default": 5,
        "minValue": 5,
        "maxValue": 8,
        "step": 3
      }
    }
  },
  {
    "id": "vidu-v2.0-i2v",
    "name": "Vidu v2.0 I2V",
    "endpoint": "vidu-v2.0-i2v",
    "family": "vidu-v2",
    "imageField": "images_list",
    "lastImageField": "images_list",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "A baby dragon wearing a tiny cape attempts to fly, wobbling uncertainly in the air with playful flaps of its wings, set against a bright and cheerful background. Light, upbeat music plays throughout, capturing the dragon's joyful effort. The video ends with the baby dragon gently crashing in a cute and harmless tumble, smiling and unfazed."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video. 16:9 for 360p/720p, 1:1 for 1080p are supported.",
        "enum": [
          "16:9",
          "1:1"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "360p",
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds.",
        "enum": [
          4
        ],
        "default": 4
      }
    }
  },
  {
    "id": "vidu-q1-reference",
    "name": "Vidu Q1 Reference",
    "endpoint": "vidu-q1-reference",
    "family": "vidu-q1",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 7,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the desired video content.",
        "examples": [
          "Animate the character walking through the foggy forest at dawn, swinging the sword gracefully. Add cinematic camera pan and soft ambient lighting."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1"
        ],
        "default": "1:1"
      }
    }
  },
  {
    "id": "minimax-hailuo-02-standard-i2v",
    "name": "Minimax Hailuo 02 Standard I2V",
    "endpoint": "minimax-hailuo-02-standard-i2v",
    "family": "minimax-2",
    "imageField": "image_url",
    "lastImageField": "end_image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Animate her looking out at the horizon as gentle waves crash, with her hair moving in the wind. Light, smooth motion, perfect for social clips."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          6,
          10
        ],
        "default": 6
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "512P",
          "768P"
        ],
        "default": "512P"
      }
    }
  },
  {
    "id": "minimax-hailuo-02-pro-i2v",
    "name": "Minimax Hailuo 02 Pro I2V",
    "endpoint": "minimax-hailuo-02-pro-i2v",
    "family": "minimax-2",
    "imageField": "image_url",
    "lastImageField": "end_image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Transform this still image into a dramatic cinematic sequence: the scholar walks slowly through an ancient library where shelves tower endlessly into the shadows. The lantern’s flame flickers, casting moving patterns across scrolls and statues. Dust motes dance in golden light as the camera glides smoothly behind him, then pans upward to reveal an infinite expanse of glowing constellations painted across the ceiling that begin to shimmer and move as if alive."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          6
        ],
        "default": 6
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "1080p"
        ],
        "default": "1080p"
      }
    }
  },
  {
    "id": "video-effects",
    "name": "Video Effects",
    "endpoint": "video-effects",
    "family": "effects",
    "imageField": "image_url",
    "hasPrompt": false,
    "inputs": {
      "name": {
        "type": "string",
        "title": "Effect Name",
        "name": "name",
        "description": "The type of effect to apply to the video.",
        "enum": [
          "Balloon Flyaway",
          "Blow Kiss",
          "Body Shake",
          "Break Glass",
          "Carry Me",
          "Cartoon Doll",
          "Cheek Kiss",
          "Child Memory",
          "Couple Arrival",
          "Fairy Me",
          "Fashion Stride",
          "Fisherman",
          "Flower Receive",
          "Flying",
          "French Kiss",
          "Gender Swap",
          "Golden Epoch",
          "Hair Swap",
          "Hugging",
          "Jiggle Up",
          "Kissing Pro",
          "Live Memory",
          "Love Drop",
          "Melt",
          "Minecraft",
          "Muscling",
          "Nap Me 360p",
          "Paperman",
          "Pilot",
          "Pinch",
          "Pixel Me",
          "Romantic Lift",
          "Sexy Me",
          "Slice Therapy",
          "Soul Depart",
          "Split Stance Human",
          "Squid Game",
          "Toy Me",
          "Walk Forward",
          "Zoom In Fast",
          "Zoom Out"
        ],
        "default": "Balloon Flyaway"
      }
    }
  },
  {
    "id": "seedance-lite-i2v",
    "name": "Seedance Lite I2V",
    "endpoint": "seedance-lite-i2v",
    "family": "bytedance",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "A lively dog is running swiftly across a sunlit park, with green trees softly blurred in the background to emphasize quick motion, capturing the energetic and joyful movement during the day."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p",
          "1080p"
        ],
        "default": "480p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 3,
        "maxValue": 12,
        "step": 1
      },
      "camera_fixed": {
        "type": "boolean",
        "title": "Camera Fixed",
        "name": "camera_fixed",
        "description": "Whether to fix the camera position",
        "default": false
      }
    }
  },
  {
    "id": "seedance-pro-i2v",
    "name": "Seedance Pro I2V",
    "endpoint": "seedance-pro-i2v",
    "family": "bytedance",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "A slow cinematic pan following a knight riding through a dense, foggy forest at dawn, with dramatic lighting casting long shadows and soft rays filtering through the misty trees, emphasizing the mysterious and atmospheric mood."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p",
          "1080p"
        ],
        "default": "480p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 3,
        "maxValue": 12,
        "step": 1
      },
      "camera_fixed": {
        "type": "boolean",
        "title": "Camera Fixed",
        "name": "camera_fixed",
        "description": "Whether to fix the camera position",
        "default": false
      }
    }
  },
  {
    "id": "pixverse-v5-i2v",
    "name": "Pixverse v5 I2V",
    "endpoint": "pixverse-v5-i2v",
    "family": "pixverse-v5",
    "imageField": "images_list",
    "lastImageField": "images_list",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Animate the glowing stag slowly walking forward, fireflies drifting in the air, soft mist rolling across the clearing, camera gently circling around for a magical cinematic motion."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1",
          "4:3",
          "3:4"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "360p",
          "540p",
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 8,
        "step": 3
      }
    }
  },
  {
    "id": "seedance-lite-reference-video",
    "name": "Seedance Lite Reference Video",
    "endpoint": "seedance-lite-reference-to-video",
    "family": "bytedance",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 4,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "The businessman walks towards the sports car on the rooftop, places his hand on the hood, and gazes at the glowing skyline as the camera circles around dramatically, capturing the neon-lit atmosphere in ultra-realism."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p"
        ],
        "default": "480p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 3,
        "maxValue": 12,
        "step": 1
      }
    }
  },
  {
    "id": "wan2.1-reference-video",
    "name": "Wan2.1 Reference Video",
    "endpoint": "wan2.1-reference-video",
    "family": "wan2.1",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 5,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "The motorcycle driving through the neon tunnel, reflections glowing on its body, dynamic tracking shot, cinematic product ad style."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p"
        ],
        "default": "480p"
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "kling-v2.5-turbo-pro-i2v",
    "name": "Kling v2.5 Turbo Pro I2V",
    "endpoint": "kling-v2.5-turbo-pro-i2v",
    "family": "kling-v2.5",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Animate subtle cloak movement, glowing energy pulsing from the staff, storm clouds rolling above, camera orbiting slightly to add depth and atmosphere."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "wan2.5-image-to-video",
    "name": "Wan2.5 Image To Video",
    "endpoint": "wan2.5-image-to-video",
    "family": "wan2.5",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Animate the scene: camera slowly dollies forward toward the robot, neon city lights begin to flicker, soft reflections shift across the dome glass, twilight deepens into night with subtle ambient glow. The robot raises its head and speaks in a clear futuristic voice: ‘WAN 2.5 is now available on the MuAPI app.’"
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p",
          "1080p"
        ],
        "default": "480p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "wan2.5-image-to-video-fast",
    "name": "Wan2.5 Image To Video Fast",
    "endpoint": "wan2.5-image-to-video-fast",
    "family": "wan2.5",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "The camera slowly pulls back from the portrait, revealing the rooftop garden swaying in the breeze, clouds drifting across the orange-pink sky. The city lights begin to flicker on in the distance as the sun sets. She gazes at the horizon and softly says: “Every ending feels like the start of something new.” Natural ambient sounds of wind and faint city life in the background."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "openai-sora-2-image-to-video",
    "name": "Openai Sora 2 Image To Video",
    "endpoint": "openai-sora-2-image-to-video",
    "family": "sora",
    "imageField": "images_list",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Camera pans along the platform as the bullet train doors open, passengers step forward with rolling suitcases. Footsteps and soft chatter fill the air. A female announcer says: ‘Train number 2245 to Tokyo is now departing from platform 3.’ Wheels screech lightly as the train starts moving."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          10,
          15
        ],
        "default": 10
      },
      "remove_watermark": {
        "type": "boolean",
        "title": "Remove Watermark",
        "name": "remove_watermark",
        "description": "When enabled, removes watermarks from the generated video.",
        "default": true
      }
    }
  },
  {
    "id": "ovi-image-to-video",
    "name": "Ovi Image To Video",
    "endpoint": "ovi-image-to-video",
    "family": "ovi",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Camera: static medium shot. The scientist speaks: <S>We have discovered life beyond Earth.<E> <AUDCAP>Soft electronic hum, distant Beep of instruments<ENDAUDCAP>"
        ]
      }
    }
  },
  {
    "id": "openai-sora-2-pro-image-to-video",
    "name": "Openai Sora 2 Pro Image To Video",
    "endpoint": "openai-sora-2-pro-image-to-video",
    "family": "sora",
    "imageField": "images_list",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Scene: Submerged coral clearing, soft light filtering from above.\nCharacters: Tiny jellyfish with monocle and top hat, hosting tea for small seahorses.\nAction: Jellyfish floats and pours tea → bubbles rise slowly; seahorses sip → tiny octopus clumsily serves cake.\nCamera: Wide underwater → tracking floating jellyfish → macro on bubbles.\nLook & Lighting: Aqua-blue palette; subtle caustics on sand; shimmering reflections on water surfaces.\nMotion/Physics: Water currents gently sway characters; bubbles rise naturally; floating cakes wobble lightly.\nAudio: Bubbling water + faint harp melody; line: “Tea, my dear friends, before it drifts away.”"
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds. Currently 25 seconds supports 720p only.",
        "enum": [
          10,
          15,
          25
        ],
        "default": 10
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "remove_watermark": {
        "type": "boolean",
        "title": "Remove Watermark",
        "name": "remove_watermark",
        "description": "When enabled, removes watermarks from the generated video.",
        "default": true
      }
    }
  },
  {
    "id": "leonardoai-motion-2.0",
    "name": "Leonardoai Motion 2.0",
    "endpoint": "leonardoai-motion-2.0",
    "family": "leonardoai",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "A diver swimming through a coral reef, colorful fish darting around, sunlight filtering through the water, slow-motion effect."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      }
    }
  },
  {
    "id": "veo3.1-image-to-video",
    "name": "Veo3.1 Image To Video",
    "endpoint": "veo3.1-image-to-video",
    "family": "veo3.1",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Scene: Giant floating library orbiting in zero-gravity space.\nCharacters: Astronaut-librarian flipping glowing pages suspended midair.\nAction: Camera rotates 360° around drifting books → zooms through a floating page into a nebula outside window.\nCamera: Orbit + push-through transition.\nLighting: Cool cosmic ambient with warm page glows; rim lighting on suit.\nMotion: Slow rotational drift; pages react with fluid inertia.\nAudio: Ethereal synth pads + book rustle in vacuum hush.\nMood: Awe, wonder, intellectual calm.\nLine: “Wow veo3.1 launched in Muapiapp. Let's go!”"
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          8
        ],
        "default": 8
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "1080p"
        ],
        "default": "1080p"
      }
    }
  },
  {
    "id": "veo3.1-fast-image-to-video",
    "name": "Veo3.1 Fast Image To Video",
    "endpoint": "veo3.1-fast-image-to-video",
    "family": "veo3.1",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Scene: Lantern festival by the river at night.\nCharacters: Young boy with his grandmother.\nAction: Camera starts behind them → tracks one lantern downstream → lift to sky full of lights.\nLighting: Warm candlelight vs cool night reflections.\nAudio: Gentle music, water flow.\nDialogue:\nGrandmother: “Every lantern carries a wish.”\nBoy: “Then mine’s for you to stay forever.”\nGrandmother (smiling): “I’ll be right there, glowing among them.”"
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          8
        ],
        "default": 8
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "1080p"
        ],
        "default": "1080p"
      }
    }
  },
  {
    "id": "veo3.1-lite-image-to-video",
    "name": "Veo3.1 Lite Image To Video",
    "endpoint": "veo3.1-lite-image-to-video",
    "family": "veo3.1",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video."
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          8
        ],
        "default": 8
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "1080p"
        ],
        "default": "1080p"
      }
    }
  },
  {
    "id": "veo3.1-reference-to-video",
    "name": "Veo3.1 Reference To Video",
    "endpoint": "veo3.1-reference-to-video",
    "family": "veo3.1",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 3,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "A small robotic fox exploring a sun-drenched enchanted forest. The fox hops across a sparkling stream, pauses on mossy rocks, and looks curiously at glowing fireflies. Cinematic camera pans follow the fox from behind, then orbit slightly to reveal sunbeams filtering through the canopy. Warm dappled lighting with volumetric light rays and soft particle effects. Gentle ambient forest sounds and faint magical chimes. Dialogue: ‘Everything shines differently under the forest light…’"
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          8
        ],
        "default": 8
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "Whether to generate audio.",
        "default": true
      }
    }
  },
  {
    "id": "seedance-pro-i2v-fast",
    "name": "Seedance Pro I2V Fast",
    "endpoint": "seedance-pro-i2v-fast",
    "family": "bytedance",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "The cyberpunk samurai turns slowly toward the camera, raindrops gliding off his glowing armor, neon lights reflecting on wet metal, camera pans around him in a slow 360°, subtle lightning flashes illuminate the skyline."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p",
          "1080p"
        ],
        "default": "480p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 2,
        "maxValue": 12,
        "step": 1
      },
      "camera_fixed": {
        "type": "boolean",
        "title": "Camera Fixed",
        "name": "camera_fixed",
        "description": "Whether to fix the camera position",
        "default": false
      }
    }
  },
  {
    "id": "ltx-2-pro-image-to-video",
    "name": "Ltx 2 Pro Image To Video",
    "endpoint": "ltx-2-pro-image-to-video",
    "family": "ltx",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "An ancient stone portal deep in an enchanted forest, glowing runes, beams of sunlight breaking through the canopy, cinematic tracking shot, warm colour grading."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          6,
          8,
          10
        ],
        "default": 6
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "Whether to generate audio.",
        "default": true
      }
    }
  },
  {
    "id": "ltx-2-fast-image-to-video",
    "name": "Ltx 2 Fast Image To Video",
    "endpoint": "ltx-2-fast-image-to-video",
    "family": "ltx",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Image of two explorers standing atop a dune. Now the viewpoint shifts: camera slowly dollies backward while sun rises behind them, sand drifts around feet, warm golden light, soft wind in audio."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          6,
          8,
          10,
          12,
          14,
          16,
          18,
          20
        ],
        "default": 6
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "Whether to generate audio.",
        "default": true
      }
    }
  },
  {
    "id": "vidu-q2-reference",
    "name": "Vidu Q2 Reference",
    "endpoint": "vidu-q2-reference",
    "family": "vidu-q2",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 7,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "The female explorer walks slowly across the alien terrain, crystals glimmering around her. The camera glides beside her as light from twin suns scatters across her reflective suit. Wind stirs the mist as she looks up toward the horizon, where a colossal planet looms above — evoking awe and wonder."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "360p",
          "540p",
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "4:3",
          "3:4",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 2,
        "maxValue": 8,
        "step": 1
      },
      "movement_amplitude": {
        "type": "string",
        "title": "Movement Amplitude",
        "name": "movement_amplitude",
        "description": "The movement amplitude of objects in the frame.",
        "enum": [
          "auto",
          "small",
          "medium",
          "large"
        ],
        "default": "auto"
      }
    }
  },
  {
    "id": "vidu-q2-turbo-start-end-video",
    "name": "Vidu Q2 Turbo Start End Video",
    "endpoint": "vidu-q2-turbo-start-end-video",
    "family": "vidu-q2",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "The camera begins behind the traveler standing amid the misty ancient ruins. Leaves swirl in the air as golden light flickers. A surge of energy surrounds the traveler — ruins start to dissolve into bright particles. The environment morphs into a neon-lit futuristic city as the traveler continues walking forward, entering the new world."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 2,
        "maxValue": 8,
        "step": 1
      },
      "bgm": {
        "type": "boolean",
        "title": "Bgm",
        "name": "bgm",
        "description": "The background music for generating the output.",
        "default": true
      },
      "movement_amplitude": {
        "type": "string",
        "title": "Movement Amplitude",
        "name": "movement_amplitude",
        "description": "The movement amplitude of objects in the frame.",
        "enum": [
          "auto",
          "small",
          "medium",
          "large"
        ],
        "default": "auto"
      }
    }
  },
  {
    "id": "vidu-q2-pro-start-end-video",
    "name": "Vidu Q2 Pro Start End Video",
    "endpoint": "vidu-q2-pro-start-end-video",
    "family": "vidu-q2",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Camera begins behind the cabin as snowflakes drift through pale dawn light. Warm sunlight pierces the mist — the snow slowly melts, trees turn green, and the ground blossoms with flowers. The air brightens into a spring sunrise as birds take flight over the cabin, symbolizing rebirth and renewal."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 2,
        "maxValue": 8,
        "step": 1
      },
      "bgm": {
        "type": "boolean",
        "title": "Bgm",
        "name": "bgm",
        "description": "The background music for generating the output.",
        "default": true
      },
      "movement_amplitude": {
        "type": "string",
        "title": "Movement Amplitude",
        "name": "movement_amplitude",
        "description": "The movement amplitude of objects in the frame.",
        "enum": [
          "auto",
          "small",
          "medium",
          "large"
        ],
        "default": "auto"
      }
    }
  },
  {
    "id": "minimax-hailuo-2.3-pro-i2v",
    "name": "Minimax Hailuo 2.3 Pro I2V",
    "endpoint": "minimax-hailuo-2.3-pro-i2v",
    "family": "minimax-2.3",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "The camera slowly moves around the woman as the wind gently sways the tall grass. Her hair flows with the breeze, sunlight flickering through passing clouds. The atmosphere feels calm, nostalgic, and cinematic."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "1080p"
        ],
        "default": "1080p"
      }
    }
  },
  {
    "id": "minimax-hailuo-2.3-standard-i2v",
    "name": "Minimax Hailuo 2.3 Standard I2V",
    "endpoint": "minimax-hailuo-2.3-standard-i2v",
    "family": "minimax-2.3",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Camera slowly moves forward over the lake surface as light wind ripples the water. The clouds drift across the mountains, and sunlight flickers on the waves, creating a peaceful cinematic mood."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          6,
          10
        ],
        "default": 6
      }
    }
  },
  {
    "id": "minimax-hailuo-2.3-fast",
    "name": "Minimax Hailuo 2.3 Fast",
    "endpoint": "minimax-hailuo-2.3-fast",
    "family": "minimax-2.3",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "The camera gently moves around the woman as snowflakes drift through the air. Her expression shifts slightly as the wind brushes her hair. The background lights shimmer softly, creating a calm cinematic mood."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          6,
          10
        ],
        "default": 6
      },
      "go_fast": {
        "type": "boolean",
        "title": "Go Fast",
        "name": "go_fast",
        "description": "Prioritize faster video generation speed with a moderate trade-off in visual quality.",
        "default": true
      }
    }
  },
  {
    "id": "kling-v2.5-turbo-std-i2v",
    "name": "Kling v2.5 Turbo Std I2V",
    "endpoint": "kling-v2.5-turbo-std-i2v",
    "family": "kling-v2.5",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Animate subtle cloak movement, glowing energy pulsing from the staff, storm clouds rolling above, camera orbiting slightly to add depth and atmosphere."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 10,
        "step": 5
      }
    }
  },
  {
    "id": "grok-imagine-image-to-video",
    "name": "Grok Imagine Image To Video",
    "endpoint": "grok-imagine-image-to-video",
    "family": "grok",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 7,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Camera glides through vines toward temple entrance, mist disperses as sunlight pierces canopy, birds fly off, subtle dust motes in the air, adventure-style cinematic score."
        ]
      },
      "mode": {
        "type": "string",
        "title": "Mode",
        "name": "mode",
        "description": "Note: When generating videos using external image inputs, Spicy mode is not supported and will automatically switch to Normal.",
        "enum": [
          "fun",
          "normal",
          "spicy"
        ],
        "default": "normal"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds.",
        "enum": [
          6,
          10,
          15
        ],
        "default": 6
      }
    }
  },
  {
    "id": "kling-o1-image-to-video",
    "name": "Kling O1 Image To Video",
    "endpoint": "kling-o1-image-to-video",
    "family": "kling-o1",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "A gentle dolly forward toward the cabin as morning light intensifies, mist lifts in streaks, subtle water ripples, birds take flight, warm golden hour soundscape."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          5,
          10
        ],
        "default": 5
      }
    }
  },
  {
    "id": "kling-o1-reference-to-video",
    "name": "Kling O1 Reference To Video",
    "endpoint": "kling-o1-reference-to-video",
    "family": "kling-o1",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 7,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Cinematic orbit camera move around the pilot in a futuristic hangar, holographic lights flickering, armor reflections shifting, soft mechanical ambience."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 3,
        "maxValue": 10,
        "step": 1
      },
      "keep_original_sound": {
        "type": "boolean",
        "title": "Keep Original Sound",
        "name": "keep_original_sound",
        "description": "Select whether to keep the video original sound through the parameter.",
        "default": true
      }
    }
  },
  {
    "id": "kling-v2.6-pro-i2v",
    "name": "Kling v2.6 Pro I2V",
    "endpoint": "kling-v2.6-pro-i2v",
    "family": "kling-v2.6",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Slow cinematic orbit around the floating obsidian throne, holographic runes pulsing gently, drifting quartz shards rotating with soft parallax, molten crystal canyon glowing brighter with movement, and subtle particle storms rising toward the cosmic vortex; maintain original lighting, style, and atmosphere."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds.",
        "enum": [
          5,
          10
        ],
        "default": 5
      },
      "sound": {
        "type": "boolean",
        "title": "Sound",
        "name": "sound",
        "description": "Whether sound is generated simultaneously when generating a video.",
        "default": true
      }
    }
  },
  {
    "id": "pixverse-v5.5-i2v",
    "name": "Pixverse v5.5 I2V",
    "endpoint": "pixverse-v5.5-i2v",
    "family": "pixverse-v5.5",
    "imageField": "images_list",
    "lastImageField": "images_list",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Slow upward camera glide along the staircase, lanterns gently swaying, stardust drifting in soft spirals, nebula clouds subtly shifting, and the cosmic gateway pulsing with rhythmic light; maintain original colors, composition, and celestial atmosphere with smooth cinematic motion."
        ]
      },
      "style": {
        "type": "string",
        "title": "Style",
        "name": "style",
        "description": "The style of the generated video.",
        "enum": [
          "none",
          "anime",
          "3d_animation",
          "clay",
          "comic",
          "cyberpunk"
        ],
        "default": "none"
      },
      "thinking": {
        "type": "string",
        "title": "Thinking",
        "name": "thinking",
        "description": "Prompt optimization mode for model decision.",
        "enum": [
          "auto",
          "enabled",
          "disabled"
        ],
        "default": "auto"
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1",
          "4:3",
          "3:4"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "360p",
          "540p",
          "720p",
          "1080p"
        ],
        "default": "360p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds.",
        "enum": [
          5,
          8,
          10
        ],
        "default": 5
      },
      "audio": {
        "type": "boolean",
        "title": "Audio",
        "name": "audio",
        "description": "Enable audio generation (BGM, SFX, dialogue).",
        "default": false
      },
      "multi_clip": {
        "type": "boolean",
        "title": "Multi Clip",
        "name": "multi_clip",
        "description": "Enable multi-clip generation with dynamic camera changes.",
        "default": false
      }
    }
  },
  {
    "id": "wan2.2-spicy-image-to-video",
    "name": "Wan2.2 Spicy Image To Video",
    "endpoint": "wan2.2-spicy-image-to-video",
    "family": "wan2.2",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Animate the scene with intense fiery motion—lava cracking and flowing down the phoenix wings, embers drifting upward, volcanic smoke swirling dramatically, floating stones shifting with parallax depth; camera performs a slow power-shot push-in toward the phoenix statue while preserving the glowing, high-contrast cinematic atmosphere."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p"
        ],
        "default": "480p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          5,
          8
        ],
        "default": 5
      }
    }
  },
  {
    "id": "wan2.6-image-to-video",
    "name": "Wan2.6 Image To Video",
    "endpoint": "wan2.6-image-to-video",
    "family": "wan2.6",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Add slow cinematic camera movement circling the floating lighthouse, orbiting symbol rings rotating gently with parallax depth, ocean waves shimmering and moving naturally, clouds drifting and lightning flashing subtly in the distance, and the lighthouse beam pulsing softly while preserving the original lighting and dramatic mood."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          5,
          10,
          15
        ],
        "default": 5
      },
      "shot_type": {
        "type": "string",
        "title": "Shot Type",
        "name": "shot_type",
        "description": "The type of shot to generate.",
        "enum": [
          "single",
          "multi"
        ],
        "default": "single"
      }
    }
  },
  {
    "id": "kling-o1-standard-image-to-video",
    "name": "Kling O1 Standard Image To Video",
    "endpoint": "kling-o1-standard-image-to-video",
    "family": "kling-o1",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Add gentle camera drift forward with slight parallax depth, waterfalls flowing softly, clouds slowly moving beneath the island, birds gliding naturally through the scene, and sunlight shifting subtly while maintaining the calm cinematic mood and original lighting."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          5,
          10
        ],
        "default": 5
      }
    }
  },
  {
    "id": "kling-o1-standard-reference-to-video",
    "name": "Kling O1 Standard Reference To Video",
    "endpoint": "kling-o1-standard-reference-to-video",
    "family": "kling-o1",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 7,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to generate the video",
        "examples": [
          "Blend the reference scenes into a single cinematic shot with gentle forward camera movement, soft parallax depth between the bridge and forest valley, fog drifting slowly above the river, leaves swaying lightly in the breeze, and sunlight shifting subtly while maintaining a calm, realistic atmosphere."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [
          5,
          10
        ],
        "default": 5
      }
    }
  },
  {
    "id": "seedance-v1.5-pro-i2v",
    "name": "Seedance v1.5 Pro I2V",
    "endpoint": "seedance-v1.5-pro-i2v",
    "family": "seedance-v1.5-pro",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Add a slow cinematic orbit around the floating archive, gentle parallax between cloud layers and spires, flowing data streams pulsing softly, fog drifting naturally, and sky colors deepening slightly while preserving the original lighting, scale, and cinematic mood."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1",
          "3:4",
          "4:3",
          "21:9"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 4,
        "maxValue": 12,
        "step": 1
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "Whether to generate audio",
        "default": true
      },
      "camera_fixed": {
        "type": "boolean",
        "title": "Camera Fixed",
        "name": "camera_fixed",
        "description": "Whether to fix the camera position",
        "default": false
      }
    }
  },
  {
    "id": "seedance-v1.5-pro-i2v-fast",
    "name": "Seedance v1.5 Pro I2V Fast",
    "endpoint": "seedance-v1.5-pro-i2v-fast",
    "family": "seedance-v1.5-pro",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Add gentle forward camera movement toward the floating observatory, subtle parallax between clouds and structure, soft cloud drift below, interior window lights glowing steadily, and sunlight rays shifting slightly while keeping motion smooth, minimal, and fast."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "16:9",
          "9:16",
          "1:1",
          "3:4",
          "4:3",
          "21:9"
        ],
        "default": "16:9"
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 4,
        "maxValue": 12,
        "step": 1
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "Whether to generate audio",
        "default": true
      },
      "camera_fixed": {
        "type": "boolean",
        "title": "Camera Fixed",
        "name": "camera_fixed",
        "description": "Whether to fix the camera position",
        "default": false
      }
    }
  },
  {
    "id": "ltx-2-19b-image-to-video",
    "name": "Ltx 2 19b Image To Video",
    "endpoint": "ltx-2-19b-image-to-video",
    "family": "ltx",
    "imageField": "image_url",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "Animate the scene so the camera slowly pushes toward the billboard, the text characters on the woman’s face subtly scrolling and re-forming, rain falling continuously, reflections on the wet road shifting as car headlights flicker, pedestrians making small natural movements while the city lights pulse softly; maintain realistic motion, urban mood, and cinematic pacing."
        ]
      },
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "description": "The resolution of the generated video.",
        "enum": [
          "480p",
          "720p",
          "1080p"
        ],
        "default": "720p"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 5,
        "maxValue": 20,
        "step": 1
      }
    }
  },
  {
    "id": "kling-v3.0-omni-standard-image-to-video",
    "name": "Kling v3.0 Omni Standard Image To Video",
    "endpoint": "kling-v3.0-omni-standard-image-to-video",
    "family": "kling-v3.0-omni",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 4,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "During an intense basketball game, gravity suddenly breaks apart. Players begin running sideways across the arena walls while the court folds upward into impossible angles. The basketball floats briefly before being slammed through the hoop as the camera rotates dynamically with the shifting gravity."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "9:16",
          "16:9",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "Duration of the generated video in seconds.",
        "enum": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "default": 5
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "When enabled, generate native audio with the video (adds to cost).",
        "default": false
      }
    }
  },
  {
    "id": "kling-v3.0-omni-pro-image-to-video",
    "name": "Kling v3.0 Omni Pro Image To Video",
    "endpoint": "kling-v3.0-omni-pro-image-to-video",
    "family": "kling-v3.0-omni",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 4,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "A high-speed train races forward nonstop while the environment transforms every few seconds—from snowy mountains to neon cyberpunk city to volcanic wasteland. Sparks fly from the tracks as the camera stays tightly locked alongside the speeding train during each violent world transition."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "9:16",
          "16:9",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "Duration of the generated video in seconds.",
        "enum": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "default": 5
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "When enabled, generate native audio with the video (adds to cost).",
        "default": false
      }
    }
  },
  {
    "id": "kling-v3.0-omni-4k-image-to-video",
    "name": "Kling v3.0 Omni 4K Image To Video",
    "endpoint": "kling-v3.0-omni-4k-image-to-video",
    "family": "kling-v3.0-omni",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 4,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "A cat in @image1 wakes up and walks towards the camera in slow motion."
        ]
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": [
          "9:16",
          "16:9",
          "1:1"
        ],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "Duration of the generated video in seconds.",
        "enum": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "default": 5
      }
    }
  },
  {
    "id": "kling-v3.0-pro-image-to-video",
    "name": "Kling v3.0 Pro Image To Video",
    "endpoint": "kling-v3.0-pro-image-to-video",
    "family": "kling-v3.0",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "The camera begins on the railway station platform beside a stationary train as morning sunlight filters through the roof. Passengers make small natural movements while the train doors are open. The camera moves forward and enters the train, transitioning smoothly into a window-seat point of view. As the doors close, the train starts moving. The view shifts fully to the window, showing the city passing by outside with gentle motion blur, buildings and trees sliding past. Sunlight reflects on the glass, faint interior reflections appear, and the ride feels calm and realistic with smooth, cinematic motion."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 3,
        "maxValue": 15,
        "step": 1
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "Whether to generate audio for the video",
        "default": true
      }
    }
  },
  {
    "id": "kling-v3.0-standard-image-to-video",
    "name": "Kling v3.0 Standard Image To Video",
    "endpoint": "kling-v3.0-standard-image-to-video",
    "family": "kling-v3.0",
    "imageField": "image_url",
    "lastImageField": "last_image",
    "hasPrompt": true,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Text prompt describing the video.",
        "examples": [
          "The hamster begins on the left side of the tabletop and quickly runs across the surface toward the right. Its tiny legs move rapidly, body bouncing slightly with natural motion. As it runs, the sunflower seeds blur slightly beneath it. The hamster slows near the bowl, stops, and stands upright to grab a seed. The camera remains fixed, depth of field stays shallow, and lighting remains soft and consistent for a realistic, cute result."
        ]
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "default": 5,
        "minValue": 3,
        "maxValue": 15,
        "step": 1
      },
      "generate_audio": {
        "type": "boolean",
        "title": "Generate Audio",
        "name": "generate_audio",
        "description": "Whether to generate audio for the video",
        "default": true
      }
    }
  },
  {
    "id": "seedance-v2.0-i2v",
    "name": "Seedance 2.0 I2V",
    "endpoint": "seedance-v2.0-i2v",
    "family": "seedance-v2.0",
    "imageField": "images_list",
    "hasPrompt": true,
    "maxImages": 5,
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "The prompt to guide video generation from the image."
      },
      "aspect_ratio": {
        "type": "string",
        "title": "Aspect Ratio",
        "name": "aspect_ratio",
        "description": "Aspect ratio of the output video.",
        "enum": ["16:9", "9:16", "4:3", "3:4"],
        "default": "16:9"
      },
      "duration": {
        "type": "int",
        "title": "Duration",
        "name": "duration",
        "description": "The duration of the generated video in seconds",
        "enum": [5, 10, 15],
        "default": 5
      },
      "quality": {
        "type": "string",
        "title": "Quality",
        "name": "quality",
        "description": "Quality of the generated video.",
        "enum": ["high", "basic"],
        "default": "basic"
      }
    }
  }
];

export const getI2IModelById = (id) => i2iModels.find(m => m.id === id);
export const getI2VModelById = (id) => i2vModels.find(m => m.id === id);

export const getMaxImagesForI2VModel = (modelId) => {
    const model = getI2VModelById(modelId);
    if (!model) return 1;
    if (model.maxImages) return model.maxImages;
    if (model.lastImageField) return 2;
    return 1;
};

export const getAspectRatiosForI2IModel = (modelId) => {
    const model = getI2IModelById(modelId);
    if (!model) return ['1:1'];
    if (model.inputs && model.inputs.aspect_ratio && model.inputs.aspect_ratio.enum) return model.inputs.aspect_ratio.enum;
    return ['1:1', '16:9', '9:16'];
};

export const getAspectRatiosForI2VModel = (modelId) => {
    const model = getI2VModelById(modelId);
    if (!model) return ['16:9'];
    if (model.inputs && model.inputs.aspect_ratio && model.inputs.aspect_ratio.enum) return model.inputs.aspect_ratio.enum;
    return ['16:9', '9:16', '1:1'];
};

export const getDurationsForI2VModel = (modelId) => {
    const model = getI2VModelById(modelId);
    if (!model) return [];
    const dur = model.inputs && model.inputs.duration;
    if (!dur) return [];
    if (dur.enum) return dur.enum;
    if (dur.minValue !== undefined && dur.maxValue !== undefined && dur.step) {
        const vals = [];
        for (let v = dur.minValue; v <= dur.maxValue; v += dur.step) vals.push(v);
        return vals;
    }
    if (dur.default) return [dur.default];
    return [];
};

export const getResolutionsForI2VModel = (modelId) => {
    const model = getI2VModelById(modelId);
    if (!model) return [];
    const res = model.inputs && model.inputs.resolution;
    if (res && res.enum) return res.enum;
    return [];
};

// Effect-style models declare `inputs.name` as an enum of effect types.
export const getEffectsForI2VModel = (modelId) => {
    const model = getI2VModelById(modelId);
    return model?.inputs?.name?.enum || [];
};

export const getDefaultEffectForI2VModel = (modelId) => {
    const model = getI2VModelById(modelId);
    return model?.inputs?.name?.default || null;
};

export const getModesForModel = (modelId) => {
    const model = [...t2vModels, ...i2vModels].find(m => m.id === modelId);
    if (!model) return [];
    const modeInput = model.inputs?.mode;
    if (modeInput?.enum) return modeInput.enum;
    return [];
};

export const getResolutionsForI2IModel = (modelId) => {
    const model = getI2IModelById(modelId);
    if (!model) return [];
    if (model.inputs?.resolution?.enum) return model.inputs.resolution.enum;
    if (model.inputs?.quality?.enum) return model.inputs.quality.enum;
    return [];
};

export const getEffectsForI2IModel = (modelId) => {
    const model = getI2IModelById(modelId);
    return model?.inputs?.name?.enum || [];
};

export const getDefaultEffectForI2IModel = (modelId) => {
    const model = getI2IModelById(modelId);
    return model?.inputs?.name?.default || null;
};

// Returns the payload field name for quality/resolution for a t2i model ('resolution', 'quality', or null)
export const getQualityFieldForModel = (modelId) => {
    const model = getModelById(modelId);
    if (!model) return null;
    if (model.inputs?.resolution) return 'resolution';
    if (model.inputs?.quality) return 'quality';
    return null;
};

// Returns quality/resolution options for a t2i model
export const getResolutionsForModel = (modelId) => {
    const model = getModelById(modelId);
    if (!model) return [];
    if (model.inputs?.resolution?.enum) return model.inputs.resolution.enum;
    if (model.inputs?.quality?.enum) return model.inputs.quality.enum;
    return [];
};

// Returns the payload field name for quality/resolution for an i2i model ('resolution', 'quality', or null)
export const getQualityFieldForI2IModel = (modelId) => {
    const model = getI2IModelById(modelId);
    if (!model) return null;
    if (model.inputs?.resolution) return 'resolution';
    if (model.inputs?.quality) return 'quality';
    return null;
};

// Returns the maximum number of images an i2i model accepts (defaults to 1)
export const getMaxImagesForI2IModel = (modelId) => {
    const model = getI2IModelById(modelId);
    return model?.maxImages || 1;
};

// ─── Video-to-Video models ────────────────────────────────────────────────────
export const v2vModels = [
  {
    "id": "video-watermark-remover",
    "name": "AI Video Watermark Remover",
    "endpoint": "video-watermark-remover",
    "family": "tools",
    "videoField": "video_url",
    "hasPrompt": false,
    "description": "Remove watermarks, logos, captions, and unwanted text from videos."
  },
  {
    "id": "kling-v2.6-std-motion-control",
    "name": "Kling 2.6 Std Motion Control",
    "endpoint": "kling-v2.6-std-motion-control",
    "family": "kling",
    "videoField": "video_url",
    "imageField": "image_url",
    "hasPrompt": true,
    "promptRequired": true,
    "description": "Kling v2.6 Pro Motion Control allows precise control over camera movement, subject motion, and scene dynamics during video generation."
  },
  {
    "id": "kling-v3.0-std-motion-control",
    "name": "Kling 3.0 Std Motion Control",
    "endpoint": "kling-v3.0-std-motion-control",
    "family": "kling",
    "videoField": "video_url",
    "imageField": "image_url",
    "hasPrompt": true,
    "description": "Kling V3.0 Standard Motion Control allows for precise control over the camera and subject movement in generated videos."
  },
  {
    "id": "kling-v3.0-pro-motion-control",
    "name": "Kling 3.0 Pro Motion Control",
    "endpoint": "kling-v3.0-pro-motion-control",
    "family": "kling",
    "videoField": "video_url",
    "imageField": "image_url",
    "hasPrompt": true,
    "description": "Kling V3.0 Pro Motion Control provides the highest level of detail and control for video generation."
  }
];

// ─── LipSync / Speech-to-Video models ────────────────────────────────────────
// Image-based: portrait image + audio → talking video
// Video-based: existing video + audio → lipsync video
export const lipsyncModels = [
  // ── Image + Audio → Video ──────────────────────────────────────────────────
  {
    "id": "infinitetalk-image-to-video",
    "name": "Infinite Talk",
    "endpoint": "infinitetalk-image-to-video",
    "family": "infinitetalk",
    "category": "image",
    "hasPrompt": true,
    "description": "Animate a portrait image into a talking video driven by audio.",
    "inputs": {
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "enum": ["480p", "720p"],
        "default": "480p"
      }
    }
  },
  {
    "id": "wan2.2-speech-to-video",
    "name": "Wan 2.2 Speech to Video",
    "endpoint": "wan2.2-speech-to-video",
    "family": "wan",
    "category": "image",
    "hasPrompt": true,
    "description": "Generate a talking portrait video from an image and audio using Wan 2.2.",
    "inputs": {
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "enum": ["480p", "720p"],
        "default": "480p"
      }
    }
  },
  {
    "id": "ltx-2.3-lipsync",
    "name": "LTX 2.3 Lipsync",
    "endpoint": "ltx-2.3-lipsync",
    "family": "ltx",
    "category": "image",
    "hasPrompt": true,
    "hasSeed": true,
    "description": "High-quality lipsync from portrait image and audio using LTX 2.3.",
    "inputs": {
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "enum": ["480p", "720p", "1080p"],
        "default": "720p"
      }
    }
  },
  {
    "id": "ltx-2-19b-lipsync",
    "name": "LTX 2 19B Lipsync",
    "endpoint": "ltx-2-19b-lipsync",
    "family": "ltx",
    "category": "image",
    "hasPrompt": true,
    "description": "Lipsync from portrait image and audio using LTX 2 19B model.",
    "inputs": {
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "enum": ["480p", "720p", "1080p"],
        "default": "720p"
      }
    }
  },
  // ── Video + Audio → Video ──────────────────────────────────────────────────
  {
    "id": "sync-lipsync",
    "name": "Sync Lipsync",
    "endpoint": "sync-lipsync",
    "family": "lipsync",
    "category": "video",
    "hasPrompt": false,
    "description": "Generate realistic lipsync animations from audio using Sync's advanced algorithms."
  },
  {
    "id": "latent-sync",
    "name": "LatentSync",
    "endpoint": "latentsync-video",
    "family": "lipsync",
    "category": "video",
    "hasPrompt": false,
    "description": "Video-to-video lipsync using LatentSync for high-quality audio-driven lip animations."
  },
  {
    "id": "creatify-lipsync",
    "name": "Creatify Lipsync",
    "endpoint": "creatify-lipsync",
    "family": "lipsync",
    "category": "video",
    "hasPrompt": false,
    "description": "Realistic lipsync video optimized for speed, quality, and consistency by Creatify."
  },
  {
    "id": "veed-lipsync",
    "name": "Veed Lipsync",
    "endpoint": "veed-lipsync",
    "family": "lipsync",
    "category": "video",
    "hasPrompt": false,
    "description": "Generate realistic lipsync from any audio using VEED's latest model."
  },
  {
    "id": "infinitetalk-video-to-video",
    "name": "Infinite Talk V2V",
    "endpoint": "infinitetalk-video-to-video",
    "family": "infinitetalk",
    "category": "video",
    "hasPrompt": true,
    "description": "Apply audio-driven lipsync to an existing video using Infinite Talk.",
    "inputs": {
      "resolution": {
        "type": "string",
        "title": "Resolution",
        "name": "resolution",
        "enum": ["480p", "720p"],
        "default": "480p"
      }
    }
  }
];

export const getLipSyncModelById = (id) => lipsyncModels.find(m => m.id === id);

export const getResolutionsForLipSyncModel = (id) => {
  const model = lipsyncModels.find(m => m.id === id);
  return model?.inputs?.resolution?.enum || [];
};

export const imageLipSyncModels = lipsyncModels.filter(m => m.category === 'image');
export const videoLipSyncModels = lipsyncModels.filter(m => m.category === 'video');

export const getV2VModelById = (id) => v2vModels.find(m => m.id === id);


// ── Audio Models ──────────────────────────────────────────────────────────
export const audioModels = [
  {
    "id": "suno-create-music",
    "name": "Suno Create Music",
    "endpoint": "suno-create-music",
    "family": "suno",
    "description": "Suno generate music that turns text prompts into full songs ΓÇö complete with vocals, lyrics, and instrumentation. You can describe a mood, genre, or even a specific lyric idea, and Suno creates a realistic, studio-quality track in seconds.",
    "required": [
      "style"
    ],
    "inputs": {
      "prompt": {
        "examples": [
          "Hard-hitting rap track with aggressive beat and confident male vocals about winning."
        ],
        "description": "A description of the desired audio content. The prompt will be strictly used as the lyrics and sung in the generated track",
        "type": "string",
        "title": "Prompt",
        "name": "prompt"
      },
      "style": {
        "examples": [
          "Classical"
        ],
        "description": "Music style specification for the generated audio.",
        "format": "text",
        "type": "string",
        "title": "Style",
        "name": "style",
        "placeholder": "Jazz, Classical, Electronic, Pop, Rock, Hip-hop, etc."
      },
      "model": {
        "enum": [
          "V3_5",
          "V4",
          "V4_5",
          "V4_5PLUS",
          "V4_5ALL",
          "V5",
          "V5_5"
        ],
        "title": "Model",
        "name": "model",
        "type": "string",
        "description": "The AI model version to use for generation.",
        "default": "V5"
      },
      "custom_mode": {
        "type": "boolean",
        "title": "Custom Mode",
        "name": "custom_mode",
        "description": "Enable custom mode for advanced settings.",
        "default": true
      },
      "title": {
        "type": "string",
        "title": "Title",
        "name": "title",
        "description": "Title for the generated music track (optional).",
        "placeholder": "Peaceful Piano Meditation"
      },
      "persona_id": {
        "type": "string",
        "title": "Persona ID",
        "name": "persona_id",
        "description": "Persona ID or custom voice ID to apply to the generated music (optional). Pair with persona_model to disambiguate."
      },
      "persona_model": {
        "enum": [
          "style_persona",
          "voice_persona"
        ],
        "type": "string",
        "title": "Persona Model",
        "name": "persona_model",
        "description": "What kind of persona_id this is. Set to voice_persona when persona_id is a cloned voice ID from suno-voice-clone. Requires model V5 or V5_5."
      },
      "instrumental": {
        "type": "boolean",
        "title": "Instrumental",
        "name": "instrumental",
        "description": "Enable this option to generate music without prompt. If false prompt will used as the exact lyrics.",
        "default": true
      },
      "negative_tags": {
        "examples": [
          null
        ],
        "title": "Negative Tags",
        "name": "negative_tags",
        "type": "string",
        "format": "text",
        "description": "Music styles or traits to exclude from the generated audio (optional). Use to avoid specific styles.",
        "placeholder": "Heavy Metal, Upbeat Drums"
      },
      "vocal_gender": {
        "enum": [
          "male",
          "female"
        ],
        "title": "Vocal Gender",
        "name": "vocal_gender",
        "type": "string",
        "description": "Vocal gender preference for the singing voice (optional).",
        "default": "male"
      },
      "style_weight": {
        "title": "Style Weight",
        "name": "style_weight",
        "type": "int",
        "description": "Strength of adherence to the specified style (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "weirdness_constraint": {
        "title": "Weirdness Constraint",
        "name": "weirdness_constraint",
        "type": "int",
        "description": "Controls experimental/creative deviation (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "audio_weight": {
        "title": "Audio Weight",
        "name": "audio_weight",
        "type": "int",
        "description": "Balance weight for audio features vs. other factors (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      }
    }
  },
  {
    "id": "suno-remix-music",
    "name": "Suno Remix Music",
    "endpoint": "suno-remix-music",
    "family": "suno",
    "description": "This API covers an audio track by transforming it into a new style while retaining its core melody. It incorporates Suno's upload capability, enabling users to upload an audio file for processing. The expected result is a refreshed audio track with a new style, keeping the original melody intact.",
    "required": [
      "audio_url",
      "style"
    ],
    "inputs": {
      "prompt": {
        "examples": [
          "A calm and relaxing piano track with soft melodies"
        ],
        "description": "A description of the desired audio content. The prompt will be strictly used as the lyrics and sung in the generated track. Maximum 3000 characters",
        "type": "string",
        "title": "Prompt",
        "name": "prompt"
      },
      "audio_url": {
        "examples": [
          "https://d3adwkbyhxyrtq.cloudfront.net/ai-music/186/309018126238/c7e634cf-f0f3-4988-8225-4e7d0eb6121b.mp3"
        ],
        "description": "The URL for uploading audio files. Ensure the uploaded audio does not exceed 2 minutes in length.",
        "field": "audio",
        "type": "string",
        "title": "Audio URL",
        "name": "audio_url"
      },
      "style": {
        "examples": [
          "Classical"
        ],
        "description": "Music style specification for the generated audio.",
        "format": "text",
        "type": "string",
        "title": "Style",
        "name": "style",
        "placeholder": "Jazz, Classical, Electronic, Pop, Rock, Hip-hop, etc."
      },
      "model": {
        "enum": [
          "V3_5",
          "V4",
          "V4_5",
          "V4_5PLUS",
          "V4_5ALL",
          "V5",
          "V5_5"
        ],
        "title": "Model",
        "name": "model",
        "type": "string",
        "description": "The AI model version to use for generation.",
        "default": "V5"
      },
      "custom_mode": {
        "type": "boolean",
        "title": "Custom Mode",
        "name": "custom_mode",
        "description": "Enable custom mode for advanced settings.",
        "default": true
      },
      "title": {
        "type": "string",
        "title": "Title",
        "name": "title",
        "description": "Title for the generated music track (optional).",
        "placeholder": "Peaceful Piano Meditation"
      },
      "persona_id": {
        "type": "string",
        "title": "Persona ID",
        "name": "persona_id",
        "description": "Persona ID or custom voice ID to apply to the generated music (optional). Pair with persona_model to disambiguate."
      },
      "persona_model": {
        "enum": [
          "style_persona",
          "voice_persona"
        ],
        "type": "string",
        "title": "Persona Model",
        "name": "persona_model",
        "description": "What kind of persona_id this is. Set to voice_persona when persona_id is a cloned voice ID from suno-voice-clone. Requires model V5 or V5_5."
      },
      "instrumental": {
        "type": "boolean",
        "title": "Instrumental",
        "name": "instrumental",
        "description": "Enable this option to generate music without prompt. If false prompt will used as the exact lyrics.",
        "default": true
      },
      "negative_tags": {
        "examples": [
          null
        ],
        "title": "Negative Tags",
        "name": "negative_tags",
        "type": "string",
        "format": "text",
        "description": "Music styles or traits to exclude from the generated audio (optional). Use to avoid specific styles.",
        "placeholder": "Heavy Metal, Upbeat Drums"
      },
      "vocal_gender": {
        "enum": [
          "male",
          "female"
        ],
        "title": "Vocal Gender",
        "name": "vocal_gender",
        "type": "string",
        "description": "Vocal gender preference for the singing voice (optional).",
        "default": "male"
      },
      "style_weight": {
        "title": "Style Weight",
        "name": "style_weight",
        "type": "int",
        "description": "Strength of adherence to the specified style (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "weirdness_constraint": {
        "title": "Weirdness Constraint",
        "name": "weirdness_constraint",
        "type": "int",
        "description": "Controls experimental/creative deviation (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "audio_weight": {
        "title": "Audio Weight",
        "name": "audio_weight",
        "type": "int",
        "description": "Balance weight for audio features vs. other factors (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      }
    }
  },
  {
    "id": "suno-extend-music",
    "name": "Suno Extend Music",
    "endpoint": "suno-extend-music",
    "family": "suno",
    "description": "This API extends audio tracks while preserving the original style of the audio track. It includes Suno's upload functionality, allowing users to upload audio files for processing. The expected result is a longer track that seamlessly continues the input style.",
    "required": [
      "prompt",
      "audio_url",
      "style"
    ],
    "inputs": {
      "prompt": {
        "examples": [
          "Extend the music with more relaxing notes"
        ],
        "description": "A description of the desired audio content. The prompt will be strictly used as the lyrics and sung in the generated track. Maximum 3000 characters",
        "type": "string",
        "title": "Prompt",
        "name": "prompt"
      },
      "audio_url": {
        "examples": [
          "https://d3adwkbyhxyrtq.cloudfront.net/audios/186/755853337445/example.mp3"
        ],
        "description": "The URL for uploading audio files. Ensure the uploaded audio does not exceed 2 minutes in length.",
        "field": "audio",
        "type": "string",
        "title": "Audio URL",
        "name": "audio_url"
      },
      "style": {
        "examples": [
          "Classical"
        ],
        "description": "Music style specification for the generated audio.",
        "format": "text",
        "type": "string",
        "title": "Style",
        "name": "style",
        "placeholder": "Jazz, Classical, Electronic, Pop, Rock, Hip-hop, etc."
      },
      "model": {
        "enum": [
          "V3_5",
          "V4",
          "V4_5",
          "V4_5PLUS",
          "V4_5ALL",
          "V5",
          "V5_5"
        ],
        "title": "Model",
        "name": "model",
        "type": "string",
        "description": "The AI model version to use for generation.",
        "default": "V5"
      },
      "custom_mode": {
        "type": "boolean",
        "title": "Custom Mode",
        "name": "custom_mode",
        "description": "Enable custom mode for advanced settings.",
        "default": true
      },
      "title": {
        "type": "string",
        "title": "Title",
        "name": "title",
        "description": "Title for the generated music track (optional).",
        "placeholder": "Peaceful Piano Meditation"
      },
      "persona_id": {
        "type": "string",
        "title": "Persona ID",
        "name": "persona_id",
        "description": "Persona ID or custom voice ID to apply to the generated music (optional). Pair with persona_model to disambiguate."
      },
      "persona_model": {
        "enum": [
          "style_persona",
          "voice_persona"
        ],
        "type": "string",
        "title": "Persona Model",
        "name": "persona_model",
        "description": "What kind of persona_id this is. Set to voice_persona when persona_id is a cloned voice ID from suno-voice-clone. Requires model V5 or V5_5."
      },
      "continue_at": {
        "title": "Continue At",
        "name": "continue_at",
        "type": "int",
        "description": "The time point (in seconds) from which to start extending the music. Value range: greater than 0 and less than the total duration of the uploaded audio. Specifies the position in the original track where the extension should begin.",
        "default": 1,
        "minValue": 1,
        "maxValue": 60,
        "step": 1
      },
      "instrumental": {
        "type": "boolean",
        "title": "Instrumental",
        "name": "instrumental",
        "description": "Enable this option to generate music without prompt. If false prompt will used as the exact lyrics.",
        "default": true
      },
      "negative_tags": {
        "examples": [
          null
        ],
        "title": "Negative Tags",
        "name": "negative_tags",
        "type": "string",
        "format": "text",
        "description": "Music styles or traits to exclude from the generated audio (optional). Use to avoid specific styles.",
        "placeholder": "Heavy Metal, Upbeat Drums"
      },
      "vocal_gender": {
        "enum": [
          "male",
          "female"
        ],
        "title": "Vocal Gender",
        "name": "vocal_gender",
        "type": "string",
        "description": "Vocal gender preference for the singing voice (optional).",
        "default": "male"
      },
      "style_weight": {
        "title": "Style Weight",
        "name": "style_weight",
        "type": "int",
        "description": "Strength of adherence to the specified style (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "weirdness_constraint": {
        "title": "Weirdness Constraint",
        "name": "weirdness_constraint",
        "type": "int",
        "description": "Controls experimental/creative deviation (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "audio_weight": {
        "title": "Audio Weight",
        "name": "audio_weight",
        "type": "int",
        "description": "Balance weight for audio features vs. other factors (optional). Range 0ΓÇô1, up to 2 decimal places.",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      }
    }
  },
  {
    "id": "suno-generate-sounds",
    "name": "Suno Generate Sounds",
    "endpoint": "suno-generate-sounds",
    "family": "suno",
    "description": "Generate sound effects using Suno chirp-crow model.",
    "required": [
      "prompt"
    ],
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "sounds task type supports up to 500 characters.",
        "examples": [
          "A car passing by"
        ]
      },
      "model": {
        "enum": [
          "V5"
        ],
        "type": "string",
        "title": "Model",
        "name": "model",
        "description": "The model to use",
        "default": "V5"
      },
      "sound_loop": {
        "type": "boolean",
        "title": "Loop",
        "name": "sound_loop",
        "description": "Whether to loop the generated sound.",
        "default": false
      },
      "sound_tempo": {
        "type": "int",
        "title": "Sound Tempo",
        "name": "sound_tempo",
        "description": "Sound tempo",
        "minValue": 1,
        "maxValue": 300,
        "step": 1,
        "default": 1
      },
      "sound_key": {
        "enum": [
          "Any",
          "Cm",
          "C#m",
          "Dm",
          "D#m",
          "Em",
          "Fm",
          "F#m",
          "Gm",
          "G#m",
          "Am",
          "A#m",
          "Bm",
          "C",
          "C#",
          "D",
          "D#",
          "E",
          "F",
          "F#",
          "G",
          "G#",
          "A",
          "A#",
          "B"
        ],
        "type": "string",
        "title": "Sound Key",
        "name": "sound_key",
        "description": "Musical key",
        "default": "Any"
      },
      "grab_lyrics": {
        "type": "boolean",
        "title": "Grab Lyrics",
        "name": "grab_lyrics",
        "description": "Whether to fetch lyric subtitles after generation is completed.",
        "default": false
      }
    }
  },
  {
    "id": "suno-add-vocals",
    "name": "Suno Add Vocals",
    "endpoint": "suno-add-vocals",
    "family": "suno",
    "description": "Add vocals to an instrumental track.",
    "required": [
      "prompt",
      "title",
      "style",
      "audio_url"
    ],
    "inputs": {
      "prompt": {
        "type": "string",
        "title": "Prompt (Lyrics)",
        "name": "prompt",
        "description": "Lyrics to sing",
        "examples": [
          "[Verse 1]\nHello world..."
        ]
      },
      "audio_url": {
        "type": "string",
        "title": "Instrumental Audio",
        "name": "audio_url",
        "description": "URL of instrumental track",
        "field": "audio"
      },
      "style": {
        "type": "string",
        "title": "Style",
        "name": "style",
        "description": "Vocal style",
        "examples": [
          "Pop"
        ]
      },
      "negative_tags": {
        "type": "string",
        "title": "Negative Tags",
        "name": "negative_tags",
        "description": "Excluded styles"
      },
      "model": {
        "enum": [
          "V4",
          "V4_5",
          "V4_5PLUS",
          "V5"
        ],
        "title": "Model",
        "name": "model",
        "type": "string",
        "description": "The AI model version to use.",
        "default": "V5"
      },
      "vocal_gender": {
        "enum": [
          "male",
          "female"
        ],
        "title": "Vocal Gender",
        "name": "vocal_gender",
        "type": "string",
        "description": "Vocal gender preference.",
        "default": "male"
      },
      "style_weight": {
        "title": "Style Weight",
        "name": "style_weight",
        "type": "int",
        "description": "Strength of style adherence (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "weirdness_constraint": {
        "title": "Weirdness Constraint",
        "name": "weirdness_constraint",
        "type": "int",
        "description": "Experimental deviation (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.01,
        "default": 0.65
      },
      "audio_weight": {
        "title": "Audio Weight",
        "name": "audio_weight",
        "type": "int",
        "description": "Balance weight (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.01,
        "default": 0.65
      },
      "title": {
        "type": "string",
        "title": "Title",
        "name": "title",
        "description": "Track title",
        "default": "New Vocal Track"
      }
    }
  },
  {
    "id": "suno-generate-mashup",
    "name": "Suno Geneate Mashup",
    "endpoint": "suno-generate-mashup",
    "family": "suno",
    "description": "Create a mashup using 1-5 audio tracks.",
    "required": [
      "audios_list"
    ],
    "inputs": {
      "audios_list": {
        "type": "array",
        "title": "Mashup Tracks",
        "name": "audios_list",
        "description": "Upload up to 2 audio files to mashup music from multiple audio tracks.",
        "field": "audios_list",
        "items": {
          "type": "string"
        },
        "maxItems": 2
      },
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "name": "prompt",
        "description": "Creative guidance"
      },
      "style": {
        "type": "string",
        "title": "Style",
        "name": "style",
        "description": "Mashup style"
      },
      "instrumental": {
        "type": "boolean",
        "title": "Instrumental",
        "name": "instrumental",
        "description": "If true: Only style is required else style, and prompt are required (with prompt used as the exact lyrics)",
        "default": true
      },
      "model": {
        "enum": [
          "V4",
          "V4_5",
          "V4_5PLUS",
          "V5"
        ],
        "title": "Model",
        "name": "model",
        "type": "string",
        "description": "The AI model version to use.",
        "default": "V5"
      },
      "vocal_gender": {
        "enum": [
          "male",
          "female"
        ],
        "title": "Vocal Gender",
        "name": "vocal_gender",
        "type": "string",
        "description": "Vocal gender preference.",
        "default": "male"
      },
      "style_weight": {
        "title": "Style Weight",
        "name": "style_weight",
        "type": "int",
        "description": "Strength of style adherence (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "weirdness_constraint": {
        "title": "Weirdness Constraint",
        "name": "weirdness_constraint",
        "type": "int",
        "description": "Experimental deviation (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "audio_weight": {
        "title": "Audio Weight",
        "name": "audio_weight",
        "type": "int",
        "description": "Balance weight (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "title": {
        "type": "string",
        "title": "Title",
        "name": "title",
        "description": "Mashup title",
        "default": "New Mashup"
      }
    }
  },
  {
    "id": "suno-add-instrumental",
    "name": "Suno Add Instrumental",
    "endpoint": "suno-add-instrumental",
    "family": "suno",
    "description": "Add instrumental backing to acapella audio.",
    "required": [
      "title",
      "tags",
      "audio_url"
    ],
    "inputs": {
      "audio_url": {
        "type": "string",
        "title": "Vocal Audio",
        "name": "audio_url",
        "description": "URL of vocal track",
        "field": "audio"
      },
      "tags": {
        "type": "string",
        "title": "Tags",
        "name": "tags",
        "description": "Instrumental styles",
        "examples": [
          "Orchestral"
        ]
      },
      "negative_tags": {
        "type": "string",
        "title": "Negative Tags",
        "name": "negative_tags",
        "description": "Excluded styles"
      },
      "model": {
        "enum": [
          "V4",
          "V4_5",
          "V4_5PLUS",
          "V5"
        ],
        "title": "Model",
        "name": "model",
        "type": "string",
        "description": "The AI model version to use.",
        "default": "V5"
      },
      "vocal_gender": {
        "enum": [
          "male",
          "female"
        ],
        "title": "Vocal Gender",
        "name": "vocal_gender",
        "type": "string",
        "description": "Vocal gender preference.",
        "default": "male"
      },
      "style_weight": {
        "title": "Style Weight",
        "name": "style_weight",
        "type": "int",
        "description": "Strength of style adherence (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "weirdness_constraint": {
        "title": "Weirdness Constraint",
        "name": "weirdness_constraint",
        "type": "int",
        "description": "Experimental deviation (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "audio_weight": {
        "title": "Audio Weight",
        "name": "audio_weight",
        "type": "int",
        "description": "Balance weight (0-1).",
        "minValue": 0,
        "maxValue": 1,
        "step": 0.05,
        "default": 0.65
      },
      "title": {
        "type": "string",
        "title": "Title",
        "name": "title",
        "description": "Track title",
        "default": "Instrumental Song"
      }
    }
  },
  {
    "id": "suno-voice-clone",
    "name": "Suno Voice Cloning",
    "endpoint": "suno-voice-clone",
    "family": "suno",
    "description": "Clone your singing voice in two takes for use with Suno music generation. Submit a 10-second sample, then read back a fresh random phrase the system generates (anti-deepfake liveness check), and receive a reusable voice_id you can drop into Suno music creation. Free during preview.",
    "required": [
      "audio_url"
    ],
    "inputs": {
      "audio_url": {
        "examples": [
          "https://d3adwkbyhxyrtq.cloudfront.net/webassets/videomodels/minimax-voice-clone-in.wav"
        ],
        "description": "URL of a clean 10-second recording of the voice to clone. Mono is fine. The provider extracts a vocal segment between vocal_start_s and vocal_end_s.",
        "field": "audio",
        "type": "string",
        "title": "Voice Sample URL",
        "name": "audio_url"
      },
      "voice_name": {
        "type": "string",
        "title": "Voice Name",
        "name": "voice_name",
        "description": "A short label for your voice, shown in the voice picker (optional).",
        "placeholder": "My Voice"
      },
      "description": {
        "type": "string",
        "title": "Description",
        "name": "description",
        "description": "Free-form description of this voice (optional).",
        "placeholder": "Warm female alto, slight rasp."
      },
      "style": {
        "type": "string",
        "title": "Style Tags",
        "name": "style",
        "description": "Comma-separated style hints used at music generation time (optional).",
        "placeholder": "Pop, Female Vocal"
      },
      "language": {
        "enum": [
          "en",
          "zh",
          "es",
          "fr",
          "pt",
          "de",
          "ja",
          "ko",
          "hi",
          "ru"
        ],
        "title": "Language",
        "name": "language",
        "type": "string",
        "description": "Language the voice sample is spoken in.",
        "default": "en"
      },
      "vocal_start_s": {
        "type": "int",
        "title": "Vocal Start (seconds)",
        "name": "vocal_start_s",
        "description": "Start time of the vocal segment within the sample.",
        "default": 0,
        "minValue": 0,
        "maxValue": 60,
        "step": 1
      },
      "vocal_end_s": {
        "type": "int",
        "title": "Vocal End (seconds)",
        "name": "vocal_end_s",
        "description": "End time of the vocal segment within the sample. Must be greater than Vocal Start.",
        "default": 10,
        "minValue": 1,
        "maxValue": 60,
        "step": 1
      }
    }
  },
  {
    "id": "minimax-voice-clone",
    "name": "Minimax Voice Clone",
    "endpoint": "minimax-voice-clone",
    "family": "minimax-2.3",
    "description": "Minimax Voice Clone creates a high-fidelity digital clone of a speakerΓÇÖs voice from a short reference audio sample. It reproduces the speakerΓÇÖs tone, emotion, accent, rhythm, and speaking style, then generates new speech from any text input.",
    "required": [
      "audio_url",
      "custom_voice_id"
    ],
    "inputs": {
      "audio_url": {
        "examples": [
          "https://d3adwkbyhxyrtq.cloudfront.net/webassets/videomodels/minimax-voice-clone-in.wav"
        ],
        "description": "Url of the audio url.",
        "field": "audio",
        "type": "string",
        "title": "Audio URL",
        "name": "audio_url"
      },
      "custom_voice_id": {
        "examples": [
          ""
        ],
        "description": "Custom user-defined ID. Minimum 8 characters must include letters and numbers and start with a letter. Duplicate voice-ids will throw an error.",
        "format": "text",
        "type": "string",
        "title": "Custom Voice ID",
        "name": "custom_voice_id",
        "placeholder": "sf02174c-5f5d-46e6-8758-7544128c27b2"
      },
      "model": {
        "enum": [
          "speech-02-hd",
          "speech-02-turbo",
          "speech-2.5-hd-preview",
          "speech-2.5-turbo-preview",
          "speech-2.6-hd",
          "speech-2.6-turbo"
        ],
        "title": "Model",
        "name": "model",
        "type": "string",
        "description": "Specify the TTS model to be used for the preview. This is only a preview after cloning. Once the model is generated, any Minimax Turbo or HD voice model can be used for inference.",
        "default": "speech-02-hd"
      },
      "need_noise_reduction": {
        "type": "boolean",
        "title": "Need Noise Reduction",
        "name": "need_noise_reduction",
        "description": "Enable noise reduction. Default is false (no noise reduction).",
        "default": false
      },
      "need_volume_normalization": {
        "type": "boolean",
        "title": "Need Volume Normalization",
        "name": "need_volume_normalization",
        "description": "Specify whether to enable volume normalization.",
        "default": false
      },
      "accuracy": {
        "title": "Accuracy",
        "name": "accuracy",
        "type": "int",
        "description": "Text validation accuracy threshold, with a value range of [0, 1].",
        "default": 0.7,
        "minValue": 0,
        "maxValue": 1,
        "step": 0.01
      },
      "prompt": {
        "examples": [
          "Hello! Welcome to Muapiapp! This is a preview of your cloned voice. I hope you enjoy it!"
        ],
        "description": "Text for audio preview. Limited to 2000 characters.",
        "type": "string",
        "title": "Prompt",
        "name": "prompt"
      }
    }
  },
  {
    "id": "minimax-speech-2.6-hd",
    "name": "Minimax Speech HD",
    "endpoint": "minimax-speech-2.6-hd",
    "family": "minimax-2.6",
    "description": "Speech-2.6-hd is MinimaxΓÇÖs high-definition text-to-speech model that turns written text into natural, human-like audio. It produces studio-quality speech with clear pronunciation, smooth pacing, realistic emotion, and no background noise.",
    "required": [
      "prompt",
      "voice_id"
    ],
    "inputs": {
      "prompt": {
        "examples": [
          "Every journey begins with a single moment of courage. Today, that moment is yours."
        ],
        "description": "Text to convert to speech. Every character is 1 token. Maximum 10000 characters. Use <#x#> between words to control pause duration (0.01-99.99s).",
        "type": "string",
        "title": "Prompt",
        "name": "prompt"
      },
      "voice_id": {
        "enum": [
          "Wise_Woman",
          "Friendly_Person",
          "Inspirational_girl",
          "Deep_Voice_Man",
          "Calm_Woman",
          "Casual_Guy",
          "Lively_Girl",
          "Patient_Man",
          "Young_Knight",
          "Determined_Man",
          "Lovely_Girl",
          "Decent_Boy",
          "Imposing_Manner",
          "Elegant_Man",
          "Abbess",
          "Sweet_Girl_2",
          "Exuberant_Girl",
          "English_expressive_narrator",
          "English_radiant_girl",
          "English_magnetic_voiced_man",
          "English_compelling_lady1",
          "English_Aussie_Bloke",
          "English_captivating_female1",
          "English_Upbeat_Woman",
          "English_Trustworth_Man",
          "English_CalmWoman",
          "English_UpsetGirl",
          "English_Gentle-voiced_man",
          "English_Whispering_girl_v3",
          "English_Diligent_Man",
          "English_Graceful_Lady",
          "English_Husky_MetalHead",
          "English_ReservedYoungMan",
          "Thai_female_1_sample1",
          "Thai_female_2_sample2",
          "English_PlayfulGirl",
          "English_ManWithDeepVoice",
          "English_GentleTeacher",
          "English_MaturePartner",
          "English_FriendlyPerson",
          "English_MatureBoss",
          "English_Debator",
          "whisper_man",
          "English_Abbess",
          "English_LovelyGirl",
          "whisper_woman_1",
          "English_Steadymentor",
          "English_Deep-VoicedGentleman",
          "English_DeterminedMan",
          "English_Wiselady",
          "English_CaptivatingStoryteller",
          "English_AttractiveGirl",
          "English_DecentYoungMan",
          "English_SentimentalLady",
          "English_ImposingManner",
          "English_SadTeen",
          "English_ThoughtfulMan",
          "English_PassionateWarrior",
          "English_DecentBoy",
          "English_WiseScholar",
          "English_Soft-spokenGirl",
          "English_SereneWoman",
          "English_ConfidentWoman",
          "English_PatientMan",
          "English_Comedian",
          "English_GorgeousLady",
          "English_BossyLeader",
          "English_LovelyLady",
          "English_Strong-WilledBoy",
          "English_Deep-tonedMan",
          "English_StressedLady",
          "English_AssertiveQueen",
          "English_AnimeCharacter",
          "Portuguese_Optimisticyouth",
          "Portuguese_CuteElf",
          "English_Jovialman",
          "English_WhimsicalGirl",
          "English_CharmingQueen",
          "English_Kind-heartedGirl",
          "English_FriendlyNeighbor",
          "English_Sweet_Female_4",
          "English_Magnetic_Male_2",
          "English_Lively_Male_11",
          "English_Friendly_Female_3",
          "English_Steady_Female_1",
          "English_Lively_Male_10",
          "English_Magnetic_Male_12",
          "English_Steady_Female_5",
          "English_Insightful_Speaker",
          "English_patient_man_v1",
          "English_Persuasive_Man",
          "English_Explanatory_Man",
          "English_intellect_female_1",
          "English_Cute_Girl",
          "English_Sharp_Commentator",
          "English_Honest_Man",
          "angry_pirate_1",
          "massive_kind_troll",
          "movie_trailer_deep",
          "peace_and_ease",
          "moss_audio_6dc281eb-713c-11f0-a447-9613c873494c",
          "moss_audio_c12a59b9-7115-11f0-a447-9613c873494c",
          "moss_audio_076697ad-7144-11f0-a447-9613c873494c",
          "moss_audio_737a299c-734a-11f0-918f-4e0486034804",
          "moss_audio_19dbb103-7350-11f0-ad20-f2bc95e89150",
          "moss_audio_7c7e7ae2-7356-11f0-9540-7ef9b4b62566",
          "moss_audio_570551b1-735c-11f0-b236-0adeeecad052",
          "conversational_female_1_v1",
          "conversational_female_2_v1",
          "socialmedia_female_1_v1",
          "BritishChild_male_1_v1",
          "BritishChild_female_1_v1",
          "Chinese (Mandarin)_Reliable_Executive",
          "Chinese (Mandarin)_News_Anchor",
          "Chinese (Mandarin)_Unrestrained_Young_Man",
          "Chinese (Mandarin)_Mature_Woman",
          "Arrogant_Miss",
          "Chinese (Mandarin)_Kind-hearted_Antie",
          "Robot_Armor",
          "hunyin_6",
          "Chinese (Mandarin)_HK_Flight_Attendant",
          "Chinese (Mandarin)_Humorous_Elder",
          "Chinese (Mandarin)_Gentleman",
          "Chinese (Mandarin)_Warm_Bestie",
          "Chinese (Mandarin)_Southern_Young_Man",
          "Chinese (Mandarin)_Wise_Women",
          "moss_audio_cedfd4d2-736d-11f0-99be-fe40dd2a5fe8",
          "moss_audio_a0d611da-737c-11f0-ad20-f2bc95e89150",
          "moss_audio_4f4172f4-737b-11f0-9540-7ef9b4b62566",
          "moss_audio_62ca20b0-7380-11f0-99be-fe40dd2a5fe8",
          "Portuguese_PowerfulSoldier",
          "Portuguese_FascinatingBoy",
          "Portuguese_RomanticHusband",
          "Portuguese_StrictBoss",
          "Chinese (Mandarin)_Stubborn_Friend",
          "Chinese (Mandarin)_Sweet_Lady",
          "moss_audio_ad5baf92-735f-11f0-8263-fe5a2fe98ec8",
          "Chinese (Mandarin)_Gentle_Youth",
          "Chinese (Mandarin)_Warm_Girl",
          "Chinese (Mandarin)_Male_Announcer",
          "Chinese (Mandarin)_Kind-hearted_Elder",
          "Chinese (Mandarin)_Cute_Spirit",
          "Chinese (Mandarin)_Radio_Host",
          "Chinese (Mandarin)_Lyrical_Voice",
          "Chinese (Mandarin)_Straightforward_Boy",
          "Chinese (Mandarin)_Sincere_Adult",
          "Chinese (Mandarin)_Gentle_Senior",
          "Chinese (Mandarin)_Crisp_Girl",
          "Chinese (Mandarin)_Pure-hearted_Boy",
          "Chinese (Mandarin)_Soft_Girl",
          "Chinese (Mandarin)_IntellectualGirl",
          "Chinese (Mandarin)_Laid_BackGirl",
          "Chinese (Mandarin)_ExplorativeGirl",
          "Chinese (Mandarin)_Warm-HeartedAunt",
          "Chinese (Mandarin)_BashfulGirl",
          "Arabic_CalmWoman",
          "Arabic_FriendlyGuy",
          "Cantonese_ProfessionalHost∩╝êF)",
          "Cantonese_GentleLady",
          "Cantonese_ProfessionalHost∩╝êM)",
          "Cantonese_PlayfulMan",
          "Cantonese_CuteGirl",
          "Cantonese_KindWoman",
          "Cantonese_Narrator",
          "Cantonese_WiselProfessor",
          "Cantonese_IndifferentStaff",
          "Japanese_ColdQueen",
          "Japanese_DependableWoman",
          "Japanese_GentleButler",
          "Japanese_KindLady",
          "Dutch_kindhearted_girl",
          "Dutch_bossy_leader",
          "French_Male_Speech_New",
          "French_Female_News Anchor",
          "French_CasualMan",
          "French_MovieLeadFemale",
          "French_FemaleAnchor",
          "French_MaleNarrator",
          "French_Female Journalist",
          "French_Female_Speech_New",
          "German_FriendlyMan",
          "German_SweetLady",
          "German_PlayfulMan",
          "Indonesian_SweetGirl",
          "Indonesian_ReservedYoungMan",
          "Indonesian_CharmingGirl",
          "Russian_AmbitiousWoman",
          "Russian_ReliableMan",
          "Russian_CrazyQueen",
          "Russian_PessimisticGirl",
          "Indonesian_CalmWoman",
          "Indonesian_ConfidentWoman",
          "Indonesian_CaringMan",
          "Indonesian_BossyLeader",
          "Indonesian_DeterminedBoy",
          "Indonesian_GentleGirl",
          "Italian_BraveHeroine",
          "Italian_Narrator",
          "Italian_WanderingSorcerer",
          "Italian_DiligentLeader",
          "Italian_ReliableMan",
          "Italian_AthleticStudent",
          "Italian_ArrogantPrincess",
          "Japanese_Whisper_Belle",
          "Japanese_IntellectualSenior",
          "Japanese_DecisivePrincess",
          "Japanese_LoyalKnight",
          "Japanese_DominantMan",
          "Japanese_SeriousCommander",
          "Japanese_CalmLady",
          "Japanese_OptimisticYouth",
          "Japanese_GenerousIzakayaOwner",
          "Japanese_SportyStudent",
          "Japanese_InnocentBoy",
          "Japanese_GracefulMaiden",
          "Korean_PowerfulGirl",
          "Korean_BossyMan",
          "Korean_SweetGirl",
          "Korean_CheerfulBoyfriend",
          "Korean_EnchantingSister",
          "Korean_ShyGirl",
          "Korean_ReliableSister",
          "Korean_StrictBoss",
          "Korean_SassyGirl",
          "Korean_ChildhoodFriendGirl",
          "Korean_PlayboyCharmer",
          "Korean_ElegantPrincess",
          "English_energetic_male_1",
          "English_witty_female_1",
          "English_Lucky_Robot",
          "Korean_BraveFemaleWarrior",
          "Korean_BraveYouth",
          "Korean_CalmLady",
          "Korean_EnthusiasticTeen",
          "Korean_SoothingLady",
          "Korean_IntellectualSenior",
          "Korean_LonelyWarrior",
          "Korean_MatureLady",
          "Korean_InnocentBoy",
          "Korean_CharmingSister",
          "Korean_AthleticStudent",
          "Korean_BraveAdventurer",
          "Korean_CalmGentleman",
          "Korean_WiseElf",
          "Korean_CheerfulCoolJunior",
          "Korean_DecisiveQueen",
          "Korean_ColdYoungMan",
          "Korean_MysteriousGirl",
          "Korean_QuirkyGirl",
          "Korean_ConsiderateSenior",
          "Chinese (Mandarin)_Warm_HeartedGirl",
          "Korean_CheerfulLittleSister",
          "Korean_DominantMan",
          "Korean_AirheadedGirl",
          "Korean_ReliableYouth",
          "Korean_FriendlyBigSister",
          "Korean_GentleBoss",
          "Korean_ColdGirl",
          "Korean_HaughtyLady",
          "Korean_CharmingElderSister",
          "Korean_IntellectualMan",
          "Korean_CaringWoman",
          "Korean_WiseTeacher",
          "Korean_ConfidentBoss",
          "Korean_AthleticGirl",
          "Korean_PossessiveMan",
          "Korean_GentleWoman",
          "Korean_CockyGuy",
          "Korean_ThoughtfulWoman",
          "Korean_OptimisticYouth",
          "Portuguese_AnxiousMan",
          "Portuguese_Matureresearcher",
          "Portuguese_EnergeticGirl",
          "Portuguese_FunnyGuy",
          "Portuguese_Nuttylady",
          "Portuguese_Deep-tonedMan",
          "Portuguese_SentimentalLady",
          "Portuguese_BossyLeader",
          "Portuguese_Wiselady",
          "Portuguese_Strong-WilledBoy",
          "Portuguese_Deep-VoicedGentleman",
          "Portuguese_UpsetGirl",
          "Portuguese_PassionateWarrior",
          "Portuguese_AnimeCharacter",
          "Portuguese_ConfidentWoman",
          "Portuguese_AngryMan",
          "Portuguese_CaptivatingStoryteller",
          "Portuguese_Godfather",
          "Portuguese_ReservedYoungMan",
          "Portuguese_SmartYoungGirl",
          "Portuguese_Kind-heartedGirl",
          "Portuguese_Pompouslady",
          "Portuguese_Grinch",
          "Portuguese_Debator",
          "Portuguese_SweetGirl",
          "Portuguese_AttractiveGirl",
          "Portuguese_ThoughtfulMan",
          "Portuguese_PlayfulGirl",
          "Portuguese_GorgeousLady",
          "Portuguese_LovelyLady",
          "Portuguese_SereneWoman",
          "Portuguese_SadTeen",
          "Portuguese_MaturePartner",
          "Portuguese_Comedian",
          "Portuguese_NaughtySchoolgirl",
          "Portuguese_Narrator",
          "Portuguese_ToughBoss",
          "Portuguese_Fussyhostess",
          "Portuguese_Dramatist",
          "Portuguese_Steadymentor",
          "Portuguese_Jovialman",
          "Portuguese_CharmingQueen",
          "Portuguese_SantaClaus",
          "Portuguese_Rudolph",
          "Portuguese_Arnold",
          "Portuguese_CharmingSanta",
          "Portuguese_Ghost",
          "Portuguese_HumorousElder",
          "Portuguese_CalmLeader",
          "Portuguese_GentleTeacher",
          "Portuguese_EnergeticBoy",
          "Portuguese_ReliableMan",
          "Portuguese_SereneElder",
          "Portuguese_GrimReaper",
          "Portuguese_AssertiveQueen",
          "Portuguese_WhimsicalGirl",
          "Portuguese_StressedLady",
          "Portuguese_FriendlyNeighbor",
          "Portuguese_CaringGirlfriend",
          "Portuguese_InspiringLady",
          "Portuguese_PlayfulSpirit",
          "Portuguese_ElegantGirl",
          "Portuguese_CompellingGirl",
          "Portuguese_PowerfulVeteran",
          "Portuguese_SensibleManager",
          "Portuguese_ThoughtfulLady",
          "Portuguese_TheatricalActor",
          "Portuguese_FragileBoy",
          "Portuguese_ChattyGirl",
          "Portuguese_Conscientiousinstructor",
          "Portuguese_RationalMan",
          "Portuguese_WiseScholar",
          "Portuguese_FrankLady",
          "Portuguese_DeterminedManager",
          "Portuguese_CharmingLady",
          "Russian_HandsomeChildhoodFriend",
          "Russian_BrightHeroine",
          "Russian_AttractiveGuy",
          "Russian_Bad-temperedBoy",
          "Spanish_FriendlyNeighbor",
          "Spanish_FragileBoy",
          "Spanish_UpsetGirl",
          "Spanish_Soft-spokenGirl",
          "Spanish_CharmingQueen",
          "Spanish_Nuttylady",
          "Spanish_ElegantGirl",
          "Spanish_FascinatingBoy",
          "Spanish_FunnyGuy",
          "Spanish_PlayfulSpirit",
          "Spanish_TheatricalActor",
          "Spanish_SereneWoman",
          "Spanish_MaturePartner",
          "Spanish_CaptivatingStoryteller",
          "Spanish_Narrator",
          "Spanish_WiseScholar",
          "Spanish_Kind-heartedGirl",
          "Spanish_DeterminedManager",
          "Spanish_BossyLeader",
          "Spanish_ReservedYoungMan",
          "Spanish_ConfidentWoman",
          "Spanish_ThoughtfulMan",
          "Spanish_Strong-WilledBoy",
          "Spanish_SophisticatedLady",
          "Spanish_RationalMan",
          "Spanish_AnimeCharacter",
          "Spanish_Deep-tonedMan",
          "Spanish_Fussyhostess",
          "Spanish_SincereTeen",
          "Spanish_FrankLady",
          "Spanish_Comedian",
          "Spanish_Debator",
          "Spanish_ToughBoss",
          "Spanish_Wiselady",
          "Spanish_Steadymentor",
          "finnish_male_1_v2",
          "hindi_male_1_v2",
          "hindi_female_2_v1",
          "hindi_female_1_v2",
          "Spanish_Jovialman",
          "Spanish_SantaClaus",
          "Spanish_Rudolph",
          "Spanish_Intonategirl",
          "Spanish_Arnold",
          "Spanish_Ghost",
          "Spanish_HumorousElder",
          "Spanish_EnergeticBoy",
          "Spanish_WhimsicalGirl",
          "Spanish_StrictBoss",
          "Spanish_ReliableMan",
          "Spanish_SereneElder",
          "Spanish_AngryMan",
          "Spanish_AssertiveQueen",
          "Spanish_CaringGirlfriend",
          "Spanish_PowerfulSoldier",
          "Spanish_PassionateWarrior",
          "Spanish_ChattyGirl",
          "Spanish_RomanticHusband",
          "Spanish_CompellingGirl",
          "Spanish_PowerfulVeteran",
          "Spanish_SensibleManager",
          "Spanish_ThoughtfulLady",
          "Turkish_CalmWoman",
          "Turkish_Trustworthyman",
          "Ukrainian_CalmWoman",
          "Ukrainian_WiseScholar",
          "Vietnamese_Serene_Man",
          "Vietnamese_female_4_v1",
          "Vietnamese_male_1_v2",
          "Vietnamese_kindhearted_girl",
          "Thai_Optimistic_girl",
          "Thai_male_1_sample8",
          "Thai_Tender_Woman",
          "Thai_male_2_sample2",
          "Polish_male_1_sample4",
          "Polish_male_2_sample3",
          "Polish_female_1_sample1",
          "Polish_female_2_sample3",
          "Romanian_male_1_sample2",
          "Romanian_male_2_sample1",
          "Romanian_female_1_sample4",
          "Romanian_female_2_sample1",
          "Greek_female_1_sample1",
          "greek_male_1a_v1",
          "Greek_female_2_sample3",
          "czech_male_1_v1",
          "czech_female_5_v7",
          "czech_female_2_v2",
          "finnish_male_3_v1",
          "finnish_female_4_v1",
          "Bulgarian_male_2_v1",
          "Bulgarian_female_1_v1",
          "Danish_male_1_v1",
          "Danish_female_1_v1",
          "Hebrew_male_1_v1",
          "Hebrew_female_1_v1",
          "Malay_male_1_v1",
          "Malay_female_1_v1",
          "Malay_female_2_v1",
          "Persian_male_1_v1",
          "Persian_female_1_v1",
          "Slovak_male_1_v1",
          "Slovak_female_1_v1",
          "Swedish_male_1_v1",
          "Swedish_female_1_v1",
          "Croatian_male_1_v1",
          "Croatian_female_1_v1",
          "Filipino_male_1_v1",
          "Filipino_female_1_v1",
          "Hungarian_male_1_v1",
          "Hungarian_female_1_v1",
          "Norwegian_male_1_v1",
          "Norwegian_female_1_v1",
          "Slovenian_male_1_v1",
          "Slovenian_female_1_v2",
          "Catalan_male_1_v1",
          "Catalan_female_1_v1",
          "Nynorsk_male_1_v1",
          "Nynorsk_female_1_v1",
          "Tamil_male_1_v1",
          "Tamil_female_1_v1",
          "Afrikaans_male_1_v1",
          "Afrikaans_female_1_v1"
        ],
        "description": "Desired voice ID. Use a voice ID you have trained (https://muapi.ai/playground/minimax-voice-clone), or one of the following system voice IDs",
        "type": "string",
        "typing": true,
        "title": "Voice ID",
        "name": "voice_id",
        "default": "Friendly_Person"
      },
      "speed": {
        "title": "Speed",
        "name": "speed",
        "type": "int",
        "description": "Speech speed. Range: 0.5-2.0, where 1.0 is normal speed.",
        "default": 1,
        "minValue": 0.5,
        "maxValue": 2,
        "step": 0.01
      },
      "volume": {
        "title": "Volume",
        "name": "volume",
        "type": "int",
        "description": "Speech volume. Range: 0.1-10.0, where 1.0 is normal volume.",
        "default": 1,
        "minValue": 0.1,
        "maxValue": 10,
        "step": 0.01
      },
      "pitch": {
        "title": "Pitch",
        "name": "pitch",
        "type": "int",
        "description": "Speech pitch. Range: -12 to 12, where 0 is normal pitch.",
        "default": 0,
        "minValue": -12,
        "maxValue": 12,
        "step": 1
      },
      "emotion": {
        "enum": [
          "happy",
          "sad",
          "angry",
          "fearful",
          "disgusted",
          "surprised",
          "neutral"
        ],
        "title": "Emotion",
        "name": "emotion",
        "type": "string",
        "description": "The emotion of the generated speech.",
        "default": "happy"
      },
      "english_normalization": {
        "type": "boolean",
        "title": "English Normalization",
        "name": "english_normalization",
        "description": "This parameter supports English text normalization, which improves performance in number-reading scenarios.",
        "default": false
      },
      "sample_rate": {
        "enum": [
          8000,
          16000,
          22050,
          24000,
          32000,
          44100
        ],
        "type": "integer",
        "title": "Sample Rate",
        "name": "sample_rate",
        "description": "Sample rate of generated sound.",
        "default": 8000
      },
      "bitrate": {
        "enum": [
          32000,
          64000,
          128000,
          256000
        ],
        "type": "integer",
        "title": "Bitrate",
        "name": "bitrate",
        "description": "Bitrate of generated sound.",
        "default": 32000
      },
      "channel": {
        "enum": [
          1,
          2
        ],
        "type": "integer",
        "title": "Channel",
        "name": "channel",
        "description": "he number of channels of the generated audio. 1: mono, 2: stereo.",
        "default": 1
      },
      "format": {
        "enum": [
          "mp3",
          "wav",
          "pcm",
          "flac"
        ],
        "type": "string",
        "title": "Format",
        "name": "format",
        "description": "Format of generated sound.",
        "default": "mp3"
      },
      "language_boost": {
        "enum": [
          "Chinese",
          "Chinese,Yue",
          "English",
          "Arabic",
          "Russian",
          "Spanish",
          "French",
          "Portuguese",
          "German",
          "Turkish",
          "Dutch",
          "Ukrainian",
          "Vietnamese",
          "Indonesian",
          "Japanese",
          "Italian",
          "Korean",
          "Thai",
          "Polish",
          "Romanian",
          "Greek",
          "Czech",
          "Finnish",
          "Hindi",
          "Bulgarian",
          "Danish",
          "Hebrew",
          "Malay",
          "Persian",
          "Slovak",
          "Swedish",
          "Croatian",
          "Filipino",
          "Hungarian",
          "Norwegian",
          "Slovenian",
          "Catalan",
          "Nynorsk",
          "Tamil",
          "Afrikaans",
          "auto"
        ],
        "title": "Language Boost",
        "name": "language_boost",
        "type": "string",
        "description": "Enhance the ability to recognize specified languages and dialects.",
        "default": "auto"
      }
    }
  },
  {
    "id": "minimax-speech-2.6-turbo",
    "name": "Minimax Speech Turbo",
    "endpoint": "minimax-speech-2.6-turbo",
    "family": "minimax-2.6",
    "description": "Speech-2.6-turbo is MinimaxΓÇÖs fast, lightweight text-to-speech model designed for quick audio generation while maintaining good natural voice quality. It produces clear speech with smooth pacing and minimal delay.",
    "required": [
      "prompt",
      "voice_id"
    ],
    "inputs": {
      "prompt": {
        "examples": [
          "Welcome to Minimax-Speech 2.6 by Muapiapp! Get ready for an audio revolution! We are thrilled to introduce a model so realistic, it's virtually indistinguishable from a human voice. You're going to be amazed by its lifelike delivery!"
        ],
        "description": "Text to convert to speech. Every character is 1 token. Maximum 10000 characters. Use <#x#> between words to control pause duration (0.01-99.99s).",
        "type": "string",
        "title": "Prompt",
        "name": "prompt"
      },
      "voice_id": {
        "enum": [
          "Wise_Woman",
          "Friendly_Person",
          "Inspirational_girl",
          "Deep_Voice_Man",
          "Calm_Woman",
          "Casual_Guy",
          "Lively_Girl",
          "Patient_Man",
          "Young_Knight",
          "Determined_Man",
          "Lovely_Girl",
          "Decent_Boy",
          "Imposing_Manner",
          "Elegant_Man",
          "Abbess",
          "Sweet_Girl_2",
          "Exuberant_Girl",
          "English_expressive_narrator",
          "English_radiant_girl",
          "English_magnetic_voiced_man",
          "English_compelling_lady1",
          "English_Aussie_Bloke",
          "English_captivating_female1",
          "English_Upbeat_Woman",
          "English_Trustworth_Man",
          "English_CalmWoman",
          "English_UpsetGirl",
          "English_Gentle-voiced_man",
          "English_Whispering_girl_v3",
          "English_Diligent_Man",
          "English_Graceful_Lady",
          "English_Husky_MetalHead",
          "English_ReservedYoungMan",
          "Thai_female_1_sample1",
          "Thai_female_2_sample2",
          "English_PlayfulGirl",
          "English_ManWithDeepVoice",
          "English_GentleTeacher",
          "English_MaturePartner",
          "English_FriendlyPerson",
          "English_MatureBoss",
          "English_Debator",
          "whisper_man",
          "English_Abbess",
          "English_LovelyGirl",
          "whisper_woman_1",
          "English_Steadymentor",
          "English_Deep-VoicedGentleman",
          "English_DeterminedMan",
          "English_Wiselady",
          "English_CaptivatingStoryteller",
          "English_AttractiveGirl",
          "English_DecentYoungMan",
          "English_SentimentalLady",
          "English_ImposingManner",
          "English_SadTeen",
          "English_ThoughtfulMan",
          "English_PassionateWarrior",
          "English_DecentBoy",
          "English_WiseScholar",
          "English_Soft-spokenGirl",
          "English_SereneWoman",
          "English_ConfidentWoman",
          "English_PatientMan",
          "English_Comedian",
          "English_GorgeousLady",
          "English_BossyLeader",
          "English_LovelyLady",
          "English_Strong-WilledBoy",
          "English_Deep-tonedMan",
          "English_StressedLady",
          "English_AssertiveQueen",
          "English_AnimeCharacter",
          "Portuguese_Optimisticyouth",
          "Portuguese_CuteElf",
          "English_Jovialman",
          "English_WhimsicalGirl",
          "English_CharmingQueen",
          "English_Kind-heartedGirl",
          "English_FriendlyNeighbor",
          "English_Sweet_Female_4",
          "English_Magnetic_Male_2",
          "English_Lively_Male_11",
          "English_Friendly_Female_3",
          "English_Steady_Female_1",
          "English_Lively_Male_10",
          "English_Magnetic_Male_12",
          "English_Steady_Female_5",
          "English_Insightful_Speaker",
          "English_patient_man_v1",
          "English_Persuasive_Man",
          "English_Explanatory_Man",
          "English_intellect_female_1",
          "English_Cute_Girl",
          "English_Sharp_Commentator",
          "English_Honest_Man",
          "angry_pirate_1",
          "massive_kind_troll",
          "movie_trailer_deep",
          "peace_and_ease",
          "moss_audio_6dc281eb-713c-11f0-a447-9613c873494c",
          "moss_audio_c12a59b9-7115-11f0-a447-9613c873494c",
          "moss_audio_076697ad-7144-11f0-a447-9613c873494c",
          "moss_audio_737a299c-734a-11f0-918f-4e0486034804",
          "moss_audio_19dbb103-7350-11f0-ad20-f2bc95e89150",
          "moss_audio_7c7e7ae2-7356-11f0-9540-7ef9b4b62566",
          "moss_audio_570551b1-735c-11f0-b236-0adeeecad052",
          "conversational_female_1_v1",
          "conversational_female_2_v1",
          "socialmedia_female_1_v1",
          "BritishChild_male_1_v1",
          "BritishChild_female_1_v1",
          "Chinese (Mandarin)_Reliable_Executive",
          "Chinese (Mandarin)_News_Anchor",
          "Chinese (Mandarin)_Unrestrained_Young_Man",
          "Chinese (Mandarin)_Mature_Woman",
          "Arrogant_Miss",
          "Chinese (Mandarin)_Kind-hearted_Antie",
          "Robot_Armor",
          "hunyin_6",
          "Chinese (Mandarin)_HK_Flight_Attendant",
          "Chinese (Mandarin)_Humorous_Elder",
          "Chinese (Mandarin)_Gentleman",
          "Chinese (Mandarin)_Warm_Bestie",
          "Chinese (Mandarin)_Southern_Young_Man",
          "Chinese (Mandarin)_Wise_Women",
          "moss_audio_cedfd4d2-736d-11f0-99be-fe40dd2a5fe8",
          "moss_audio_a0d611da-737c-11f0-ad20-f2bc95e89150",
          "moss_audio_4f4172f4-737b-11f0-9540-7ef9b4b62566",
          "moss_audio_62ca20b0-7380-11f0-99be-fe40dd2a5fe8",
          "Portuguese_PowerfulSoldier",
          "Portuguese_FascinatingBoy",
          "Portuguese_RomanticHusband",
          "Portuguese_StrictBoss",
          "Chinese (Mandarin)_Stubborn_Friend",
          "Chinese (Mandarin)_Sweet_Lady",
          "moss_audio_ad5baf92-735f-11f0-8263-fe5a2fe98ec8",
          "Chinese (Mandarin)_Gentle_Youth",
          "Chinese (Mandarin)_Warm_Girl",
          "Chinese (Mandarin)_Male_Announcer",
          "Chinese (Mandarin)_Kind-hearted_Elder",
          "Chinese (Mandarin)_Cute_Spirit",
          "Chinese (Mandarin)_Radio_Host",
          "Chinese (Mandarin)_Lyrical_Voice",
          "Chinese (Mandarin)_Straightforward_Boy",
          "Chinese (Mandarin)_Sincere_Adult",
          "Chinese (Mandarin)_Gentle_Senior",
          "Chinese (Mandarin)_Crisp_Girl",
          "Chinese (Mandarin)_Pure-hearted_Boy",
          "Chinese (Mandarin)_Soft_Girl",
          "Chinese (Mandarin)_IntellectualGirl",
          "Chinese (Mandarin)_Laid_BackGirl",
          "Chinese (Mandarin)_ExplorativeGirl",
          "Chinese (Mandarin)_Warm-HeartedAunt",
          "Chinese (Mandarin)_BashfulGirl",
          "Arabic_CalmWoman",
          "Arabic_FriendlyGuy",
          "Cantonese_ProfessionalHost∩╝êF)",
          "Cantonese_GentleLady",
          "Cantonese_ProfessionalHost∩╝êM)",
          "Cantonese_PlayfulMan",
          "Cantonese_CuteGirl",
          "Cantonese_KindWoman",
          "Cantonese_Narrator",
          "Cantonese_WiselProfessor",
          "Cantonese_IndifferentStaff",
          "Japanese_ColdQueen",
          "Japanese_DependableWoman",
          "Japanese_GentleButler",
          "Japanese_KindLady",
          "Dutch_kindhearted_girl",
          "Dutch_bossy_leader",
          "French_Male_Speech_New",
          "French_Female_News Anchor",
          "French_CasualMan",
          "French_MovieLeadFemale",
          "French_FemaleAnchor",
          "French_MaleNarrator",
          "French_Female Journalist",
          "French_Female_Speech_New",
          "German_FriendlyMan",
          "German_SweetLady",
          "German_PlayfulMan",
          "Indonesian_SweetGirl",
          "Indonesian_ReservedYoungMan",
          "Indonesian_CharmingGirl",
          "Russian_AmbitiousWoman",
          "Russian_ReliableMan",
          "Russian_CrazyQueen",
          "Russian_PessimisticGirl",
          "Indonesian_CalmWoman",
          "Indonesian_ConfidentWoman",
          "Indonesian_CaringMan",
          "Indonesian_BossyLeader",
          "Indonesian_DeterminedBoy",
          "Indonesian_GentleGirl",
          "Italian_BraveHeroine",
          "Italian_Narrator",
          "Italian_WanderingSorcerer",
          "Italian_DiligentLeader",
          "Italian_ReliableMan",
          "Italian_AthleticStudent",
          "Italian_ArrogantPrincess",
          "Japanese_Whisper_Belle",
          "Japanese_IntellectualSenior",
          "Japanese_DecisivePrincess",
          "Japanese_LoyalKnight",
          "Japanese_DominantMan",
          "Japanese_SeriousCommander",
          "Japanese_CalmLady",
          "Japanese_OptimisticYouth",
          "Japanese_GenerousIzakayaOwner",
          "Japanese_SportyStudent",
          "Japanese_InnocentBoy",
          "Japanese_GracefulMaiden",
          "Korean_PowerfulGirl",
          "Korean_BossyMan",
          "Korean_SweetGirl",
          "Korean_CheerfulBoyfriend",
          "Korean_EnchantingSister",
          "Korean_ShyGirl",
          "Korean_ReliableSister",
          "Korean_StrictBoss",
          "Korean_SassyGirl",
          "Korean_ChildhoodFriendGirl",
          "Korean_PlayboyCharmer",
          "Korean_ElegantPrincess",
          "English_energetic_male_1",
          "English_witty_female_1",
          "English_Lucky_Robot",
          "Korean_BraveFemaleWarrior",
          "Korean_BraveYouth",
          "Korean_CalmLady",
          "Korean_EnthusiasticTeen",
          "Korean_SoothingLady",
          "Korean_IntellectualSenior",
          "Korean_LonelyWarrior",
          "Korean_MatureLady",
          "Korean_InnocentBoy",
          "Korean_CharmingSister",
          "Korean_AthleticStudent",
          "Korean_BraveAdventurer",
          "Korean_CalmGentleman",
          "Korean_WiseElf",
          "Korean_CheerfulCoolJunior",
          "Korean_DecisiveQueen",
          "Korean_ColdYoungMan",
          "Korean_MysteriousGirl",
          "Korean_QuirkyGirl",
          "Korean_ConsiderateSenior",
          "Chinese (Mandarin)_Warm_HeartedGirl",
          "Korean_CheerfulLittleSister",
          "Korean_DominantMan",
          "Korean_AirheadedGirl",
          "Korean_ReliableYouth",
          "Korean_FriendlyBigSister",
          "Korean_GentleBoss",
          "Korean_ColdGirl",
          "Korean_HaughtyLady",
          "Korean_CharmingElderSister",
          "Korean_IntellectualMan",
          "Korean_CaringWoman",
          "Korean_WiseTeacher",
          "Korean_ConfidentBoss",
          "Korean_AthleticGirl",
          "Korean_PossessiveMan",
          "Korean_GentleWoman",
          "Korean_CockyGuy",
          "Korean_ThoughtfulWoman",
          "Korean_OptimisticYouth",
          "Portuguese_AnxiousMan",
          "Portuguese_Matureresearcher",
          "Portuguese_EnergeticGirl",
          "Portuguese_FunnyGuy",
          "Portuguese_Nuttylady",
          "Portuguese_Deep-tonedMan",
          "Portuguese_SentimentalLady",
          "Portuguese_BossyLeader",
          "Portuguese_Wiselady",
          "Portuguese_Strong-WilledBoy",
          "Portuguese_Deep-VoicedGentleman",
          "Portuguese_UpsetGirl",
          "Portuguese_PassionateWarrior",
          "Portuguese_AnimeCharacter",
          "Portuguese_ConfidentWoman",
          "Portuguese_AngryMan",
          "Portuguese_CaptivatingStoryteller",
          "Portuguese_Godfather",
          "Portuguese_ReservedYoungMan",
          "Portuguese_SmartYoungGirl",
          "Portuguese_Kind-heartedGirl",
          "Portuguese_Pompouslady",
          "Portuguese_Grinch",
          "Portuguese_Debator",
          "Portuguese_SweetGirl",
          "Portuguese_AttractiveGirl",
          "Portuguese_ThoughtfulMan",
          "Portuguese_PlayfulGirl",
          "Portuguese_GorgeousLady",
          "Portuguese_LovelyLady",
          "Portuguese_SereneWoman",
          "Portuguese_SadTeen",
          "Portuguese_MaturePartner",
          "Portuguese_Comedian",
          "Portuguese_NaughtySchoolgirl",
          "Portuguese_Narrator",
          "Portuguese_ToughBoss",
          "Portuguese_Fussyhostess",
          "Portuguese_Dramatist",
          "Portuguese_Steadymentor",
          "Portuguese_Jovialman",
          "Portuguese_CharmingQueen",
          "Portuguese_SantaClaus",
          "Portuguese_Rudolph",
          "Portuguese_Arnold",
          "Portuguese_CharmingSanta",
          "Portuguese_Ghost",
          "Portuguese_HumorousElder",
          "Portuguese_CalmLeader",
          "Portuguese_GentleTeacher",
          "Portuguese_EnergeticBoy",
          "Portuguese_ReliableMan",
          "Portuguese_SereneElder",
          "Portuguese_GrimReaper",
          "Portuguese_AssertiveQueen",
          "Portuguese_WhimsicalGirl",
          "Portuguese_StressedLady",
          "Portuguese_FriendlyNeighbor",
          "Portuguese_CaringGirlfriend",
          "Portuguese_InspiringLady",
          "Portuguese_PlayfulSpirit",
          "Portuguese_ElegantGirl",
          "Portuguese_CompellingGirl",
          "Portuguese_PowerfulVeteran",
          "Portuguese_SensibleManager",
          "Portuguese_ThoughtfulLady",
          "Portuguese_TheatricalActor",
          "Portuguese_FragileBoy",
          "Portuguese_ChattyGirl",
          "Portuguese_Conscientiousinstructor",
          "Portuguese_RationalMan",
          "Portuguese_WiseScholar",
          "Portuguese_FrankLady",
          "Portuguese_DeterminedManager",
          "Portuguese_CharmingLady",
          "Russian_HandsomeChildhoodFriend",
          "Russian_BrightHeroine",
          "Russian_AttractiveGuy",
          "Russian_Bad-temperedBoy",
          "Spanish_FriendlyNeighbor",
          "Spanish_FragileBoy",
          "Spanish_UpsetGirl",
          "Spanish_Soft-spokenGirl",
          "Spanish_CharmingQueen",
          "Spanish_Nuttylady",
          "Spanish_ElegantGirl",
          "Spanish_FascinatingBoy",
          "Spanish_FunnyGuy",
          "Spanish_PlayfulSpirit",
          "Spanish_TheatricalActor",
          "Spanish_SereneWoman",
          "Spanish_MaturePartner",
          "Spanish_CaptivatingStoryteller",
          "Spanish_Narrator",
          "Spanish_WiseScholar",
          "Spanish_Kind-heartedGirl",
          "Spanish_DeterminedManager",
          "Spanish_BossyLeader",
          "Spanish_ReservedYoungMan",
          "Spanish_ConfidentWoman",
          "Spanish_ThoughtfulMan",
          "Spanish_Strong-WilledBoy",
          "Spanish_SophisticatedLady",
          "Spanish_RationalMan",
          "Spanish_AnimeCharacter",
          "Spanish_Deep-tonedMan",
          "Spanish_Fussyhostess",
          "Spanish_SincereTeen",
          "Spanish_FrankLady",
          "Spanish_Comedian",
          "Spanish_Debator",
          "Spanish_ToughBoss",
          "Spanish_Wiselady",
          "Spanish_Steadymentor",
          "finnish_male_1_v2",
          "hindi_male_1_v2",
          "hindi_female_2_v1",
          "hindi_female_1_v2",
          "Spanish_Jovialman",
          "Spanish_SantaClaus",
          "Spanish_Rudolph",
          "Spanish_Intonategirl",
          "Spanish_Arnold",
          "Spanish_Ghost",
          "Spanish_HumorousElder",
          "Spanish_EnergeticBoy",
          "Spanish_WhimsicalGirl",
          "Spanish_StrictBoss",
          "Spanish_ReliableMan",
          "Spanish_SereneElder",
          "Spanish_AngryMan",
          "Spanish_AssertiveQueen",
          "Spanish_CaringGirlfriend",
          "Spanish_PowerfulSoldier",
          "Spanish_PassionateWarrior",
          "Spanish_ChattyGirl",
          "Spanish_RomanticHusband",
          "Spanish_CompellingGirl",
          "Spanish_PowerfulVeteran",
          "Spanish_SensibleManager",
          "Spanish_ThoughtfulLady",
          "Turkish_CalmWoman",
          "Turkish_Trustworthyman",
          "Ukrainian_CalmWoman",
          "Ukrainian_WiseScholar",
          "Vietnamese_Serene_Man",
          "Vietnamese_female_4_v1",
          "Vietnamese_male_1_v2",
          "Vietnamese_kindhearted_girl",
          "Thai_Optimistic_girl",
          "Thai_male_1_sample8",
          "Thai_Tender_Woman",
          "Thai_male_2_sample2",
          "Polish_male_1_sample4",
          "Polish_male_2_sample3",
          "Polish_female_1_sample1",
          "Polish_female_2_sample3",
          "Romanian_male_1_sample2",
          "Romanian_male_2_sample1",
          "Romanian_female_1_sample4",
          "Romanian_female_2_sample1",
          "Greek_female_1_sample1",
          "greek_male_1a_v1",
          "Greek_female_2_sample3",
          "czech_male_1_v1",
          "czech_female_5_v7",
          "czech_female_2_v2",
          "finnish_male_3_v1",
          "finnish_female_4_v1",
          "Bulgarian_male_2_v1",
          "Bulgarian_female_1_v1",
          "Danish_male_1_v1",
          "Danish_female_1_v1",
          "Hebrew_male_1_v1",
          "Hebrew_female_1_v1",
          "Malay_male_1_v1",
          "Malay_female_1_v1",
          "Malay_female_2_v1",
          "Persian_male_1_v1",
          "Persian_female_1_v1",
          "Slovak_male_1_v1",
          "Slovak_female_1_v1",
          "Swedish_male_1_v1",
          "Swedish_female_1_v1",
          "Croatian_male_1_v1",
          "Croatian_female_1_v1",
          "Filipino_male_1_v1",
          "Filipino_female_1_v1",
          "Hungarian_male_1_v1",
          "Hungarian_female_1_v1",
          "Norwegian_male_1_v1",
          "Norwegian_female_1_v1",
          "Slovenian_male_1_v1",
          "Slovenian_female_1_v2",
          "Catalan_male_1_v1",
          "Catalan_female_1_v1",
          "Nynorsk_male_1_v1",
          "Nynorsk_female_1_v1",
          "Tamil_male_1_v1",
          "Tamil_female_1_v1",
          "Afrikaans_male_1_v1",
          "Afrikaans_female_1_v1"
        ],
        "description": "Desired voice ID. Use a voice ID you have trained (https://muapi.ai/playground/minimax-voice-clone), or one of the following system voice IDs",
        "type": "string",
        "typing": true,
        "title": "Voice ID",
        "name": "voice_id",
        "default": "Friendly_Person"
      },
      "speed": {
        "title": "Speed",
        "name": "speed",
        "type": "int",
        "description": "Speech speed. Range: 0.5-2.0, where 1.0 is normal speed.",
        "default": 1,
        "minValue": 0.5,
        "maxValue": 2,
        "step": 0.01
      },
      "volume": {
        "title": "Volume",
        "name": "volume",
        "type": "int",
        "description": "Speech volume. Range: 0.1-10.0, where 1.0 is normal volume.",
        "default": 1,
        "minValue": 0.1,
        "maxValue": 10,
        "step": 0.01
      },
      "pitch": {
        "title": "Pitch",
        "name": "pitch",
        "type": "int",
        "description": "Speech pitch. Range: -12 to 12, where 0 is normal pitch.",
        "default": 0,
        "minValue": -12,
        "maxValue": 12,
        "step": 1
      },
      "emotion": {
        "enum": [
          "happy",
          "sad",
          "angry",
          "fearful",
          "disgusted",
          "surprised",
          "neutral"
        ],
        "title": "Emotion",
        "name": "emotion",
        "type": "string",
        "description": "The emotion of the generated speech.",
        "default": "surprised"
      },
      "english_normalization": {
        "type": "boolean",
        "title": "English Normalization",
        "name": "english_normalization",
        "description": "This parameter supports English text normalization, which improves performance in number-reading scenarios.",
        "default": false
      },
      "sample_rate": {
        "enum": [
          8000,
          16000,
          22050,
          24000,
          32000,
          44100
        ],
        "type": "integer",
        "title": "Sample Rate",
        "name": "sample_rate",
        "description": "Sample rate of generated sound.",
        "default": 8000
      },
      "bitrate": {
        "enum": [
          32000,
          64000,
          128000,
          256000
        ],
        "type": "integer",
        "title": "Bitrate",
        "name": "bitrate",
        "description": "Bitrate of generated sound.",
        "default": 32000
      },
      "channel": {
        "enum": [
          1,
          2
        ],
        "type": "integer",
        "title": "Channel",
        "name": "channel",
        "description": "he number of channels of the generated audio. 1: mono, 2: stereo.",
        "default": 1
      },
      "format": {
        "enum": [
          "mp3",
          "wav",
          "pcm",
          "flac"
        ],
        "type": "string",
        "title": "Format",
        "name": "format",
        "description": "Format of generated sound.",
        "default": "mp3"
      },
      "language_boost": {
        "enum": [
          "Chinese",
          "Chinese,Yue",
          "English",
          "Arabic",
          "Russian",
          "Spanish",
          "French",
          "Portuguese",
          "German",
          "Turkish",
          "Dutch",
          "Ukrainian",
          "Vietnamese",
          "Indonesian",
          "Japanese",
          "Italian",
          "Korean",
          "Thai",
          "Polish",
          "Romanian",
          "Greek",
          "Czech",
          "Finnish",
          "Hindi",
          "Bulgarian",
          "Danish",
          "Hebrew",
          "Malay",
          "Persian",
          "Slovak",
          "Swedish",
          "Croatian",
          "Filipino",
          "Hungarian",
          "Norwegian",
          "Slovenian",
          "Catalan",
          "Nynorsk",
          "Tamil",
          "Afrikaans",
          "auto"
        ],
        "title": "Language Boost",
        "name": "language_boost",
        "type": "string",
        "description": "Enhance the ability to recognize specified languages and dialects.",
        "default": "auto"
      }
    }
  },{
    "id": "mmaudio-v2-text-to-audio",
    "name": "MM Audio V2",
    "endpoint": "mmaudio-v2/text-to-audio",
    "family": "mmaudio",
    "description": "Convert text into natural-sounding speech using mmAudio-v2. Ideal for voiceovers, virtual assistants, and content narration with lifelike clarity and tone.",
    "required": [
      "prompt"
    ],
    "inputs": {
      "prompt": {
        "examples": [
          "Indian holy music"
        ],
        "description": "The prompt to generate the audio for.",
        "type": "string",
        "title": "Prompt",
        "name": "prompt"
      },
      "duration": {
        "title": "Duration",
        "name": "duration",
        "type": "int",
        "description": "The duration of the audio to generate.",
        "default": 8,
        "minValue": 1,
        "maxValue": 30,
        "step": 1
      }
    }
  }
];

export const getAudioModelById = (id) => audioModels.find(m => m.id === id);
