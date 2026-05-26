"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MonitorSmartphone,
  Code2,
  Cpu,
  LineChart,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Globe,
  Database,
  Bot,
} from "lucide-react";
import { BorderGlow } from "@/components/ui/border-glow";
import { LogoLoop } from "@/components/sections/logo-loop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  SiOpenai,
  SiThreedotjs,
  SiVercel
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: MonitorSmartphone,
    title: "Digital Experiences",
    description:
      "Immersive, high-performance web applications built with modern frameworks and cinematic animations that leave lasting impressions.",
    tags: ["Next.js", "React", "GSAP"],
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description:
      "Seamlessly embed LLMs, computer vision, and machine learning models into your products — making intelligence the default.",
    tags: ["OpenAI", "LangChain", "PyTorch"],
  },
  {
    icon: Code2,
    title: "Custom Architecture",
    description:
      "Scalable, secure, and robust backend systems designed to handle enterprise-level traffic, data, and complexity.",
    tags: ["Node.js", "Go", "Kubernetes"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Comprehensive audits and re-engineering to achieve sub-second load times and perfect Lighthouse scores across every device.",
    tags: ["Core Web Vitals", "CDN", "Edge"],
  },
  {
    icon: LineChart,
    title: "Data Strategy",
    description:
      "Transform raw data into actionable insights with custom analytics pipelines, intelligent dashboards, and predictive models.",
    tags: ["Analytics", "dbt", "BigQuery"],
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Military-grade encryption and security compliance tailored for next-generation digital platforms and regulated industries.",
    tags: ["SOC 2", "Zero Trust", "Pen Testing"],
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We deep dive into your business logic, technical requirements, and strategic goals to architect a scalable, focused roadmap.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "System Architecture",
    description:
      "Our engineers design the database schema, API contracts, and infrastructure topology for enterprise-grade scalability.",
    icon: Database,
  },
  {
    number: "03",
    title: "Development & AI Integration",
    description:
      "We execute the build using modern frameworks and custom AI models, moving in rapid iterative sprints with total transparency.",
    icon: Bot,
  },
  {
    number: "04",
    title: "Optimization & Delivery",
    description:
      "Rigorous QA, performance profiling, and Lighthouse optimization before a seamless, zero-downtime deployment.",
    icon: Zap,
  },
];

const TECH_LOGOS = [
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiReact />, title: "React" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiPython />, title: "Python" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiRedis />, title: "Redis" },
  { node: <SiKubernetes />, title: "Kubernetes" },
  { node: <SiOpenai />, title: "OpenAI" },
  { node: <FaAws />, title: "AWS" },
  { node: <SiThreedotjs />, title: "Three.js" },
  { node: <SiVercel />, title: "Vercel" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-violet-600/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-indigo-500/6 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[25vw] h-[40vw] max-w-[400px] bg-cyan-500/4 rounded-full blur-[100px]" />
        </div>

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-20">
          <motion.p
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            className="text-[10px] md:text-xs font-medium tracking-[0.25em] text-violet-400/80 uppercase mb-6"
          >
            What We Do
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
            className="font-semibold tracking-[-0.03em] leading-[0.93] mb-8 max-w-4xl"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            Engineering{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-indigo-400 to-cyan-400">
              excellence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.28, ease: EASE }}
            className="text-base md:text-xl text-white/45 max-w-2xl leading-relaxed font-light mb-12"
          >
            We provide end-to-end development services, bridging the gap between stunning visual design and robust, AI-powered engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-sm md:text-base font-light text-white/80 hover:text-white transition-colors duration-500"
            >
              <span className="tracking-[0.05em]">Start a project</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:border-violet-400/60 group-hover:bg-violet-500/10 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-500 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-16"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-violet-400/80 uppercase mb-4">Our Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Services we offer
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="255 100 80" /* A soft violet/cyan tone is handled by colors array */
                    backgroundColor="rgba(255,255,255,0.025)"
                    borderRadius={16}
                    glowRadius={40}
                    glowIntensity={0.6}
                    colors={['#8b5cf6', '#06b6d4', '#6366f1']}
                    animated={false}
                    className="group h-full w-full"
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    <div className="relative p-7 h-full flex flex-col cursor-default">
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{ background: "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
                      />
                      
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center mb-6 text-violet-400 group-hover:border-violet-500/30 group-hover:bg-violet-500/10 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-500"
                          style={{ background: "rgba(99,102,241,0.06)" }}
                        >
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
  
                        <h3 className="text-lg font-semibold mb-3 tracking-tight">{service.title}</h3>
                        <p className="text-white/45 text-sm leading-relaxed mb-5">{service.description}</p>
  
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full border border-white/10 text-white/40"
                              style={{ background: "rgba(255,255,255,0.04)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-indigo-600/4 rounded-full blur-[180px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-20"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-violet-400/80 uppercase mb-4">How We Work</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                Methodology
              </span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto leading-relaxed">
              A precise, engineering-first approach to delivering complex digital products on time, every time.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-px" />

            <div className="flex flex-col gap-16 md:gap-20">
              {PROCESS.map((step, i) => {
                const Icon = step.icon;
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                    className={`relative flex items-start gap-10 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Node */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-violet-500 -translate-x-[5px] md:-translate-x-1/2 mt-5 z-10 shadow-[0_0_12px_rgba(139,92,246,0.6)]" />

                    {/* Content */}
                    <div className={`pl-14 md:pl-0 md:w-5/12 ${isEven ? "md:pr-16" : "md:pl-16"}`}>
                      <div
                        className="p-6 rounded-2xl border border-white/[0.07] hover:border-violet-500/20 transition-all duration-500"
                        style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(8px)" }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-violet-400"
                            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
                          >
                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                          <span className="font-mono text-[10px] tracking-[0.2em] text-violet-400/70 uppercase">
                            Phase {step.number}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 tracking-tight">{step.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-2/12" />
                    <div className="hidden md:block md:w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-16"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-violet-400/80 uppercase mb-4">Tech Stack</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Built with the best tools
            </h2>
          </motion.div>

          <div className="w-full relative mt-8 h-24 overflow-hidden mask-fade-x">
            <LogoLoop
              logos={TECH_LOGOS}
              speed={100}
              direction="left"
              logoHeight={40}
              gap={80}
              hoverSpeed={20}
              scaleOnHover
              fadeOut
              fadeOutColor="#030014"
              ariaLabel="Technology Stack"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] max-w-[1000px] max-h-[600px] bg-violet-600/6 rounded-full blur-[160px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="max-w-3xl mx-auto text-center"
          >
            <div
              className="p-12 md:p-20 rounded-3xl border border-white/[0.07] relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 80px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
              />

              <div className="relative z-10">
                <Globe className="w-10 h-10 text-violet-400/60 mx-auto mb-8" strokeWidth={1} />
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
                  Ready to build something{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-cyan-400">
                    extraordinary?
                  </span>
                </h2>
                <p className="text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                  Let&apos;s discuss your project and architect a solution that exceeds your expectations.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium text-sm tracking-wide transition-all duration-300"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
