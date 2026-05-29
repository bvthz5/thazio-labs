'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Suppress THREE.Clock deprecation warning triggered by @react-three/fiber in Three.js r184
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
    originalWarn.apply(console, args);
  };
}

// Helper function to generate positions to prevent useMemo purity warnings
function generateNodePositions(count: number) {
  const pos = new Float32Array(count * 3);
  const spd = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    spd[i] = 0.02 + Math.random() * 0.04;
  }
  return { pos, spd };
}

// Generate base points distributed on a sphere of radius 1.35 (reduced from 2.2 for smaller, elegant size)
function generateSphereNodes() {
  const radius = 1.35;
  const tempGeom = new THREE.IcosahedronGeometry(radius, 2); // generates vertices
  const vertices = tempGeom.attributes.position.array;
  const count = vertices.length / 3;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = vertices[i * 3];
    const y = vertices[i * 3 + 1];
    const z = vertices[i * 3 + 2];

    const noise = 0.05; // tighter noise for compact elegant core
    positions[i * 3] = x + (Math.random() - 0.5) * noise;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * noise;
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * noise;
  }

  // Precompute connections based on tighter radius threshold
  const connectionIndices: number[] = [];
  const maxDistance = 0.85; // scaled down from 1.35 to match radius reduction

  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < maxDistance) {
        connectionIndices.push(i, j);
      }
    }
  }

  // Build connection geometry positions
  const linePositions = new Float32Array(connectionIndices.length * 3);
  for (let i = 0; i < connectionIndices.length; i++) {
    const nodeIndex = connectionIndices[i];
    linePositions[i * 3] = positions[nodeIndex * 3];
    linePositions[i * 3 + 1] = positions[nodeIndex * 3 + 1];
    linePositions[i * 3 + 2] = positions[nodeIndex * 3 + 2];
  }

  return { positions, linePositions };
}

// Generate textures outside to avoid recreation
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.2, '#00D4FF');
    gradient.addColorStop(0.5, 'rgba(0, 102, 255, 0.4)'); // lowered opacity gradient for text legibility
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  return new THREE.CanvasTexture(canvas);
}

// Custom component to handle mouse movement and viewport changes
function NeuralNetwork() {
  const meshRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const { positions, linePositions } = useMemo(() => generateSphereNodes(), []);
  const particleTexture = useMemo(() => createParticleTexture(), []);

  // Determine standard responsive x-offset based on viewport width
  // Shifts sphere to the right on desktop, centers it on mobile
  const responsiveXOffset = useMemo(() => {
    return viewport.width > 7 ? viewport.width * 0.18 : 0;
  }, [viewport.width]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.15;

      // Mouse interactive tilt coordinates (drifts from responsive X offset center)
      const targetX = responsiveXOffset + mouse.x * (viewport.width * 0.08);
      const targetY = mouse.y * (viewport.height * 0.08);
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.1;
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.15;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.1;
      linesRef.current.rotation.x = Math.sin(t * 0.05) * 0.15;
      
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      // Lowered wave amplitude (0.1 to 0.18) to preserve absolute text legibility
      material.opacity = 0.10 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0066FF"
          transparent={true}
          opacity={0.12} // minimized line opacity from 0.4 to prevent overlay clutter
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16} // reduced point sizing from 0.28 to fit smaller core
          map={particleTexture}
          transparent={true}
          opacity={0.35} // minimized node points opacity from 0.9 for perfect text readability
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} /> {/* scaled inner core radius from 1.5 to 0.9 */}
        <meshBasicMaterial
          color="#7B2FBE"
          transparent
          opacity={0.02} // minimized wireframe core opacity from 0.06
          wireframe
        />
      </mesh>

      {/* 3D Glowing "T" Connector Core suspended inside the sphere */}
      <group>
        {/* Horizontal Top Bar - Glow core */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.55, 0.11, 0.11]} />
          <meshBasicMaterial 
            color="#FF007F" // Neon Magenta/Pink for high-luxury contrast
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Horizontal Top Bar - Wireframe casing */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.57, 0.13, 0.13]} />
          <meshBasicMaterial 
            color="#FF00FF"
            transparent
            opacity={0.3}
            wireframe
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Vertical Stem - Glow core */}
        <mesh position={[0, -0.09, 0]}>
          <boxGeometry args={[0.11, 0.57, 0.11]} />
          <meshBasicMaterial 
            color="#FF007F"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Vertical Stem - Wireframe casing */}
        <mesh position={[0, -0.09, 0]}>
          <boxGeometry args={[0.13, 0.59, 0.13]} />
          <meshBasicMaterial 
            color="#FF00FF"
            transparent
            opacity={0.3}
            wireframe
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Glowing Neural extremites (Connector Nodes) */}
        {/* Left Bar Node */}
        <mesh position={[-0.275, 0.25, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FF00FF" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Right Bar Node */}
        <mesh position={[0.275, 0.25, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FF00FF" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Bottom Stem Node */}
        <mesh position={[0, -0.375, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FF00FF" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Central Connector Node */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#FF007F" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

// Subtle ambient particle grid around the sphere scene
function AmbientParticles({ count = 80 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pos: positions, spd: speeds } = useMemo(() => generateNodePositions(count), [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i] * 0.08;
      array[i * 3] += Math.sin(time + i) * 0.002;
      
      if (array[i * 3 + 1] > 5) {
        array[i * 3 + 1] = -5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06} // slightly smaller ambient dust points
        color="#00D4FF"
        transparent
        opacity={0.15} // minimized ambient dust opacity from 0.4 to keep layout clean
        depthWrite={false}
      />
    </points>
  );
}

export default function NeuralSphereScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#7B2FBE" />
        
        <NeuralNetwork />
        <AmbientParticles />

        <EffectComposer>
          <Bloom
            intensity={0.8} // slightly reduced bloom to avoid blinding glares behind text
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
