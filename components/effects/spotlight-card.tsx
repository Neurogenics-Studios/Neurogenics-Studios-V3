"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform, HTMLMotionProps } from "framer-motion";

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

export function SpotlightCard({
  children,
  spotlightColor = "rgba(99, 102, 241, 0.15)", // Indigo/Primary color
  className,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // 3D Tilt Physics
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation (max 10 degrees)
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    // Spotlight position
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // Tilt physics calculation
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-secondary/30 border border-white/5 transition-colors duration-500 will-change-transform",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      
      {/* Edge highlight on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 z-0"
        style={{
          opacity: opacity * 0.5,
          boxShadow: `inset 0 0 0 1px ${spotlightColor.replace("0.15", "0.5")}`,
        }}
      />

      <div className="relative z-10 h-full" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
