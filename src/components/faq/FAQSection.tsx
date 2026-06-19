'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { FAQ_ITEMS } from '@/lib/constants';
import LightBackgroundAnimation from '../ui/LightBackgroundAnimation';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="faq-section section" style={{ background: '#FFFFFF', position: 'relative' }}>
      <LightBackgroundAnimation />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="FAQ"
          title={"Enterprise Inquiries"}
          description="Addressing strategic and technical considerations for prospective partners."
          centered
        />

        <div className="faq-list">
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                className="faq-item"
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  className={`faq-question ${isOpen ? 'active' : ''}`}
                  onClick={() => toggleFaq(i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <motion.span
                    className="faq-toggle"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                      <p className="faq-answer">{faq.answer}</p>
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
