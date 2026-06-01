'use client';

import React from 'react';
import HeroContent from './HeroContent';

export default function HeroSection() {
  return (
    <section id="hero" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
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
          zIndex: 0,
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="hero-inner">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
