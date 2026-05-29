'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    // Highly-optimized responsive scroll kinetics
    // duration: 0.85s gives snappier, immediate mousewheel response
    // touchMultiplier: 1.5 ensures trackpad gestures are highly responsive
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Snappy 1:1 scroll gearing
      touchMultiplier: 1.5, // Fluid, responsive trackpad kinetic slides
      syncTouch: false,
    });

    // Expose Lenis globally to allow high-performance coordinated scrolls across the app
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    // Update GSAP triggers on scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Global anchor click interceptor for seamless site-wide smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.replace('#', '');
        if (!targetId) return; // ignore empty hash links
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          lenis.scrollTo(element, {
            offset: -72,
            duration: 1.0,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };
    
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleAnchorClick);
    }

    // Native tick loop with hardware-accelerated auto-pausing during intro
    let rafId: number;
    function raf(time: number) {
      // Freeze scrolling while the cinematic intro overlay is active
      // This locks the viewport and saves CPU/GPU cycles during video playback
      if (typeof document !== 'undefined') {
        const hasIntro = document.querySelector('.intro-overlay');
        if (hasIntro) {
          lenis.stop();
        } else {
          lenis.start();
        }
      }
      
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Clean up completely
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
      }
      if (typeof document !== 'undefined') {
        document.removeEventListener('click', handleAnchorClick);
      }
    };
  }, []);
}
