'use client';

import React from 'react';
import HeroContent from './HeroContent';
import SceneWrapper from '../three/SceneWrapper';

interface HeroSectionProps {
  active?: boolean;
}

export default function HeroSection({ active = true }: HeroSectionProps) {
  return (
    <section id="hero" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 3D Immersive Full-Screen Background Neural Core */}
      {/* Positioned strictly below the header area (top: var(--nav-height)) to avoid overlap conflicts */}
      <div 
        style={{
          position: 'absolute',
          top: 'var(--nav-height)',
          left: 0,
          width: '100%',
          height: 'calc(100% - var(--nav-height))',
          zIndex: 1,
          pointerEvents: 'none', // Allows clicking on text & buttons underneath
        }}
      >
        {active && <SceneWrapper />}
      </div>

      {/* Premium background mesh overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(0, 102, 255, 0.05), transparent 60%), radial-gradient(circle at 25% 70%, rgba(123, 47, 190, 0.03), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="hero-inner" style={{ gridTemplateColumns: '1fr', display: 'block', maxWidth: '800px', margin: '0' }}>
          {/* Left Side Content - Floating above background 3D */}
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
