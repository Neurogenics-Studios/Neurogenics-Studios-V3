"use client";

import { Reveal } from "@/components/animations/reveal";
import { motion } from "framer-motion";
import { useInView } from "@/lib/use-in-view";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Strategy",
    description: "We deep-dive into your business logic, technical requirements, and strategic goals to map out a bulletproof roadmap.",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.3)",
    tags: ["Requirements Analysis", "Tech Scoping", "KPI Definition"],
  },
  {
    number: "02",
    icon: PenTool,
    title: "System Architecture",
    description: "Our engineers design the database schema, API contracts, and infrastructure topology — built to scale from day one.",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.3)",
    tags: ["Schema Design", "API Contracts", "Infrastructure"],
  },
  {
    number: "03",
    icon: Code2,
    title: "Development & AI",
    description: "We execute the build using modern frameworks and custom AI models in tight, iterative sprints with daily visibility.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.3)",
    tags: ["Agile Sprints", "AI Integration", "Code Reviews"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Optimization & Delivery",
    description: "Rigorous QA, performance profiling, and Lighthouse optimization run before a zero-downtime production deployment.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.3)",
    tags: ["QA & Testing", "Performance", "Deployment"],
  },
];

export function Process() {
  const { ref, inView } = useInView({ rootMargin: "100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              How We Work
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5">
              Our{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a855f7)" }}
              >
                methodology.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              A precise, engineering-first approach to delivering complex digital products on time, every time — without exceptions.
            </p>
          </Reveal>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Connecting vertical line */}
          <div
            className="absolute left-[28px] md:left-1/2 top-8 bottom-8 w-px hidden sm:block"
            style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.3) 50%, rgba(99,102,241,0.1) 100%)" }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : isLeft ? -40 : 40 }}
                  transition={{ duration: 0.8, delay: 0.15 * idx, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content card */}
                  <div className={`w-full md:w-[calc(50%-48px)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                    <div
                      className="p-7 rounded-3xl h-full"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${step.color}22`,
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {/* Top accent */}
                      <div
                        className={`absolute top-0 ${isLeft ? "left-6 right-1/2" : "right-6 left-1/2"} h-px hidden md:block`}
                        style={{ background: `linear-gradient(${isLeft ? "90deg" : "270deg"}, transparent, ${step.color}66)` }}
                      />

                      <div className="flex items-start gap-4 mb-5">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: step.color }} />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold tracking-widest" style={{ color: `${step.color}99` }}>
                            Phase {step.number}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-0.5">{step.title}</h3>
                        </div>
                      </div>

                      <p className="leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {step.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: `${step.color}10`, border: `1px solid ${step.color}25`, color: step.color }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center node (desktop) */}
                  <div className="hidden md:flex w-24 items-center justify-center flex-shrink-0 z-10 relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black"
                      style={{
                        background: `${step.color}15`,
                        border: `2px solid ${step.color}`,
                        color: step.color,
                        boxShadow: `0 0 20px ${step.glow}`,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-[calc(50%-48px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
