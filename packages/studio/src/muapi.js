import * as upstream from './upstreamMuapi.js';
import { PRIVACY_SENTINEL, isPrivacyModelId, privacyApi } from './privacyApi.js';
import { isPrivacyVideoModelId, privacyVideoApi } from './privacyVideoApi.js';
import {
  requireCompatibilityKey,
  shouldKeepReferenceUploadLocal,
} from './compatibilityAuth.js';

export * from './upstreamMuapi.js';

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

export function uploadFile(apiKey, file, onProgress, targetModelId = null) {
  // Direct BYOK image references stay in the browser as data URLs even when a
  // real MuAPI compatibility key also exists. This keeps routing tied to the
  // selected model instead of treating the session's broadest credential as
  // permission to upload a direct-provider reference to the compatibility
  // backend. BYOK-only non-image uploads still belong to unported tools and
  // therefore fail with the explicit compatibility-key message.
  if (shouldKeepReferenceUploadLocal(apiKey, targetModelId, file?.type)) {
    return privacyApi.fileToDataUrl(file, onProgress);
  }
  if (apiKey === PRIVACY_SENTINEL) {
    requireCompatibilityKey(apiKey);
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
export const runClipping = compatibilityCall('runClipping');
export const runMotionGraphics = compatibilityCall('runMotionGraphics');
export const runMotionGraphicsEdit = compatibilityCall('runMotionGraphicsEdit');

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
export const getNodeSchemas = compatibilityCall('getNodeSchemas');
export const runSingleNode = compatibilityCall('runSingleNode');
export const deleteNodeRun = compatibilityCall('deleteNodeRun');
export const getNodeStatus = compatibilityCall('getNodeStatus');

export const getTemplateAgents = compatibilityCall('getTemplateAgents');
export const getUserAgents = compatibilityCall('getUserAgents');
export const getPublishedAgents = compatibilityCall('getPublishedAgents');
export const getUserConversations = compatibilityCall('getUserConversations');
export const getAgentBySlug = compatibilityCall('getAgentBySlug');
export const getAgentConversation = compatibilityCall('getAgentConversation');
export const sendAgentChatMessage = compatibilityCall('sendAgentChatMessage');
export const pollAgentChatResult = compatibilityCall('pollAgentChatResult');
export const createAgent = compatibilityCall('createAgent');

export const calculateDynamicCost = compatibilityCall('calculateDynamicCost');
export const registerAppInterest = compatibilityCall('registerAppInterest');
export const getAppInterests = compatibilityCall('getAppInterests');
export const getHistory = compatibilityCall('getHistory');
export const deleteMedia = compatibilityCall('deleteMedia');
