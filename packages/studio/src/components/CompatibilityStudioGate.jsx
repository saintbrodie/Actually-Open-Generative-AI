"use client";

import React from "react";
import { hasCompatibilityKey } from "../compatibilityAuth.js";

export function withCompatibilityStudio(Component, label) {
  function CompatibilityStudio(props) {
    if (hasCompatibilityKey(props?.apiKey)) {
      return <Component {...props} />;
    }

    return (
      <div className="flex h-full min-h-[60vh] w-full items-center justify-center bg-black px-6">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#22d3ee]/15 bg-[#22d3ee]/5 text-[#22d3ee]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            {label} needs a compatibility key
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/45">
            This studio has not been ported to the direct Venice/OpenRouter BYOK adapters yet.
            Add a MuAPI compatibility key in Settings to use it. Your Venice and OpenRouter keys
            remain separate and are used only by directly supported provider models.
          </p>
          <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 text-left text-xs leading-5 text-white/40">
            Direct BYOK is currently available in Image Studio and supported Video Studio models.
            Compatibility-only requests are blocked locally when no MuAPI key is configured.
          </div>
        </div>
      </div>
    );
  }

  CompatibilityStudio.displayName = `CompatibilityGate(${label})`;
  return CompatibilityStudio;
}
