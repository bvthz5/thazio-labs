'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function LightBackgroundAnimation() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Subtle Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(0, 102, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      />
      
      {/* Animated Blob 1 (Pale Blue) */}
      <motion.div
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          maxWidth: '800px',
          maxHeight: '800px',
          background: 'radial-gradient(circle, rgba(240, 210, 190, 0.45), transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />

      {/* Animated Blob 2 (Pale Purple) */}
      <motion.div
        animate={{
          x: ['5%', '-5%', '5%'],
          y: ['5%', '-5%', '5%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          maxWidth: '700px',
          maxHeight: '700px',
          background: 'radial-gradient(circle, rgba(200, 190, 230, 0.45), transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Animated Blob 3 (Pale Cyan/Teal) */}
      <motion.div
        animate={{
          x: ['0%', '10%', '0%'],
          y: ['10%', '0%', '10%'],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: '40vw',
          height: '40vw',
          maxWidth: '600px',
          maxHeight: '600px',
          background: 'radial-gradient(circle, rgba(180, 220, 240, 0.45), transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
