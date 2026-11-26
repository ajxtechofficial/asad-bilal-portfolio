"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export interface AmbientCanvasProps {
  className?: string;
}

/**
 * Lightweight, reduced-motion-aware atmospheric studio canvas rendering soft
 * volumetric rim lighting, subtle architectural hairlines, and restrained motes.
 */
export function AmbientCanvas({ className }: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);
  const pointerRef = useRef({ x: 0.68, y: 0.45, targetX: 0.68, targetY: 0.45 });
  const drawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    themeRef.current = resolvedTheme;
    drawRef.current?.();
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let isVisible = true;
    let time = 0;

    const motes: Mote[] = Array.from({ length: 24 }, (_, idx) => {
      const seed = (idx + 1) * 0.61803398875;
      return {
        x: (seed * 1.7) % 1,
        y: (seed * 2.3) % 1,
        vx: (idx % 2 === 0 ? 1 : -1) * (0.00004 + (idx % 5) * 0.000015),
        vy: -0.00003 - (idx % 4) * 0.000012,
        radius: 0.8 + (idx % 3) * 0.45,
        alpha: 0.14 + (idx % 4) * 0.06,
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (stepTime: number) => {
      const isLight = themeRef.current === "light";
      const p = pointerRef.current;
      p.x += (p.targetX - p.x) * 0.035;
      p.y += (p.targetY - p.y) * 0.035;

      ctx.clearRect(0, 0, width, height);

      const driftX = reducedMotion ? 0 : Math.sin(stepTime * 0.00035) * 0.025;
      const driftY = reducedMotion ? 0 : Math.cos(stepTime * 0.00028) * 0.02;

      const focalX = width * (0.64 + (p.x - 0.64) * 0.12 + driftX);
      const focalY = height * (0.44 + (p.y - 0.44) * 0.1 + driftY);

      const primaryRadius = Math.max(width, height) * 0.56;
      const primaryGlow = ctx.createRadialGradient(
        focalX,
        focalY,
        0,
        focalX,
        focalY,
        primaryRadius
      );

      if (isLight) {
        primaryGlow.addColorStop(0, "rgba(250, 247, 239, 0.55)");
        primaryGlow.addColorStop(0.45, "rgba(130, 150, 138, 0.14)");
        primaryGlow.addColorStop(1, "rgba(237, 232, 220, 0)");
      } else {
        primaryGlow.addColorStop(0, "rgba(116, 148, 156, 0.16)");
        primaryGlow.addColorStop(0.42, "rgba(194, 65, 48, 0.09)");
        primaryGlow.addColorStop(1, "rgba(9, 10, 12, 0)");
      }

      ctx.fillStyle = primaryGlow;
      ctx.fillRect(0, 0, width, height);

      const rimX = width * (0.72 - driftX * 1.4);
      const rimY = height * (0.32 + driftY);
      const rimGlow = ctx.createRadialGradient(
        rimX,
        rimY,
        0,
        rimX,
        rimY,
        primaryRadius * 0.55
      );
      rimGlow.addColorStop(
        0,
        isLight ? "rgba(166, 50, 36, 0.045)" : "rgba(239, 236, 228, 0.075)"
      );
      rimGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = rimGlow;
      ctx.fillRect(0, 0, width, height);

      // Fine architectural coordinate lines
      ctx.strokeStyle = isLight
        ? "rgba(20, 21, 24, 0.055)"
        : "rgba(239, 236, 228, 0.055)";
      ctx.lineWidth = 1;

      const horizonY = Math.round(height * 0.72) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      const axisX = Math.round(width * 0.54) + 0.5;
      ctx.beginPath();
      ctx.moveTo(axisX, 0);
      ctx.lineTo(axisX, height);
      ctx.stroke();

      // Restrained drifting studio motes
      for (const mote of motes) {
        if (!reducedMotion) {
          mote.x = (mote.x + mote.vx + 1) % 1;
          mote.y = (mote.y + mote.vy + 1) % 1;
        }

        const mx = mote.x * width;
        const my = mote.y * height;

        ctx.beginPath();
        ctx.arc(mx, my, mote.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(20, 21, 24, ${mote.alpha * 0.45})`
          : `rgba(239, 236, 228, ${mote.alpha})`;
        ctx.fill();
      }
    };

    drawRef.current = () => drawFrame(time);

    const tick = () => {
      if (!isVisible || reducedMotion) return;
      time += 16;
      drawFrame(time);
      rafId = window.requestAnimationFrame(tick);
    };

    resize();
    drawFrame(0);

    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(tick);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      drawFrame(time);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && !reducedMotion && !rafId) {
          rafId = window.requestAnimationFrame(tick);
        } else if (!isVisible && rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerRef.current.targetX = (event.clientX - rect.left) / rect.width;
      pointerRef.current.targetY = (event.clientY - rect.top) / rect.height;
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion && rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
        drawFrame(0);
      } else if (!reducedMotion && isVisible && !rafId) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      drawRef.current = null;
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
    />
  );
}
