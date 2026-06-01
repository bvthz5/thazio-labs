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
      {/* Decorative circle */}
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
              title={"Let's Build the\nFuture Together"}
              description="Whether you need autonomous workflow systems, AI-powered analytics, cloud infrastructure, or strategic consulting — our team is ready to transform your operations."
            />

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">📧</div>
                <div className="contact-detail-text">
                  <h5>Email Us</h5>
                  <p>hello@thazio.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">📱</div>
                <div className="contact-detail-text">
                  <h5>Call Us</h5>
                  <p>+1 (800) THAZIO-AI</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">📍</div>
                <div className="contact-detail-text">
                  <h5>Headquarters</h5>
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
                  Autonomous Systems: Online
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
                <h3 style={{ fontFamily: 'var(--font-heading)' }}>Message Sent</h3>
                <p style={{ maxWidth: '300px', fontSize: 'var(--text-sm)' }}>
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input
                      className="form-input"
                      type="text"
                      id="contact-name"
                      placeholder="John Smith"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      id="contact-email"
                      placeholder="john@company.com"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-company">Company / Organization</label>
                  <input
                    className="form-input"
                    type="text"
                    id="contact-company"
                    placeholder="Acme Corporation"
                    required
                    autoComplete="organization"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">How Can We Help?</label>
                  <select
                    className="form-select"
                    id="contact-subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  >
                    <option>General Inquiry</option>
                    <option>AI & Automation Solutions</option>
                    <option>Cloud Infrastructure</option>
                    <option>Data & Analytics</option>
                    <option>Strategic Consulting</option>
                    <option>Partnership Opportunity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Tell Us More</label>
                  <textarea
                    className="form-textarea"
                    id="contact-message"
                    placeholder="Describe your project, challenges, or goals..."
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <GlassButton variant="neural" className="w-full" style={{ width: '100%', padding: '16px' }}>
                  Send Message
                </GlassButton>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
