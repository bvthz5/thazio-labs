'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';

export default function ServicesSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section id="services" className="services-section section section-dark" style={{ background: '#070A13', padding: 'var(--space-32) 0' }}>
      {/* Decorative gradient backdrops */}
      <div
        style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.02), transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(123, 47, 190, 0.02), transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading matching Screenshot 5 */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-24)' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontSize: 'clamp(2rem, 1.5rem + 3vw, 3.8rem)', 
              fontWeight: 800,
              background: 'linear-gradient(90deg, #00D4FF, #0066FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--space-4)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}
          >
            Your Path to Digital Advantage
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontSize: 'var(--text-lg)', 
              color: 'var(--color-mist)', 
              fontWeight: 500,
              maxWidth: '750px',
              margin: '0 auto'
            }}
          >
            Strategy, Data, AI and Cloud Solutions that Scale Your Business.
          </motion.p>
        </div>

        {/* List of Alternating Services Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                variants={{
                  initial: {},
                  hover: {}
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '24px',
                  padding: 'var(--space-8)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                  borderColor: 'rgba(0, 102, 255, 0.25)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.45)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }}
                className={`service-row-card ${!isEven ? 'reverse' : ''}`}
              >
                {/* Visual Image container (Alternates placement) */}
                <div 
                  style={{ 
                    order: isEven ? 1 : 2, 
                    position: 'relative', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    aspectRatio: '16/10',
                    width: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                  className="service-card-image-wrapper"
                >
                  <motion.img
                    src={`${basePath}${service.image}`}
                    alt={service.title}
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    initial="initial"
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Subtle visual ambient overlay */}
                  <div 
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(180deg, transparent 60%, rgba(7, 10, 19, 0.4) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>

                {/* Text Copy container (Alternates placement) */}
                <div 
                  style={{ 
                    order: isEven ? 2 : 1, 
                    padding: 'var(--space-4) var(--space-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                  className="service-card-text-wrapper"
                >
                  <h3 
                    style={{ 
                      fontSize: 'var(--text-2xl)', 
                      fontWeight: 700, 
                      color: 'var(--color-white)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-base)', 
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.8,
                      marginBottom: 'var(--space-6)',
                      fontWeight: 400
                    }}
                  >
                    {service.description}
                  </p>

                  <div>
                    <Link 
                      href={`/services/${service.slug}/`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--color-white)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'color 0.3s ease'
                      }}
                      className="service-card-link"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-soft-cyan)';
                        const arrow = e.currentTarget.querySelector('span');
                        if (arrow) arrow.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-white)';
                        const arrow = e.currentTarget.querySelector('span');
                        if (arrow) arrow.style.transform = 'none';
                      }}
                    >
                      Learn More 
                      <span style={{ transition: 'transform 0.3s var(--ease-out-expo)' }}>→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
