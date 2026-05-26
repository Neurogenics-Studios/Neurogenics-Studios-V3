"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer: "Our standard engagements typically run 6-12 weeks, depending on the complexity of the architecture and AI integrations required. We operate in two-week agile sprints, providing continuous delivery and absolute transparency throughout the process.",
  },
  {
    question: "Do you only work with Next.js?",
    answer: "While Next.js is our preferred framework for building highly optimized web applications, our engineering capabilities extend to Python, Go, and Rust for complex backend microservices, as well as React Native for mobile applications.",
  },
  {
    question: "How do you handle AI model integration?",
    answer: "We build secure, enterprise-grade AI infrastructure. This includes custom RAG (Retrieval-Augmented Generation) pipelines, autonomous agent workflows, and predictive models, all designed to ensure your proprietary data remains private and secure.",
  },
  {
    question: "What is the minimum budget for an engagement?",
    answer: "Because we focus on premium, enterprise-grade solutions rather than simple templates, our engagements generally start at $15,000. We view every project as a strategic partnership aimed at delivering measurable ROI.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes. We offer retainer agreements for continuous optimization, feature expansion, and infrastructure maintenance to ensure your digital ecosystem remains performant and secure as you scale.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Frequently Asked <span className="text-primary">Questions.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about partnering with us.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <Reveal key={idx} delay={0.1 * idx} direction="up">
                <div 
                  className={cn(
                    "border border-white/10 rounded-2xl overflow-hidden glass transition-all duration-300",
                    isOpen ? "border-primary/50 bg-secondary/30" : "hover:border-primary/30"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex items-center justify-between w-full p-6 text-left"
                  >
                    <span className="font-bold text-lg">{faq.question}</span>
                    <ChevronDown 
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300",
                        isOpen ? "rotate-180 text-primary" : ""
                      )} 
                    />
                  </button>
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-500 ease-in-out",
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
