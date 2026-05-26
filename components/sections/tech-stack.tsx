"use client";

import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { LogoLoop } from "@/components/sections/logo-loop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiVercel,
  SiPrisma,
  SiFramer,
  SiSupabase
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const TECHNOLOGIES = [
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiReact />, title: "React" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiSupabase />, title: "Supabase" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiPython />, title: "Python" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <FaAws />, title: "AWS" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiFramer />, title: "Framer Motion" },
  { node: <SiPrisma />, title: "Prisma" },
];

export function TechStack() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-black border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50" />
      
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Modern Arsenal
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Next-Gen Tech</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              We leverage the most advanced and reliable technologies to build scalable, high-performance digital ecosystems.
            </p>
          </Reveal>
        </div>

        {/* Tech Grid */}
        <Reveal delay={0.3}>
          <div className="w-full relative mt-12 h-24 overflow-hidden">
            <LogoLoop
              logos={TECHNOLOGIES}
              speed={100}
              direction="left"
              logoHeight={48}
              gap={80}
              hoverSpeed={20}
              scaleOnHover
              fadeOut
              fadeOutColor="#000000" /* matching bg-black from section */
              ariaLabel="Technology Stack"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
