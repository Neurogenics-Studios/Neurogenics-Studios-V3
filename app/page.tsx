import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { AiSolutions } from "@/components/sections/ai-solutions";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Services />
      <AiSolutions />
      <Skills />
      <Projects />
      <Process />
      <Testimonials />
      <CTA />
    </div>
  );
}
