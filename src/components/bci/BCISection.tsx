'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { CAPABILITIES } from '@/lib/constants';

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const iconAccents = [
  { bg: 'rgba(0, 102, 255, 0.12)', border: 'rgba(0, 102, 255, 0.25)', glow: '0 0 24px rgba(0, 102, 255, 0.15)' },
  { bg: 'rgba(123, 47, 190, 0.12)', border: 'rgba(123, 47, 190, 0.25)', glow: '0 0 24px rgba(123, 47, 190, 0.15)' },
  { bg: 'rgba(0, 212, 255, 0.12)', border: 'rgba(0, 212, 255, 0.25)', glow: '0 0 24px rgba(0, 212, 255, 0.15)' },
];

export default function BCISection() {
  return (
    <section id="capabilities" className="bci-section section-dark">
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(0, 102, 255, 0.08) 0%, transparent 55%),
            radial-gradient(circle at 80% 70%, rgba(123, 47, 190, 0.06) 0%, transparent 55%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="bci-inner" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="CORE CAPABILITIES"
          title={'Intelligent Automation\nAt Every Layer'}
          description="Our autonomous agent platform handles every layer of your operations — from individual task execution to cross-system orchestration and continuous self-improvement."
          centered
          light
        />

        {/* Capabilities Grid */}
        <div className="bci-features">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="bci-feature-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12 }}
              style={{ cursor: 'default', position: 'relative', overflow: 'hidden' }}
            >
              {/* Gradient top-line accent on hover (via CSS ::after if available, or inline) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'var(--gradient-neural)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                }}
                className="capability-card-accent"
              />

              {/* Large Icon */}
              <div
                className="bci-feature-icon"
                style={{
                  width: '64px',
                  height: '64px',
                  fontSize: '2rem',
                  background: iconAccents[i].bg,
                  border: `1px solid ${iconAccents[i].border}`,
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: iconAccents[i].glow,
                  marginBottom: 'var(--space-6)',
                }}
              >
                {cap.icon}
              </div>

              {/* Title */}
              <h4>{cap.title}</h4>

              {/* Description */}
              <p style={{ lineHeight: 1.7 }}>{cap.description}</p>

              {/* Explore link */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginTop: 'var(--space-6)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-electric-blue-light)',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease, gap 0.3s ease',
                }}
              >
                Explore capability
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
