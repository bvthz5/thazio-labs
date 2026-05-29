'use client';

import React from 'react';
import { motion, Variants } from 'motion/react';
import GlassButton from '../ui/GlassButton';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Explicit coordinate tuple type
    },
  },
};

export default function HeroContent() {
  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.scrollTo(element, {
          offset: -72,
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        const navHeight = 72;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.div
      className="hero-content"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Overline Label */}
      <motion.div className="overline" variants={itemVariants}>
        The Future Neural Intelligence Platform
      </motion.div>

      {/* Titanium Main Typography */}
      <h1 className="hero-title">
        <motion.span className="hero-title-line" variants={itemVariants}>
          ENGINEERING
        </motion.span>
        <motion.span 
          className="hero-title-line gradient" 
          variants={itemVariants}
          style={{
            background: 'var(--gradient-text-neural)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 6s ease infinite',
            fontWeight: 700,
          }}
        >
          INTELLIGENT
        </motion.span>
        <motion.span className="hero-title-line" variants={itemVariants}>
          FUTURES
        </motion.span>
      </h1>

      {/* Subheading */}
      <motion.p className="hero-subtitle" variants={itemVariants}>
        Building autonomous AI systems, Brain-Computer Interfaces, enterprise automation platforms, and cognitive digital networks for global leaders.
      </motion.p>

      {/* Actions */}
      <motion.div className="hero-buttons" variants={itemVariants}>
        <GlassButton 
          variant="primary" 
          href="#solutions"
          onClick={(e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => handleScrollTo(e, 'solutions')}
        >
          Explore Solutions
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </GlassButton>
        <GlassButton 
          variant="secondary" 
          href="#bci"
          onClick={(e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => handleScrollTo(e, 'bci')}
        >
          Watch Vision
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
        </GlassButton>
      </motion.div>
    </motion.div>
  );
}
