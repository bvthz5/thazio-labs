'use client';

import React from 'react';
import { motion, Variants } from 'motion/react';
import GlassButton from '../ui/GlassButton';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const lineContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // 30ms character stagger
    },
  },
};

const characterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: '50%', 
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface HeroContentProps {
  active?: boolean;
}

export default function HeroContent({ active = true }: HeroContentProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      if (typeof window !== 'undefined' && 'lenis' in window && (window as unknown as { lenis: { scrollTo: (el: HTMLElement, opts: unknown) => void } }).lenis) {
        (window as unknown as { lenis: { scrollTo: (el: HTMLElement, opts: unknown) => void } }).lenis.scrollTo(element, {
          offset: -80,
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navHeight,
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
      animate={active ? "visible" : "hidden"}
      style={{ maxWidth: '900px' }}
    >
      <motion.h1 
        className="hero-title" 
        style={{ margin: 0, padding: 0 }}
        variants={lineContainerVariants}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        <span className="hero-title-line" style={{ display: 'block', marginBottom: '8px' }}>
          {"Building Intelligent Systems".split('').map((char, index) => (
            <motion.span key={index} variants={characterVariants} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
              {char}
            </motion.span>
          ))}
        </span>
        <span className="hero-title-line gradient" style={{ display: 'block', marginBottom: '24px' }}>
          {"For Modern Enterprises".split('').map((char, index) => (
            <motion.span key={index} variants={characterVariants} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
              {char}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        variants={itemVariants}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        style={{ 
          fontSize: 'var(--text-lg)', 
          color: 'rgba(255, 255, 255, 0.85)', 
          maxWidth: '650px', 
          lineHeight: '1.7',
          marginBottom: 'var(--space-10)'
        }}
      >
        Software, AI, and automation solutions designed for innovation, efficiency, and sustainable growth.
      </motion.p>

      {/* Let's Talk CTA button */}
      <motion.div 
        className="hero-buttons" 
        variants={itemVariants}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      >
        <a
          href="#contact"
          onClick={(e) => handleScrollTo(e, 'contact')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 36px',
            fontSize: 'var(--text-base)',
            fontWeight: 700,
            color: 'var(--color-white)',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--color-neural-violet), var(--color-electric-blue))',
            boxShadow: '0 4px 20px rgba(123, 47, 190, 0.4)',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(123, 47, 190, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(123, 47, 190, 0.4)';
          }}
        >
          Let's Talk →
        </a>
      </motion.div>
    </motion.div>
  );
}
