"use client";

import { useEffect, useRef, useCallback } from "react";

interface DotFieldProps {
  dotColor?: string;
  dotRadius?: number;
  gap?: number;
  repelRadius?: number;
  repelStrength?: number;
  className?: string;
}

export function DotField({
  dotColor = "rgba(139, 92, 246, 0.45)",
  dotRadius = 1.8,
  gap = 28,
  repelRadius = 140,
  repelStrength = 35,
  className = "",
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef<{ ox: number; oy: number; x: number; y: number; vx: number; vy: number }[]>([]);
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);

  const initDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const dots: typeof dotsRef.current = [];
    const cols = Math.ceil(rect.width / gap) + 1;
    const rows = Math.ceil(rect.height / gap) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = c * gap;
        const oy = r * gap;
        dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
      }
    }
    dotsRef.current = dots;
  }, [gap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    initDots();

    const handleResize = () => initDots();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const dpr = dprRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const repelR2 = repelRadius * repelRadius;
      const activeRadiusLimit = repelRadius * 1.5;
      const activeRadiusLimit2 = activeRadiusLimit * activeRadiusLimit;

      const activeDots = [];
      const staticDots = [];

      for (const dot of dotsRef.current) {
        const dx = dot.ox - mx;
        const dy = dot.oy - my;
        const dist2 = dx * dx + dy * dy;

        const isNearMouse = dist2 < activeRadiusLimit2;
        const isDisplaced = Math.abs(dot.x - dot.ox) > 0.05 || Math.abs(dot.y - dot.oy) > 0.05 || Math.abs(dot.vx) > 0.01 || Math.abs(dot.vy) > 0.01;

        if (isNearMouse || isDisplaced) {
          // Physics updates for active dots
          if (dist2 < repelR2 && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / repelRadius) * repelStrength;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            dot.vx += (dot.ox + fx - dot.x) * 0.12;
            dot.vy += (dot.oy + fy - dot.y) * 0.12;
          } else {
            dot.vx += (dot.ox - dot.x) * 0.08;
            dot.vy += (dot.oy - dot.y) * 0.08;
          }

          dot.vx *= 0.82;
          dot.vy *= 0.82;

          dot.x += dot.vx;
          dot.y += dot.vy;

          activeDots.push(dot);
        } else {
          // Snap back completely
          dot.x = dot.ox;
          dot.y = dot.oy;
          dot.vx = 0;
          dot.vy = 0;
          staticDots.push(dot);
        }
      }

      // Draw all static dots in a SINGLE batched path
      if (staticDots.length > 0) {
        ctx.beginPath();
        const r = dotRadius * dpr;
        ctx.fillStyle = `rgba(139, 92, 246, 0.25)`;
        for (const dot of staticDots) {
          const x = dot.ox * dpr;
          const y = dot.oy * dpr;
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Draw active dots individually (since they have unique colors and offsets)
      for (const dot of activeDots) {
        const cdx = dot.x - mx;
        const cdy = dot.y - my;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        const proximity = Math.max(0, 1 - cdist / activeRadiusLimit);
        const alpha = 0.25 + proximity * 0.55;
        const r = dotRadius * dpr * (1 + proximity * 0.4);

        ctx.beginPath();
        ctx.arc(dot.x * dpr, dot.y * dpr, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initDots, repelRadius, repelStrength, dotRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  );
}
