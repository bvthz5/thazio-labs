'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { INSIGHTS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassButton from '@/components/ui/GlassButton';

interface InsightDetailContentProps {
  slug: string;
}

export default function InsightDetailContent({ slug }: InsightDetailContentProps) {
  const article = INSIGHTS.find(art => art.slug === slug);

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <h1 style={{ color: '#fff' }}>Article not found</h1>
      </div>
    );
  }

  const detail = article.detail;
  
  // Find related articles by slug references
  const related = detail.relatedArticles
    .map(relSlug => INSIGHTS.find(item => item.slug === relSlug))
    .filter((item): item is NonNullable<typeof item> => !!item);

  return (
    <>
      {/* Hero */}
      <section className="detail-hero" style={{ background: 'var(--gradient-dark-section)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(123, 47, 190, 0.08), transparent 60%), radial-gradient(circle at 25% 70%, rgba(0, 102, 255, 0.06), transparent 60%)',
            pointerEvents: 'none', zIndex: 1,
          }}
        />
        <div className="detail-hero-inner" style={{ position: 'relative', zIndex: 2, padding: 'var(--space-16) clamp(1rem, 3vw, 4rem)' }}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/#insights" className="detail-back-link" style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Back to Insights
            </Link>
          </motion.div>
          
          <motion.div className="overline" style={{ justifyContent: 'center', color: 'var(--color-neural-violet-light)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>
            {article.tag.toUpperCase()}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              color: 'var(--color-white)', 
              fontSize: 'clamp(2rem, 1.5rem + 3.5vw, 4rem)', 
              lineHeight: 1.15,
              maxWidth: '850px',
              margin: '0 auto var(--space-6) auto'
            }}
          >
            {article.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 'var(--space-4)', 
              fontSize: 'var(--text-sm)', 
              color: 'rgba(255, 255, 255, 0.45)',
              fontWeight: 500
            }}
          >
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="detail-section" style={{ padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              fontSize: 'var(--text-lg)', 
              fontWeight: 500, 
              lineHeight: 1.7, 
              color: 'var(--color-charcoal)', 
              marginBottom: 'var(--space-8)'
            }}
          >
            {detail.introduction}
          </motion.div>

          {/* Main Content Paragraphs */}
          <div className="article-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
            {detail.mainContent.map((paragraph: string, idx: number) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                style={{ fontSize: 'var(--text-base)', color: 'var(--color-slate)', lineHeight: 1.8 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Highlights */}
          {detail.highlights && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'var(--color-electric-blue-soft)',
                borderLeft: '4px solid var(--color-electric-blue)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                padding: 'var(--space-8)',
                marginBottom: 'var(--space-12)'
              }}
            >
              <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', color: 'var(--color-obsidian)' }}>Key Highlights</h4>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {detail.highlights.map((highlight: string, idx: number) => (
                  <li key={idx} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-graphite)', lineHeight: 1.6 }}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="detail-section detail-section-alt" style={{ padding: 'var(--space-16) 0' }}>
          <div className="container">
            <SectionHeading overline="RELATED ARTICLES" title="More Insights" centered />
            <div className="insights-grid" style={{ marginTop: 'var(--space-8)' }}>
              {related.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="insight-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}
                >
                  <Link href={`/insights/${item.slug}/`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <span className="insight-card-tag">{item.tag}</span>
                      <h4>{item.title}</h4>
                      <p style={{ marginTop: '8px', fontSize: 'var(--text-sm)' }}>
                        {item.description}
                      </p>
                    </div>

                    <div className="insight-card-meta">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                  </Link>
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
            Interested in what we do?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
            Let&apos;s talk about building intelligent, autonomous systems for your organization.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <GlassButton variant="neural" href="/#contact">Schedule Consultation</GlassButton>
            <GlassButton variant="secondary" href="/#insights" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.2)' }}>
              View All Insights
            </GlassButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
