'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

const dropdownItems = {
  Services: [
    { label: 'Digital & Software', href: '/services/digital-software/' },
    { label: 'AI, Data and Analytics', href: '/services/ai-data-analytics/' },
    { label: 'Cloud', href: '/services/cloud/' },
    { label: 'Consulting', href: '/services/consulting/' },
    { label: 'Global Capability Centers', href: '/services/global-capability-centers/' },
  ],
  Industries: [
    { label: 'Retail', href: '/industries/retail/' },
    { label: 'Advertising & Media', href: '/industries/advertising-media/' },
    { label: 'Education', href: '/industries/education/' },
    { label: 'Telecommunication', href: '/industries/telecommunication/' },
    { label: 'Healthcare', href: '/industries/healthcare/' },
    { label: 'E-commerce', href: '/industries/e-commerce/' },
    { label: 'Finance', href: '/industries/finance/' },
    { label: 'Utilities', href: '/industries/utilities/' },
  ],
  Insights: [
    { label: 'Newsroom', href: '/#insights' },
    { label: 'Blogs', href: '/#insights' },
    { label: 'Case Studies', href: '/#insights' },
    { label: 'E-books', href: '/#insights' },
  ],
  Company: [
    { label: 'About Us', href: '/#why-us' },
    { label: 'Leadership', href: '/#why-us' },
    { label: 'Partnership', href: '/#why-us' },
    { label: 'Life At Thazio', href: '/#contact' },
  ],
};

const menuItems = [
  { label: 'Services', isDropdown: true },
  { label: 'Industries', isDropdown: true },
  { label: 'Insights', isDropdown: true },
  { label: 'Company', isDropdown: true },
  { label: 'Careers', href: '#contact', isDropdown: false },
];

interface NavbarProps {
  active?: boolean;
}

export default function Navbar({ active = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  const getHref = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) return href;
    if (href.startsWith('/')) return `${basePath}${href}`;
    return `${basePath}/${href}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      // Dynamic theme matching based on active overlapping section
      const sections = document.querySelectorAll('section, footer');
      const navHeight = 80;
      let activeTheme: 'dark' | 'light' = 'dark'; // default to dark (hero)

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= navHeight && rect.bottom > 0) {
          const isDark =
            section.classList.contains('section-dark') ||
            section.id === 'hero' ||
            section.classList.contains('footer') ||
            section.getAttribute('data-navbar-theme') === 'dark';
          activeTheme = isDark ? 'dark' : 'light';
        }
      }
      setTheme(activeTheme);
    };

    handleScroll(); // Initialize on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      e.preventDefault();
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
      } else {
        window.location.href = `${basePath}/${href}`;
      }
    }
  };

  const toggleMobileExpand = (label: string) => {
    setMobileExpandedItem(prev => (prev === label ? null : label));
  };

  return (
    <nav 
      className={`navbar theme-${theme} ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'none' : 'translateY(-20px)',
        left: 0,
        width: '100%',
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <a 
          href={getHref('#hero')} 
          className="navbar-logo"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <img 
            src={`${basePath}/images/logo_transparent.png`} 
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
        <ul className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginLeft: 'auto', marginRight: 'var(--space-8)' }}>
          {menuItems.map((item) => {
            if (item.isDropdown) {
              const dropdownList = dropdownItems[item.label as keyof typeof dropdownItems];
              const isHovered = hoveredItem === item.label;
              return (
                <li 
                  key={item.label}
                  style={{ position: 'relative', display: 'inline-block', height: '100%' }}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      cursor: 'pointer',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      padding: '24px 0',
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'var(--color-obsidian)',
                      transition: 'color 0.25s ease'
                    }}
                  >
                    {item.label}
                    <svg 
                      width="10" 
                      height="6" 
                      viewBox="0 0 10 6" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      style={{ 
                        marginLeft: '6px', 
                        transition: 'transform 0.25s ease', 
                        transform: isHovered ? 'rotate(180deg)' : 'none' 
                      }}
                    >
                      <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>

                  {/* Dropdown Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: theme === 'dark' ? 'rgba(10, 14, 26, 0.96)' : 'var(--color-white)',
                          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-xl)',
                          padding: '12px 0',
                          minWidth: '240px',
                          zIndex: 100,
                          display: 'flex',
                          flexDirection: 'column',
                          backdropFilter: 'blur(20px)',
                        }}
                      >
                        {dropdownList.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            style={{
                              padding: '10px 20px',
                              fontSize: 'var(--text-sm)',
                              fontWeight: 500,
                              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-charcoal)',
                              textDecoration: 'none',
                              display: 'block'
                            }}
                            className="dropdown-item"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <a 
                  href={getHref(item.href || '')} 
                  onClick={(e) => handleNavClick(e, item.href || '')}
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Button (Let's Talk) */}
        <div className="navbar-cta hide-mobile">
          <Link 
            href="/contact/"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 28px', 
              fontSize: '0.85rem',
              background: 'transparent',
              color: theme === 'dark' ? 'var(--color-white)' : 'var(--color-obsidian)',
              border: '2px solid transparent',
              borderRadius: 'var(--radius-full)',
              backgroundImage: theme === 'dark'
                ? 'linear-gradient(rgba(10,14,26,0), rgba(10,14,26,0)), linear-gradient(90deg, #FF007A, #7B2FBE)'
                : 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), linear-gradient(90deg, #FF007A, #7B2FBE)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 0 15px rgba(255, 0, 122, 0.15)',
              fontWeight: 700,
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 0, 122, 0.35)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 122, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Let's Talk
          </Link>
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
        background: theme === 'dark' ? 'rgba(10, 14, 26, 0.98)' : 'var(--glass-bg-strong)',
        backdropFilter: 'var(--glass-blur-strong)',
        WebkitBackdropFilter: 'var(--glass-blur-strong)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2rem 1.5rem',
        overflowY: 'auto',
        gap: 'var(--space-4)',
        opacity: mobileMenuOpen ? 1 : 0,
        pointerEvents: mobileMenuOpen ? 'all' : 'none',
        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 0.4s var(--ease-out-expo)',
        borderTop: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        {menuItems.map((item) => {
          if (item.isDropdown) {
            const dropdownList = dropdownItems[item.label as keyof typeof dropdownItems];
            const isExpanded = mobileExpandedItem === item.label;
            return (
              <div key={item.label} style={{ width: '100%', textAlign: 'center' }}>
                <button
                  onClick={() => toggleMobileExpand(item.label)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: theme === 'dark' ? 'var(--color-white)' : 'var(--color-obsidian)',
                    padding: '8px 0',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {item.label}
                  <span style={{ fontSize: '0.8rem', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
                </button>
                
                {isExpanded && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '10px 0',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '8px',
                    marginTop: '4px'
                  }}>
                    {dropdownList.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 500,
                          color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'var(--color-slate)',
                          textDecoration: 'none',
                        }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <a
              key={item.label}
              href={getHref(item.href || '')}
              onClick={(e) => handleNavClick(e, item.href || '')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: theme === 'dark' ? 'var(--color-white)' : 'var(--color-obsidian)',
                padding: '8px 0',
                width: '100%',
                textAlign: 'center'
              }}
            >
              {item.label}
            </a>
          );
        })}
        
        <Link
          href="/contact/"
          className="btn btn-neural"
          style={{ width: '200px', marginTop: 'var(--space-6)' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          Let's Talk
        </Link>
      </div>
    </nav>
  );
}
