'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';
import { CASE_STUDIES } from '@/lib/constants';

const tagColors: Record<string, string> = {
  Education: '#0066FF',
  AI: '#7B2FBE',
  Automation: '#00D4FF',
  'Multi-Agent': '#9B5FDE',
  Research: '#3388FF',
  Media: '#00D4FF',
  NLP: '#7B2FBE',
  Innovation: '#0066FF',
  Autonomous: '#00D4FF',
};

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="case-studies-section section section-dark">
      {/* Background glow */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(0, 102, 255, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(123, 47, 190, 0.04) 0%, transparent 50%)
          `,
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="CASE STUDIES"
          title={"Solutions That\nDrive Results"}
          description="Real projects, real impact. Explore how we've helped organizations solve complex challenges with intelligent technology."
          centered
          light
        />

        <div className="case-studies-grid">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/case-studies/${study.slug}/`}
                className="case-study-card glass-card-dark"
                style={{ display: 'block', textDecoration: 'none', height: '100%' }}
              >
                {/* Gradient accent */}
                <div className="case-study-accent" />

                {/* Tags */}
                <div className="case-study-tags">
                  {study.tags.map(tag => (
                    <span
                      key={tag}
                      className="case-study-tag"
                      style={{
                        background: `${tagColors[tag] || '#0066FF'}15`,
                        color: tagColors[tag] || '#0066FF',
                        border: `1px solid ${tagColors[tag] || '#0066FF'}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <h4 style={{ color: 'var(--color-white)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                  {study.title}
                </h4>
                <p style={{ color: 'var(--color-electric-blue-light)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                  {study.tagline}
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                  {study.description}
                </p>

                {/* Arrow link */}
                <div className="case-study-arrow">
                  View Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
