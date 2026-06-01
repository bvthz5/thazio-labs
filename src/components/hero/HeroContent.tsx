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
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function HeroContent() {
  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      if (typeof window !== 'undefined' && 'lenis' in window && (window as unknown as { lenis: { scrollTo: (el: HTMLElement, opts: unknown) => void } }).lenis) {
        (window as unknown as { lenis: { scrollTo: (el: HTMLElement, opts: unknown) => void } }).lenis.scrollTo(element, {
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
      {/* Main Title — 3 lines */}
      <h1 className="hero-title">
        <motion.span className="hero-title-line" variants={itemVariants}>
          THE WORLD&apos;S FIRST
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
          FULLY AUTOMATED
        </motion.span>
        <motion.span className="hero-title-line" variants={itemVariants}>
          COMPANY
        </motion.span>
      </h1>

      {/* Subtitle */}
      <motion.p className="hero-subtitle" variants={itemVariants}>
        Replace manual operations with intelligent agent networks. Thazio runs your workflows, manages data, and scales infrastructure without human intervention.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div className="hero-buttons" variants={itemVariants}>
        <GlassButton
          variant="primary"
          href="#services"
          onClick={(e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => handleScrollTo(e, 'services')}
        >
          Explore Services
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </GlassButton>
        <GlassButton
          variant="secondary"
          href="#company"
          onClick={(e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => handleScrollTo(e, 'company')}
        >
          Meet the Team
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </GlassButton>
      </motion.div>
    </motion.div>
  );
}
