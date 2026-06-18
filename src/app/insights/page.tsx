'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { INSIGHTS, INSIGHT_CATEGORIES } from '@/lib/constants';

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<(typeof INSIGHT_CATEGORIES)[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Filter based on active tab and search query
  const filteredInsights = INSIGHTS.filter((item) => {
    const matchesTab = activeTab === 'All' || item.tag === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Find the first featured article that matches the current active filters, or fallback to the first element
  const featuredArticle = filteredInsights.find((item) => item.featured) || filteredInsights[0];
  const gridArticles = filteredInsights.filter((item) => item.slug !== featuredArticle?.slug);

  return (
    <div style={{ background: '#070A13', minHeight: '100vh', paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-24)' }}>
      {/* Dynamic ambient header background */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '50vh',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0, 102, 255, 0.08), transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)', paddingTop: 'var(--space-8)' }}>
          <motion.span 
            className="overline" 
            style={{ justifyContent: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Resources
          </motion.span>
          <motion.h1 
            style={{ 
              fontSize: 'clamp(2.5rem, 2rem + 4vw, 4.5rem)', 
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--color-white) 30%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--space-4)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Insights & News
          </motion.h1>
          <motion.p 
            style={{ 
              fontSize: 'var(--text-lg)', 
              color: 'var(--color-mist)', 
              maxWidth: '680px',
              margin: '0 auto'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Exploring technologies, ideas, and innovations shaping the future of autonomous systems and engineering.
          </motion.p>
        </div>

        {/* Filter Controls (Search + Tabs) */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: 'var(--space-4)', 
            marginBottom: 'var(--space-12)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '24px'
          }}
        >
          {/* Category Tabs */}
          <div className="insights-tabs" style={{ margin: 0 }}>
            {INSIGHT_CATEGORIES.map((tab) => (
              <button
                key={tab}
                className={`insights-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '9999px',
                padding: '12px 20px 12px 42px',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-white)',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(0, 102, 255, 0.3)';
                e.target.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.target.style.background = 'rgba(255, 255, 255, 0.02)';
              }}
            />
            {/* Search Icon */}
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }}
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        {/* Featured Article Card */}
        {featuredArticle && searchQuery === '' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 'var(--space-12)' }}
          >
            <Link 
              href={`/insights/${featuredArticle.slug}/`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                className="insight-featured-banner glass-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: 'var(--space-8)',
                  padding: 'var(--space-6)',
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              >
                {/* Visual Canvas left */}
                <div 
                  style={{
                    borderRadius: '16px',
                    height: '380px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <div
                    style={{
                      width: '100%', height: '100%',
                      background: 'linear-gradient(135deg, #070A13, #0066FF 40%, #7B2FBE 100%)',
                      opacity: 0.8,
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      opacity: 0.3
                    }}
                  />
                  {/* Floating abstract elements */}
                  <div 
                    style={{
                      position: 'absolute', top: '25%', left: '25%', right: '25%', bottom: '25%',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
                      animation: 'pulse-glow 6s infinite ease-in-out'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute', top: '35%', left: '35%', right: '35%', bottom: '35%',
                      border: '1px dashed rgba(0, 212, 255, 0.2)', borderRadius: '50%',
                      animation: 'rotate-slow 15s infinite linear'
                    }}
                  />
                </div>

                {/* Content right */}
                <div style={{ padding: 'var(--space-4) var(--space-2)' }}>
                  <span 
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '99px',
                      background: 'var(--color-electric-blue-soft)',
                      color: 'var(--color-electric-blue-light)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      marginBottom: 'var(--space-4)',
                      border: '1px solid rgba(0, 102, 255, 0.15)'
                    }}
                  >
                    FEATURED • {featuredArticle.tag.toUpperCase()}
                  </span>
                  <h2 
                    style={{ 
                      fontSize: 'var(--text-3xl)', 
                      fontWeight: 700, 
                      color: 'var(--color-white)',
                      marginBottom: 'var(--space-4)',
                      lineHeight: 1.25
                    }}
                  >
                    {featuredArticle.title}
                  </h2>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-base)', 
                      color: 'rgba(255,255,255,0.65)',
                      lineHeight: 1.75,
                      marginBottom: 'var(--space-6)'
                    }}
                  >
                    {featuredArticle.description}
                  </p>

                  <div className="insight-card-meta" style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.4)', fontSize: 'var(--text-xs)' }}>
                    <span>{featuredArticle.date}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Dynamic Secondary Grid */}
        <AnimatePresence mode="popLayout">
          {filteredInsights.length > 0 ? (
            <motion.div 
              className="insights-grid"
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-8)' }}
            >
              {gridArticles.map((insight) => (
                <motion.div
                  key={insight.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="insight-card glass-card"
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    padding: 'var(--space-6)',
                    borderRadius: '16px',
                    minHeight: '260px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,102,255,0.15)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                  }}
                >
                  <Link 
                    href={`/insights/${insight.slug}/`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}
                  >
                    <div>
                      <span 
                        style={{
                          display: 'inline-block',
                          padding: '2px 10px',
                          borderRadius: '99px',
                          background: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.65)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 500,
                          marginBottom: 'var(--space-4)',
                          border: '1px solid rgba(255, 255, 255, 0.06)'
                        }}
                      >
                        {insight.tag}
                      </span>
                      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-white)', marginBottom: '8px', lineHeight: 1.4 }}>
                        {insight.title}
                      </h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                        {insight.description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', color: 'rgba(255,255,255,0.35)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-6)' }}>
                      <span>{insight.date}</span>
                      <span>•</span>
                      <span>{insight.readTime}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: 'var(--space-20) 0', color: 'var(--color-mist)' }}
            >
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.2)' }}
              >
                <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              <h4>No articles match your filters.</h4>
              <p style={{ fontSize: 'var(--text-sm)', marginTop: '4px' }}>Try modifying your search or select another category tab.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
