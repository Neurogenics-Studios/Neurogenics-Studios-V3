"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PresentationControls,
  ContactShadows,
  Float,
  Bounds,
} from "@react-three/drei";
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
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} color="#ffffff" castShadow />
      <directionalLight position={[-3, 4, -3]} intensity={0.3} color="#6366f1" />
      <pointLight position={[-5, 3, -2]} intensity={0.4} color="#a855f7" distance={15} />
      <pointLight position={[5, 2, 3]} intensity={0.3} color="#22d3ee" distance={15} />
      <spotLight position={[0, 10, 0]} angle={0.4} penumbra={0.8} intensity={0.5} color="#ffffff" />

      <Environment preset="city" />

      <Suspense fallback={null}>
        <SafePresentationControls
          snap={false}
          config={{ mass: 2, tension: 400, friction: 50 }}
          rotation={[0.1, -0.15, 0]}
          polar={[-Math.PI / 2.2, Math.PI / 2.2]}
          azimuth={[-Math.PI / 1.2, Math.PI / 1.2]}
          speed={1.8}
        >
          <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.45}>
            <group position={[0, -0.15, 0]}>
              <Bounds fit observe margin={1.5}>
                <Laptop rotationY={-0.2} />
              </Bounds>
              <OrbitingIcons />
            </group>
          </Float>
        </SafePresentationControls>

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.35}
          scale={8}
          blur={2.5}
          far={4}
          color="#000000"
        />
      </Suspense>

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
