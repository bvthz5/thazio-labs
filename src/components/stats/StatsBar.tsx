'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { STATS } from '@/lib/constants';
import SectionHeading from '../ui/SectionHeading';

interface CounterProps {
  value: string;
  duration?: number;
}

function Counter({ value, duration = 2 }: CounterProps) {
  const [count, setCount] = useState(() => value);
  const countRef = useRef(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const numMatch = value.match(/([\d.]+)/);
    const suffixMatch = value.match(/([^\d.]+)/);
    
    if (!numMatch) {
      return;
    }

    const targetNum = parseFloat(numMatch[0]);
    const suffix = suffixMatch ? suffixMatch[0] : '';
    const hasDecimals = numMatch[0].includes('.');

    let start: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * targetNum;

      countRef.current = currentVal;
      
      const formattedVal = hasDecimals 
        ? currentVal.toFixed(1) 
        : Math.floor(currentVal).toString();

      setCount(formattedVal + suffix);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, duration, isInView]);

  return <span ref={containerRef}>{count}</span>;
}

export default function StatsBar() {
  return (
    <section className="stats-section section section-dark" id="statistics">
      <div className="container">
        <SectionHeading
          overline="STATISTICS"
          title="By The Numbers"
          centered
          light
        />
        <div className="stats-grid" style={{ marginTop: 'var(--space-10)' }}>
          {STATS.map((stat, i) => (
            <motion.div 
              key={i} 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="stat-number text-gradient">
                <Counter value={stat.number} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
