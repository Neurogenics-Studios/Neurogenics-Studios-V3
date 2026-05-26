"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset, x: xOffset },
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // cinematic ease out
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
