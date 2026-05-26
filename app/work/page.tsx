import { CaseStudies } from "@/components/sections/case-studies";
import { Projects } from "@/components/sections/projects";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "Our Work | Neurogenics Studios",
  description: "Explore our featured projects, case studies, and premium digital solutions.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="py-20 bg-background text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Our <span className="text-primary">Work.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of enterprise-grade architectures and award-winning digital experiences.
          </p>
        </div>
      </div>
      <Projects />
      <CaseStudies />
      <CTA />
    </div>
  );
}
