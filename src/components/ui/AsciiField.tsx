'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Self-contained animated ASCII flow-field rendered to <canvas>.
 * Monochrome, low-opacity, sits behind the hero content. No external CDN.
 * Honors prefers-reduced-motion (renders a single static frame instead of looping).
 */
export function AsciiField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ramp = ' .:-=+*#%@';
    const cell = 18; // px per glyph
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let t = 0;
    let last = 0;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${cell}px monospace`;
      ctx.textBaseline = 'top';
    };

    // Cheap deterministic pseudo-noise (no dependency).
    const noise = (x: number, y: number, tt: number) =>
      Math.sin(x * 0.15 + tt) * 0.5 +
      Math.sin(y * 0.2 - tt * 0.8) * 0.3 +
      Math.sin((x + y) * 0.1 + tt * 0.5) * 0.2;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const v = (noise(i, j, t) + 1) / 2; // 0..1
          const ch = ramp[Math.floor(v * (ramp.length - 1))];
          if (ch === ' ') continue;
          ctx.fillStyle = `rgba(255,255,255,${0.1 + v * 0.22})`;
          ctx.fillText(ch, i * cell, j * cell);
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / 30) return; // throttle ~30fps
      last = now;
      t += 0.04;
      draw();
    };

    resize();
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
