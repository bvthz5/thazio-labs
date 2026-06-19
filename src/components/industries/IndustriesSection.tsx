'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';
import { INDUSTRIES } from '@/lib/constants';
import LightBackgroundAnimation from '../ui/LightBackgroundAnimation';

const industryImages: Record<string, string> = {
  retail: '/images/industries/retail_realistic_1781717327980.png',
  'advertising-media': '/images/industries/advertising_realistic_1781717344041.png',
  education: '/images/industries/education_realistic_1781717358257.png',
  telecommunication: '/images/industries/telecom_realistic_1781717371981.png',
  healthcare: '/images/industries/healthcare_realistic_1781717385399.png',
  'e-commerce': '/images/industries/ecommerce_realistic_1781717398472.png',
  finance: '/images/industries/finance_realistic_1781717411260.png',
  utilities: '/images/industries/utilities_realistic_1781717424222.png',
};

export default function IndustriesSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section id="industries" className="industries-section section" style={{ background: '#FFFFFF', position: 'relative' }}>
      <LightBackgroundAnimation />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="INDUSTRIES"
          title="Industries We Serve"
          description="Delivering intelligent technologies across diverse sectors."
          centered
        />

        <div className="industries-grid">
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard key={ind.slug} ind={ind} i={i} basePath={basePath} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({ ind, i, basePath }: { ind: typeof INDUSTRIES[number], i: number, basePath: string }) {
  return (
    <motion.div
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
        <motion.div 
          className="industry-card"
          initial="initial"
          whileHover="hover"
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
            }}
          >
            {industryImages[ind.slug] && (
              <motion.img
                src={`${basePath}${industryImages[ind.slug]}`}
                alt={ind.title}
                variants={{
                  initial: { scale: 1, x: '0%', y: '0%', filter: 'brightness(0.95)' },
                  hover: { 
                    scale: 1.15, 
                    x: ['0%', '-4%', '2%', '0%'], 
                    y: ['0%', '3%', '-2%', '0%'],
                    filter: 'brightness(1.05)',
                    transition: {
                      scale: { duration: 1.2, ease: "easeOut" },
                      filter: { duration: 1.2, ease: "easeOut" },
                      x: { duration: 25, repeat: Infinity, ease: "linear" },
                      y: { duration: 25, repeat: Infinity, ease: "linear" }
                    }
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.9, 
                }}
              />
            )}
          </div>
          
          {/* Cinematic light sweep */}
          <motion.div 
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%', zIndex: 1,
              background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)',
              backgroundSize: '200% 200%',
            }}
            variants={{
              initial: { backgroundPosition: '200% 0%', opacity: 0 },
              hover: { 
                backgroundPosition: ['200% 0%', '-100% 0%'],
                opacity: [0, 1, 0],
                transition: { duration: 2, ease: "easeInOut" }
              }
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
        </motion.div>
      </Link>
    </motion.div>
  );
}

