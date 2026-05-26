"use client";

import { Bot, BrainCircuit, Network, Shield, Zap, Code } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { VolumetricGlass } from "@/components/effects/volumetric-glass";
import { useInView } from "@/lib/use-in-view";

const SOLUTIONS = [
  {
    title: "Autonomous Agents",
    description: "Deploy intelligent agents that can reason, plan, and execute complex workflows without human intervention.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20" />,
    icon: <Bot className="h-4 w-4 text-primary" />,
    className: "md:col-span-2",
  },
  {
    title: "RAG & Knowledge Engines",
    description: "Chat with your proprietary data. We build secure RAG pipelines that ground AI models in your enterprise knowledge base.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20" />,
    icon: <Network className="h-4 w-4 text-violet-400" />,
    className: "md:col-span-1",
  },
  {
    title: "Predictive Intelligence",
    description: "Leverage advanced machine learning to forecast trends and optimize logistics faster than the competition.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20" />,
    icon: <BrainCircuit className="h-4 w-4 text-indigo-400" />,
    className: "md:col-span-1",
  },
  {
    title: "Enterprise Security",
    description: "Military-grade encryption and security compliance tailored for next-generation decentralized platforms.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />,
    icon: <Shield className="h-4 w-4 text-emerald-400" />,
    className: "md:col-span-2",
  },
];

export function AiSolutions() {
  const { ref, inView } = useInView({ rootMargin: "200px" });

  return (
    <section ref={ref} id="solutions" className="relative min-h-screen py-24 bg-transparent overflow-hidden flex items-center">
      {inView && <VolumetricGlass />}
      
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Core Capabilities</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Intelligence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">operationalized.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We do not just integrate APIs; we build custom AI infrastructure designed to scale with your business logic. 
              Experience unprecedented automation and insight.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3} direction="up">
          <BentoGrid className="max-w-5xl mx-auto">
            {SOLUTIONS.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
                // add dark mode overrides to the card classes in BentoGridItem since it's dark themed
              />
            ))}
          </BentoGrid>
        </Reveal>
      </div>
    </section>
  );
}
