'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const NeuralSphereScene = dynamic(() => import('./NeuralSphereScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4" style={{ height: '100%', minHeight: '400px' }}>
      <div 
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--gradient-neural)',
          animation: 'pulse-glow 1.5s ease-in-out infinite',
          boxShadow: 'var(--shadow-glow-blue)'
        }}
      />
      <span style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: 'var(--text-xs)', 
        letterSpacing: '0.1em',
        color: 'var(--color-slate)',
        textTransform: 'uppercase'
      }}>
        Initializing Neural Core...
      </span>
    </div>
  ),
});

interface SceneWrapperProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function SceneWrapper({ className, style }: SceneWrapperProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative', ...style }}>
      <NeuralSphereScene />
    </div>
  );
}
