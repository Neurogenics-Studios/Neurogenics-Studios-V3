"use client";

import { useState, useEffect, useRef } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options || { rootMargin: "200px" }); // 200px buffer to preload contexts before scroll entry

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, inView };
}
