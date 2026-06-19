'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import GlassButton from '../ui/GlassButton';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section-new section section-dark" style={{ background: '#070A13' }}>
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute', top: '-10%', right: '-20%',
          width: '800px', height: '800px', borderRadius: '50%',
          border: '1px solid rgba(0, 102, 255, 0.04)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: '-10%', left: '-15%',
          width: '600px', height: '600px', borderRadius: '50%',
          border: '1px solid rgba(123, 47, 190, 0.03)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="contact-luxury-card"
          initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(145deg, rgba(20, 24, 36, 0.9) 0%, rgba(10, 14, 26, 0.95) 100%)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            borderRadius: '32px',
          }}
        >

          <div className="contact-luxury-inner">
            <SectionHeading
              overline="LET'S CONNECT"
              title="Ready to Accelerate Your Enterprise?"
              description="Schedule an executive consultation with our engineering architects to map your technical strategy."
              centered
              light
            />

            <div className="contact-buttons" style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <GlassButton
                variant="neural"
                href="mailto:info@thazio.com?subject=Consultation%20Request"
                style={{ padding: '16px 36px', fontSize: 'var(--text-base)' }}
              >
                Schedule Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </GlassButton>

              <GlassButton
                variant="secondary"
                href="mailto:info@thazio.com"
                style={{ padding: '16px 36px', fontSize: 'var(--text-base)' }}
              >
                Contact Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </GlassButton>
            </div>

            {/* Email Address Link */}
            <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
              <a 
                href="mailto:info@thazio.com" 
                style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-xl)', 
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF', 
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
              >
                info@thazio.com
              </a>
            </div>

            {/* Status indicator */}
            <motion.div
              className="contact-status"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="contact-status-dot" />
              Available for new projects
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
