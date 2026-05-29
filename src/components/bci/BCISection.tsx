'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';

export default function BCISection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this section to drive the neural bridge connection
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Map scroll progress to bridge line width (from 0% to 100%)
  const bridgeWidth = useTransform(scrollYProgress, [0.25, 0.55], ['0%', '100%']);
  
  // Map scroll progress to bridge line glow / energy pulses
  const pulseScale = useTransform(scrollYProgress, [0.5, 0.8], [0.8, 1.2]);
  const pulseOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0.3, 0.9]);

  return (
    <section ref={containerRef} id="bci" className="bci-section section-dark">
      {/* Interactive mesh grid overlay background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(0, 102, 255, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(123, 47, 190, 0.06) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="bci-inner" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="BRAIN-COMPUTER INTERFACE"
          title="Connecting Human Cognition&#10;With Artificial Intelligence"
          description="THAZIO's high-bandwidth BCI platforms decode neural signals in real-time, building direct, bi-directional paths between human thought and digital systems."
          centered
          light
        />

        {/* Neural Bridge Visualizer */}
        <div className="bci-visual">
          {/* Human Neural Node */}
          <motion.div 
            className="bci-node bci-node-human"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="bci-node-icon">🧠</div>
            <div className="bci-node-label">Human Intelligence</div>
            <div 
              style={{
                position: 'absolute',
                width: '120%',
                height: '120%',
                borderRadius: '50%',
                border: '1px dashed rgba(0, 102, 255, 0.2)',
                animation: 'rotate-slow 20s linear infinite',
                pointerEvents: 'none'
              }}
            />
          </motion.div>

          {/* Connection Bridge */}
          <div className="bci-bridge">
            <motion.div 
              className="bci-bridge-fill" 
              style={{ width: bridgeWidth }}
            />
            {/* Animated energy pulses flowing along bridge */}
            <motion.div
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: 'var(--shadow-glow-blue)',
                left: bridgeWidth,
                top: '-8px',
                transform: 'translateX(-50%)',
                opacity: pulseOpacity,
                scale: pulseScale,
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Artificial Neural Node */}
          <motion.div 
            className="bci-node bci-node-ai"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="bci-node-icon">🧬</div>
            <div className="bci-node-label">Neural Intelligence</div>
            <div 
              style={{
                position: 'absolute',
                width: '120%',
                height: '120%',
                borderRadius: '50%',
                border: '1px dashed rgba(123, 47, 190, 0.2)',
                animation: 'rotate-slow 25s linear infinite reverse',
                pointerEvents: 'none'
              }}
            />
          </motion.div>
        </div>

        {/* Core Narrative Features */}
        <div className="bci-features">
          <div className="bci-feature-card">
            <div className="bci-feature-icon" style={{ background: 'rgba(0, 102, 255, 0.15)', color: 'var(--color-electric-blue-light)' }}>
              ⚡
            </div>
            <h4>Neural Decoders</h4>
            <p>Decoding multi-channel neural activity with ultra-low latency transformer models optimized for direct edge execution.</p>
          </div>

          <div className="bci-feature-card">
            <div className="bci-feature-icon" style={{ background: 'rgba(123, 47, 190, 0.15)', color: 'var(--color-neural-violet-light)' }}>
              🧬
            </div>
            <h4>Bi-directional Flow</h4>
            <p>Enabling cognitive augmentations that feed critical context directly back into the cortical systems safely and adaptively.</p>
          </div>

          <div className="bci-feature-card">
            <div className="bci-feature-icon" style={{ background: 'rgba(0, 212, 255, 0.15)', color: 'var(--color-soft-cyan-light)' }}>
              📡
            </div>
            <h4>Enterprise Synapse</h4>
            <p>Translating brain impulses into concrete workflow commands, bridging immediate thought patterns to automated database systems.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
