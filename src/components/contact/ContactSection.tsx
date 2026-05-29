'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import GlassButton from '../ui/GlassButton';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: '',
        email: '',
        company: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="contact-section section">
      {/* Absolute high-fidelity neural network lines decorative canvas ornament */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-20%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 102, 255, 0.03)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-inner">
          
          {/* Left Column Information */}
          <div className="contact-info">
            <SectionHeading
              overline="GET IN TOUCH"
              title="Let's Build the&#10;Future Together"
              description="Whether you require custom agentic architecture, cloud synapsis, deep learning models development, or advanced BCI exploration collaborations — we have the engineering strength to scale your operations."
            />

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">📧</div>
                <div className="contact-detail-text">
                  <h5>Global Operations Office</h5>
                  <p>hello@thazio.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">📱</div>
                <div className="contact-detail-text">
                  <h5>Direct Access Lines</h5>
                  <p>+1 (800) THAZIO-AI</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">📍</div>
                <div className="contact-detail-text">
                  <h5>Innovation HQ</h5>
                  <p>San Francisco, California</p>
                </div>
              </div>

              <div className="contact-detail-item" style={{ marginTop: 'var(--space-6)' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--color-electric-blue)',
                    background: 'var(--color-electric-blue-soft)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(0, 102, 255, 0.15)',
                  }}
                >
                  <span 
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-electric-blue)',
                      animation: 'pulse-glow 1s infinite'
                    }}
                  />
                  AI Synaptic Response Router: Active
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Premium Form */}
          <div className="contact-form-wrapper">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-12) 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-4)'
                }}
              >
                <div 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--color-electric-blue-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)' }}>Transmission Sent</h3>
                <p style={{ maxWidth: '300px', fontSize: 'var(--text-sm)' }}>
                  Your packet has successfully bypassed gateway filters. Our neural router will establish communication shortly.
                </p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input
                      className="form-input"
                      type="text"
                      id="name"
                      placeholder="Alan Turing"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      id="email"
                      placeholder="alan@turing.edu"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="company">Enterprise / Organization</label>
                  <input
                    className="form-input"
                    type="text"
                    id="company"
                    placeholder="Bletchley Park Corp"
                    required
                    autoComplete="organization"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Synaptic Vector Pathway</label>
                  <select
                    className="form-select"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  >
                    <option>General Inquiry</option>
                    <option>Enterprise AI Engineering Partnership</option>
                    <option>BCI Platform Integration</option>
                    <option>Emerging Quantum Tech</option>
                    <option>Scientific Research Collaboration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Transmission Details</label>
                  <textarea
                    className="form-textarea"
                    id="message"
                    placeholder="Vector parameters, scaling details, architecture specifications..."
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <GlassButton variant="neural" className="w-full" style={{ width: '100%', padding: '16px' }}>
                  Dispatch Synapse Channel
                </GlassButton>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
