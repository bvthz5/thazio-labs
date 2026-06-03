'use client';

import React from 'react';
import { motion } from 'motion/react';
import HeroContent from './HeroContent';

interface HeroSectionProps {
  active?: boolean;
}

export default function HeroSection({ active = true }: HeroSectionProps) {
  return (
    <section id="hero" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Premium high-tech background grid with center-radial masking */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 0.35 } : { opacity: 0 }}
        transition={{ duration: 2.0, ease: 'easeOut', delay: 0.2 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.03) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0, 102, 255, 0.03) 1.5px, transparent 1.5px)',
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Expanding premium background mesh glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(0, 102, 255, 0.07), transparent 60%), radial-gradient(circle at 25% 70%, rgba(123, 47, 190, 0.04), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="hero-inner">
          <HeroContent active={active} />
        </div>
      </div>
    </section>
  );
}
