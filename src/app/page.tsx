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

const ServicesSection = dynamic(() => import('@/components/services/ServicesSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const WhyChooseUsSection = dynamic(() => import('@/components/why-choose-us/WhyChooseUsSection'), {
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

const StatsBar = dynamic(() => import('@/components/stats/StatsBar'), {
  ssr: false,
  loading: () => <div style={{ height: '200px' }} />,
});

const LocationsSection = dynamic(() => import('@/components/locations/LocationsSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const FAQSection = dynamic(() => import('@/components/faq/FAQSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

const ContactSection = dynamic(() => import('@/components/contact/ContactSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  React.useEffect(() => {
    if (sessionStorage.getItem('thazio_intro_played') === 'true') {
      setIntroComplete(true);
      setShowContent(true);
    }
  }, []);

  const handleIntroComplete = () => {
    // Reveal homepage content smoothly
    setShowContent(true);
    // Unmount intro overlay after the white bloom bridge has fully faded
    setTimeout(() => {
      setIntroComplete(true);
      sessionStorage.setItem('thazio_intro_played', 'true');
    }, 700);
  };

  return (
    <>
      {/* Cinematic Intro Sequence (always mounts on reload) */}
      {!introComplete && <IntroSequence onComplete={handleIntroComplete} />}

      <Navbar active={showContent} />

      {/* Main Content */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          filter: showContent ? 'none' : 'blur(25px)',
          transform: showContent ? 'none' : 'scale(1.08)',
          transition: 'opacity 0.9s ease-out, filter 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: showContent ? 'auto' : 'none',
          position: 'relative',
          width: '100%',
          transformOrigin: 'center 30vh',
        }}
      >
        <main>
          {/* Hero Section */}
          <HeroSection active={showContent} />

          {/* Services Section */}
          <ServicesSection />

          {/* Why Choose Us */}
          <WhyChooseUsSection />

          {/* Industries Section */}
          <IndustriesSection />

          {/* News & Insights */}
          <InsightsSection />

          {/* Statistics */}
          <StatsBar />

          {/* Locations */}
          <LocationsSection />

          {/* FAQ */}
          <FAQSection />

          {/* Contact */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
