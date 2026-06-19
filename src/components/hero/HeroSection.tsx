'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import HeroContent from './HeroContent';
import NeuralCanvasBg from './NeuralCanvasBg';

interface HeroSectionProps {
  active?: boolean;
}

export default function HeroSection({ active = true }: HeroSectionProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Luxury smooth spring physics for the spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 0.6 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 0.6 });

  // A larger, softer gradient for a premium diffusion effect
  const maskImage = useMotionTemplate`radial-gradient(circle 380px at ${smoothX}px ${smoothY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 30%, transparent 85%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined' || e.touches.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.touches[0].clientX - rect.left);
    mouseY.set(e.touches[0].clientY - rect.top);
    setIsHovered(true);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handleTouchMove(e);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  return (
    <section
      id="hero"
      className="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Interactive Neural Constellation Background Canvas */}
      <NeuralCanvasBg />

      {/* Interactive Glowing Spotlight Overlay (follows cursor) */}
      <motion.div
        className="hero-spotlight-glow"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.12) 0%, rgba(123, 47, 190, 0.08) 45%, rgba(255, 0, 127, 0.03) 75%, transparent 100%)',
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: isHovered ? 0.75 : 0,
          pointerEvents: 'none',
          zIndex: 3,
          mixBlendMode: 'screen',
          transition: 'opacity 0.5s ease',
        }}
      />

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
          backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(180, 30, 150, 0.09), transparent 60%), radial-gradient(circle at 25% 70%, rgba(90, 40, 220, 0.06), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="hero-grid">
          <div className="hero-left">
            <HeroContent active={active} />
          </div>
          {/* Image removed per user request */}
        </div>
      </div>



      {/* Floating Support chat bubble */}
      <a
        href="mailto:info@thazio.com"
        style={{
          position: 'fixed',
          right: '25px',
          bottom: '25px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#0F52BA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(15, 82, 186, 0.45)',
          color: '#fff',
          zIndex: 99,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {/* Notification Badge */}
        <span
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#FF0055',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #0F52BA'
          }}
        >
          1
        </span>
      </a>
    </section>
  );
}
