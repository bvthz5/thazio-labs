'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroSequenceProps {
  onComplete: () => void;
}

type IntroPhase = 'void' | 'ignition' | 'arrival' | 'breathing' | 'splitting' | 'complete';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  alpha: number;
  maxAlpha: number;
  hue: number;
  type: 'stardust' | 'shooting_star' | 'energy_mote';
  trail?: { x: number; y: number }[];
  life?: number;
  maxLife?: number;
  pulseSpeed?: number;
  pulsePhase?: number;
}

const letters = ['T', 'H', 'A', 'Z', 'I', 'O'];

// Detailed crash vectors: implode inwards towards center, then explode completely off-screen using consistent vw/vh coordinates
const letterCrashDirections = [
  { implodeXVw: 2.5,   implodeYVh: 0.2,  explodeX: '-110vw', explodeY: '-25vh', explodeRotate: -80, rotateY: -60 }, // T
  { implodeXVw: 1.5,   implodeYVh: 0.4,  explodeX: '-105vw', explodeY: '-50vh', explodeRotate: -45, rotateY: -35 }, // H
  { implodeXVw: 0.5,   implodeYVh: -0.2, explodeX: '-100vw', explodeY: '40vh',  explodeRotate: -15, rotateY: -15 }, // A
  { implodeXVw: -0.5,  implodeYVh: -0.2, explodeX: '100vw',  explodeY: '-40vh', explodeRotate: 15,  rotateY: 15 },  // Z
  { implodeXVw: -1.5,  implodeYVh: 0.4,  explodeX: '105vw',  explodeY: '50vh',  explodeRotate: 45,  rotateY: 35 },  // I
  { implodeXVw: -2.5,  implodeYVh: 0.2,  explodeX: '110vw',  explodeY: '25vh',  explodeRotate: 80,  rotateY: 60 },  // O
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<IntroPhase>('void');
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundBtn, setShowSoundBtn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showShockwave, setShowShockwave] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const phaseRef = useRef<IntroPhase>(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Trigger shockwave instantly as the letters part outward (120ms)
  useEffect(() => {
    if (phase === 'splitting') {
      const shockwaveTimer = setTimeout(() => {
        setShowShockwave(true);
      }, 120);
      return () => clearTimeout(shockwaveTimer);
    } else {
      setShowShockwave(false);
    }
  }, [phase]);

  // Detect mobile viewport for scaled-down animations
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent scrolling during the intro, but do not override the scrollbarGutter style to avoid horizontal layout shift on unmount.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Attempt autoplay on mount
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.6;
        try {
          videoRef.current.muted = false;
          await videoRef.current.play();
          setIsMuted(false);
          setShowSoundBtn(true);
        } catch {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            setShowSoundBtn(true);
            videoRef.current.play().catch(() => {});
          }
        }
      }
    };
    attemptAutoplay();
  }, []);

  // Toggle sound handler
  const handleToggleSound = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  }, []);

  // Audio volume fade-out utility for seamless sound exit
  const fadeVolume = useCallback((durationMs: number) => {
    const video = videoRef.current;
    if (!video || video.muted) return;
    
    const startVolume = video.volume;
    const startTime = performance.now();
    
    const animateVolume = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      video.volume = startVolume * (1 - progress);
      
      if (progress < 1) {
        requestAnimationFrame(animateVolume);
      } else {
        video.muted = true;
      }
    };
    
    requestAnimationFrame(animateVolume);
  }, []);

  // Safe Phase Transition Trigger for Splitting & Completion
  const triggerSplitting = useCallback(() => {
    if (phaseRef.current !== 'splitting' && phaseRef.current !== 'complete') {
      setPhase('splitting');
      
      // Smoothly fade out audio over 1.0s
      fadeVolume(1000);
      
      // Reveal homepage content at 200ms (as letters part and light flash peaks)
      setTimeout(() => {
        onComplete();
      }, 200);

      // Complete the intro phase at 1100ms
      setTimeout(() => {
        setPhase('complete');
      }, 1100);
    }
  }, [onComplete, fadeVolume]);

  // Trigger transition 1.0s before video ends so the video remains active/moving during cross-fade
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && video.duration > 0) {
      if (video.currentTime >= video.duration - 1.0) {
        triggerSplitting();
      }
    }
  }, [triggerSplitting]);

  // Phase Sequence Timers
  useEffect(() => {
    if (phase === 'void') {
      const ignitionTimer = setTimeout(() => {
        setPhase('ignition');
      }, 600);
      return () => clearTimeout(ignitionTimer);
    }
    
    if (phase === 'ignition') {
      const arrivalTimer = setTimeout(() => {
        setPhase('arrival');
      }, 1200); // 0.6s + 1.2s = 1.8s
      return () => clearTimeout(arrivalTimer);
    }
    
    if (phase === 'arrival') {
      const breathingTimer = setTimeout(() => {
        setPhase('breathing');
      }, 1700); // 1.8s + 1.7s = 3.5s
      return () => clearTimeout(breathingTimer);
    }
  }, [phase]);

  // Resilience Safety fallback timer
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (phaseRef.current !== 'splitting' && phaseRef.current !== 'complete') {
        triggerSplitting();
      }
    }, 8500);
    return () => clearTimeout(safetyTimer);
  }, [triggerSplitting]);

  // Magical Canvas Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (canvas) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    };
    window.addEventListener('resize', handleResize);

    const spawnParticle = (w: number, h: number, type?: 'stardust' | 'shooting_star' | 'energy_mote'): Particle => {
      const pType = type || (Math.random() < 0.7 ? 'stardust' : Math.random() < 0.88 ? 'energy_mote' : 'shooting_star');
      
      if (pType === 'shooting_star') {
        return {
          x: Math.random() * w,
          y: Math.random() * (h * 0.4),
          size: 1.0 + Math.random() * 1.5,
          vx: 3.5 + Math.random() * 4.5,
          vy: 1.8 + Math.random() * 2.5,
          baseVx: 3.5 + Math.random() * 4.5,
          baseVy: 1.8 + Math.random() * 2.5,
          alpha: 0,
          maxAlpha: 0.55 + Math.random() * 0.35,
          hue: Math.random() > 0.5 ? 205 : 320,
          type: 'shooting_star',
          trail: [],
          life: 0,
          maxLife: 45 + Math.random() * 40
        };
      } else if (pType === 'energy_mote') {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          size: 3.5 + Math.random() * 5.0,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.15 - Math.random() * 0.25,
          baseVx: (Math.random() - 0.5) * 0.25,
          baseVy: -0.15 - Math.random() * 0.25,
          alpha: 0.1 + Math.random() * 0.35,
          maxAlpha: 0.4 + Math.random() * 0.25,
          hue: Math.random() > 0.6 ? 205 : Math.random() > 0.5 ? 275 : 320,
          type: 'energy_mote',
          pulseSpeed: 0.015 + Math.random() * 0.025,
          pulsePhase: Math.random() * Math.PI * 2
        };
      } else {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          size: 0.7 + Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -0.08 - Math.random() * 0.15,
          baseVx: (Math.random() - 0.5) * 0.12,
          baseVy: -0.08 - Math.random() * 0.15,
          alpha: 0.15 + Math.random() * 0.45,
          maxAlpha: 0.55 + Math.random() * 0.35,
          hue: Math.random() > 0.5 ? 205 : 275,
          type: 'stardust',
          pulseSpeed: 0.01 + Math.random() * 0.018,
          pulsePhase: Math.random() * Math.PI * 2
        };
      }
    };

    const particleCount = isMobile ? 35 : 75;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(spawnParticle(width, height));
    }

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach((p, idx) => {
        if (p.type === 'shooting_star') {
          p.trail!.push({ x: p.x, y: p.y });
          if (p.trail!.length > 10) p.trail!.shift();
          
          p.x += p.vx;
          p.y += p.vy;
          p.life!++;
          
          const halfLife = p.maxLife! / 2;
          if (p.life! < halfLife) {
            p.alpha = (p.life! / halfLife) * p.maxAlpha;
          } else {
            p.alpha = (1 - (p.life! - halfLife) / halfLife) * p.maxAlpha;
          }
          
          if (p.life! >= p.maxLife! || p.x > width + 30 || p.y > height + 30) {
            particles[idx] = spawnParticle(width, height, 'shooting_star');
          }
        } else {
          let forceX = 0;
          let forceY = 0;
          
          if (phaseRef.current === 'ignition') {
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = Math.max(0, (280 - dist) / 80);
            forceX = (dx / dist) * force * 1.6;
            forceY = (dy / dist) * force * 1.6;
          } else if (phaseRef.current === 'splitting') {
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 3.5 / (dist * 0.005 + 1);
            forceX = (dx / dist) * force;
            forceY = (dy / dist) * force;
          }
          
          p.vx = p.vx * 0.94 + (p.baseVx + forceX) * 0.06;
          p.vy = p.vy * 0.94 + (p.baseVy + forceY) * 0.06;
          
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.type === 'stardust') {
            p.x += Math.sin(time * 0.02 + p.pulsePhase!) * 0.08;
          }
          
          if (p.y < -15) {
            p.y = height + 15;
            p.x = Math.random() * width;
          }
          if (p.x < -15 || p.x > width + 15) {
            p.x = Math.random() * width;
            p.y = height + 15;
          }
          
          if (phaseRef.current === 'splitting') {
            p.alpha = Math.max(0, p.alpha - 0.045);
          } else {
            p.alpha = p.maxAlpha * (0.35 + Math.sin(time * p.pulseSpeed! + p.pulsePhase!) * 0.65);
          }
        }

        // Render shapes
        if (p.alpha > 0) {
          if (p.type === 'shooting_star') {
            if (p.trail!.length > 1) {
              ctx.beginPath();
              ctx.moveTo(p.trail![0].x, p.trail![0].y);
              for (let i = 1; i < p.trail!.length; i++) {
                ctx.lineTo(p.trail![i].x, p.trail![i].y);
              }
              const grad = ctx.createLinearGradient(p.trail![0].x, p.trail![0].y, p.x, p.y);
              grad.addColorStop(0, 'rgba(0,0,0,0)');
              grad.addColorStop(1, p.hue === 205 ? `rgba(0, 212, 255, ${p.alpha})` : `rgba(255, 0, 127, ${p.alpha})`);
              
              ctx.strokeStyle = grad;
              ctx.lineWidth = p.size;
              ctx.lineCap = 'round';
              ctx.stroke();
            }
          } else if (p.type === 'energy_mote') {
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.8);
            const color = p.hue === 205 ? '0, 212, 255' : p.hue === 275 ? '123, 47, 190' : '255, 0, 127';
            grad.addColorStop(0, `rgba(${color}, ${p.alpha})`);
            grad.addColorStop(0.4, `rgba(${color}, ${p.alpha * 0.35})`);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.8);
            const color = p.hue === 205 ? '0, 212, 255' : '123, 47, 190';
            grad.addColorStop(0, `rgba(${color}, ${p.alpha})`);
            grad.addColorStop(0.3, `rgba(${color}, ${p.alpha * 0.25})`);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  const mobileScale = isMobile ? 0.35 : 1;

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          animate={
            phase === 'splitting'
              ? { opacity: 0 }
              : { opacity: 1 }
          }
          exit={{ opacity: 0 }}
          transition={
            phase === 'splitting'
              ? { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } // Fades out from 300ms to 1100ms
              : { duration: 0.4 }
          }
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            perspective: '1200px',
            pointerEvents: phase === 'splitting' ? 'none' : 'auto',
          }}
        >
          {/* Cinematic Focus Pull Transition (No overlay graphic, just clean defocus to black) */}

          {/* Full-Screen Radial Light Flash (Wipes the screen clean during fly-through) */}
          {showShockwave && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.75, 0],
              }}
              transition={{
                times: [0, 0.25, 1], // Peaks quickly to act as a visual bridge
                duration: 0.7,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0%, rgba(0, 212, 255, 0.15) 50%, transparent 100%)',
                zIndex: 11,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
            />
          )}

          {/* Singularity Collapse Multi-Layered Shockwave Rings */}
          {showShockwave && (
            <>
              {/* Outer Cyan Energy Ring */}
              <motion.div
                initial={{ scale: 0, opacity: 1, border: '4px solid rgba(0, 212, 255, 0.9)' }}
                animate={{
                  scale: isMobile ? 9 : 20, // Expand rapidly to sweep off-screen
                  opacity: 0,
                  border: '1px solid rgba(0, 212, 255, 0)',
                }}
                transition={{ duration: 0.7, ease: [0.1, 0.8, 0.2, 1] }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100px',
                  height: '100px',
                  marginLeft: '-50px',
                  marginTop: '-50px',
                  borderRadius: '50%',
                  boxShadow: '0 0 50px rgba(0, 212, 255, 0.8), inset 0 0 30px rgba(0, 212, 255, 0.4)',
                  zIndex: 13,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                }}
              />
              {/* Mid Deep Blue / Purple Ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0.8, border: '3px solid rgba(123, 47, 190, 0.8)' }}
                animate={{
                  scale: isMobile ? 8 : 17,
                  opacity: 0,
                  border: '1px solid rgba(123, 47, 190, 0)',
                }}
                transition={{ duration: 0.85, ease: [0.15, 0.85, 0.25, 1], delay: 0.05 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100px',
                  height: '100px',
                  marginLeft: '-50px',
                  marginTop: '-50px',
                  borderRadius: '50%',
                  boxShadow: '0 0 60px rgba(123, 47, 190, 0.6), inset 0 0 40px rgba(123, 47, 190, 0.3)',
                  zIndex: 12,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                }}
              />
              {/* Inner Bright White Core Flash Ring */}
              <motion.div
                initial={{ scale: 0, opacity: 1, border: '8px solid rgba(255, 255, 255, 0.95)' }}
                animate={{
                  scale: isMobile ? 6 : 14,
                  opacity: 0,
                  border: '1px solid rgba(255, 255, 255, 0)',
                }}
                transition={{ duration: 0.55, ease: [0.05, 0.9, 0.1, 1] }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100px',
                  height: '100px',
                  marginLeft: '-50px',
                  marginTop: '-50px',
                  borderRadius: '50%',
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.9), inset 0 0 20px rgba(255, 255, 255, 0.5)',
                  zIndex: 14,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                }}
              />
            </>
          )}

          {/* Cinematic Background Video - zIndex set to 3 to sit in front of curtains */}
          <motion.video
            ref={videoRef}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={triggerSplitting}
            initial={{ opacity: 0, scale: 1, filter: 'blur(0px)' }}
            animate={
              phase === 'void'
                ? { opacity: 0, scale: 1, filter: 'blur(0px)' }
                : phase === 'splitting'
                ? {
                    // Space-time warp: pull inward slightly during letter collapse, then expand outward and blur heavily
                    opacity: [0.65, 0.55, 0],
                    scale: [1, 0.96, 1.15],
                    filter: ['blur(0px)', 'blur(4px)', 'blur(25px)'],
                    transition: {
                      times: [0, 0.4, 1], // Warp peaks at 480ms (40% of 1.2s), finishes by 1200ms
                      duration: 1.2,
                      ease: 'easeInOut',
                    }
                  }
                : { opacity: 0.65, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2 } }
            }
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: isMobile ? 'contain' : 'cover',
              objectPosition: 'center center',
              zIndex: 3,
              willChange: 'opacity, filter, scale',
            }}
          >
            <source src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/videos/intro_2k.mp4`} type="video/mp4" />
          </motion.video>

          {/* Luxury ambient vignette overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.85) 100%)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />

          {/* Canvas Particle Field */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 4,
              pointerEvents: 'none',
              opacity: phase === 'splitting' ? 0 : 0.85,
              transition: 'opacity 0.15s ease-out',
            }}
          />

          {/* Center Energy Core (glowing orb) - Shut off immediately on splitting for solid black backdrop */}
          {phase !== 'void' && phase !== 'complete' && (
            <motion.div
              className="energy-core"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                phase === 'ignition'
                  ? { opacity: [0, 1, 0.7], scale: [0, 1.2, 1] }
                  : phase === 'arrival'
                  ? { opacity: 0.6, scale: 1 }
                  : phase === 'breathing'
                  ? {
                      opacity: [0.55, 0.7, 0.55],
                      scale: [1, 1.03, 1],
                      transition: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
                    }
                  : phase === 'splitting'
                  ? { opacity: 0, scale: 1, transition: { duration: 0.15 } } // Shut off instantly on splitting
                  : {}
              }
              transition={phase === 'ignition' ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } : undefined}
              style={{
                zIndex: 4,
              }}
            />
          )}

          {/* Rotating Thin Conic-Gradient Ring */}
          {phase !== 'void' && phase !== 'complete' && (
            <motion.div
              className="gradient-ring-outer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === 'splitting'
                  ? { opacity: 0, scale: 1.1, transition: { duration: 0.3 } }
                  : phase === 'ignition'
                  ? { opacity: [0, 0.25, 0.15], scale: 1 }
                  : phase === 'breathing'
                  ? {
                      opacity: 0.15,
                      scale: 1,
                      rotate: 360,
                      transition: {
                        opacity: { duration: 1 },
                        rotate: { repeat: Infinity, duration: 25, ease: 'linear' }
                      }
                    }
                  : { opacity: 0.15, scale: 1 }
              }
              style={{
                position: 'absolute',
                width: isMobile ? 290 : 500,
                height: isMobile ? 290 : 500,
                borderRadius: '50%',
                zIndex: 4,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
            >
              <div className="gradient-ring-inner" />
            </motion.div>
          )}

          {/* Volumetric Radial Light Rays (8 slow-rotating rays) */}
          {phase !== 'void' && phase !== 'complete' && (
            <motion.div
              className="radial-ray-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === 'splitting'
                  ? { opacity: 0, scale: 1.2, transition: { duration: 0.4 } }
                  : phase === 'ignition'
                  ? { opacity: [0, 0.5, 0.35], scale: 1 }
                  : phase === 'breathing'
                  ? {
                      opacity: [0.35, 0.5, 0.35],
                      scale: [1, 1.05, 1],
                      transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' }
                    }
                  : { opacity: 0.35, scale: 1 }
              }
              style={{
                position: 'absolute',
                width: isMobile ? 360 : 600,
                height: isMobile ? 360 : 600,
                zIndex: 3,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                  <div
                    key={idx}
                    className="radial-ray"
                    style={{
                      '--ray-angle': `${angle}deg`,
                      height: isMobile ? '200px' : '350px',
                    } as React.CSSProperties}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Center Energy Shockwave Ring */}
          {phase !== 'void' && phase !== 'complete' && (
            <motion.div
              style={{
                position: 'absolute',
                width: isMobile ? 260 : 380,
                height: isMobile ? 260 : 380,
                borderRadius: '50%',
                border: '1.5px solid rgba(0, 212, 255, 0.5)',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.35), inset 0 0 15px rgba(0, 212, 255, 0.35)',
                zIndex: 4,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                phase === 'ignition'
                  ? { opacity: [0, 0.8, 0], scale: [0, 1.6], transition: { duration: 1.0, ease: 'easeOut', delay: 0.15 } }
                  : { opacity: 0, scale: 0 }
              }
            />
          )}

          {/* Floating Geometric SVG Accents */}
          {phase !== 'void' && phase !== 'complete' && (
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 4,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={
                phase === 'splitting'
                  ? { opacity: 0, transition: { duration: 0.15 } }
                  : phase === 'breathing'
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.8 }}
            >
              {/* Orbiting dot 1 */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#00d4ff',
                  boxShadow: '0 0 10px #00d4ff',
                }}
                animate={{
                  x: [160 * Math.cos(0), 160 * Math.cos(Math.PI * 2)],
                  y: [80 * Math.sin(0), 80 * Math.sin(Math.PI * 2)],
                }}
                transition={{
                  x: { repeat: Infinity, duration: 9, ease: 'linear' },
                  y: { repeat: Infinity, duration: 9, ease: 'linear' },
                }}
              />
              {/* Orbiting dot 2 */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#ff007f',
                  boxShadow: '0 0 10px #ff007f',
                }}
                animate={{
                  x: [-190 * Math.cos(0), -190 * Math.cos(Math.PI * 2)],
                  y: [100 * Math.sin(0), 100 * Math.sin(Math.PI * 2)],
                }}
                transition={{
                  x: { repeat: Infinity, duration: 12, ease: 'linear' },
                  y: { repeat: Infinity, duration: 12, ease: 'linear' },
                }}
              />
              {/* Sci-Fi Hexagon SVG Outline */}
              <motion.svg
                viewBox="0 0 100 100"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: isMobile ? 320 : 540,
                  height: isMobile ? 320 : 540,
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.08,
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
              >
                <polygon
                  points="50,5 95,25 95,75 50,95 5,75 5,25"
                  fill="none"
                  stroke="url(#hexGrad)"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                />
                <defs>
                  <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="50%" stopColor="#7b2fbe" />
                    <stop offset="100%" stopColor="#ff007f" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
          )}

          <div
            style={{
              display: 'flex',
              gap: isMobile ? 'clamp(0.08rem, 0.5vw, 0.5rem)' : 'clamp(0.2rem, 0.9vw, 1.1rem)',
              zIndex: 10,
              position: 'relative',
              userSelect: 'none',
              transformStyle: 'preserve-3d',
            }}
          >
            {letters.map((char, index) => {
              // Calculate offset to translate each letter exactly to the center of the container
              const letterSpacingVw = isMobile ? 3.8 : 5.2;
              const collapseX = -(index - 2.5) * letterSpacingVw * mobileScale;

              return (
                <motion.span
                  key={index}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: isMobile ? 'clamp(1.8rem, 9vw, 3rem)' : 'clamp(2.2rem, 6.0vw, 5.5rem)',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    color: '#ffffff',
                    willChange: 'transform, opacity, filter',
                    transformStyle: 'preserve-3d',
                  }}
                  initial={{
                    opacity: 0,
                    y: '10vh',
                    scale: 0.3,
                    rotateX: 90,
                    filter: 'blur(20px)',
                  }}
                  animate={
                    phase === 'splitting'
                      ? {
                          x: `${(index - 2.5) * 32}vw`, // Pure outwards dispersion
                          y: `${(index === 0 || index === 5 ? -12 : index === 1 || index === 4 ? -6 : 0)}vh`,
                          z: 950, // Physical forward translation past lens
                          rotateY: (index - 2.5) * 24, // Continuous 3D yaw twist
                          rotateZ: (index - 2.5) * 12, // Continuous 3D roll tilt
                          scale: 7.5, // Grow to massive scale as they pass lens
                          opacity: 0, // Fade out smoothly
                          filter: 'blur(25px)', // Defocus depth of field
                          textShadow: '0 0 100px rgba(0, 102, 255, 0)', // Expands and fades out glow
                          transition: {
                            // Depth-staggered timing: center letters (A, Z) fly past first, then H/I, then T/O
                            duration: 0.6 + (Math.abs(index - 2.5) - 0.5) * 0.12,
                            delay: (Math.abs(index - 2.5) - 0.5) * 0.08,
                            ease: [0.16, 1, 0.3, 1], // Luxury ease-out curve (no pinch/recoil)
                          }
                        }
                      : phase === 'breathing'
                      ? {
                          opacity: 1,
                          y: [0, -6, 0], // Gentle floating up and down
                          x: '0vw',
                          z: 0,
                          rotate: [0, index % 2 === 0 ? 1 : -1, 0], // Gentle organic wiggle
                          rotateY: 0,
                          rotateX: 0,
                          scale: 1,
                          filter: 'blur(0px)',
                          textShadow: [
                            '0 0 25px rgba(0, 102, 255, 0.85), 0 0 45px rgba(0, 102, 255, 0.45)',
                            '0 0 35px rgba(0, 102, 255, 0.95), 0 0 60px rgba(0, 102, 255, 0.55)',
                            '0 0 25px rgba(0, 102, 255, 0.85), 0 0 45px rgba(0, 102, 255, 0.45)',
                          ],
                          transition: {
                            y: {
                              repeat: Infinity,
                              duration: 3.2,
                              ease: 'easeInOut',
                              delay: index * 0.18, // Staggered offsets
                            },
                            rotate: {
                              repeat: Infinity,
                              duration: 4.8,
                              ease: 'easeInOut',
                              delay: index * 0.22,
                            },
                            textShadow: {
                              repeat: Infinity,
                              duration: 3.5,
                              ease: 'easeInOut',
                              delay: index * 0.12,
                            },
                          }
                        }
                      : phase === 'arrival'
                      ? {
                          opacity: 1,
                          y: '0vh',
                          x: '0vw',
                          z: 0,
                          rotate: 0,
                          rotateY: 0,
                          rotateX: 0,
                          scale: 1,
                          filter: 'blur(0px)',
                          textShadow: '0 0 25px rgba(0, 102, 255, 0.85), 0 0 50px rgba(0, 102, 255, 0.45)',
                          transition: {
                            type: 'spring',
                            stiffness: 140, // Luxury softer spring
                            damping: 15, // Butter-smooth settle
                            mass: 0.9, // Added presence and weight
                            delay: index * 0.12,
                          }
                        }
                      : {}
                  }
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          {/* Sound Toggle Button (Conic-Border) */}
          {showSoundBtn && phase !== 'complete' && (
            <motion.div
              style={{
                position: 'absolute',
                top: isMobile ? '16px' : '24px',
                right: isMobile ? '16px' : '32px',
                zIndex: 6,
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === 'splitting'
                  ? { opacity: 0, scale: 0.8, transition: { duration: 0.15 } }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                onClick={handleToggleSound}
                className="premium-sound-btn"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
              >
                <div className="premium-sound-btn-content">
                  {isMuted ? (
                    <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </div>
              </button>
            </motion.div>
          )}

          {/* Premium Enter Platform Skip Prompt */}
          {phase !== 'complete' && (
            <motion.div
              style={{
                position: 'absolute',
                bottom: isMobile ? '12%' : '8%',
                zIndex: 6,
              }}
              initial={{ opacity: 0, y: 25 }}
              animate={
                phase === 'splitting'
                  ? { opacity: 0, y: 15, transition: { duration: 0.15 } }
                  : phase === 'void' || phase === 'ignition'
                  ? {}
                  : { opacity: 1, y: 0 }
              }
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            >
              <button
                onClick={triggerSplitting}
                className="premium-btn"
                aria-label="Enter Platform"
              >
                <div className="premium-btn-glow" />
                <div className="premium-btn-content">
                  <span>Enter Platform</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
