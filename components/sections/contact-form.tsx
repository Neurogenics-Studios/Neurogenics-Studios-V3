"use client";

import { Reveal } from "@/components/animations/reveal";
import { Mail, MapPin, Check } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Info & Map Placeholder */}
          <div className="flex flex-col gap-12">
            <div>
              <Reveal>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  Let's build the <span className="text-primary">future.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you need a cutting-edge web application, complex AI integration, or enterprise architecture, we're ready to engineer your solution.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Email Us</p>
                    <p className="font-bold">hello@neurogenics.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Headquarters</p>
                    <p className="font-bold">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Map Placeholder */}
            <Reveal delay={0.3} className="h-full">
              <div className="w-full h-64 md:h-full min-h-[250px] rounded-2xl glass border border-white/10 relative overflow-hidden flex items-center justify-center bg-secondary/20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/20 rounded-full blur-[60px]" />
                <div className="relative z-10 flex flex-col items-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mb-2 opacity-50" />
                  <span className="font-mono text-sm uppercase tracking-widest opacity-50">Interactive Map Integration</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Form */}
          <Reveal delay={0.4} direction="up" className="h-full">
            <div className="p-8 md:p-12 rounded-3xl glass border border-white/5 bg-secondary/10 h-full">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Message Sent</h4>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="text-sm font-medium text-muted-foreground">Estimated Budget</label>
                    <select 
                      id="budget"
                      className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                    >
                      <option>$15k - $25k</option>
                      <option>$25k - $50k</option>
                      <option>$50k - $100k</option>
                      <option>$100k+</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Project Details</label>
                    <textarea 
                      id="message" 
                      required
                      rows={5}
                      className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                      placeholder="Tell us about your technical requirements and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
