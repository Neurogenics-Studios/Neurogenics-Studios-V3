"use client";

import { Reveal } from "@/components/animations/reveal";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "Neurogenics didn't just build a website; they architected an entire digital ecosystem that transformed our operations and elevated our brand beyond recognition.",
    author: "Sarah Jenkins",
    role: "CTO, Vanguard Tech",
    rating: 5,
    initials: "SJ",
    color: "#6366f1",
  },
  {
    quote: "The AI integrations they delivered reduced our customer support latency by 80%. These engineers operate at an entirely different level than any agency we've worked with.",
    author: "Marcus Chen",
    role: "Founder, Elevate AI",
    rating: 5,
    initials: "MC",
    color: "#22d3ee",
  },
  {
    quote: "Finding an agency that understands both beautiful UI and complex backend systems is genuinely rare. Neurogenics nailed both with absolutely zero compromise.",
    author: "Elena Rodriguez",
    role: "VP of Product, FinEdge",
    rating: 5,
    initials: "ER",
    color: "#a855f7",
  },
  {
    quote: "Delivered a real-time trading dashboard handling 10M events/day ahead of schedule. The architecture is bulletproof and the UI is stunning. Best investment we've made.",
    author: "James Park",
    role: "CEO, TradeSphere",
    rating: 5,
    initials: "JP",
    color: "#34d399",
  },
  {
    quote: "Their WebGL work is absolutely next level. Clients constantly ask how we built the experience. The answer is always Neurogenics — they make the impossible possible.",
    author: "Amelia Foster",
    role: "Creative Director, Apex Studio",
    rating: 5,
    initials: "AF",
    color: "#f59e0b",
  },
  {
    quote: "We scaled from 0 to 500k users in 3 months without a single downtime incident. Their infrastructure design is rock solid. Highly recommend to any serious product team.",
    author: "David Okafor",
    role: "CTO, Launchpad Labs",
    rating: 5,
    initials: "DO",
    color: "#ec4899",
  },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="flex-shrink-0 w-[380px] md:w-[440px] p-8 rounded-3xl flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote icon */}
      <Quote className="w-8 h-8" style={{ color: `${t.color}66` }} />

      {/* Text */}
      <p className="text-base leading-relaxed flex-grow" style={{ color: "rgba(255,255,255,0.75)" }}>
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-2 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: `${t.color}22`, border: `1px solid ${t.color}44`, color: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-semibold text-sm text-white">{t.author}</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

const ROW1 = TESTIMONIALS.slice(0, 3);
const ROW2 = TESTIMONIALS.slice(3);

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
                color: "#a5b4fc",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Client Results
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5">
              Trusted by{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a855f7)" }}
              >
                industry leaders.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Don&apos;t take our word for it — hear directly from the teams that trust us with their most critical digital products.
            </p>
          </Reveal>
        </div>

        {/* Marquee Row 1 - left */}
        <div className="relative overflow-hidden mb-5" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
          <motion.div
            className="flex gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {[...ROW1, ...ROW1].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Marquee Row 2 - right */}
        <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
          <motion.div
            className="flex gap-5"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {[...ROW2, ...ROW2].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
