'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { WHY_CHOOSE_US } from '@/lib/constants';
import SectionHeading from '../ui/SectionHeading';

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Track scroll position of the section viewport to feed the timeline track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section 
      id="why-us" 
      ref={sectionRef} 
      className="why-choose-section section section-dark"
      style={{ background: '#070A13', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle futuristic grid overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
          pointerEvents: 'none', zIndex: 0
        }}
      />
      
      {/* Ambient gradient glows */}
      <div
        style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.03), transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(123, 47, 190, 0.03), transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="OUR ADVANTAGE"
          title="Why Choose Thazio"
          description="Delivering intelligent solutions with innovation, trust, and long-term partnership."
          centered
          light
        />

        <div className="why-choose-split-layout">
          {/* Left Column: Premium Collage Graphic */}
          <motion.div
            className="why-choose-visual-wrapper"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="why-choose-collage-card">
              <img
                src={`${basePath}/images/why_choose_thazio.png`}
                alt="Thazio Team Collage"
                className="why-choose-collage-img"
              />
              <div className="why-choose-collage-overlay" />
            </div>
          </motion.div>

          {/* Right Column: Scroll-Linked Timeline */}
          <div className="why-choose-timeline-container">
            {/* Vertical timeline track line */}
            <div className="why-choose-timeline-track">
              <motion.div
                className="why-choose-timeline-fill"
                style={{
                  scaleY: scaleY,
                  transformOrigin: 'top',
                }}
              />
            </div>

            {/* Timeline Steps */}
            <div className="why-choose-steps-stack">
              {WHY_CHOOSE_US.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="why-choose-timeline-row"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Circular step badge */}
                  <div className="why-choose-circle-container">
                    <motion.div
                      className="why-choose-circle"
                      initial={{ scale: 0.85, borderColor: 'rgba(255, 255, 255, 0.08)', boxShadow: 'none' }}
                      whileInView={{ 
                        scale: 1, 
                        borderColor: 'var(--color-electric-blue)',
                        boxShadow: '0 0 24px rgba(0, 102, 255, 0.35)',
                      }}
                      viewport={{ once: false, margin: '-20% 0px -40% 0px' }}
                      transition={{ duration: 0.4 }}
                    >
                      {i + 1}
                    </motion.div>
                  </div>

                  {/* Step Description */}
                  <div className="why-choose-step-content">
                    <h4 className="why-choose-step-title">{item.title}</h4>
                    <p className="why-choose-step-desc">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
