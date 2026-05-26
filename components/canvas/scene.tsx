"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls, ContactShadows, Float } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { Laptop } from "./laptop";
import { OrbitingIcons } from "./orbiting-icons";
import { Suspense, useMemo } from "react";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

const SafePresentationControls = PresentationControls as any;

export function Scene() {
  const chromaticOffset = useMemo(() => new THREE.Vector2(0.001, 0.001), []);

  return (
    <Canvas
      camera={{ position: [0, 1.5, 8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      {/* Premium studio lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} color="#ffffff" castShadow />
      <directionalLight position={[-3, 4, -3]} intensity={0.3} color="#6366f1" />
      <pointLight position={[-5, 3, -2]} intensity={0.4} color="#a855f7" distance={15} />
      <pointLight position={[5, 2, 3]} intensity={0.3} color="#22d3ee" distance={15} />
      <spotLight position={[0, 10, 0]} angle={0.4} penumbra={0.8} intensity={0.5} color="#ffffff" />

      {/* HDRI for realistic reflections */}
      <Environment preset="city" />

      {/* Interactive controls */}
      <SafePresentationControls
        global
        snap={false}
        config={{ mass: 2, tension: 400, friction: 50 }}
        rotation={[0.1, -0.15, 0]}
        polar={[-Math.PI / 6, Math.PI / 6]}
        azimuth={[-Math.PI / 3, Math.PI / 3]}
        speed={1.8}
        zoom={0.85}
      >
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.3}>
            <group position={[0, -0.5, 0]}>
              <Laptop scale={1.4} rotationY={0} />
              <OrbitingIcons />
            </group>
          </Float>
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.4}
            scale={16}
            blur={2.5}
            far={4}
            color="#000000"
          />
        </Suspense>
      </SafePresentationControls>

      {/* Subtle postprocessing */}
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom luminanceThreshold={0.85} mipmapBlur intensity={0.25} radius={0.6} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={chromaticOffset}
        />
      </EffectComposer>
    </Canvas>
  );
}
