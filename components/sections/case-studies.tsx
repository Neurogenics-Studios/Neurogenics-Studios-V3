"use client";

import { Reveal } from "@/components/animations/reveal";
import { ArrowUpRight, BarChart3, Clock, Zap } from "lucide-react";
import Link from "next/link";

const CASE_STUDIES = [
  {
    client: "Global Logistics Corp",
    challenge: "Manual supply chain routing was causing 15% revenue leakage and 48-hour delay in decision making.",
    solution: "Developed an autonomous routing engine powered by a custom LLM and real-time predictive models.",
    metrics: [
      { label: "Efficiency Increase", value: "340%", icon: Zap },
      { label: "Decision Latency", value: "< 2s", icon: Clock },
      { label: "Revenue Recovered", value: "$4.2M", icon: BarChart3 },
    ],
  },
  {
    client: "Nexus Financial",
    challenge: "High-frequency trading platform was bottlenecked by legacy database architecture and monolithic APIs.",
    solution: "Re-architected the entire backend using Go and Next.js, implementing a highly concurrent event-driven system.",
    metrics: [
      { label: "System Throughput", value: "10x", icon: Zap },
      { label: "Trade Execution", value: "50ms", icon: Clock },
      { label: "Server Costs", value: "-65%", icon: BarChart3 },
    ],
  },
];

export function CaseStudies() {
  return (
    <section className="relative py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Proven <span className="text-primary">Outcomes.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We don't just write code; we deliver measurable business impact.
              </p>
            </div>
            <Link 
              href="#contact"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
            >
              Start your transformation <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="p-8 md:p-10 rounded-3xl glass border border-white/5 flex flex-col h-full hover:border-primary/20 transition-colors duration-500">
                <div className="mb-8">
                  <h3 className="text-sm font-mono text-primary font-bold tracking-widest uppercase mb-4">{study.client}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">The Challenge</p>
                      <p className="text-foreground leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">The Solution</p>
                      <p className="text-foreground leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
                  {study.metrics.map((metric, mIdx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={mIdx} className="flex flex-col">
                        <Icon className="w-5 h-5 text-muted-foreground mb-2" />
                        <span className="text-2xl md:text-3xl font-bold text-foreground mb-1">{metric.value}</span>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{metric.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
