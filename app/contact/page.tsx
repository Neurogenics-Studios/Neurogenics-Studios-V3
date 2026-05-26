import { ContactForm } from "@/components/sections/contact-form";
import { FAQ } from "@/components/sections/faq";

export const metadata = {
  title: "Contact Us | Neurogenics Studios",
  description: "Get in touch with our elite engineering team to discuss your next project.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <ContactForm />
      <FAQ />
    </div>
  );
}
