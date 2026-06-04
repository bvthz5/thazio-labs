'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { INDUSTRIES } from '@/lib/constants';

export default function IndustriesSection() {
  return (
    <section id="industries" className="industries-section section section-dark">
      <div className="container">
        <SectionHeading
          overline="INDUSTRIES WE SERVE"
          title="Powering Automation&#10;Across Every Sector"
          description="We deploy intelligent agent networks across industries where operational complexity meets the need for speed, accuracy, and scale."
          centered
          light
        />

        <div className="industries-grid">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.title}
              className="industry-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: Math.min(i * 0.08, 0.45), ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Premium abstract visual backdrop gradient */}
              <div 
                className="industry-card-bg"
                style={{
                  background: ind.gradient,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                }}
              />
              
              <div className="industry-card-overlay" />
              <div className="industry-card-neural-overlay" />
              
              {/* Glowing circuit lines ornament */}
              <div 
                style={{
                  position: 'absolute',
                  width: '150%',
                  height: '150%',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  top: '-25%',
                  left: '-25%',
                  borderRadius: '50%',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              />

              <div className="industry-card-content">
                <h4>{ind.title}</h4>
                <p>{ind.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
