'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';
import { INSIGHTS } from '@/lib/constants';

export default function InsightsSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Display the top 4 latest news/insights on the homepage
  const latestNews = INSIGHTS.slice(0, 4);

  return (
    <section id="insights" className="insights-section section section-dark" style={{ background: '#070A13', position: 'relative' }}>
      {/* Decorative ambient background glows */}
      <div
        style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.02), transparent 70%)',
          pointerEvents: 'none', zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline="NEWS & INSIGHTS"
          title="Latest News"
          description="Stay updated with our latest announcements, technical blogs, and breakthroughs."
          centered
          light
        />

        {/* Vertical news list feed matching screenshot 4 */}
        <div className="news-list-container">
          {latestNews.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                href={`/insights/${item.slug}/`}
                className="news-row-item"
              >
                {/* Date */}
                <div className="news-row-date">
                  {item.date}
                </div>

                {/* Title */}
                <div className="news-row-title-wrapper">
                  <h4 className="news-row-title">
                    {item.title}
                  </h4>
                </div>

                {/* Up-Right Arrow circle badge */}
                <div className="news-row-arrow-badge">
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="news-row-arrow-svg"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all button linking to dynamic insights page */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <Link 
            href="/insights/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 32px',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              color: 'var(--color-white)',
              background: '#0066FF',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 102, 255, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3388FF';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0066FF';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 102, 255, 0.25)';
            }}
          >
            View all
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ marginLeft: '8px', transition: 'transform 0.2s ease' }}
              className="view-all-arrow"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
              }}
            >
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
