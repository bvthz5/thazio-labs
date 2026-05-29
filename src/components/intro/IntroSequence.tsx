'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroSequenceProps {
  onComplete: () => void;
}

// Symmetrical left/right explosive 3D splitting trajectories
const letterDirections = [
  { char: 'T', x: -900, y: -150, rotate: -120 }, // Left Curtain fly-out
  { char: 'H', x: -750, y: -350, rotate: -70 },
  { char: 'A', x: -600, y: 250, rotate: -40 },
  { char: 'Z', x: 600, y: -350, rotate: 40 },   // Right Curtain fly-out
  { char: 'I', x: 750, y: 350, rotate: 70 },
  { char: 'O', x: 900, y: 150, rotate: 120 },
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<'arrival' | 'dancing' | 'splitting' | 'complete'>('arrival');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Attempt autoplay on mount
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.6;
        try {
          // Try to play with sound first
          await videoRef.current.play();
        } catch (err) {
          // If browser blocks unmuted autoplay, instantly fallback to muted so the video still plays automatically!
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        }
      }
    };
    attemptAutoplay();
  }, []);

  // Main sequence timers
  useEffect(() => {

    // The video is now handled in the attemptAutoplay effect above

    // Phase 1 -> 2: Staggered letters fade in quickly (2.0s)
    const dancingTimer = setTimeout(() => {
      if (phaseRef.current === 'arrival') {
        setPhase('dancing');
      }
    }, 2000);

    // Resilience Fallback: If video loading fails or autoplay is blocked, open the platform anyway
    const safetyTimer = setTimeout(() => {
      if (phaseRef.current === 'arrival' || phaseRef.current === 'dancing') {
        setPhase('splitting');
        setTimeout(() => {
          if (phaseRef.current !== 'complete') {
            setPhase('complete');
            onComplete();
          }
        }, 1400); // matches the 1.4s curtain ease exactly!
      }
    }, 7000);

    return () => {
      clearTimeout(dancingTimer);
      clearTimeout(safetyTimer);
    };
  }, [phase, onComplete]);

  useEffect(() => {
    // ----------------------------------------------------
    // Magical Twinkling Stardust Particle Engine (Canvas 2D)
    // ----------------------------------------------------
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Generate magical stardust
    const particleCount = 75;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vy: number;
      vx: number;
      hue: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.8 + Math.random() * 2.2, // fine luxury sparkles
        vy: -0.15 - Math.random() * 0.25, // upward float
        vx: (Math.random() - 0.5) * 0.15, // minor organic drift
        hue: Math.random() > 0.5 ? 205 : 275, // Shifting Cyan/Electric Blue or Magenta/Violet hue
        alpha: 0.1 + Math.random() * 0.55,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Render magical stardust
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Update positions
        p.y += p.vy;
        p.x += p.vx + Math.sin(time * 0.01 + p.twinkleOffset) * 0.05; // snake drift

        // Recycle particles reaching top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        // Sinusoidal Twinkling Easing
        const currentAlpha = Math.max(0.05, p.alpha * (0.3 + Math.sin(time * p.twinkleSpeed + p.twinkleOffset) * 0.7));

        // Soft Radial Glow gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        if (p.hue === 205) {
          // Cyan glow
          grad.addColorStop(0, `rgba(0, 212, 255, ${currentAlpha})`);
          grad.addColorStop(0.3, `rgba(0, 212, 255, ${currentAlpha * 0.4})`);
        } else {
          // Violet glow
          grad.addColorStop(0, `rgba(255, 0, 127, ${currentAlpha})`); // neon magenta
          grad.addColorStop(0.3, `rgba(123, 47, 190, ${currentAlpha * 0.4})`);
        }
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleVideoEnded = () => {
    // The exact millisecond the video completes, start the explosive curtain reveal & letter blast!
    if (phaseRef.current === 'arrival' || phaseRef.current === 'dancing') {
      setPhase('splitting');
      
      // After the 1.4s curtain slide and letter blast animation finishes, open the site cleanly
      setTimeout(() => {
        if (phaseRef.current !== 'complete') {
          setPhase('complete');
          onComplete();
        }
      }, 1400); // matches the 1.4s curtain ease exactly!
    }
  };

  const handleSkip = () => {
    if (phaseRef.current === 'arrival' || phaseRef.current === 'dancing') {
      setPhase('splitting');
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 1200); // slightly snappier reveal for user skip click
    }
  };

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            background: 'transparent', // container is transparent to reveal homepage underneath
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            perspective: '1200px', // enables gorgeous physical 3D perspective
          }}
        >
          {/* Theater Curtain Left Panel */}
          <motion.div
            initial={{ x: '0%' }}
            animate={phase === 'splitting' ? { x: '-100%' } : { x: '0%' }}
            transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50.2vw', // minor 0.2vw overlap to guarantee a completely seamless center seam
              height: '100%',
              background: 'radial-gradient(circle at 100% 50%, #0d122b 0%, #000000 100%)', // luxury glowing edge
              zIndex: 2,
              boxShadow: '15px 0 40px rgba(0,0,0,0.95)', // depth separation via shadows looks infinitely richer than borders
              willChange: 'transform',
            }}
          />

          {/* Theater Curtain Right Panel */}
          <motion.div
            initial={{ x: '0%' }}
            animate={phase === 'splitting' ? { x: '100%' } : { x: '0%' }}
            transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '50.2vw', // minor 0.2vw overlap to guarantee a completely seamless center seam
              height: '100%',
              background: 'radial-gradient(circle at 0% 50%, #0d122b 0%, #000000 100%)', // luxury glowing edge
              zIndex: 2,
              boxShadow: '-15px 0 40px rgba(0,0,0,0.95)',
              willChange: 'transform',
            }}
          />

          {/* Shifting Magical Nebula Glow Core (Behind letters, on top of curtains) */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 360],
              opacity: [0.08, 0.16, 0.08],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '70vw',
              height: '70vw',
              background: 'radial-gradient(circle, rgba(0, 102, 255, 0.25) 0%, rgba(123, 47, 190, 0.15) 45%, transparent 70%)',
              zIndex: 3,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
              willChange: 'transform, opacity',
            }}
          />

          {/* Magical Twinkling Stardust Particle Field (Canvas 2D) */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 3,
              pointerEvents: 'none',
              opacity: phase === 'splitting' ? 0 : 0.85,
              transition: 'opacity 1.0s ease-in-out',
            }}
          />

          {/* 1. Cinematic Background Video - Rendered raw, fades out exactly when curtains slide open */}
          <video
            ref={videoRef}
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 3, // sits in front of curtains during intro
              opacity: phase === 'splitting' ? 0 : 0.45,
              transition: 'opacity 0.8s ease-in-out',
              willChange: 'opacity',
            }}
          >
            <source src="/thazio-labs/videos/intro.mp4" type="video/mp4" />
          </video>

          {/* Luxury ambient vignette overlay - provides text contrast organically */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.85) 100%)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* 2. Hardware-Accelerated Letter Animations Container (No expensive CPU/GPU filters) */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(0.2rem, 1.2vw, 1.5rem)',
              zIndex: 4, // sits on top of video and curtains
              position: 'relative',
              userSelect: 'none',
              transformStyle: 'preserve-3d', // enables true 3D rotations for children
            }}
          >
            {letterDirections.map((item, index) => (
              <motion.span
                key={index}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 8vw, 8rem)',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  color: '#ffffff',
                  willChange: 'transform, opacity, filter',
                  transformStyle: 'preserve-3d',
                }}
                initial={{ 
                  opacity: 0, 
                  y: 80, 
                  rotateX: 45,
                  scale: 0.8,
                  filter: 'blur(10px)',
                }}
                animate={
                  phase === 'splitting'
                    ? {
                        x: item.x,
                        y: item.y,
                        rotate: item.rotate,
                        rotateY: item.rotate * 0.8,
                        scale: 0.2,
                        opacity: 0,
                        filter: 'blur(16px)', // organic motion blur
                        transition: { duration: 1.4, ease: [0.85, 0, 0.15, 1] },
                      }
                    : phase === 'dancing'
                    ? {
                        opacity: 1,
                        y: [0, -12, 0], 
                        x: [0, index % 2 === 0 ? 8 : -8, 0],
                        rotate: [0, index % 2 === 0 ? 3 : -3, 0],
                        rotateY: [0, index % 2 === 0 ? 15 : -15, 0],
                        scale: [1, 1.04, 1],
                        filter: 'blur(0px)',
                        textShadow: [
                          '0 0 30px rgba(0, 102, 255, 0.35), 0 0 60px rgba(123, 47, 190, 0.15)',
                          '0 0 50px rgba(0, 102, 255, 0.55), 0 0 100px rgba(123, 47, 190, 0.35)',
                          '0 0 30px rgba(0, 102, 255, 0.35), 0 0 60px rgba(123, 47, 190, 0.15)',
                        ],
                        transition: {
                          duration: 5.0,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.2,
                        },
                      }
                    : {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        textShadow: '0 0 40px rgba(0, 102, 255, 0.4), 0 0 80px rgba(123, 47, 190, 0.2)',
                        transition: {
                          duration: 1.4,
                          delay: index * 0.16,
                          ease: [0.16, 1, 0.3, 1], 
                        },
                      }
                }
              >
                {item.char}
              </motion.span>
            ))}
          </div>





          {/* 3. Luxury Enter Platform Skip Prompt */}
          <motion.button
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={
              phase === 'splitting'
                ? { opacity: 0, transition: { duration: 0.4 } }
                : { opacity: 0.5 }
            }
            whileHover={{ opacity: 0.95 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '8%',
              zIndex: 4, // sits on top
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              color: '#ffffff',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease, background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            Enter Platform
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
