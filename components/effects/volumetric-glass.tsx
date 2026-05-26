"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, CameraControls } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function GlassShape({ index, total }: { index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const materialProps = useMemo(() => ({
    thickness: 0.5 + Math.random() * 2,
    roughness: 0.1 + Math.random() * 0.1,
    transmission: 1,
    ior: 1.2 + Math.random() * 0.5,
    chromaticAberration: 0.05 + Math.random() * 0.1,
    backside: true,
  }), []);

  const pos = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 5 + Math.random() * 5;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 10 - 5
    );
  }, [index, total]);

  const scale = useMemo(() => 0.5 + Math.random() * 2, []);

  // Pick a random geometry type for each shape
  const geometryType = useMemo(() => Math.floor(Math.random() * 3), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.1 + index;
    meshRef.current.rotation.y = t * 0.15 + index;
  });

  return (
    <Float speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={pos} scale={scale}>
        {geometryType === 0 && <torusKnotGeometry args={[1, 0.3, 100, 16]} />}
        {geometryType === 1 && <icosahedronGeometry args={[1, 0]} />}
        {geometryType === 2 && <torusGeometry args={[1, 0.4, 32, 32]} />}
        <MeshTransmissionMaterial {...materialProps} color="#ffffff" />
      </mesh>
    </Float>
  );
}

function Scene() {
  const controlsRef = useRef<CameraControls>(null);

  useFrame((state) => {
    if (!controlsRef.current) return;
    // Subtle parallax effect based on mouse movement
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#a855f7" />
      
      <Environment preset="city" />

      {/* Shapes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <GlassShape key={i} index={i} total={12} />
      ))}

      {/* Postprocessing */}
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.8} />
        <DepthOfField target={[0, 0, 0]} focalLength={0.02} bokehScale={5} height={700} />
      </EffectComposer>
    </>
  );
}

export function VolumetricGlass() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
