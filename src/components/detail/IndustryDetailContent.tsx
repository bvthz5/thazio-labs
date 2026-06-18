'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { INDUSTRIES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassButton from '@/components/ui/GlassButton';

interface IndustryDetailContentProps {
  slug: string;
}

export default function IndustryDetailContent({ slug }: IndustryDetailContentProps) {
  const industry = INDUSTRIES.find(ind => ind.slug === slug);

  if (!industry) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <h1 style={{ color: '#fff' }}>Industry not found</h1>
      </div>
    );
  }

  const detail = industry.detail;

  return (
    <>
      {/* Hero */}
      <section className="detail-hero">
        <div
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(123, 47, 190, 0.08), transparent 60%), radial-gradient(circle at 30% 70%, rgba(0, 102, 255, 0.05), transparent 60%)',
            pointerEvents: 'none', zIndex: 1,
          }}
        />
        <div className="detail-hero-inner" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/#industries" className="detail-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Back to Industries
            </Link>
          </motion.div>
          <motion.div className="overline" style={{ justifyContent: 'center', color: 'var(--color-electric-blue-light)', marginTop: 'var(--space-3)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>
            INDUSTRY
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {industry.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }} style={{ maxWidth: '750px', margin: '0 auto' }}>
            {detail.overview}
          </motion.p>
        </div>
      </section>

      {/* Challenges */}
      <section className="detail-section">
        <div className="container">
          <SectionHeading overline="CHALLENGES" title="Problems We Solve" centered />
          <ul className="detail-list" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {detail.challenges.map((item, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solutions */}
      <section className="detail-section detail-section-alt">
        <div className="container">
          <SectionHeading overline="SOLUTIONS" title="How We Help" centered />
          <div className="detail-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {detail.solutions.map((sol, i) => (
              <motion.div key={i} className="detail-card glass-card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={{ color: 'var(--color-charcoal)', fontSize: 'var(--text-base)', margin: 0 }}>{sol}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="detail-section">
        <div className="container">
          <SectionHeading overline="BENEFITS" title="The Impact" centered />
          <div className="results-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {detail.benefits.map((benefit, i) => (
              <motion.div key={i} className="result-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="result-icon" style={{ background: 'var(--color-electric-blue-soft)', color: 'var(--color-electric-blue)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{ margin: 0 }}>{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {detail.faq && (
        <section className="detail-section detail-section-alt">
          <div className="container">
            <SectionHeading overline="FAQ" title="Industry FAQ" centered />
            <div style={{ maxWidth: '750px', margin: '0 auto' }}>
              {detail.faq.map((faq, i) => (
                <motion.div
                  key={i}
                  style={{ borderBottom: '1px solid var(--color-platinum)', padding: 'var(--space-6) 0' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <h5 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>{faq.question}</h5>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate)', lineHeight: 1.8, margin: 0 }}>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="detail-cta-section">
        <div className="detail-cta-inner">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            Transform Your {industry.title} Operations
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
            Let&apos;s discuss how intelligent technology can address your specific challenges.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <GlassButton variant="neural" href="/#contact">Schedule Consultation</GlassButton>
            <GlassButton variant="secondary" href="/#industries" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.2)' }}>
              View All Industries
            </GlassButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
