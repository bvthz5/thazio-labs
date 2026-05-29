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
                  src="/images/logo_transparent.png" 
                  alt="THAZIO Logo" 
                  fill
                  sizes="28px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span style={{ letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-white)' }}>THAZIO</span>
            </div>
            <p>
              Engineering the next generation of digital existence through high-bandwidth BCI platforms, autonomous AI synapse systems, and neuromorphic computing architectures.
            </p>
          </div>

          {/* Solutions Column */}
          <div className="footer-column">
            <h5>Solutions</h5>
            <ul>
              <li><a href="#solutions">AI Engineering</a></li>
              <li><a href="#bci">BCI Systems</a></li>
              <li><a href="#solutions">Enterprise Synapse</a></li>
              <li><a href="#solutions">Autonomous Agents</a></li>
              <li><a href="#solutions">Quantum AI Nodes</a></li>
            </ul>
          </div>

          {/* Labs Column */}
          <div className="footer-column">
            <h5>Research Labs</h5>
            <ul>
              <li><a href="#innovation">Digital Humans</a></li>
              <li><a href="#innovation">Neural Dynamics</a></li>
              <li><a href="#innovation">Quantum Networks</a></li>
              <li><a href="#innovation">Robotics Sync</a></li>
              <li><a href="#innovation">Silicon Synthesis</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h5>Publications</h5>
            <ul>
              <li><a href="#insights">Scientific Papers</a></li>
              <li><a href="#insights">Synaptic Stream</a></li>
              <li><a href="#insights">Enterprise Reports</a></li>
              <li><a href="#insights">Documentation</a></li>
              <li><a href="#insights">System Status</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h5>Synthetics</h5>
            <ul>
              <li><a href="#contact">Contact Router</a></li>
              <li><a href="#hero">Terms of syn-flow</a></li>
              <li><a href="#hero">Neural Policy</a></li>
              <li><a href="#hero">Trust & Safety</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 THAZIO. All cognitive rights reserved. Synaptic nodes initialized.
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
