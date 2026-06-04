'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import HeroContent from './HeroContent';

interface HeroSectionProps {
  active?: boolean;
}

export default function HeroSection({ active = true }: HeroSectionProps) {
  // Motion values for normalized mouse positions (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for buttery smooth mouse response
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // Map mouse positions to 3D rotation and translation offsets
  const x = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const y = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]); // Tilt forward/backward
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);  // Tilt left/right

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

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = (clientX / innerWidth) - 0.5;
    const normalizedY = (clientY / innerHeight) - 0.5;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section 
      id="hero" 
      className="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Base Dotted World Map Background (faint) */}
      <div className="hero-map-bg" />

      {/* Interactive Glowing Spotlight Map Overlay (follows cursor) */}
      <div 
        className="hero-map-glow"
        style={{
          WebkitMaskImage: `radial-gradient(circle 220px at ${mouseCoords.x}px ${mouseCoords.y}px, black 20%, transparent 100%)`,
          maskImage: `radial-gradient(circle 220px at ${mouseCoords.x}px ${mouseCoords.y}px, black 20%, transparent 100%)`,
          opacity: isHovered ? 0.85 : 0,
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
          zIndex: 0,
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="hero-grid">
          <div className="hero-left">
            <HeroContent active={active} />
          </div>
          <div className="hero-right">
            <motion.div 
              className="hero-image-wrapper"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <div className="hero-image-glow" />
              <motion.div 
                className="hero-image-container"
                style={{
                  x,
                  y,
                  rotateX,
                  rotateY,
                }}
              >
                <motion.div
                  style={{ width: '100%', height: '100%' }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img 
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/hero_network.png`} 
                    alt="Futuristic Neural AI Network" 
                    className="hero-image"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
