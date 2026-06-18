'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassButton from '@/components/ui/GlassButton';

export default function ContactPage() {
  return (
    <div style={{ background: '#070A13', minHeight: '100vh', paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-24)', position: 'relative' }}>
      {/* Decorative background world map grid */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.03,
          pointerEvents: 'none', zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '50vh',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(123, 47, 190, 0.08), transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: 'var(--space-8)' }}>
          <motion.div
            className="contact-luxury-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              boxShadow: 'var(--shadow-xl), 0 0 60px rgba(0, 102, 255, 0.08)'
            }}
          >
            {/* Gradient top accent */}
            <div className="contact-card-accent" />

            <div className="contact-luxury-inner">
              <SectionHeading
                overline="LET'S CONNECT"
                title="Let's Build Intelligent Systems Together"
                description="Collaborating with businesses, educational institutions, organizations, communities and innovators worldwide."
                centered
                light
              />

              {/* Grid with Email actions and info */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: 'var(--space-8)',
                  marginTop: 'var(--space-10)',
                  marginBottom: 'var(--space-10)'
                }}
              >
                {/* Consultation Card */}
                <div 
                  className="glass-card-dark"
                  style={{
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    padding: 'var(--space-6)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '220px'
                  }}
                >
                  <div>
                    <div 
                      style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: 'rgba(0, 102, 255, 0.1)',
                        border: '1px solid rgba(0, 102, 255, 0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#3388FF', margin: '0 auto var(--space-4) auto'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <h4 style={{ color: 'var(--color-white)', marginBottom: '8px', fontSize: 'var(--text-lg)' }}>Consultation</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      Schedule a dedicated engineering kickoff review with our specialists.
                    </p>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <GlassButton
                      variant="neural"
                      href="mailto:info@thazio.com?subject=Consultation%20Request"
                      style={{ width: '100%', padding: '12px 24px', fontSize: 'var(--text-sm)' }}
                    >
                      Request Session
                    </GlassButton>
                  </div>
                </div>

                {/* Direct Inquiries */}
                <div 
                  className="glass-card-dark"
                  style={{
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    padding: 'var(--space-6)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '220px'
                  }}
                >
                  <div>
                    <div 
                      style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: 'rgba(123, 47, 190, 0.1)',
                        border: '1px solid rgba(123, 47, 190, 0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#9B5FDE', margin: '0 auto var(--space-4) auto'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <h4 style={{ color: 'var(--color-white)', marginBottom: '8px', fontSize: 'var(--text-lg)' }}>Direct Email</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      Send us general proposals, career queries, or partnership opportunities.
                    </p>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <GlassButton
                      variant="secondary"
                      href="mailto:info@thazio.com"
                      style={{ width: '100%', padding: '12px 24px', fontSize: 'var(--text-sm)', color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.15)' }}
                    >
                      Write to Us
                    </GlassButton>
                  </div>
                </div>
              </div>

              {/* Status and Active Indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: 'var(--text-sm)' }}>
                  Or email directly at: <a href="mailto:info@thazio.com" style={{ color: 'var(--color-soft-cyan)', textDecoration: 'none', fontWeight: 600 }}>info@thazio.com</a>
                </div>
                
                <motion.div
                  className="contact-status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  <span className="contact-status-dot" />
                  Available for new projects
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
