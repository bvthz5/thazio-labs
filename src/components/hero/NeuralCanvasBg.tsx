'use client';

import React, { useEffect, useRef } from 'react';

interface MapParticle {
  relX: number;
  relY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  offsetX: number;
  offsetY: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
}

export default function NeuralCanvasBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    prevX: 0,
    prevY: 0,
    active: false,
    distanceMoved: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Relative coordinates database (scanned once)
    let mapCoords: { relX: number; relY: number; radius: number; alpha: number; phase: number; speed: number }[] = [];
    
    // Active particles & ripples
    let particles: MapParticle[] = [];
    let ripples: Ripple[] = [];
    let lastRippleX = 0;
    let lastRippleY = 0;

    let isMapLoaded = false;
    const mapImg = new Image();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    mapImg.src = `${basePath}/images/world_map_dots.png`;
    mapImg.onload = () => {
      isMapLoaded = true;
      scanMapPixels();
      resize();
    };

    mapImg.onerror = () => {
      console.warn('[NeuralCanvasBg] Failed to load world map dots image. Generating fallback coords.');
      generateFallbackMapCoords();
      resize();
    };

    // Scan World Map dots into relative coordinates
    const scanMapPixels = () => {
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      const scanW = 120;
      const scanH = 60;
      offscreen.width = scanW;
      offscreen.height = scanH;

      offCtx.drawImage(mapImg, 0, 0, scanW, scanH);

      try {
        const imgData = offCtx.getImageData(0, 0, scanW, scanH).data;
        mapCoords = [];

        for (let y = 0; y < scanH; y++) {
          for (let x = 0; x < scanW; x++) {
            const idx = (y * scanW + x) * 4;
            const alpha = imgData[idx + 3];

            if (alpha > 75) {
              const relX = (x + (Math.random() - 0.5) * 0.8) / scanW;
              const relY = (y + (Math.random() - 0.5) * 0.8) / scanH;
              // Slightly random base radii for natural variance
              const radius = Math.random() * 0.7 + 1.15;

              mapCoords.push({
                relX,
                relY,
                radius,
                alpha: Math.random() * 0.12 + 0.08, // Faint backdrop dots
                phase: Math.random() * Math.PI * 2,
                speed: 0.01 + Math.random() * 0.015
              });
            }
          }
        }
      } catch (err) {
        console.error('[NeuralCanvasBg] Error scanning map image:', err);
        generateFallbackMapCoords();
      }
    };

    const generateFallbackMapCoords = () => {
      mapCoords = [];
      const rows = 35;
      const cols = 70;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const lat = (r / rows) * Math.PI;
          const lon = (c / cols) * Math.PI * 2;
          const noise = Math.sin(lat * 3.5) * Math.cos(lon * 4.5);

          if (noise > 0.05 && r > 3 && r < rows - 5) {
            mapCoords.push({
              relX: c / cols,
              relY: r / rows,
              radius: Math.random() * 0.6 + 0.9,
              alpha: Math.random() * 0.12 + 0.08,
              phase: Math.random() * Math.PI * 2,
              speed: 0.012
            });
          }
        }
      }
    };

    // Calculate Cover bounds & instantiate active particles
    const buildParticles = () => {
      const mapRatio = 2.0;
      let mapW = width * 1.05;
      let mapH = mapW / mapRatio;
      if (mapH < height) {
        mapH = height * 1.05;
        mapW = mapH * mapRatio;
      }
      const startX = (width - mapW) / 2;
      const startY = (height - mapH) / 2;

      particles = mapCoords.map((coord) => ({
        relX: coord.relX,
        relY: coord.relY,
        x: startX + coord.relX * mapW,
        y: startY + coord.relY * mapH,
        vx: 0,
        vy: 0,
        offsetX: 0,
        offsetY: 0,
        radius: coord.radius,
        baseRadius: coord.radius,
        alpha: coord.alpha,
        baseAlpha: coord.alpha,
        phase: coord.phase,
        speed: coord.speed
      }));
    };

    // Resize Handler
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      buildParticles();
    };

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Clean canvas with transparent clearing
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      
      // Calculate mouse velocities (wake speed)
      const mouseVx = mouse.targetX - mouse.prevX;
      const mouseVy = mouse.targetY - mouse.prevY;
      mouse.prevX = mouse.targetX;
      mouse.prevY = mouse.targetY;

      // Mouse coordinates smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // --- Part 1: Update circular ripple waves ---
      ripples.forEach((r, idx) => {
        r.radius += r.speed;
        r.alpha = 1 - r.radius / r.maxRadius;
        if (r.radius >= r.maxRadius) {
          ripples.splice(idx, 1);
        }
      });

      // Layout values to map screen coordinates
      const mapRatio = 2.0;
      let mapW = width * 1.05;
      let mapH = mapW / mapRatio;
      if (mapH < height) {
        mapH = height * 1.05;
        mapW = mapH * mapRatio;
      }
      const startX_map = (width - mapW) / 2;
      const startY_map = (height - mapH) / 2;

      // --- Part 2: Update and draw map particles (with fluid physics & waves) ---
      particles.forEach((p) => {
        // Slow ambient wavy drift
        p.phase += p.speed;
        const waveX = Math.sin(time * 0.0005 + p.phase) * 1.0;
        const waveY = Math.cos(time * 0.0005 + p.phase) * 1.0;

        // Base anchor coordinate
        const anchorX = startX_map + p.relX * mapW + waveX;
        const anchorY = startY_map + p.relY * mapH + waveY;

        // 1. Friction physics on local velocities
        p.vx *= 0.91;
        p.vy *= 0.91;

        // 2. Add offsets by velocities
        p.offsetX += p.vx;
        p.offsetY += p.vy;

        // 3. Spring forces pulling particles back to anchor grid coordinates
        p.offsetX += (0 - p.offsetX) * 0.06;
        p.offsetY += (0 - p.offsetY) * 0.06;

        // Final coordinate
        p.x = anchorX + p.offsetX;
        p.y = anchorY + p.offsetY;

        // 4. Mouse Fluid Wake Force (drag and vortex)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = p.baseAlpha + Math.sin(time * 0.001 + p.phase) * 0.03;
        let radius = p.baseRadius;
        let colorStr = '125, 145, 175'; // cool corporate slate-blue

        const influenceRadius = 140;
        if (mouse.active && dist < influenceRadius) {
          const force = (influenceRadius - dist) / influenceRadius;
          
          // Apply mouse velocity vector to particles (drag effect)
          p.vx += mouseVx * force * 0.12;
          p.vy += mouseVy * force * 0.12;

          // Apply circular vortex/swirl force (wake effect)
          const swirlSpeed = 0.65;
          p.vx += (-dy / dist) * force * swirlSpeed;
          p.vy += (dx / dist) * force * swirlSpeed;

          // Make dots near cursor glow/grow
          alpha = p.baseAlpha + force * 0.35;
          radius = p.baseRadius + force * 1.2;
          colorStr = '0, 212, 255'; // neon cyan near cursor
        }

        // 5. Traveling Ripple Wave Front interaction
        ripples.forEach((r) => {
          const rx = p.x - r.x;
          const ry = p.y - r.y;
          const rDist = Math.sqrt(rx * rx + ry * ry);
          
          const waveWidth = 20; // width of wave front
          const distFromWaveFront = Math.abs(rDist - r.radius);

          if (distFromWaveFront < waveWidth) {
            // Wave collision force
            const waveForce = (waveWidth - distFromWaveFront) / waveWidth * r.alpha;
            
            // Push particles outwards along the wave vector
            p.vx += (rx / rDist) * waveForce * 0.75;
            p.vy += (ry / rDist) * waveForce * 0.75;

            // Flash colors and increase size as wave passes
            radius = p.baseRadius + waveForce * 2.0;
            alpha = p.baseAlpha + waveForce * 0.7;

            // Alternate colors dynamically to keep it extremely catchy
            if (r.radius < r.maxRadius * 0.5) {
              colorStr = '255, 0, 127'; // neon magenta wave front
            } else {
              colorStr = '0, 212, 255'; // neon cyan outer wave front
            }
          }
        });

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorStr}, ${Math.max(0.02, Math.min(1.0, alpha))})`;
        ctx.fill();
      });

      // --- Part 3: Draw Laser Constellation bridges from cursor ---
      if (mouse.active && particles.length > 0) {
        // Find the 8 nearest map particles to the cursor
        const sorted = particles
          .map((p, index) => {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            return { index, dist: Math.sqrt(dx * dx + dy * dy) };
          })
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 8);

        ctx.globalCompositeOperation = 'screen';
        sorted.forEach((item) => {
          const p = particles[item.index];
          const laserLimit = 160;

          if (item.dist < laserLimit) {
            const force = 1 - item.dist / laserLimit;
            const lineAlpha = force * 0.22;

            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            
            // Neon cyan connecting beams
            ctx.strokeStyle = `rgba(0, 212, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.55 * force;
            ctx.stroke();

            // Draw a fine glowing ring at the connected particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 212, 255, ${lineAlpha * 0.45})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        });
        ctx.globalCompositeOperation = 'source-over';
      }
    };

    // Event listeners & Ripple Spawner
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;

      // Track distance moved to spawn circular ripple wave fronts
      const mouse = mouseRef.current;
      const dx = mouse.targetX - lastRippleX;
      const dy = mouse.targetY - lastRippleY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn a new circular wave front every 40px cursor drag
      if (dist > 40) {
        ripples.push({
          x: mouse.targetX,
          y: mouse.targetY,
          radius: 5,
          maxRadius: Math.min(220, width * 0.3),
          speed: 4.2,
          alpha: 1.0
        });
        lastRippleX = mouse.targetX;
        lastRippleY = mouse.targetY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const tx = e.touches[0].clientX - rect.left;
      const ty = e.touches[0].clientY - rect.top;

      mouseRef.current.targetX = tx;
      mouseRef.current.targetY = ty;
      mouseRef.current.active = true;

      // Spawn ripple on touch drag too
      const dx = tx - lastRippleX;
      const dy = ty - lastRippleY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 40) {
        ripples.push({
          x: tx,
          y: ty,
          radius: 5,
          maxRadius: Math.min(200, width * 0.35),
          speed: 4.2,
          alpha: 1.0
        });
        lastRippleX = tx;
        lastRippleY = ty;
      }
    };

    const handleTouchStart = () => {
      mouseRef.current.active = true;
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    // Run setup
    resize();
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
}
