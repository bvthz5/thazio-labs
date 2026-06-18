'use client';

import React from 'react';
import { motion } from 'motion/react';
import HeroContent from './HeroContent';

interface HeroSectionProps {
  active?: boolean;
}

export default function HeroSection({ active = true }: HeroSectionProps) {
  // Mouse coords for background neon glow spotlight
  const [mouseCoords, setMouseCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    
    // Get mouse coordinates relative to the hero section element
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    setMouseCoords({ x: relativeX, y: relativeY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined' || e.touches.length === 0) return;
    
    // Get touch coordinates relative to the hero section element
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const relativeX = touch.clientX - rect.left;
    const relativeY = touch.clientY - rect.top;
    
    setMouseCoords({ x: relativeX, y: relativeY });
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
      {/* Base Dotted World Map Background (faint) */}
      <div 
        className="hero-map-bg" 
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/world_map_dots.png')`
        }}
      />

      {/* Interactive Glowing Spotlight Map Overlay (follows cursor) */}
      <div 
        className="hero-map-glow"
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/world_map_dots.png')`,
          WebkitMaskImage: `radial-gradient(circle 220px at ${mouseCoords.x}px ${mouseCoords.y}px, black 20%, transparent 100%)`,
          maskImage: `radial-gradient(circle 220px at ${mouseCoords.x}px ${mouseCoords.y}px, black 20%, transparent 100%)`,
          opacity: isHovered ? 0.28 : 0,
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
          backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(0, 102, 255, 0.07), transparent 60%), radial-gradient(circle at 25% 70%, rgba(123, 47, 190, 0.04), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="hero-inner" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '900px' }}>
          <HeroContent active={active} />
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
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
