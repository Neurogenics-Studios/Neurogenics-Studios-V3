"use client";

import { Reveal } from "@/components/animations/reveal";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Growth",
    price: "15k",
    description: "Perfect for startups and emerging brands needing a premium digital presence.",
    features: [
      "Custom Next.js Frontend",
      "Premium Cinematic Animations",
      "Headless CMS Integration",
      "Responsive Design",
      "Basic SEO Setup",
      "4 Weeks Delivery"
    ],
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "45k+",
    description: "For established companies requiring custom architecture and AI integration.",
    features: [
      "Everything in Growth",
      "Custom Backend Architecture",
      "AI/LLM Integration (RAG/Agents)",
      "Advanced Security & Auth",
      "Analytics Dashboard",
      "Dedicated Engineering Team"
    ],
    highlighted: true,
  },
  {
    name: "Retainer",
    price: "8k/mo",
    description: "Ongoing engineering partnership for continuous scaling and maintenance.",
    features: [
      "Dedicated Monthly Hours",
      "Priority Bug Fixes",
      "Infrastructure Monitoring",
      "Continuous Optimization",
      "Feature Iterations",
      "Direct Slack Channel"
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Transparent <span className="text-primary">Pricing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We deliver premium engineering that drives exponential ROI. No hidden fees, no compromises.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TIERS.map((tier, idx) => (
            <Reveal key={tier.name} delay={0.1 * idx} direction="up">
              <div 
                className={cn(
                  "relative flex flex-col h-full p-8 rounded-3xl glass border transition-all duration-500",
                  tier.highlighted 
                    ? "border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.2)] bg-secondary/30 scale-105 z-10" 
                    : "border-white/10 hover:border-primary/30"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    {tier.price.includes("mo") ? "" : <span className="text-muted-foreground">/project</span>}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tier.description}</p>
                </div>

                <div className="flex-1">
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm font-medium">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-center transition-all duration-300",
                    tier.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  Start a Project
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
