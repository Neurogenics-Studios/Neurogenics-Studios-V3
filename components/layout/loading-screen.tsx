"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cinematic progression pacing: starts slow, accelerates, slows at end
    const duration = 2800; 
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Custom easing function for progress (easeInOutQuad-ish)
      const t = currentStep / steps;
      const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      
      setProgress(Math.min(easedT * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500); // Cinematic pause before bloom
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1, 
        filter: "blur(20px)",
        transition: { duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] overflow-hidden"
    >
      {/* Cinematic Depth Background Layer */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
      </motion.div>

      <div className="flex flex-col items-center justify-center gap-16 w-full max-w-md px-6 relative z-10">
        
        {/* Animated SVG 'N' */}
        <div className="relative w-40 h-40 md:w-56 md:h-56">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="url(#premiumNLine)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]"
          >
            <defs>
              <linearGradient id="premiumNLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 20 80 L 20 20 L 80 80 L 80 20"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2.5,
                ease: [0.42, 0, 0.08, 1], // Cinematic custom cubic-bezier
              }}
            />
            {/* Glowing active drawing point */}
            <motion.circle
              r="2.5"
              fill="#fff"
              className="drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
              initial={{ offsetDistance: "0%", opacity: 0, scale: 0 }}
              animate={{ offsetDistance: "100%", opacity: 1, scale: [0, 1, 1, 0] }}
              style={{
                offsetPath: 'path("M 20 80 L 20 20 L 80 80 L 80 20")',
              }}
              transition={{
                duration: 2.5,
                ease: [0.42, 0, 0.08, 1],
                times: [0, 0.1, 0.9, 1] // Fade out at the very end
              }}
            />
          </svg>
          
          {/* Subtle Bloom behind N */}
          <motion.div 
            className="absolute inset-0 bg-violet-500/20 rounded-full blur-[60px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Text and Progress System */}
        <div className="w-full space-y-8 flex flex-col items-center mt-8">
          
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 0.6, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-white/80 tracking-[0.3em] text-xs font-light uppercase"
          >
            Initializing Neurogenics Studios
          </motion.p>
          
          {/* Premium Loading Bar */}
          <div className="w-48 md:w-64 h-[1px] bg-white/10 rounded-full overflow-hidden relative drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-indigo-400 to-white"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            >
              {/* Light Sweep Effect */}
              <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-r from-transparent to-white/80 blur-[2px]" />
            </motion.div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
