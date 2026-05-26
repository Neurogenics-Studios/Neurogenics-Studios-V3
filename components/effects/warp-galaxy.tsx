"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function Starfield({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate initial star positions
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const baseColor = new THREE.Color("#6366f1");
    const highlightColor = new THREE.Color("#22d3ee");

    for (let i = 0; i < count; i++) {
      // Random position in a cylinder-like volume
      const theta = Math.random() * Math.PI * 2;
      const radius = 2 + Math.pow(Math.random(), 2) * 20; // More stars near center
      
      pos[i * 3] = Math.cos(theta) * radius;     // x
      pos[i * 3 + 1] = Math.sin(theta) * radius; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100; // z (depth)

      // Speed varies slightly
      vel[i] = 0.2 + Math.random() * 0.8;

      // Mix colors
      const mixedColor = baseColor.clone().lerp(highlightColor, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, vel, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const positionsAttribute = geometry.attributes.position;
    
    // Smooth camera drift
    const time = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(time * 0.2) * 1;
    state.camera.position.y = Math.cos(time * 0.15) * 1;
    
    // Add subtle mouse parallax
    const targetX = state.pointer.x * 2;
    const targetY = state.pointer.y * 2;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    
    state.camera.lookAt(0, 0, -50);

    // Move stars forward
    for (let i = 0; i < count; i++) {
      positionsAttribute.array[i * 3 + 2] += velocities[i] * delta * 15; // Slower, elegant speed
      
      // If star passes camera, reset far back
      if (positionsAttribute.array[i * 3 + 2] > 10) {
        positionsAttribute.array[i * 3 + 2] = -100;
      }
    }
    
    positionsAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function WarpGalaxy() {
  const chromaticOffset = useMemo(() => new THREE.Vector2(0.001, 0.001), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#020204]">
      {/* Central subtle gradient to give depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05)_0%,rgba(0,0,0,0)_60%)]" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        {/* Deep space fog */}
        <fog attach="fog" args={["#020204", 10, 80]} />
        
        <Starfield count={800} /> {/* Reduced count for performance */}

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom luminanceThreshold={0.4} mipmapBlur intensity={0.6} radius={0.5} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={chromaticOffset} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
