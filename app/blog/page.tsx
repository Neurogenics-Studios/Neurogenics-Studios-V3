"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, Calendar, Tag, Mail, ChevronRight } from "lucide-react";
import { BorderGlow } from "@/components/ui/border-glow";

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "AI & Machine Learning", "Engineering", "Design", "Case Studies", "Insights"];

const FEATURED = {
  category: "AI & Machine Learning",
  title: "The Architecture of Intelligent Systems: How We Build AI-First Products",
  excerpt:
    "A deep dive into the architectural patterns, infrastructure decisions, and engineering philosophies that underpin our most successful AI integrations — from concept to production.",
  author: "Neurogenics Team",
  date: "May 20, 2026",
  readTime: "12 min read",
  gradient: "from-violet-600/20 via-indigo-600/10 to-cyan-600/5",
};

const POSTS = [
  {
    category: "Engineering",
    title: "Next.js 15 App Router: Performance Patterns for Enterprise Scale",
    excerpt:
      "How we structure large Next.js applications to maintain sub-100ms TTFB and perfect Core Web Vitals across millions of requests.",
    date: "May 18, 2026",
    readTime: "8 min read",
    color: "violet",
  },
  {
    category: "Design",
    title: "Holographic UI: Designing for the Cinematic Web",
    excerpt:
      "The principles behind glassmorphism, depth layering, and motion design that create truly immersive digital experiences.",
    date: "May 14, 2026",
    readTime: "6 min read",
    color: "cyan",
  },
  {
    category: "Case Studies",
    title: "How We Cut Load Time by 73% for a Fortune 500 Platform",
    excerpt:
      "A surgical performance audit and rebuild case study — from 8.2s LCP to 1.1s across a legacy enterprise platform.",
    date: "May 10, 2026",
    readTime: "10 min read",
    color: "indigo",
  },
  {
    category: "AI & Machine Learning",
    title: "Embedding LLMs Into Production: Patterns That Actually Scale",
    excerpt:
      "Beyond the prototype — architectural patterns for deploying large language models in production without breaking the bank.",
    date: "May 6, 2026",
    readTime: "14 min read",
    color: "violet",
  },
  {
    category: "Insights",
    title: "The State of Web Animation in 2026",
    excerpt:
      "From CSS Houdini to WebGPU — how modern animation APIs are reshaping what's possible on the web.",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    color: "cyan",
  },
  {
    category: "Engineering",
    title: "Designing Type-Safe APIs with TypeScript and Zod",
    excerpt:
      "End-to-end type safety from database schema to frontend component — a practical guide to eliminating runtime errors.",
    date: "Apr 22, 2026",
    readTime: "9 min read",
    color: "indigo",
  },
];

