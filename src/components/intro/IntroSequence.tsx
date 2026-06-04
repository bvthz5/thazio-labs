'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroSequenceProps {
  onComplete: () => void;
}

type IntroPhase = 'void' | 'ignition' | 'arrival' | 'breathing' | 'dissolve' | 'splitting' | 'complete';

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

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<IntroPhase>('void');
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundBtn, setShowSoundBtn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);
  const [showRefraction, setShowRefraction] = useState(false);
  const [flareState, setFlareState] = useState<'none' | 'buildup' | 'burst'>('none');
  const [glowState, setGlowState] = useState<'none' | 'buildup' | 'burst'>('none');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const phaseRef = useRef<IntroPhase>(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Trigger cinematic VFX when exiting
  useEffect(() => {
    if (phase === 'dissolve') {
      setFlareState('buildup');
      setGlowState('buildup');
    } else if (phase === 'splitting') {
      setShowRefraction(true);
      setFlareState('burst');
      setGlowState('burst');
      
      // Delay the Lens Bloom to allow slow-motion letter scattering
      const bloomTimer = setTimeout(() => {
        setShowWhiteFlash(true);
      }, 600);
      
      return () => clearTimeout(bloomTimer);
    } else if (phase === 'complete') {
      // Keep state clean
    } else {
      setShowWhiteFlash(false);
      setShowRefraction(false);
      setFlareState('none');
      setGlowState('none');
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

  // Safe Phase Transition Trigger — clean two-stage cinematic exit
  const triggerDissolve = useCallback(() => {
    if (phaseRef.current !== 'dissolve' && phaseRef.current !== 'splitting' && phaseRef.current !== 'complete') {
      setPhase('dissolve');
      
      // Begin audio fade
      fadeVolume(1200);

      // After 500ms of subtle energy buildup, trigger the slow-motion explosion
      setTimeout(() => {
        setPhase('splitting');
      }, 500);
      
      // Reveal homepage content when the delayed Lens Bloom covers the screen
      setTimeout(() => {
        onComplete();
      }, 1200);

      // Complete the intro phase — Lens Bloom finishes fading
      setTimeout(() => {
        setPhase('complete');
      }, 1600);
    }
  }, [onComplete, fadeVolume]);

  // Legacy alias for backward compat with skip button and safety timer
  const triggerSplitting = triggerDissolve;

  // Trigger transition 1.4s before video ends
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && video.duration > 0) {
      if (video.currentTime >= video.duration - 1.4) {
        triggerDissolve();
      }
    }
  }, [triggerDissolve]);

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
      if (phaseRef.current !== 'dissolve' && phaseRef.current !== 'splitting' && phaseRef.current !== 'complete') {
        triggerDissolve();
      }
    }, 8500);
    return () => clearTimeout(safetyTimer);
  }, [triggerDissolve]);

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
          } else if (phaseRef.current === 'dissolve') {
            // During dissolve: swirling vortex collapse pulled INWARD toward center
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const radialForce = -3.5 / (dist * 0.005 + 1); // Inward pull
            const swirlForce = 2.5 / (dist * 0.005 + 1); // Swirl force
            forceX = (dx / dist) * radialForce + (-dy / dist) * swirlForce;
            forceY = (dy / dist) * radialForce + (dx / dist) * swirlForce;
          } else if (phaseRef.current === 'splitting') {
            // During splitting: explosive outward burst from center (higher power)
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 10.0 / (dist * 0.002 + 1); // Strong explosive force
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
          
          if (phaseRef.current === 'dissolve') {
            // Particles intensify during dissolve buildup
            p.alpha = p.maxAlpha * (0.6 + Math.sin(time * 0.08 + p.pulsePhase!) * 0.4);
          } else if (phaseRef.current === 'splitting') {
            p.alpha = Math.max(0, p.alpha - 0.04); // Slower fade to drift during slow-motion blast
          } else {
            p.alpha = p.maxAlpha * (0.35 + Math.sin(time * p.pulseSpeed! + p.pulsePhase!) * 0.65);
          }
        }

        // Render shapes
        if (p.alpha > 0) {
          if (phaseRef.current === 'splitting' && p.type !== 'shooting_star') {
            // High-velocity motion blurred sparks
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 2.2, p.y - p.vy * 2.2);
            
            const color = p.hue === 205 ? '0, 212, 255' : p.hue === 275 ? '123, 47, 190' : '255, 0, 127';
            ctx.strokeStyle = `rgba(${color}, ${p.alpha})`;
            ctx.lineWidth = p.size * (p.type === 'energy_mote' ? 1.4 : 0.8);
            ctx.lineCap = 'round';
            ctx.stroke();
          } else if (p.type === 'shooting_star') {
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
          initial={{ opacity: 1, backgroundColor: '#000000' }}
          animate={
            phase === 'splitting'
              ? {
                  backgroundColor: ['#000000', '#000000', 'rgba(0,0,0,0)'],
                }
              : { backgroundColor: '#000000' }
          }
          transition={
            phase === 'splitting'
              ? {
                  backgroundColor: {
                    times: [0, 0.54, 1],
                    duration: 1.1,
                    ease: 'easeOut',
                  }
                }
              : undefined
          }
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            perspective: '1200px',
            pointerEvents: (phase === 'splitting' || phase === 'dissolve') ? 'none' : 'auto',
          }}
        >
          {/* ─── Clean Lens Bloom Reveal (the decisive cinematic bridge) ─── */}
          {showWhiteFlash && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.8, 2.5, 6.0],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 0.5, // Blinding speed flash reveal
                times: [0, 0.2, 0.45, 1],
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                position: 'absolute',
                width: '150vmax',
                height: '150vmax',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, #ffffff 35%, rgba(255, 255, 255, 0.9) 65%, transparent 100%)',
                zIndex: 100000,
                pointerEvents: 'none',
                transformOrigin: 'center center',
              }}
            />
          )}

          {/* ─── Refraction Shockwave ─── */}
          {showRefraction && <div className="refraction-shockwave" />}

          {/* ─── Volumetric Glow ─── */}
          {glowState !== 'none' && (
            <div className={`volumetric-glow volumetric-glow-${glowState}`} />
          )}

          {/* ─── Anamorphic Lens Flare ─── */}
          {flareState !== 'none' && (
            <div className={`anamorphic-lens-flare anamorphic-flare-${flareState}`} />
          )}


          {/* ─── Cinematic Background Video ─── */}
          <motion.video
            ref={videoRef}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={triggerDissolve}
            initial={{ opacity: 0, scale: 1, filter: 'blur(0px) brightness(1)' }}
            animate={
              phase === 'void'
                ? { opacity: 0, scale: 1, filter: 'blur(0px) brightness(1)' }
                : phase === 'dissolve'
                ? {
                    // Dissolve: fade and blur out background video quickly to hide baked-in logo before collapse starts
                    opacity: 0,
                    scale: 1.03,
                    filter: 'blur(10px) brightness(0.1)',
                    transition: { duration: 0.3, ease: 'easeInOut' }
                  }
                : phase === 'splitting'
                ? {
                    // Stay faded/blurred behind the white curtain
                    opacity: 0,
                    scale: 1.05,
                    filter: 'blur(10px) brightness(0.1)',
                    transition: { duration: 0.1 }
                  }
                : { opacity: 0.65, scale: 1, filter: 'blur(0px) brightness(1)', transition: { duration: 1.2 } }
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
              willChange: 'opacity, filter, transform',
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
              opacity: (phase === 'splitting' || phase === 'dissolve') ? 0 : 0.85,
              transition: 'opacity 0.3s ease-out',
            }}
          />

          {/* ─── Center Energy Core (glowing orb) ─── */}
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
                  : phase === 'dissolve'
                  ? {
                      // Singularity contraction & intensification
                      opacity: 0.95,
                      scale: 0.4,
                      filter: 'blur(8px) brightness(2.5)',
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    }
                  : phase === 'splitting'
                  ? {
                      // Explosion
                      opacity: 0,
                      scale: 4.5,
                      filter: 'blur(2px) brightness(3)',
                      transition: { duration: 0.25, ease: 'easeOut' }
                    }
                  : {}
              }
              transition={phase === 'ignition' ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } : undefined}
              style={{
                zIndex: 4,
              }}
            />
          )}

          {/* ─── Rotating Thin Conic-Gradient Ring ─── */}
          {phase !== 'void' && phase !== 'complete' && (
            <motion.div
              className="gradient-ring-outer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === 'dissolve'
                  ? {
                      opacity: 0.5,
                      scale: 0.8,
                      rotate: 720,
                      transition: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }
                  : phase === 'splitting'
                  ? {
                      opacity: 0,
                      scale: 1.0,
                      rotate: 720,
                      transition: { duration: 0.05, ease: 'easeOut' }
                    }
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

          {/* ─── Volumetric Radial Light Rays (8 slow-rotating rays) ─── */}
          {phase !== 'void' && phase !== 'complete' && (
            <motion.div
              className="radial-ray-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === 'dissolve'
                  ? {
                      opacity: 0.7,
                      scale: 0.9,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    }
                  : phase === 'splitting'
                  ? {
                      opacity: 0,
                      scale: 1.0,
                      transition: { duration: 0.05, ease: 'easeOut' }
                    }
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
                phase === 'splitting' || phase === 'dissolve'
                  ? { opacity: 0, transition: { duration: 0.25 } }
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
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* 1. Outer Trail (Neural Violet / Magenta glow trail) */}
                  <motion.span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      fontFamily: 'var(--font-heading)',
                      fontSize: isMobile ? 'clamp(1.8rem, 9vw, 3rem)' : 'clamp(2.2rem, 6.0vw, 5.5rem)',
                      fontWeight: 800,
                      color: '#7b2fbe',
                      WebkitTextStroke: '1px rgba(123, 47, 190, 0.4)',
                      mixBlendMode: 'screen',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      willChange: 'transform, opacity, filter',
                      transformStyle: 'preserve-3d',
                      zIndex: 8,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      y: '10vh',
                      rotateX: 90,
                      filter: 'blur(20px)',
                    }}
                    animate={
                      phase === 'dissolve'
                        ? {
                            x: [
                              `${-(index - 2.5) * 0.8}vw`,
                              `${-(index - 2.5) * 0.8 + (index % 2 === 0 ? 0.25 : -0.25)}vw`,
                              `${-(index - 2.5) * 0.8 + (index % 2 === 0 ? -0.25 : 0.25)}vw`,
                              `${-(index - 2.5) * 0.8}vw`
                            ],
                            y: [
                              '0.3vh',
                              '-0.1vh',
                              '0.3vh',
                              '-0.1vh'
                            ],
                            scale: 0.95,
                            opacity: 0.8,
                            filter: 'blur(2px)',
                            textShadow: '0 0 30px #7b2fbe, 0 0 50px #ff007f',
                            transition: {
                              x: { repeat: Infinity, duration: 0.16, ease: 'linear' },
                              y: { repeat: Infinity, duration: 0.13, ease: 'linear' },
                              scale: { duration: 0.5 },
                              opacity: { duration: 0.5 },
                              filter: { duration: 0.5 }
                            }
                          }
                        : phase === 'splitting'
                        ? {
                            x: `${(index - 2.5) * 40}vw`,
                            y: `${(index % 2 === 0 ? -22 : 22)}vh`,
                            z: 400,
                            scale: 1.6,
                            rotateX: (index - 2.5) * 14,
                            rotateY: (index % 2 === 0 ? -25 : 25),
                            rotateZ: (index - 2.5) * 9,
                            opacity: [0.7, 0.4, 0],
                            filter: ['blur(3px)', 'blur(6px)', 'blur(30px)'],
                            textShadow: '0 0 30px #7b2fbe, 0 0 60px #ff007f',
                            transition: {
                              x: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 },
                              y: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 },
                              z: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 },
                              scale: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 },
                              rotateX: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 },
                              rotateY: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 },
                              rotateZ: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 },
                              opacity: { times: [0, 0.5, 1], duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 },
                              filter: { times: [0, 0.5, 1], duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.06 }
                            }
                          }
                        : phase === 'breathing'
                        ? {
                            opacity: 0.35,
                            y: [2, -4, 2],
                            x: '0vw',
                            z: 0,
                            scale: 1.02,
                            filter: 'blur(4px)',
                            textShadow: '0 0 20px rgba(123, 47, 190, 0.4)',
                            transition: {
                              y: {
                                repeat: Infinity,
                                duration: 3.2,
                                ease: 'easeInOut',
                                delay: index * 0.18,
                              }
                            }
                          }
                        : phase === 'arrival'
                        ? {
                            opacity: [0, 0.4, 0],
                            y: '0vh',
                            x: '0vw',
                            z: 0,
                            scale: 1,
                            filter: 'blur(2px)',
                            transition: {
                              duration: 1.2,
                              delay: index * 0.12 + 0.08
                            }
                          }
                        : {}
                    }
                  >
                    {char}
                  </motion.span>

                  {/* 2. Inner Trail (Electric Blue / Soft Cyan glow trail) */}
                  <motion.span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      fontFamily: 'var(--font-heading)',
                      fontSize: isMobile ? 'clamp(1.8rem, 9vw, 3rem)' : 'clamp(2.2rem, 6.0vw, 5.5rem)',
                      fontWeight: 800,
                      color: '#00d4ff',
                      WebkitTextStroke: '1px rgba(0, 212, 255, 0.4)',
                      mixBlendMode: 'screen',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      willChange: 'transform, opacity, filter',
                      transformStyle: 'preserve-3d',
                      zIndex: 9,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      y: '10vh',
                      rotateX: 90,
                      filter: 'blur(20px)',
                    }}
                    animate={
                      phase === 'dissolve'
                        ? {
                            x: [
                              `${-(index - 2.5) * 0.75}vw`,
                              `${-(index - 2.5) * 0.75 + (index % 2 === 0 ? -0.2 : 0.2)}vw`,
                              `${-(index - 2.5) * 0.75 + (index % 2 === 0 ? 0.2 : -0.2)}vw`,
                              `${-(index - 2.5) * 0.75}vw`
                            ],
                            y: [
                              '-0.2vh',
                              '0.2vh',
                              '-0.2vh',
                              '0.2vh'
                            ],
                            scale: 0.93,
                            opacity: 0.9,
                            filter: 'blur(1px)',
                            textShadow: '0 0 25px #00d4ff, 0 0 45px #0066ff',
                            transition: {
                              x: { repeat: Infinity, duration: 0.14, ease: 'linear' },
                              y: { repeat: Infinity, duration: 0.11, ease: 'linear' },
                              scale: { duration: 0.5 },
                              opacity: { duration: 0.5 },
                              filter: { duration: 0.5 }
                            }
                          }
                        : phase === 'splitting'
                        ? {
                            x: `${(index - 2.5) * 37}vw`,
                            y: `${(index % 2 === 0 ? -20 : 20)}vh`,
                            z: 600,
                            scale: 1.9,
                            rotateX: (index - 2.5) * 16,
                            rotateY: (index % 2 === 0 ? -30 : 30),
                            rotateZ: (index - 2.5) * 10,
                            opacity: [0.9, 0.5, 0],
                            filter: ['blur(1.5px)', 'blur(3px)', 'blur(20px)'],
                            textShadow: '0 0 25px #00d4ff, 0 0 50px #0066ff',
                            transition: {
                              x: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 },
                              y: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 },
                              z: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 },
                              scale: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 },
                              rotateX: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 },
                              rotateY: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 },
                              rotateZ: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 },
                              opacity: { times: [0, 0.55, 1], duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 },
                              filter: { times: [0, 0.55, 1], duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 + 0.03 }
                            }
                          }
                        : phase === 'breathing'
                        ? {
                            opacity: 0.45,
                            y: [1, -5, 1],
                            x: '0vw',
                            z: 0,
                            scale: 1.01,
                            filter: 'blur(2px)',
                            textShadow: '0 0 15px rgba(0, 212, 255, 0.45)',
                            transition: {
                              y: {
                                repeat: Infinity,
                                duration: 3.2,
                                ease: 'easeInOut',
                                delay: index * 0.18,
                              }
                            }
                          }
                        : phase === 'arrival'
                        ? {
                            opacity: [0, 0.6, 0],
                            y: '0vh',
                            x: '0vw',
                            z: 0,
                            scale: 1,
                            filter: 'blur(1px)',
                            transition: {
                              duration: 1.2,
                              delay: index * 0.12 + 0.04
                            }
                          }
                        : {}
                    }
                  >
                    {char}
                  </motion.span>

                  {/* 3. Main Letter Layer (Gleaming white with high contrast shadows) */}
                  <motion.span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: isMobile ? 'clamp(1.8rem, 9vw, 3rem)' : 'clamp(2.2rem, 6.0vw, 5.5rem)',
                      fontWeight: 800,
                      letterSpacing: '0.02em',
                      color: '#ffffff',
                      willChange: 'transform, opacity, filter',
                      transformStyle: 'preserve-3d',
                      zIndex: 10,
                      position: 'relative',
                    }}
                    initial={{
                      opacity: 0,
                      y: '10vh',
                      scale: 0.3,
                      rotateX: 90,
                      filter: 'blur(20px)',
                    }}
                    animate={
                      phase === 'dissolve'
                        ? {
                            x: [
                              `${-(index - 2.5) * 0.7}vw`,
                              `${-(index - 2.5) * 0.7 + (index % 2 === 0 ? 0.15 : -0.15)}vw`,
                              `${-(index - 2.5) * 0.7 + (index % 2 === 0 ? -0.15 : 0.15)}vw`,
                              `${-(index - 2.5) * 0.7}vw`
                            ],
                            y: [
                              '0vh',
                              '0.2vh',
                              '-0.2vh',
                              '0vh'
                            ],
                            z: 0,
                            scale: 0.92,
                            rotateY: 0,
                            rotateX: 0,
                            rotateZ: [0, (index % 2 === 0 ? 0.5 : -0.5), 0],
                            opacity: 1,
                            filter: 'blur(0.5px)',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 212, 255, 1), 0 0 65px rgba(123, 47, 190, 0.8)',
                            transition: {
                              x: { repeat: Infinity, duration: 0.15, ease: 'linear' },
                              y: { repeat: Infinity, duration: 0.12, ease: 'linear' },
                              rotateZ: { repeat: Infinity, duration: 0.18, ease: 'linear' },
                              scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                              filter: { duration: 0.5 },
                              textShadow: { duration: 0.5 }
                            }
                          }
                        : phase === 'splitting'
                        ? {
                            x: `${(index - 2.5) * 35}vw`,
                            y: `${(index % 2 === 0 ? -18 : 18)}vh`,
                            z: 800,
                            scale: 2.2,
                            rotateX: (index - 2.5) * 18,
                            rotateY: (index % 2 === 0 ? -35 : 35),
                            rotateZ: (index - 2.5) * 12,
                            opacity: [1, 1, 0],
                            filter: ['blur(0px)', 'blur(0px)', 'blur(15px)'],
                            textShadow: '0 2px 12px rgba(0, 0, 0, 0.95), 0 0 25px rgba(255, 255, 255, 1), 0 0 45px rgba(0, 212, 255, 0.9), 0 0 75px rgba(123, 47, 190, 0.7)',
                            transition: {
                              x: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 },
                              y: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 },
                              z: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 },
                              scale: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 },
                              rotateX: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 },
                              rotateY: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 },
                              rotateZ: { duration: 1.4, ease: 'easeOut', delay: Math.abs(index - 2.5) * 0.04 },
                              opacity: {
                                times: [0, 0.65, 1],
                                duration: 1.4,
                                ease: 'easeOut',
                                delay: Math.abs(index - 2.5) * 0.04
                              },
                              filter: {
                                times: [0, 0.65, 1],
                                duration: 1.4,
                                ease: 'easeOut',
                                delay: Math.abs(index - 2.5) * 0.04
                              }
                            }
                          }
                        : phase === 'breathing'
                        ? {
                            opacity: 1,
                            y: [0, -6, 0],
                            x: '0vw',
                            z: 0,
                            rotate: [0, index % 2 === 0 ? 1 : -1, 0],
                            rotateY: 0,
                            rotateX: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                            textShadow: [
                              '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 102, 255, 0.85), 0 0 45px rgba(0, 102, 255, 0.45)',
                              '0 2px 12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 102, 255, 0.95), 0 0 60px rgba(0, 102, 255, 0.55)',
                              '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 102, 255, 0.85), 0 0 45px rgba(0, 102, 255, 0.45)',
                            ],
                            transition: {
                              y: {
                                repeat: Infinity,
                                duration: 3.2,
                                ease: 'easeInOut',
                                delay: index * 0.18,
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
                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 102, 255, 0.85), 0 0 50px rgba(0, 102, 255, 0.45)',
                            transition: {
                              type: 'spring',
                              stiffness: 140,
                              damping: 15,
                              mass: 0.9,
                              delay: index * 0.12,
                            }
                          }
                        : {}
                    }
                  >
                    {char}
                  </motion.span>
                </div>
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
                phase === 'splitting' || phase === 'dissolve'
                  ? { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
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
                phase === 'splitting' || phase === 'dissolve'
                  ? { opacity: 0, y: 15, transition: { duration: 0.2 } }
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
