"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Scene } from "@/components/canvas/scene";
import { DotField } from "@/components/effects/dot-field";
import { useLoading } from "@/components/providers/loading-provider";

export function Hero() {
  const { isBloomFinished } = useLoading();

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1200px] overflow-hidden" style={{ background: "#030305" }}>

      {/* ── LAYER 0: Dot Field Background ── */}
      <div className="absolute inset-0 z-0">
        {isBloomFinished && (
          <DotField
            dotColor="rgba(139, 92, 246, 0.4)"
            dotRadius={1.8}
            gap={28}
            repelRadius={150}
            repelStrength={40}
          />
        )}
      </div>

      {/* ── Subtle gradient overlays ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Top-left text area gradient for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 15% 50%, rgba(3,3,5,0.85) 0%, transparent 70%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(3,3,5,0.9) 0%, transparent 30%)",
          }}
        />
      </div>

      {/* ── MAIN CONTENT: TRUE SPLIT LAYOUT ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-4 lg:gap-0">

          {/* ══ LEFT SIDE: Text Content ══ */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center pt-20 lg:pt-0 order-2 lg:order-1">

            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase"
                style={{
                  background: "rgba(99, 102, 241, 0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.25)",
                  color: "#a5b4fc",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Digital Innovation Studio
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold tracking-tight leading-[0.95] mb-7 uppercase"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5.5rem)" }}
            >
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #22d3ee 0%, #6366f1 50%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(99, 102, 241, 0.3))",
                }}
              >
                NEUROGENICS
              </span>
              <span className="block text-white" style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}>
                STUDIOS
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] md:text-[17px] leading-relaxed mb-10 max-w-md"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              We engineer impossible digital experiences. From cinematic 3D websites to AI-powered platforms — crafting the future, one pixel at a time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA - Liquid Glass */}
              <Link
                href="#work"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-2xl text-sm font-semibold tracking-[0.12em] uppercase overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.2))",
                  border: "1px solid rgba(139, 92, 246, 0.35)",
                  color: "#e0e7ff",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 8px 32px rgba(99, 102, 241, 0.15), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                <span className="relative z-10">View our work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 rounded-2xl"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                Get in touch
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.7 }}
              className="mt-14 flex items-center gap-10"
            >
              {[
                { value: "50+", label: "Projects" },
                { value: "98%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT SIDE: 3D Laptop Scene ══ */}
          <div className="w-full lg:w-[58%] h-[50vh] lg:h-[85vh] order-1 lg:order-2">
            {isBloomFinished && <Scene />}
          </div>

        </div>
      </div>

    </section>
  );
}
