"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoading } from "../providers/loading-provider";

export function GlassN() {
  const { isBloomFinished } = useLoading();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth cinematic spring
  const springConfig = { damping: 45, stiffness: 40, mass: 2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-10deg", "10deg"]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  // Perfectly clean, sharp N polygon
  const N_POINTS = "0,100 0,0 24,0 76,72 76,0 100,0 100,100 76,100 24,28 24,100";
  const N_PATH = "polygon(0% 100%, 0% 0%, 24% 0%, 76% 72%, 76% 0%, 100% 0%, 100% 100%, 76% 100%, 24% 28%, 24% 100%)";

  return (
    <div className="absolute inset-0 flex items-center justify-center perspective-[3000px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: isBloomFinished ? 1 : 0,
          scale: isBloomFinished ? 1 : 0.85,
        }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative will-change-transform"
        style={{
          // @ts-ignore - framer-motion styles
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: "min(35vw, 450px)",
          height: "min(49vw, 630px)",
        }}
      >
        {/* NO heavy dark shadows here. Just a very slight glow. */}
        <div
          className="absolute inset-0 transform-gpu"
          style={{
            clipPath: N_PATH,
            transform: "translateZ(-20px)",
            background: "rgba(255,255,255,0.01)",
            boxShadow: "0 0 30px rgba(139,92,246,0.1)",
          }}
        />

        {/* ── Back Face (Pure transparency with subtle edge) ── */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full transform-gpu"
          style={{ transform: "translateZ(-30px)" }}
        >
          <polygon points={N_POINTS} fill="rgba(255,255,255,0.005)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* ── Mid Layers for Refraction Depth ── */}
        {[-15, 0, 15].map((z, i) => (
          <svg key={i} viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full transform-gpu" style={{ transform: `translateZ(${z}px)` }}>
            <polygon points={N_POINTS} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />
          </svg>
        ))}

        {/* ── Front Face (Highly transparent glass) ── */}
        {/* We use minimal blur so the LiquidEther is vividly seen through the N */}
        <div
          className="absolute inset-0 transform-gpu overflow-hidden"
          style={{
            clipPath: N_PATH,
            transform: "translateZ(30px)",
            backdropFilter: "blur(3px) saturate(1.1)", // Very light blur, fluid is highly visible!
            WebkitBackdropFilter: "blur(3px) saturate(1.1)",
          }}
        >
          {/* Barely visible inner fill */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-indigo-500/[0.05]" />
          
          {/* Subtle light reflection on the surface */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/[0.08] to-transparent" />
        </div>

        {/* ── Holographic Edge Refraction ── */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full transform-gpu"
          style={{ transform: "translateZ(31px)" }}
        >
          <defs>
            <linearGradient id="holoEdge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="25%" stopColor="rgba(0, 255, 255, 0.6)" />   {/* Cyan */}
              <stop offset="50%" stopColor="rgba(255, 0, 255, 0.5)" />   {/* Magenta */}
              <stop offset="75%" stopColor="rgba(100, 150, 255, 0.7)" /> {/* Indigo */}
              <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
            </linearGradient>
          </defs>

          <polygon
            points={N_POINTS}
            fill="none"
            stroke="url(#holoEdge)"
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          />
        </svg>

      </motion.div>
    </div>
  );
}
