"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "../layout/loading-screen";

interface LoadingContextType {
  isLoaded: boolean;
  isBloomFinished: boolean;
}

const LoadingContext = createContext<LoadingContextType>({ isLoaded: true, isBloomFinished: true });

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBloomFinished, setIsBloomFinished] = useState(false);

  useEffect(() => {
    // Fallback just in case something hangs
    const fallback = setTimeout(() => {
      setIsLoaded(true);
      setIsBloomFinished(true);
    }, 7000);
    return () => clearTimeout(fallback);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
    // The loading screen's exit animation takes 1.2s. 
    // We want the hero elements to start appearing exactly when the bloom expands (around 0.6s into exit)
    setTimeout(() => {
      setIsBloomFinished(true);
    }, 600);
  };

  return (
    <LoadingContext.Provider value={{ isLoaded, isBloomFinished }}>
      <AnimatePresence mode="wait">
        {!isLoaded && <LoadingScreen onComplete={handleLoadingComplete} key="loading" />}
      </AnimatePresence>
      <div className="relative z-0">
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
