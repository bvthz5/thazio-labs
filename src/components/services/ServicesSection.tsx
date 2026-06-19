'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import LightBackgroundAnimation from '../ui/LightBackgroundAnimation';

export default function ServicesSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const CARD_COLORS = [
    '#E3ECFF', // Deeper Light Blue/Indigo
    '#EFE6FF', // Deeper Light Purple
    '#FFEDE3', // Deeper Light Peach
    '#E3FFF0', // Deeper Light Mint
    '#E3F7FF', // Deeper Light Cyan
    '#FFE6E6', // Deeper Light Rose
  ];

  return (
    <section id="services" className="services-section section" style={{ background: '#FFFFFF', padding: 'var(--space-32) 0', position: 'relative' }}>
      <LightBackgroundAnimation />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading matching Screenshot 5 */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-24)' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontSize: 'clamp(2rem, 1.5rem + 3vw, 3.8rem)', 
              fontWeight: 800,
              background: 'linear-gradient(90deg, #0055FF, #0022AA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--space-4)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}
          >
            Enterprise Architecture at Scale
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontSize: 'var(--text-lg)', 
              color: '#4B5563', 
              fontWeight: 500,
              maxWidth: '750px',
              margin: '0 auto'
            }}
          >
            Intelligent systems and proprietary architectures designed for global impact.
          </motion.p>
        </div>

        {/* List of Alternating Services Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                variants={{
                  initial: {},
                  hover: {}
                }}
                style={{
                  background: CARD_COLORS[index % CARD_COLORS.length],
                  border: '2px solid #FFFFFF',
                  borderRadius: '24px',
                  padding: 'var(--space-8)',
                  position: 'sticky',
                  top: `calc(120px + ${index * 40}px)`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                  zIndex: index + 10,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                  borderColor: 'rgba(0, 102, 255, 0.15)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                  filter: 'brightness(0.98)',
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
                    border: '1px solid rgba(0, 0, 0, 0.05)'
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
                      background: 'linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.1) 100%)',
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
                      color: '#070A13',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-base)', 
                      color: '#4B5563',
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
                        color: '#0066FF',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'color 0.3s ease'
                      }}
                      className="service-card-link"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0044CC';
                        const arrow = e.currentTarget.querySelector('span');
                        if (arrow) arrow.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#0066FF';
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
