'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';
import { INDUSTRIES } from '@/lib/constants';

const industryImages: Record<string, string> = {
  education: '/images/industries/education_realistic_1781717358257.png',
  government: '/images/industries/telecom_realistic_1781717371981.png',
  organizations: '/images/industries/ecommerce_realistic_1781717398472.png',
  finance: '/images/industries/finance_realistic_1781717411260.png',
  retail: '/images/industries/retail_realistic_1781717327980.png',
  manufacturing: '/images/industries/utilities_realistic_1781717424222.png',
  media: '/images/industries/advertising_realistic_1781717344041.png',
  'research-institutions': '/images/industries/healthcare_realistic_1781717385399.png',
  'community-organizations': '/images/industries/community_nodes.png',
};

export default function IndustriesSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section id="industries" className="industries-section section section-dark">
      <div className="container">
        <SectionHeading
          overline="INDUSTRIES"
          title="Industries We Serve"
          description="Delivering intelligent technologies across diverse sectors."
          centered
          light
        />

        <div className="industries-grid">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: Math.min(i * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/industries/${ind.slug}/`}
                className="industry-card-link"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div 
                  className="industry-card"
                  style={{
                    position: 'relative',
                    transition: 'all 0.5s var(--ease-out-expo)',
                  }}
                >
                  {/* Background Image & Gradient overlay */}
                  <div
                    className="industry-card-bg"
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%', zIndex: 0,
                      overflow: 'hidden', borderRadius: 'inherit',
                      background: ind.gradient,
                      transition: 'transform 0.8s var(--ease-out-expo)',
                    }}
                  >
                    {industryImages[ind.slug] && (
                      <img
                        src={`${basePath}${industryImages[ind.slug]}`}
                        alt={ind.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.18, // Faint to show content cleanly
                          mixBlendMode: 'luminosity',
                          transition: 'transform 0.8s var(--ease-out-expo)',
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Hover glow overlay */}
                  <div 
                    className="industry-card-neural-overlay" 
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%', zIndex: 1,
                      background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.15), transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 0.5s ease',
                    }}
                  />
                  <div className="industry-card-overlay" style={{ zIndex: 1 }} />

                  <div className="industry-card-content" style={{ zIndex: 2 }}>
                    <h4>{ind.title}</h4>
                    <p style={{ marginTop: '4px' }}>{ind.description}</p>
                    <div className="industry-card-arrow" style={{ marginTop: '12px' }}>
                      Explore
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
