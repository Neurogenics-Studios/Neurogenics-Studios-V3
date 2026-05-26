"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // Set initial state immediately without waiting for a scroll event
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    // Run immediately on mount
    checkScroll();

    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // On page change, recheck scroll position
  React.useEffect(() => {
    setIsScrolled(window.scrollY > 60);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div
        className={cn(
          "px-6 lg:px-8 py-3 flex items-center justify-between rounded-2xl transition-all duration-700",
          isScrolled
            ? "liquid-glass"
            : "liquid-glass"
        )}
        style={{
          borderColor: isScrolled ? "rgba(99, 102, 241, 0.12)" : "rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <span className="font-bold text-lg text-white">N</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[14px] leading-tight tracking-tight text-white uppercase">
              Neurogenics
            </span>
            <span className="font-medium text-[10px] leading-tight tracking-widest text-white/60 uppercase">
              Studios
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-medium transition-colors relative group py-2 tracking-wide",
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <Menu className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-3 relative z-50">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 bg-[#030014]/95 backdrop-blur-3xl border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors tracking-wide",
                      isActive ? "text-white" : "text-white/50 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
