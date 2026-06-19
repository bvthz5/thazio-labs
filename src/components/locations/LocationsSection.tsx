'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { LOCATIONS } from '@/lib/constants';

export default function LocationsSection() {
  return (
    <section id="locations" className="locations-section section section-dark">
      {/* Background world map (reuses hero approach) */}
      <div
        className="locations-map-bg"
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/world_map_dots.png')`,
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `
            radial-gradient(circle at 25% 50%, rgba(0, 102, 255, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 75% 40%, rgba(123, 47, 190, 0.06) 0%, transparent 40%)
          `,
          pointerEvents: 'none', zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeading
          overline="LOCATIONS"
          title={"Global Scale.\nLocal Precision."}
          description="Architecting world-class infrastructure from our global operations center, synchronizing seamlessly with distributed enterprise teams."
          centered
          light
        />

        <div className="locations-grid">
          {/* Active Locations */}
          <motion.div
            className="location-card location-card-active glass-card-dark"
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="location-pulse" />
            <div className="location-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-2)' }}>{LOCATIONS.headquarters.name}</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'var(--text-sm)' }}>{LOCATIONS.headquarters.description}</p>
          </motion.div>

          <motion.div
            className="location-card location-card-active glass-card-dark"
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="location-pulse" />
            <div className="location-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h4 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-2)' }}>{LOCATIONS.remote.name}</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'var(--text-sm)' }}>{LOCATIONS.remote.description}</p>
          </motion.div>

          {/* Future Expansion */}
          {LOCATIONS.expansion.map((loc, i) => (
            <motion.div
              key={loc.name}
              className="location-card location-card-future glass-card-dark"
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="location-icon location-icon-future">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h5 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-1)' }}>
                {loc.name}
              </h5>
              <span className="location-status">{loc.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
