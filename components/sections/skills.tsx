"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";
import { useInView } from "@/lib/use-in-view";

const TECH_CATEGORIES = [
  {
    label: "Frontend",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.3)",
    skills: [
      { name: "Next.js", level: 98 },
      { name: "React", level: 97 },
      { name: "TypeScript", level: 95 },
      { name: "Framer Motion", level: 92 },
      { name: "WebGL / Three.js", level: 88 },
    ],
  },
  {
    label: "Backend",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.3)",
    skills: [
      { name: "Node.js", level: 96 },
      { name: "Python / FastAPI", level: 94 },
      { name: "PostgreSQL", level: 92 },
      { name: "Redis", level: 87 },
      { name: "GraphQL", level: 85 },
    ],
  },
  {
    label: "AI / ML",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.3)",
    skills: [
      { name: "LangChain / LLM", level: 93 },
      { name: "PyTorch", level: 88 },
      { name: "Vector DBs", level: 90 },
      { name: "Computer Vision", level: 82 },
      { name: "RAG Pipelines", level: 91 },
    ],
  },
  {
    label: "Infrastructure",
    color: "#34d399",
    glow: "rgba(52,211,153,0.3)",
    skills: [
      { name: "AWS / GCP", level: 90 },
      { name: "Docker / K8s", level: 88 },
      { name: "CI/CD Pipelines", level: 92 },
      { name: "Supabase / Edge", level: 87 },
      { name: "Vercel / Netlify", level: 95 },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  index: number;
  inView: boolean;
}

function SkillBar({ name, level, color, index, inView }: SkillBarProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center text-sm">
        <span style={{ color: "rgba(255,255,255,0.75)" }}>{name}</span>
        <span style={{ color, fontSize: "0.75rem", fontWeight: 600 }}>{level}%</span>
      </div>
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

interface CategoryCardProps {
  category: typeof TECH_CATEGORIES[0];
  index: number;
  inView: boolean;
}

function CategoryCard({ category, index, inView }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.8, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Top glow accent */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${category.color}80, transparent)` }}
      />

      {/* Category label */}
      <div className="flex items-center gap-3">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: category.color, boxShadow: `0 0 10px ${category.glow}` }}
        />
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: category.color }}>
          {category.label}
        </span>
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-4">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
            index={i}
            inView={inView}
          />
        ))}
      </div>

      {/* Bottom corner glow */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${category.glow} 0%, transparent 70%)`, transform: "translate(30%, 30%)" }}
      />
    </motion.div>
  );
}

export function Skills() {
  const { ref, inView } = useInView({ rootMargin: "100px" });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, transparent 0%, rgba(3,3,5,0.5) 50%, transparent 100%)" }}
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
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
              Technical Expertise
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5">
              Built with{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #22d3ee)" }}
              >
                world-class
              </span>{" "}
              tools.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Our stack spans the full spectrum — from cinematic frontend to intelligent backends and AI pipelines.
            </p>
          </Reveal>
        </div>

        {/* Tech category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TECH_CATEGORIES.map((category, index) => (
            <CategoryCard key={category.label} category={category} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "20+", label: "Technologies Mastered", color: "#6366f1" },
            { value: "5yr+", label: "Average Engineer Exp.", color: "#22d3ee" },
            { value: "100%", label: "TypeScript Codebases", color: "#a855f7" },
            { value: "A+", label: "Lighthouse Performance", color: "#34d399" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="text-3xl font-extrabold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
