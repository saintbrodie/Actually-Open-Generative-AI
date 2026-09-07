import * as upstream from './upstreamMuapi.js';
import { PRIVACY_SENTINEL, isPrivacyModelId, privacyApi } from './privacyApi.js';
import { isPrivacyVideoModelId, privacyVideoApi } from './privacyVideoApi.js';

export * from './upstreamMuapi.js';

const COMPATIBILITY_KEY_REQUIRED_MESSAGE =
  'This tool has not been ported to direct BYOK providers yet. Add a MuAPI compatibility key in Settings, or choose a Venice/OpenRouter model in a directly supported studio.';

function requireCompatibilityKey(apiKey) {
  if (!apiKey || apiKey === PRIVACY_SENTINEL) {
    throw new Error(COMPATIBILITY_KEY_REQUIRED_MESSAGE);
  }
  return apiKey;
}

function compatibilityCall(name) {
  return (...args) => {
    requireCompatibilityKey(args[0]);
    return upstream[name](...args);
  };
}

/**
 * Compatibility router for the React/Next studio package.
 *
 * Privacy-prefixed image/video models bypass the upstream API entirely. Other
 * cloud tools continue through the upstream compatibility client until a
 * matching direct-provider adapter exists. BYOK-only sessions fail locally for
 * those unported tools instead of sending the sentinel value to MuAPI.
 */
export async function generateImage(apiKey, params) {
  if (isPrivacyModelId(params?.model)) {
    return privacyApi.generateImage(params);
  }
  requireCompatibilityKey(apiKey);
  return upstream.generateImage(apiKey, params);
}

export async function generateI2I(apiKey, params) {
  if (isPrivacyModelId(params?.model)) {
    return privacyApi.generateI2I(params);
  }
  requireCompatibilityKey(apiKey);
  return upstream.generateI2I(apiKey, params);
}

export async function generateVideo(apiKey, params) {
  if (isPrivacyVideoModelId(params?.model)) {
    return privacyVideoApi.generateVideo(params);
  }
  requireCompatibilityKey(apiKey);
  return upstream.generateVideo(apiKey, params);
}

export async function generateI2V(apiKey, params) {
  if (isPrivacyVideoModelId(params?.model)) {
    return privacyVideoApi.generateI2V(params);
  }
  requireCompatibilityKey(apiKey);
  return upstream.generateI2V(apiKey, params);
}

export function uploadFile(apiKey, file, onProgress) {
  // In a BYOK-only session, keep image references in the browser as data URLs.
  // This prevents the source image from being uploaded to the compatibility
  // backend merely to obtain a temporary public URL.
  if (apiKey === PRIVACY_SENTINEL) {
    return privacyApi.fileToDataUrl(file, onProgress);
  }
  requireCompatibilityKey(apiKey);
  return upstream.uploadFile(apiKey, file, onProgress);
}

export async function getUserBalance(apiKey) {
  if (!apiKey || apiKey === PRIVACY_SENTINEL) return { balance: null };
  return upstream.getUserBalance(apiKey);
}

// Explicit compatibility-only exports take precedence over `export *` above.
// Keeping the guard here means existing studio imports do not need to know
// about the temporary sentinel implementation.
export const decomposeLayers = compatibilityCall('decomposeLayers');
export const upscaleImage = compatibilityCall('upscaleImage');
export const removeBackground = compatibilityCall('removeBackground');
export const expandImage = compatibilityCall('expandImage');
export const generateMarketingStudioAd = compatibilityCall('generateMarketingStudioAd');
export const processV2V = compatibilityCall('processV2V');
export const processRecast = compatibilityCall('processRecast');
export const processLipSync = compatibilityCall('processLipSync');
export const generateAudio = compatibilityCall('generateAudio');

export const getTemplateWorkflows = compatibilityCall('getTemplateWorkflows');
export const getUserWorkflows = compatibilityCall('getUserWorkflows');
export const getPublishedWorkflows = compatibilityCall('getPublishedWorkflows');
export const createWorkflow = compatibilityCall('createWorkflow');
export const updateWorkflowName = compatibilityCall('updateWorkflowName');
export const deleteWorkflow = compatibilityCall('deleteWorkflow');
export const getWorkflowInputs = compatibilityCall('getWorkflowInputs');
export const executeWorkflow = compatibilityCall('executeWorkflow');
export const getAllNodeSchemas = compatibilityCall('getAllNodeSchemas');
export const getWorkflowData = compatibilityCall('getWorkflowData');

export const getTemplateAgents = compatibilityCall('getTemplateAgents');
export const getUserAgents = compatibilityCall('getUserAgents');
export const getPublishedAgents = compatibilityCall('getPublishedAgents');
export const getUserConversations = compatibilityCall('getUserConversations');
export const getAgentBySlug = compatibilityCall('getAgentBySlug');
export const getAgentConversation = compatibilityCall('getAgentConversation');
export const sendAgentChatMessage = compatibilityCall('sendAgentChatMessage');
export const pollAgentChatResult = compatibilityCall('pollAgentChatResult');
export const createAgent = compatibilityCall('createAgent');
