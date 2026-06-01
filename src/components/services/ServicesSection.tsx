'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { SERVICES } from '@/lib/constants';

interface CardProps {
  service: typeof SERVICES[number];
  index: number;
}

function ServiceCard({ service, index }: CardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    
    // Relative mouse coordinate in coordinates range [-1, 1]
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Apply 3D perspective rotation limits (max tilt 10 degrees)
    setRotate({ x: -y * 10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="service-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: isHovered ? 'none' : 'transform 0.5s ease',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="service-card-icon">{service.icon}</div>
      <h4>{service.title}</h4>
      <p>{service.description}</p>
      
      <div className="service-card-arrow">
        Explore Capabilities
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="solutions" className="services-section section">
      {/* Decorative backdrop elements */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.03), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(123, 47, 190, 0.02), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="OUR SERVICES"
          title="Comprehensive Solutions&#10;For Modern Enterprises"
          description="From custom software engineering to autonomous AI systems — we deliver end-to-end technology solutions that drive measurable business outcomes."
          centered
        />

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
