"use client";

import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/animations/reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { Terminal, Lock, Unlock, Play } from "lucide-react";
import { MagneticElement } from "@/components/animations/magnetic-element";

const HACKER_CODE = `
#include <iostream>
#include <vector>
#include <crypto/aes.h>
#include <network/socket.h>

void bypass_mainframe() {
    Connection* conn = connect_to_host("192.168.0.1", 443);
    if (!conn->is_secure()) {
        conn->upgrade_to_tls();
    }
    
    std::vector<uint8_t> payload = { 0x90, 0x90, 0xCC, 0x31, 0xC0 };
    conn->send_buffer(payload);
    
    while(conn->is_alive()) {
        auto response = conn->read_stream();
        if (response.contains("ROOT_ACCESS_GRANTED")) {
            unlock_firewall();
            break;
        }
    }
}

// Initializing kernel exploit...
// Bypassing security checks...
// Dumping database credentials...
// Access granted!
`;

export function About() {
  const [isHacking, setIsHacking] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const startHacking = () => {
    setIsHacking(true);
    setTypedCode("");
    setIsSuccess(false);
  };

  useEffect(() => {
    if (!isHacking) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default to stop scrolling if user presses space/arrows while hacking
      if (["Space", "ArrowUp", "ArrowDown"].includes(e.code)) {
        e.preventDefault();
      }

      setTypedCode((prev) => {
        const nextLength = prev.length + 5;
        if (nextLength >= HACKER_CODE.length) {
          setIsSuccess(true);
          setIsHacking(false);
          return HACKER_CODE;
        }
        return HACKER_CODE.substring(0, nextLength);
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHacking]);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [typedCode]);

  return (
    <section id="about" className="relative min-h-screen py-24 bg-transparent overflow-hidden flex items-center">
      <div className="container mx-auto px-6 relative z-10 w-full max-w-4xl">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-center">
            About <span className="text-primary">Neurogenics.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We are a collective of elite engineers, designers, and AI researchers. We don't just write code; we build the future.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="relative">
          <SpotlightCard className="rounded-xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl backdrop-blur-md">
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                root@neurogenics:~/system
              </div>
              <div className="w-16" /> {/* spacer for alignment */}
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="p-6 font-mono text-sm md:text-base h-[400px] overflow-y-auto text-green-400 whitespace-pre-wrap flex flex-col"
            >
              {!isHacking && !isSuccess && !typedCode && (
                <div className="m-auto text-center flex flex-col items-center">
                  <Lock className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-6">System Encrypted. Authorization Required.</p>
                  <MagneticElement>
                    <button 
                      onClick={startHacking}
                      className="flex items-center gap-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-md transition-all uppercase tracking-widest font-bold"
                    >
                      <Play className="w-4 h-4" /> Initialize Hack
                    </button>
                  </MagneticElement>
                </div>
              )}

              {isHacking && (
                <>
                  <div className="text-green-500 mb-2">Connecting to mainframe... OK.</div>
                  <div className="text-green-500 mb-4">Start typing anywhere to inject exploit payload.</div>
                  {typedCode}
                  <span className="animate-pulse">_</span>
                </>
              )}

              {isSuccess && (
                <div className="mt-auto">
                  {typedCode}
                  <div className="mt-8 border border-green-500/30 bg-green-500/10 p-6 rounded-md text-center">
                    <Unlock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-2">ACCESS GRANTED</h3>
                    <p className="text-green-300/70 mb-6">Mainframe bypassed. Source code unlocked.</p>
                    <a 
                      href="https://github.com/neurogenics" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block px-6 py-2 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition-colors"
                    >
                      View Source Code
                    </a>
                  </div>
                </div>
              )}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
