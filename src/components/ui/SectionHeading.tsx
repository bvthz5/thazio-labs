'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionHeadingProps {
  overline: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  children?: ReactNode;
}

export default function SectionHeading({
  overline,
  title,
  description,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      className="section-heading"
      style={{
        textAlign: centered ? 'center' : 'left',
        margin: centered ? '0 auto' : undefined,
        marginBottom: 'var(--space-16)',
      }}
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="overline"
        style={{
          justifyContent: centered ? 'center' : 'flex-start',
          color: light ? 'var(--color-electric-blue-light)' : undefined,
        }}
      >
        {overline}
      </div>
      <h2
        style={{
          color: light ? 'var(--color-white)' : undefined,
          whiteSpace: 'pre-line',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            marginTop: 'var(--space-6)',
            color: light ? 'rgba(255,255,255,0.6)' : undefined,
            margin: centered ? 'var(--space-6) auto 0' : undefined,
            fontSize: 'var(--text-lg)',
            maxWidth: '560px',
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
