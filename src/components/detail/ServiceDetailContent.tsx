'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassButton from '@/components/ui/GlassButton';

interface ServiceDetailContentProps {
  slug: string;
}

export default function ServiceDetailContent({ slug }: ServiceDetailContentProps) {
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <h1 style={{ color: '#fff' }}>Service not found</h1>
      </div>
    );
  }

  const detail = service.detail;

  // Custom FAQ Accordion inside the detail page
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  const renderHero = () => (
    <section className="detail-hero">
      <div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(0, 102, 255, 0.08), transparent 60%), radial-gradient(circle at 25% 70%, rgba(123, 47, 190, 0.05), transparent 60%)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />
      <div className="detail-hero-inner" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href="/#services" className="detail-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Back to Services
          </Link>
        </motion.div>
        <motion.div className="overline" style={{ justifyContent: 'center', color: 'var(--color-electric-blue-light)', marginTop: 'var(--space-3)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>
          {service.title.toUpperCase()}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          {service.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }} style={{ maxWidth: '750px', margin: '0 auto' }}>
          {detail.heroSubtitle}
        </motion.p>
      </div>
    </section>
  );

  const renderFAQ = (faqItems: readonly { question: string; answer: string }[]) => (
    <section className="detail-section detail-section-alt">
      <div className="container">
        <SectionHeading overline="FAQ" title="Common Questions" centered />
        <div style={{ maxWidth: '750px', margin: '0 auto' }} className="faq-list">
          {faqItems.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <motion.div
                key={i}
                className="faq-item"
                style={{ borderBottom: '1px solid var(--color-platinum)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  className={`faq-question ${isOpen ? 'active' : ''}`}
                  onClick={() => toggleFaq(i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) 0', background: 'none', border: 'none', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{faq.question}</span>
                  <span style={{ fontSize: 'var(--text-lg)', marginLeft: 'var(--space-3)' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{ paddingBottom: 'var(--space-4)' }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate)', lineHeight: 1.8 }}>{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderCTA = () => (
    <section className="detail-cta-section">
      <div className="detail-cta-inner">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          Ready to Get Started?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
          Let&apos;s discuss how {service.title.toLowerCase()} can transform your organization.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <GlassButton variant="neural" href="/#contact">Schedule Consultation</GlassButton>
          <GlassButton variant="secondary" href="/#services" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.2)' }}>
            View All Services
          </GlassButton>
        </motion.div>
      </div>
    </section>
  );

  const renderContent = () => {
    return (
      <>
        {/* Capabilities */}
        {detail.capabilities && (
          <section className="detail-section">
            <div className="container">
              <SectionHeading overline="CAPABILITIES" title="What We Deliver" centered />
              <div className="detail-grid">
                {detail.capabilities.map((cap: any, i: number) => (
                  <motion.div
                    key={cap.title} className="detail-card glass-card"
                    initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>{cap.title}</h4>
                    <p style={{ fontSize: 'var(--text-sm)' }}>{cap.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technologies */}
        {detail.technologies && (
          <section className="detail-section detail-section-alt">
            <div className="container">
              <SectionHeading overline="TECHNOLOGY STACK" title="Technologies We Use" centered />
              <div className="tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
                {detail.technologies.map((tech: string, i: number) => (
                  <motion.span
                    key={tech} className="tech-tag"
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Development Process */}
        {detail.process && (
          <section className="detail-section">
            <div className="container">
              <SectionHeading overline="DEVELOPMENT PROCESS" title="How We Work" centered />
              <div className="process-timeline" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {detail.process.map((step: any, i: number) => (
                  <motion.div
                    key={step.step} className="process-step"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="process-step-number" style={{ background: 'var(--gradient-neural)', color: '#fff' }}>{i + 1}</div>
                    <div className="process-step-content">
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>{step.step}</h4>
                      <p style={{ fontSize: 'var(--text-sm)' }}>{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {detail.faq && renderFAQ(detail.faq)}
      </>
    );
  };

  return (
    <>
      {renderHero()}
      {renderContent()}
      {renderCTA()}
    </>
  );
}
