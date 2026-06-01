'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { COMPANY_INFO, LEADERSHIP, FAQ_ITEMS } from '@/lib/constants';

/* ─── Gradient palettes for leadership portrait placeholders ── */
const portraitGradients = [
  'linear-gradient(135deg, #0066FF, #7B2FBE)',
  'linear-gradient(135deg, #7B2FBE, #00D4FF)',
  'linear-gradient(135deg, #00D4FF, #0066FF)',
];

/* ─── Value icon mapping ─────────────────────────────────────── */
const valueIcons = ['⚡', '🚀', '🔍', '📈'];

export default function InnovationLab() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="company" className="section" style={{ background: 'var(--gradient-section)' }}>
      <div className="container">

        {/* ═══════ About Us ═══════ */}
        <SectionHeading
          overline="ABOUT THAZIO"
          title={'Building the Future\nOf Autonomous Enterprise'}
          description="We're not building another SaaS tool. We're building the operating system for companies that run themselves."
        />

        {/* Mission & Vision */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-16)',
          }}
        >
          {([
            { label: 'Our Mission', text: COMPANY_INFO.mission, icon: '🎯' },
            { label: 'Our Vision', text: COMPANY_INFO.vision, icon: '🔭' },
          ] as const).map((item, i) => (
            <motion.div
              key={item.label}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {/* Accent top bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--gradient-neural)',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                }}
              />
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>{item.icon}</div>
              <h5
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-electric-blue)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {item.label}
              </h5>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}>{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid-4" style={{ marginBottom: 'var(--space-section)' }}>
          {COMPANY_INFO.values.map((value, i) => (
            <motion.div
              key={value.title}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-electric-blue-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  margin: '0 auto var(--space-5)',
                }}
              >
                {valueIcons[i]}
              </div>
              <h5 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                {value.title}
              </h5>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══════ Leadership ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'var(--space-12)' }}
        >
          <div
            className="overline"
            style={{ justifyContent: 'center' }}
          >
            TEAM
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>Leadership</h2>
          <p
            style={{
              textAlign: 'center',
              maxWidth: '520px',
              margin: '0 auto',
              fontSize: 'var(--text-lg)',
              color: 'var(--color-slate)',
            }}
          >
            The people building the autonomous enterprise.
          </p>
        </motion.div>

        <div className="grid-3" style={{ marginBottom: 'var(--space-section)' }}>
          {LEADERSHIP.map((person, i) => (
            <motion.div
              key={person.name}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-8)' }}
            >
              {/* Portrait */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: portraitGradients[i % portraitGradients.length],
                  margin: '0 auto var(--space-6)',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${person.image}`}
                  alt={person.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <h4 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>
                {person.name}
              </h4>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-electric-blue)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {person.role}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--color-slate)' }}>
                {person.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ═══════ FAQ ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'var(--space-12)' }}
        >
          <div className="overline" style={{ justifyContent: 'center' }}>
            SUPPORT
          </div>
          <h2 style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openFaqIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderBottom: '1px solid var(--color-platinum)',
                }}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-6) 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--color-obsidian)',
                    letterSpacing: '-0.01em',
                    transition: 'color var(--transition-fast)',
                  }}
                >
                  <span style={{ paddingRight: 'var(--space-6)' }}>{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      flexShrink: 0,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen
                        ? 'var(--color-obsidian)'
                        : 'var(--color-silver)',
                      color: isOpen ? 'var(--color-white)' : 'var(--color-slate)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      lineHeight: 1,
                      transition: 'background 300ms, color 300ms',
                    }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          paddingBottom: 'var(--space-6)',
                          fontSize: 'var(--text-base)',
                          lineHeight: 1.8,
                          color: 'var(--color-slate)',
                          maxWidth: '680px',
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
