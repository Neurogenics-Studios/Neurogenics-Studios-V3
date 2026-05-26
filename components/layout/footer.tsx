"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border/50 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Neurogenics
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
              A premium futuristic digital agency specializing in full-stack engineering, AI integration, and cutting-edge web experiences.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/work" className="hover:text-primary transition-colors">Our Work</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <p>© {currentYear} Neurogenics Studios. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <span className="text-primary">precision</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
