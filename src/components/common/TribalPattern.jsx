import React from 'react';

// Modern, respectful geometric accents inspired by indigenous weaving motifs
export function TribalDivider({ className = '' }) {
  return (
    <div className={`tribal-divider flex items-center justify-center my-6 opacity-35 ${className}`} style={{ height: '14px', overflow: 'hidden' }}>
      <svg width="100%" height="14" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tribal-chevron-pattern" width="36" height="14" patternUnits="userSpaceOnUse">
            <path
              d="M0 7 L9 0 L18 7 L27 14 L36 7"
              fill="none"
              stroke="var(--color-terracotta)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="18" cy="7" r="1.5" fill="var(--color-deep-forest)" />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#tribal-chevron-pattern)" />
      </svg>
    </div>
  );
}

export function TribalPassportAccent() {
  return (
    <div className="tribal-passport-accent" style={{ height: '6px', width: '100%', overflow: 'hidden' }}>
      <svg width="100%" height="6" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="passport-motif" width="24" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 6 L12 0 L24 6 Z" fill="var(--color-terracotta)" opacity="0.8" />
            <circle cx="12" cy="4" r="1" fill="#FFFFFF" />
          </pattern>
        </defs>
        <rect width="100%" height="6" fill="url(#passport-motif)" />
      </svg>
    </div>
  );
}

export function TribalWatermark({ opacity = 0.04 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: opacity,
        zIndex: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, var(--color-terracotta) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    />
  );
}
