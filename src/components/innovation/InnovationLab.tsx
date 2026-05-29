'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { INNOVATION_ITEMS } from '@/lib/constants';

export default function InnovationLab() {
  return (
    <section id="innovation" className="innovation-section section-dark">
      {/* Dynamic ambient particles mesh background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(ellipse at center, rgba(123, 47, 190, 0.05) 0%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="INNOVATION LAB"
          title="Exploring the Frontiers&#10;of Cognitive Computing"
          description="In our global research labs, quantum intelligence, autonomous learning nodes, and neuromorphic frameworks converge to define the next era of digital existence."
          centered
          light
        />

        <div className="innovation-grid">
          {INNOVATION_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className="innovation-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.4), ease: 'easeOut' }}
            >
              <div className="innovation-card-icon" style={{ background: 'rgba(255, 255, 255, 0.03)', color: '#ffffff' }}>
                {item.icon}
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              
              <div className="innovation-card-tag">
                {item.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