const COLOR_MAP: Record<string, { border: string; glow: string; tag: string; dot: string; glowArray: string[] }> = {
  violet: {
    border: "hover:border-violet-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]",
    tag: "text-violet-400/70 border-violet-500/20",
    dot: "bg-violet-500",
    glowArray: ['#c084fc', '#8b5cf6', '#6d28d9'], // Violet theme
  },
  cyan: {
    border: "hover:border-cyan-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]",
    tag: "text-cyan-400/70 border-cyan-500/20",
    dot: "bg-cyan-500",
    glowArray: ['#22d3ee', '#06b6d4', '#0891b2'], // Cyan theme
  },
  indigo: {
    border: "hover:border-indigo-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]",
    tag: "text-indigo-400/70 border-indigo-500/20",
    dot: "bg-indigo-500",
    glowArray: ['#818cf8', '#6366f1', '#4338ca'], // Indigo theme
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-violet-600/7 rounded-full blur-[160px]" />
          <div className="absolute top-0 right-0 w-[30vw] h-[40vw] max-w-[400px] bg-cyan-500/4 rounded-full blur-[120px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-32">
          <motion.p
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] md:text-xs font-medium tracking-[0.25em] text-violet-400/80 uppercase mb-5"
          >
            Journal & Insights
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-semibold tracking-[-0.03em] leading-[0.93] max-w-4xl"
            style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)" }}
          >
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-indigo-400 to-cyan-400">
              Signal.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg text-white/40 max-w-xl leading-relaxed font-light"
          >
            Engineering perspectives, design philosophy, and technical deep-dives from the Neurogenics team.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ── */}
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="#" className="block">
              <BorderGlow
                edgeSensitivity={40}
                glowColor="255 100 80"
                backgroundColor="rgba(3,0,20,0.6)"
                borderRadius={24}
                glowRadius={50}
                glowIntensity={0.8}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                animated={false}
                className="group w-full h-full"
                style={{ backdropFilter: "blur(2px)" }}
              >
                <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[380px] flex flex-col justify-between">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${FEATURED.gradient} pointer-events-none rounded-[24px]`} />
                  
                  {/* Animated shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]"
                    style={{ background: "radial-gradient(circle at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)" }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] uppercase text-violet-400/80 border border-violet-500/20 px-3 py-1 rounded-full"
                        style={{ background: "rgba(99,102,241,0.06)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
                        Featured
                      </span>
                      <span className="text-xs text-white/30 tracking-wide">{FEATURED.category}</span>
                    </div>
  
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight max-w-3xl mb-6 group-hover:text-white/95 transition-colors duration-300">
                      {FEATURED.title}
                    </h2>
  
                    <p className="text-white/45 leading-relaxed max-w-2xl text-sm md:text-base">
                      {FEATURED.excerpt}
                    </p>
                  </div>
  
                  <div className="relative z-10 flex items-center justify-between mt-10 flex-wrap gap-4">
                    <div className="flex items-center gap-5 text-xs text-white/35">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {FEATURED.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {FEATURED.readTime}
                      </span>
                    </div>
  
                    <span className="flex items-center gap-2 text-sm text-violet-400 group-hover:gap-3 transition-all duration-300">
                      Read article
                      <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </BorderGlow>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <section className="relative py-8 sticky top-20 z-30">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(3,0,20,0.8)", backdropFilter: "blur(20px)" }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-violet-600/20 border-violet-500/40 text-violet-300"
                    : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15"
                }`}
                style={{ background: activeCategory === cat ? undefined : "rgba(255,255,255,0.03)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((post, i) => {
                const c = COLOR_MAP[post.color] ?? COLOR_MAP.violet;
                return (
                  <motion.div
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href="#" className="h-full block">
                      <BorderGlow
                        edgeSensitivity={30}
                        glowColor="255 100 80"
                        backgroundColor="rgba(255,255,255,0.025)"
                        borderRadius={16}
                        glowRadius={30}
                        glowIntensity={0.5}
                        colors={c.glowArray}
                        animated={false}
                        className="group w-full h-full hover:-translate-y-1 transition-transform duration-500"
                        style={{ backdropFilter: "blur(8px)" }}
                      >
                        <div className="relative p-6 h-full flex flex-col">
                          {/* Hover glow overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[16px]"
                            style={{ background: "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
                          />
  
                          <div className="relative z-10 flex flex-col h-full">
                            {/* Category */}
                            <div className="flex items-center gap-2 mb-4">
                              <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                              <span className={`text-[10px] font-medium tracking-[0.18em] uppercase ${c.tag} border px-2 py-0.5 rounded-full`}
                                style={{ background: "rgba(255,255,255,0.03)" }}
                              >
                                {post.category}
                              </span>
                            </div>
  
                            {/* Title */}
                            <h3 className="text-base font-semibold tracking-tight leading-snug mb-3 group-hover:text-white/95 transition-colors duration-300">
                              {post.title}
                            </h3>
  
                            {/* Excerpt */}
                            <p className="text-white/38 text-sm leading-relaxed flex-grow mb-5">
                              {post.excerpt}
                            </p>
  
                            {/* Footer */}
                            <div className="flex items-center justify-between text-xs text-white/30 mt-auto pt-4 border-t border-white/[0.06]">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3" strokeWidth={1.5} />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3" strokeWidth={1.5} />
                                {post.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </BorderGlow>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/25 text-sm">
              No articles in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] max-w-[900px] max-h-[600px] bg-violet-600/5 rounded-full blur-[160px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <div
              className="p-10 md:p-16 rounded-3xl border border-white/[0.07] relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 80px rgba(99,102,241,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 60%)" }}
              />

              <div className="relative z-10">
                <Mail className="w-9 h-9 text-violet-400/50 mx-auto mb-6" strokeWidth={1} />
                <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
                  Stay in the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                    loop
                  </span>
                </h2>
                <p className="text-white/35 leading-relaxed mb-8 text-sm md:text-base">
                  New articles on engineering, design, and AI — delivered to your inbox. No spam, unsubscribe anytime.
                </p>

                <form
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm placeholder-white/25 outline-none focus:border-violet-500/40 focus:bg-violet-500/5 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] flex-shrink-0"
                  >
                    Subscribe
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
