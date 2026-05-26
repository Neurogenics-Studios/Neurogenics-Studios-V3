"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

interface EdgeLightningCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color1?: string;
  color2?: string;
  borderWidth?: number;
  duration?: number;
  className?: string;
}

export function EdgeLightningCard({
  children,
  color1 = "#6366f1",
  color2 = "#22d3ee",
  borderWidth = 1.5,
  duration = 3,
  className,
  ...props
}: EdgeLightningCardProps) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Unstable electrical pulsing effect
  useEffect(() => {
    if (isHovered) {
      controls.start({
        opacity: [0.8, 1, 0.7, 1, 0.9, 0.6, 1],
        scale: [1, 1.02, 0.99, 1.01, 1],
        filter: [
          "blur(8px) brightness(1)",
          "blur(12px) brightness(1.5)",
          "blur(6px) brightness(0.8)",
          "blur(10px) brightness(1.2)",
          "blur(8px) brightness(1)",
        ],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      });
    } else {
      controls.stop();
      controls.set({ opacity: 0, scale: 1, filter: "blur(0px) brightness(1)" });
    }
  }, [isHovered, controls]);

  return (
    <div
      className={cn("relative overflow-hidden rounded-3xl p-[1.5px] group bg-[rgba(255,255,255,0.04)] shadow-lg", className)}
      style={{ padding: borderWidth, backdropFilter: "blur(20px)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Background container that holds the rotating gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
        <motion.div
          className="absolute inset-[-100%] transition-opacity duration-300"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: {
              duration: duration,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{
            background: `conic-gradient(from 0deg, transparent 0 340deg, ${color1} 360deg)`,
            backgroundImage: `conic-gradient(from 0deg, transparent 0 160deg, ${color1} 180deg, transparent 180deg 340deg, ${color2} 360deg)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Plasma glow effect */}
        <motion.div
          className="absolute inset-[-100%] mix-blend-screen pointer-events-none"
          animate={controls}
          style={{
            background: `conic-gradient(from 0deg, transparent 0 160deg, ${color1} 180deg, transparent 180deg 340deg, ${color2} 360deg)`,
          }}
        />
        
        {/* Soft idle border (when not hovering) */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-transparent transition-colors duration-500" />
      </div>

      {/* Inner card content wrapper */}
      <div className="relative z-10 h-full w-full rounded-[calc(1.5rem-1.5px)] bg-black/40 backdrop-blur-md border border-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
        {children}
      </div>
    </div>
  );
}
