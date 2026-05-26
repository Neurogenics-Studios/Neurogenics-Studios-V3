"use client";

import { MonitorSmartphone, Code2, Cpu, LineChart, ShieldCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { EdgeLightningCard } from "@/components/effects/edge-lightning-card";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { VolumetricGlass } from "@/components/effects/volumetric-glass";
import { useInView } from "@/lib/use-in-view";

const SERVICES = [
  {
    icon: MonitorSmartphone,
    title: "Digital Experiences",
    description: "Immersive, high-performance web applications built with modern frameworks and cinematic WebGL animations.",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Seamlessly embed LLMs, computer vision, and machine learning models into your existing enterprise products.",
  },
  {
    icon: Code2,
    title: "Custom Architecture",
    description: "Scalable, secure, and robust backend systems designed to handle enterprise-level traffic and massive data.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Comprehensive audits and re-engineering to achieve sub-second load times and flawless Lighthouse scores.",
  },
  {
    icon: LineChart,
    title: "Data Strategy",
    description: "Transform raw data into actionable insights with custom analytics pipelines and intelligent real-time dashboards.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Military-grade encryption and security compliance tailored for next-generation decentralized digital platforms.",
  },
];

export function Services() {
  const { ref, inView } = useInView({ rootMargin: "200px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative min-h-screen py-20 md:py-24 bg-background overflow-hidden flex items-center"
    >
      {/* Dynamic 3D Background - lazy mounted */}
      {inView && <VolumetricGlass />}
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">excellence.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              We provide end-to-end development services, bridging the gap between stunning visual design and robust, AI-powered engineering.
            </p>
          </Reveal>
        </div>

        <Stagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={index}>
                  <EdgeLightningCard duration={3 + index * 0.5} className="h-full">
                    <SpotlightCard className="h-full p-5 md:p-8 border-none bg-transparent">
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-background/80 shadow-md border border-border/50 flex items-center justify-center mb-5 md:mb-8 text-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        
                        <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed flex-grow text-xs sm:text-sm md:text-base">
                          {service.description}
                        </p>
                        
                        <div className="mt-5 md:mt-8 pt-3 md:pt-4 border-t border-border/10">
                          <span className="text-primary font-medium text-xs md:text-sm inline-flex items-center gap-2 cursor-pointer group-hover:translate-x-1 transition-transform">
                            Explore capabilities 
                            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </EdgeLightningCard>
                </StaggerItem>
              );
            })}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
