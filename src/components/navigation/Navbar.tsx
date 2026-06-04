'use client';

import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/lib/constants';


interface NavbarProps {
  active?: boolean;
}

export default function Navbar({ active = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      if (typeof window !== 'undefined' && 'lenis' in window && (window as unknown as { lenis: { scrollTo: (el: HTMLElement, opts: unknown) => void } }).lenis) {
        (window as unknown as { lenis: { scrollTo: (el: HTMLElement, opts: unknown) => void } }).lenis.scrollTo(element, {
          offset: -80,
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav 
      className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(-20px)',
        left: 0,
        width: '100%',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <a 
          href="#hero" 
          className="navbar-logo"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <img 
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/logo_transparent.png`} 
            alt="Thazio Neural Logo" 
            style={{ 
              display: 'block', 
              height: '44px',
              width: 'auto',
              objectFit: 'contain', 
            }}
          />
          <span style={{ 
            fontFamily: 'var(--font-logo)', 
            fontWeight: 900, 
            fontSize: '1.8rem', 
            lineHeight: 1, 
            letterSpacing: '0.08em',
            background: 'var(--gradient-text-neural)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textTransform: 'uppercase'
          }}>
            THAZIO
          </span>
        </a>

        {/* Links (Desktop) */}
        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button (Desktop) */}
        <div className="navbar-cta hide-mobile">
          <a 
            href="#contact" 
            className="btn btn-primary"
            onClick={(e) => handleNavClick(e, '#contact')}
            style={{ padding: '8px 24px', fontSize: '0.85rem' }}
          >
            Connect
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span style={{ 
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{ 
            opacity: mobileMenuOpen ? 0 : 1,
          }} />
          <span style={{ 
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile Menu Panel (Glassmorphism Overlay) */}
      <div style={{
        position: 'fixed',
        top: 'var(--nav-height)',
        left: 0,
        width: '100%',
        height: 'calc(100vh - var(--nav-height))',
        background: 'var(--glass-bg-strong)',
        backdropFilter: 'var(--glass-blur-strong)',
        WebkitBackdropFilter: 'var(--glass-blur-strong)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '10vh 0 4rem 0',
        overflowY: 'auto',
        gap: 'var(--space-8)',
        opacity: mobileMenuOpen ? 1 : 0,
        pointerEvents: mobileMenuOpen ? 'all' : 'none',
        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 0.4s var(--ease-out-expo)',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-xl)',
              fontWeight: 600,
              color: 'var(--color-obsidian)',
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn-neural"
          onClick={(e) => handleNavClick(e, '#contact')}
          style={{ width: '200px', marginTop: 'var(--space-4)' }}
        >
          Connect
        </a>
      </div>
    </nav>
  );
}
