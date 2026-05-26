"use client";

import { Reveal } from "@/components/animations/reveal";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { LiquidEther } from "@/components/effects/liquid-ether";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { useInView } from "@/lib/use-in-view";

export function CTA() {
  const { ref, inView } = useInView({ rootMargin: "200px" });

  return (
    <section ref={ref} id="contact" className="relative min-h-screen py-24 bg-transparent overflow-hidden border-t border-border/50 flex items-center">
      {inView && <LiquidEther />}
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 w-full">
        <SpotlightCard className="max-w-4xl mx-auto bg-black/40 rounded-3xl p-8 md:p-16 text-center backdrop-blur-xl relative overflow-hidden border border-white/10">
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8 border border-primary/20">
              <Mail className="w-8 h-8" />
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">innovate?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Partner with Neurogenics to engineer your next breakthrough. Whether it's a high-performance web app or a complex AI integration, we're ready to build.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="mailto:hello@neurogenics.com"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] w-full sm:w-auto justify-center"
              >
                <span className="relative z-10">Start a Conversation</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
          </Reveal>
        </SpotlightCard>
      </div>
    </section>
  );
}
