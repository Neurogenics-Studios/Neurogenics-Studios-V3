"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ORBIT_COLORS = [
  "#22d3ee",
  "#a855f7",
  "#34d399",
  "#f472b6",
  "#6366f1",
  "#fbbf24",
];

// Floating 3D icon shape with glass material
function FloatingIcon({ index, total, radius, speed, color, shape }: {
  index: number;
  total: number;
  radius: number;
  speed: number;
  color: string;
  shape: "code" | "bracket" | "diamond" | "ring" | "cube" | "sphere";
}) {
  const meshRef = useRef<THREE.Group>(null);
  const baseAngle = (index / total) * Math.PI * 2;

  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.6,
    roughness: 0.1,
    metalness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.85,
  }), [color]);

  const glowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.08,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [color]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const angle = baseAngle + t * speed;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius * 0.6; // elliptical orbit
    const y = Math.sin(t * 0.8 + index * 1.5) * 0.4;

    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.x = t * 0.5;
    meshRef.current.rotation.y = t * 0.7 + index;
    meshRef.current.rotation.z = t * 0.3;
  });

  const renderShape = () => {
    switch (shape) {
      case "code":
        return (
          <>
            {/* < bracket */}
            <mesh material={mat} position={[-0.06, 0, 0]} rotation={[0, 0, 0.2]}>
              <boxGeometry args={[0.02, 0.15, 0.02]} />
            </mesh>
            <mesh material={mat} position={[-0.06, 0, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.02, 0.15, 0.02]} />
            </mesh>
            {/* / slash */}
            <mesh material={mat} rotation={[0, 0, 0.4]}>
              <boxGeometry args={[0.02, 0.2, 0.02]} />
            </mesh>
            {/* > bracket */}
            <mesh material={mat} position={[0.06, 0, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.02, 0.15, 0.02]} />
            </mesh>
            <mesh material={mat} position={[0.06, 0, 0]} rotation={[0, 0, 0.2]}>
              <boxGeometry args={[0.02, 0.15, 0.02]} />
            </mesh>
          </>
        );
      case "bracket":
        return (
          <mesh material={mat}>
            <torusGeometry args={[0.1, 0.025, 8, 4]} />
          </mesh>
        );
      case "diamond":
        return (
          <mesh material={mat} rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.1, 0]} />
          </mesh>
        );
      case "ring":
        return (
          <mesh material={mat}>
            <torusGeometry args={[0.1, 0.02, 16, 32]} />
          </mesh>
        );
      case "cube":
        return (
          <mesh material={mat}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
          </mesh>
        );
      case "sphere":
        return (
          <mesh material={mat}>
            <icosahedronGeometry args={[0.09, 1]} />
          </mesh>
        );
    }
  };

  return (
    <group ref={meshRef}>
      {renderShape()}
      {/* Glow aura */}
      <mesh material={glowMat}>
        <sphereGeometry args={[0.2, 8, 8]} />
      </mesh>
    </group>
  );
}

export function OrbitingIcons() {
  const ICONS: { shape: "code" | "bracket" | "diamond" | "ring" | "cube" | "sphere"; radius: number; speed: number; color: string }[] = [
    { shape: "code",    radius: 3.2, speed: 0.2,  color: ORBIT_COLORS[0] },
    { shape: "bracket", radius: 2.8, speed: -0.15, color: ORBIT_COLORS[1] },
    { shape: "diamond", radius: 3.6, speed: 0.25, color: ORBIT_COLORS[2] },
    { shape: "ring",    radius: 2.5, speed: -0.3,  color: ORBIT_COLORS[3] },
    { shape: "cube",    radius: 3.0, speed: 0.18, color: ORBIT_COLORS[4] },
    { shape: "sphere",  radius: 3.8, speed: -0.12, color: ORBIT_COLORS[5] },
  ];

  return (
    <group>
      {/* Decorative Axis Rings */}
      {[2.5, 3.0, 3.6].map((radius, i) => (
        <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[radius, 0.003, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </mesh>
      ))}
      {[2.8, 3.2, 3.8].map((radius, i) => (
        <mesh key={`ring2-${i}`} rotation={[Math.PI / 2 + 0.1, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[radius, 0.002, 16, 100]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.03} />
        </mesh>
      ))}

      {ICONS.map((icon, i) => (
        <FloatingIcon
          key={i}
          index={i}
          total={ICONS.length}
          radius={icon.radius}
          speed={icon.speed}
          color={icon.color}
          shape={icon.shape}
        />
      ))}
    </group>
  );
}
