'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Seamless looping field of ASCII glyphs drifting upward (the "ascent"),
 * with cursor repulsion: glyphs near the pointer are pushed outward and ease
 * back when it leaves. Particles wrap top->bottom and fade at both edges so the
 * loop has no seam. Pointer state and offsets live outside React (no re-renders).
 * Static scatter under reduced-motion.
 */
export function AsciiAscent({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = '01<>/\\|+*.:=#';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const RADIUS = 150;
    const PUSH = 7;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;

    const pointer = { x: -9999, y: -9999, active: false };

    type P = { x: number; y: number; ox: number; oy: number; ch: string; sp: number };
    let parts: P[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const glyph = () => chars[Math.floor(Math.random() * chars.length)];
    const spawn = (anywhere: boolean): P => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + rand(0, 40),
      ox: 0,
      oy: 0,
      ch: glyph(),
      sp: rand(8, 26),
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '16px monospace';
      ctx.textBaseline = 'top';
      const count = Math.floor((w * h) / 6000); // denser
      parts = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const fade = h * 0.25;
      for (const p of parts) {
        p.y -= p.sp * dt;
        if (p.y < -20) {
          p.y = h + rand(0, 40);
          p.x = Math.random() * w;
          p.ox = 0;
          p.oy = 0;
          p.ch = glyph();
        }
        // cursor repulsion
        if (pointer.active) {
          const dx = p.x + p.ox - pointer.x;
          const dy = p.y + p.oy - pointer.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          if (dist < RADIUS) {
            const f = (1 - dist / RADIUS) * PUSH;
            p.ox += (dx / dist) * f;
            p.oy += (dy / dist) * f;
          }
        }
        p.ox *= 0.86; // ease back
        p.oy *= 0.86;

        const fy = p.y + p.oy;
        const edge = Math.min(p.y / fade, (h - p.y) / fade, 1);
        const a = Math.max(0, edge) * 0.34;
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillText(p.ch, p.x + p.ox, fy);
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!last) last = now;
      if (now - last < 1000 / 30) return; // throttle ~30fps
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt);
    };

    // Keep the pointer "active" once it has moved; far-away glyphs are outside
    // RADIUS so they are unaffected anyway, and pushed glyphs ease back on their
    // own. (Do not use pointerout: it bubbles from children and flickers the state.)
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };

    resize();
    if (reduce) {
      for (const p of parts) {
        ctx.fillStyle = 'rgba(255,255,255,0.16)';
        ctx.fillText(p.ch, p.x, p.y);
      }
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener('pointermove', onMove, { passive: true });
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
