import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
              <div style={{ position: 'relative', width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
                <Image 
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/logo_transparent.png`}
                  alt="THAZIO Logo" 
                  fill
                  sizes="28px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span style={{ fontFamily: 'var(--font-logo)', fontWeight: 900, letterSpacing: '0.05em', color: 'var(--color-white)' }}>THAZIO</span>
            </div>
            <p>
              The world&apos;s first fully automated company. We replace manual operations with intelligent agent networks that run workflows, manage data, and scale infrastructure without human intervention.
            </p>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h5>Services</h5>
            <ul>
              <li><a href="#services">Digital & Software</a></li>
              <li><a href="#services">Artificial Intelligence</a></li>
              <li><a href="#services">Data & Analytics</a></li>
              <li><a href="#services">Cloud Solutions</a></li>
              <li><a href="#services">Consulting</a></li>
              <li><a href="#services">Automation</a></li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="footer-column">
            <h5>Industries</h5>
            <ul>
              <li><a href="#industries">Retail</a></li>
              <li><a href="#industries">Healthcare</a></li>
              <li><a href="#industries">Finance</a></li>
              <li><a href="#industries">E-Commerce</a></li>
              <li><a href="#industries">Education</a></li>
              <li><a href="#industries">Telecommunication</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h5>Company</h5>
            <ul>
              <li><a href="#company">About Us</a></li>
              <li><a href="#company">Leadership</a></li>
              <li><a href="#company">Partnership</a></li>
              <li><a href="#company">Life at Thazio</a></li>
              <li><a href="#insights">Insights</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h5>Resources</h5>
            <ul>
              <li><a href="#insights">Newsroom</a></li>
              <li><a href="#insights">Blog</a></li>
              <li><a href="#insights">Case Studies</a></li>
              <li><a href="#hero">Privacy Policy</a></li>
              <li><a href="#hero">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 THAZIO. All rights reserved. Autonomous systems active.
          </div>
          
          {/* Socials */}
          <div className="footer-social">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              in
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              X
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              git
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
