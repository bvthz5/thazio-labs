'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { INSIGHTS, INSIGHT_CATEGORIES } from '@/lib/constants';

const displayLabels: Record<typeof INSIGHT_CATEGORIES[number], string> = {
  All: 'All Publications',
  Newsroom: 'Newsroom',
  Blog: 'Blog',
  'Case Study': 'Case Studies',
  'E-Book': 'E-Books',
};

export default function InsightsSection() {
  const [activeTab, setActiveTab] = useState<typeof INSIGHT_CATEGORIES[number]>('All');

  // Filter items matching selected category
  const filteredInsights = INSIGHTS.filter(
    (item) => activeTab === 'All' || item.tag === activeTab
  );

  return (
    <section id="insights" className="insights-section section">
      <div className="container">
        <SectionHeading
          overline="INSIGHTS"
          title="Latest From Thazio"
          description="Stay updated with our latest news, technical deep-dives, customer success stories, and industry reports."
        />

        {/* Tab Selection */}
        <div className="insights-tabs">
          {INSIGHT_CATEGORIES.map((tab) => (
            <button
              key={tab}
              className={`insights-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {displayLabels[tab]}
            </button>
          ))}
        </div>

        {/* Insights Grid */}
        <div className="insights-grid">
          <AnimatePresence mode="popLayout">
            {filteredInsights.map((insight, index) => {
              if (insight.featured) {
                return (
                  <motion.div
                    key={insight.title}
                    className="insight-card-featured"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Abstract synthetic structural overlay */}
                    <div 
                      style={{
                        width: '100%',
                        height: '240px',
                        background: 'linear-gradient(135deg, #0A0E1A, #7B2FBE, #0066FF)',
                        opacity: 0.85,
                        position: 'relative'
                      }}
                    >
                      <div 
                        style={{
                          position: 'absolute',
                          top: '15%',
                          left: '10%',
                          width: '80%',
                          height: '70%',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '12px'
                        }}
                      />
                    </div>

                    <div className="insight-featured-content">
                      <span className="insight-featured-tag">{insight.tag}</span>
                      <h3>{insight.title}</h3>
                      <p>{insight.description}</p>
                      
                      <div className="insight-card-meta" style={{ marginTop: 'var(--space-6)', color: 'rgba(255,255,255,0.4)' }}>
                        <span>{insight.date}</span>
                        <span>•</span>
                        <span>{insight.readTime}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={insight.title}
                  className="insight-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <span className="insight-card-tag">{insight.tag}</span>
                    <h4>{insight.title}</h4>
                    <p style={{ marginTop: '8px', fontSize: 'var(--text-sm)' }}>
                      {insight.description}
                    </p>
                  </div>
                  
                  <div className="insight-card-meta">
                    <span>{insight.date}</span>
                    <span>•</span>
                    <span>{insight.readTime}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
