"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function EnergyRing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {/* 
        HOLOGRAPHIC PLASMA RING 
        A thick, fluid, energetic torus wrapped around the laptop.
        Uses layered, thick glowing borders spinning in 3D to feel like twisting plasma.
      */}
      <motion.div
        className="relative w-[650px] md:w-[800px] h-[650px] md:h-[800px] flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
        // The entire ring sits at a cinematic angle and rotates slowly
        animate={{ rotateZ: 360, rotateX: [60, 65, 60], rotateY: [-20, -15, -20] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Core Electric Plasma Ring */}
        <motion.div
          className="absolute w-[80%] h-[80%] rounded-full border-[20px] md:border-[30px] border-violet-500/80 mix-blend-screen"
          style={{ 
            boxShadow: "0 0 100px 30px rgba(139, 92, 246, 0.6), inset 0 0 80px 20px rgba(139, 92, 246, 0.6)",
            filter: "blur(12px)",
            transform: "translateZ(0px)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Twisting Cyan Neon Band */}
        <motion.div
          className="absolute w-[85%] h-[85%] rounded-[45%] border-[10px] md:border-[15px] border-cyan-400/90 mix-blend-screen"
          style={{ 
            boxShadow: "0 0 60px 15px rgba(6, 182, 212, 0.8), inset 0 0 40px 10px rgba(6, 182, 212, 0.8)",
            filter: "blur(6px)",
            transform: "translateZ(30px)",
          }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Deep Indigo Atmospheric Glow Ring */}
        <motion.div
          className="absolute w-[75%] h-[75%] rounded-full border-[40px] md:border-[60px] border-indigo-600/50 mix-blend-screen"
          style={{ 
            boxShadow: "0 0 150px 50px rgba(79, 70, 229, 0.5)",
            filter: "blur(30px)",
            transform: "translateZ(-30px)",
          }}
        />

        {/* Outer Plasma Waves (Twisting geometry) */}
        <motion.div
          className="absolute w-[90%] h-[90%] rounded-[40%] border-[6px] md:border-[8px] border-fuchsia-400/70 mix-blend-screen"
          style={{ 
            boxShadow: "0 0 40px 15px rgba(232, 121, 249, 0.6)",
            filter: "blur(8px)",
            transform: "translateZ(15px)",
          }}
          animate={{ rotateZ: 360, rotateX: [15, -15, 15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

      </motion.div>
    </div>
  );
}
