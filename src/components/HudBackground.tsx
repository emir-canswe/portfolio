'use client';

import React from 'react';

export default function HudBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep base cyber-grid */}
      <div className="absolute inset-0 cyber-grid opacity-75" />

      {/* Top ambient cyan radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl" />

      {/* Side subtle violet nebula glow */}
      <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[128px]" />

      {/* Bottom left subtle electric blue glow */}
      <div className="absolute bottom-1/4 -left-48 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[128px]" />

      {/* Subtle scanline bar */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scanline" />
    </div>
  );
}
