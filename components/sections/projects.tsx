"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import Link from "next/link";
import { WarpGalaxy } from "@/components/effects/warp-galaxy";
import { EdgeLightningCard } from "@/components/effects/edge-lightning-card";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { useInView } from "@/lib/use-in-view";
import { MagneticElement } from "@/components/animations/magnetic-element";

const PROJECTS = [
  {
    id: "proj-1",
    title: "Aura Intelligence",
    category: "AI Dashboard",
    description: "A comprehensive predictive analytics dashboard processing millions of data points in real-time.",
    image: "bg-gradient-to-br from-indigo-900 to-slate-900",
    tags: ["Next.js", "Python", "TensorFlow"],
    link: "#",
  },
  {
    id: "proj-2",
    title: "FinEdge App",
    category: "Fintech Web",
    description: "An ultra-fast decentralized trading interface built for institutional investors with 50ms latency.",
    image: "bg-gradient-to-tr from-violet-900 to-zinc-900",
    tags: ["React Native", "Supabase", "Go"],
    link: "#",
  },
];

export function Projects() {
  const { ref, inView } = useInView({ rootMargin: "200px" });

  return (
    <section ref={ref} id="work" className="relative min-h-screen py-24 bg-transparent overflow-hidden flex items-center">
      {inView && <WarpGalaxy />}
      
      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Featured <span className="text-primary">Projects.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A selection of our most complex engineering challenges and premium digital experiences.
              </p>
            </Reveal>
          </div>
          
          <Reveal delay={0.2}>
            <MagneticElement>
              <Link 
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-secondary transition-colors font-medium"
              >
                View full archive
              </Link>
            </MagneticElement>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={0.1 + idx * 0.1} direction="up" className="h-full">
              <EdgeLightningCard className="h-full" duration={4 + idx}>
                <SpotlightCard className="h-full border-none bg-transparent flex flex-col p-0">
                  {/* Image/Visual Container */}
                  <div className="w-full aspect-[16/10] rounded-t-[calc(1.5rem-1px)] overflow-hidden relative">
                    <div className={`absolute inset-0 ${project.image} transition-transform duration-700 group-hover:scale-105`} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white/30 font-mono text-sm tracking-widest uppercase">{project.title} Preview</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <p className="text-primary font-medium mb-3">{project.category}</p>
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-muted-foreground text-base mb-8 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link 
                      href={project.link}
                      className="inline-flex items-center gap-2 pb-1 border-b-2 border-transparent hover:border-primary text-foreground hover:text-primary transition-all font-semibold w-max"
                    >
                      View Case Study
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </SpotlightCard>
              </EdgeLightningCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
