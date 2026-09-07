"use client";

import './privacyModelsBootstrap.js';
import './privacyVideoModelsBootstrap.js';
import { withCompatibilityStudio } from './components/CompatibilityStudioGate.jsx';

import ClippingStudioComponent from './components/ClippingStudio';
import VibeMotionStudioComponent from './components/VibeMotionStudio';
import LipSyncStudioComponent from './components/LipSyncStudio';
import RecastStudioComponent from './components/RecastStudio';
import CinemaStudioComponent from './components/CinemaStudio';
import AudioStudioComponent from './components/AudioStudio';
import MarketingStudioComponent from './components/MarketingStudio';
import WorkflowStudioComponent from './components/WorkflowStudio';
import AgentStudioComponent from './components/AgentStudio';
import DesignAgentStudioComponent from './components/DesignAgentStudio';
import AiInfluencerStudioComponent from './components/AiInfluencerStudio';
import LayersStudioComponent from './components/LayersStudio';

export { default as ImageStudio } from './components/ImageStudio';
export { default as VideoStudio } from './components/VideoStudio';

export const ClippingStudio = withCompatibilityStudio(ClippingStudioComponent, 'AI Clipping');
export const VibeMotionStudio = withCompatibilityStudio(VibeMotionStudioComponent, 'Vibe Motion');
export const LipSyncStudio = withCompatibilityStudio(LipSyncStudioComponent, 'Lip Sync');
export const RecastStudio = withCompatibilityStudio(RecastStudioComponent, 'Recast Studio');
export const CinemaStudio = withCompatibilityStudio(CinemaStudioComponent, 'Cinema Studio');
export const AudioStudio = withCompatibilityStudio(AudioStudioComponent, 'Audio Studio');
export const MarketingStudio = withCompatibilityStudio(MarketingStudioComponent, 'Marketing Studio');
export const WorkflowStudio = withCompatibilityStudio(WorkflowStudioComponent, 'Workflows');
export const AgentStudio = withCompatibilityStudio(AgentStudioComponent, 'Agents');
export const DesignAgentStudio = withCompatibilityStudio(DesignAgentStudioComponent, 'Design Agent');
export const AiInfluencerStudio = withCompatibilityStudio(AiInfluencerStudioComponent, 'AI Influencer Studio');
export const LayersStudio = withCompatibilityStudio(LayersStudioComponent, 'Layers Studio');

// Informational/discovery surfaces remain available without a compatibility key.
export { default as AppsStudio } from './components/AppsStudio';
export { default as McpCliStudio } from './components/McpCliStudio';

export * from './muapi';
