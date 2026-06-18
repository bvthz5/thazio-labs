'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { CASE_STUDIES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassButton from '@/components/ui/GlassButton';

interface CaseStudyDetailContentProps {
  slug: string;
}

export default function CaseStudyDetailContent({ slug }: CaseStudyDetailContentProps) {
  const study = CASE_STUDIES.find(cs => cs.slug === slug);

  if (!study) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <h1 style={{ color: '#fff' }}>Case study not found</h1>
      </div>
    );
  }

  const detail = study.detail;

  return (
    <>
      {/* Hero */}
      <section className="detail-hero">
        <div
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: 'radial-gradient(circle at 40% 30%, rgba(0, 212, 255, 0.06), transparent 50%), radial-gradient(circle at 70% 60%, rgba(123, 47, 190, 0.06), transparent 50%)',
            pointerEvents: 'none', zIndex: 1,
          }}
        />
        <div className="detail-hero-inner" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/#case-studies" className="detail-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Back to Case Studies
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}
            style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
            {study.tags.map(tag => (
              <span key={tag} style={{
                padding: '4px 14px', borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)', fontWeight: 600,
                background: 'rgba(0, 102, 255, 0.15)', color: 'var(--color-electric-blue-light)',
              }}>
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {study.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontSize: 'var(--text-xl)', color: 'var(--color-electric-blue-light)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
            {study.tagline}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            {study.description}
          </motion.p>
        </div>
      </section>

      {/* Challenge */}
      <section className="detail-section">
        <div className="container">
          <SectionHeading overline="THE CHALLENGE" title="What We Set Out to Solve" centered />
          <motion.div
            style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-graphite)' }}>
              {detail.challenge}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="detail-section detail-section-alt">
        <div className="container">
          <SectionHeading overline="OUR APPROACH" title="How We Built It" centered />
          <motion.div
            style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-graphite)' }}>
              {detail.approach}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technologies */}
      <section className="detail-section">
        <div className="container">
          <SectionHeading overline="TECHNOLOGY" title="Built With" centered />
          <div className="tech-tags">
            {detail.technologies.map((tech, i) => (
              <motion.span
                key={tech} className="tech-tag"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="detail-section detail-section-alt">
        <div className="container">
          <SectionHeading overline="RESULTS" title="What We Achieved" centered />
          <div className="results-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {detail.results.map((result, i) => (
              <motion.div key={i} className="result-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="result-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p>{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="detail-cta-section">
        <div className="detail-cta-inner">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            Have a Similar Challenge?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
            Let&apos;s explore how we can build an intelligent solution for your organization.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <GlassButton variant="neural" href="/#contact">Schedule Consultation</GlassButton>
            <GlassButton variant="secondary" href="/#case-studies" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.2)' }}>
              View All Case Studies
            </GlassButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
