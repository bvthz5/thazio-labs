'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Static imports for lightweight components
import Footer from '@/components/footer/Footer';

// Dynamic imports for heavy client components
const IntroSequence = dynamic(() => import('@/components/intro/IntroSequence'), {
  ssr: false,
});

const Navbar = dynamic(() => import('@/components/navigation/Navbar'), {
  ssr: false,
});

const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const StatsBar = dynamic(() => import('@/components/stats/StatsBar'), {
  ssr: false,
  loading: () => <div style={{ height: '200px' }} />,
});

const CapabilitiesSection = dynamic(() => import('@/components/bci/BCISection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const ServicesSection = dynamic(() => import('@/components/services/ServicesSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const IndustriesSection = dynamic(() => import('@/components/industries/IndustriesSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const InsightsSection = dynamic(() => import('@/components/insights/InsightsSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const CompanySection = dynamic(() => import('@/components/innovation/InnovationLab'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const ContactSection = dynamic(() => import('@/components/contact/ContactSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

export default function HomePage() {
  // Always start with intro incomplete to play it on every single reload
  const [introComplete, setIntroComplete] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const handleIntroComplete = () => {
    // Reveal homepage content smoothly
    setShowContent(true);
    // Unmount intro overlay strictly after the cross-fade finishes (400ms delay + 850ms timeout = 1250ms unmount)
    setTimeout(() => {
      setIntroComplete(true);
    }, 850);
  };

  return (
    <>
      {/* Cinematic Intro Sequence (always mounts on reload) */}
      {!introComplete && <IntroSequence onComplete={handleIntroComplete} />}

      {/* Main Content */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          filter: showContent ? 'blur(0px)' : 'blur(20px)',
          transform: showContent ? 'scale(1)' : 'scale(0.96)',
          transition: 'opacity 0.8s ease-out, filter 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: showContent ? 'auto' : 'none',
          position: 'relative',
          width: '100%',
          transformOrigin: 'center 30vh',
        }}
      >
        <Navbar active={showContent} />

        <main>
          {/* Hero Section */}
          <HeroSection active={showContent} />

          {/* Stats Bar */}
          <StatsBar />

          {/* Core Capabilities */}
          <CapabilitiesSection />

          {/* Services Section */}
          <ServicesSection />

          {/* Industries Section */}
          <IndustriesSection />

          {/* Insights Section */}
          <InsightsSection />

          {/* Company Section */}
          <CompanySection />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
