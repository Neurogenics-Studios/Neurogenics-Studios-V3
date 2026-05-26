import { About as AboutSection } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech-stack";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "About Us | Neurogenics Studios",
  description: "Learn about our elite team, mission, and the next-generation technologies we use.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <AboutSection />
      <TechStack />
      <CTA />
    </div>
  );
}
