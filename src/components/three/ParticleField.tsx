'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Static pure generator function to bypass hook purity check
function generateRandomParticles(count: number) {
  const pos = new Float32Array(count * 3);
  const spd = new Float32Array(count);
  const phs = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

    spd[i] = 0.05 + Math.random() * 0.1;
    phs[i] = Math.random() * Math.PI * 2;
  }

  return { pos, spd, phs };
}

function createCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(0, 102, 255, 0.8)');
    gradient.addColorStop(0.3, 'rgba(0, 212, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
  }
  return new THREE.CanvasTexture(canvas);
}

interface ParticlesProps {
  count?: number;
}

function Particles({ count = 150 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Safely use Memo to get pre-calculated values
  const { pos: positions, spd: speeds, phs: phases } = useMemo(() => generateRandomParticles(count), [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const array = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i] * 0.05;
      array[i * 3] += Math.sin(time + phases[i]) * 0.005;

      if (array[i * 3 + 1] > 10) {
        array[i * 3 + 1] = -10;
        array[i * 3] = (Math.random() - 0.5) * 30;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  const particleTexture = useMemo(() => createCanvasTexture(), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        map={particleTexture}
        transparent={true}
        opacity={0.25}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
        <Particles />
      </Canvas>
    </div>
  );
}
