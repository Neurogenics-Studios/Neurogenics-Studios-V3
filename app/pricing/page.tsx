import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "Pricing | Neurogenics Studios",
  description: "Transparent pricing for enterprise-grade digital architecture and AI solutions.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}
