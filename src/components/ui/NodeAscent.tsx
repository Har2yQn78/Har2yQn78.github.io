'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * ctOS-style connection graph that also *ascends*: nodes drift upward (the climb),
 * linked by edges to nearby neighbors, with data packets traveling the links.
 * Cursor repulsion lets you disturb the mesh. Nodes wrap bottom->top and fade at
 * both edges so the loop has no seam. Static mesh under reduced-motion.
 */
export function NodeAscent({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 118; // px: max edge length
    const RADIUS = 150; // cursor influence
    const PUSH = 7;
    const CYAN = '34,211,238';
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let t = 0;

    const pointer = { x: -9999, y: -9999, active: false };

    type N = { x: number; y: number; ox: number; oy: number; sp: number; ph: number };
    type Packet = { a: number; b: number; t: number; sp: number };
    let nodes: N[] = [];
    let packets: Packet[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (anywhere: boolean): N => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + rand(0, 40),
      ox: 0,
      oy: 0,
      sp: rand(6, 16),
      ph: Math.random() * Math.PI * 2,
    });

    // pick a neighbor within LINK of node i, else any node
    const neighbor = (i: number) => {
      const a = nodes[i];
      const near: number[] = [];
      for (let k = 0; k < nodes.length; k++) {
        if (k === i) continue;
        const dx = nodes[k].x - a.x;
        const dy = nodes[k].y - a.y;
        if (dx * dx + dy * dy < LINK * LINK) near.push(k);
      }
      if (near.length) return near[(Math.random() * near.length) | 0];
      return (Math.random() * nodes.length) | 0;
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // ponytail: O(n^2) edge scan; count is capped so it stays cheap.
      // Swap in a spatial grid if the node cap ever climbs past a few hundred.
      const count = Math.min(240, Math.max(40, Math.floor((w * h) / 8500)));
      nodes = Array.from({ length: count }, () => spawn(true));
      const pk = Math.min(9, Math.max(3, Math.floor(count / 14)));
      packets = Array.from({ length: pk }, () => {
        const a = (Math.random() * nodes.length) | 0;
        return { a, b: neighbor(a), t: Math.random(), sp: rand(0.4, 1.1) };
      });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const fade = h * 0.22;

      // move nodes: rise + cursor repulsion + ease-back
      for (const n of nodes) {
        n.y -= n.sp * dt;
        if (n.y < -20) {
          n.y = h + rand(0, 40);
          n.x = Math.random() * w;
          n.ox = 0;
          n.oy = 0;
        }
        if (pointer.active) {
          const dx = n.x + n.ox - pointer.x;
          const dy = n.y + n.oy - pointer.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          if (dist < RADIUS) {
            const f = (1 - dist / RADIUS) * PUSH;
            n.ox += (dx / dist) * f;
            n.oy += (dy / dist) * f;
          }
        }
        n.ox *= 0.86;
        n.oy *= 0.86;
      }

      const px = (n: N) => n.x + n.ox;
      const py = (n: N) => n.y + n.oy;
      const edgeAlpha = (n: N) => {
        const e = Math.min(n.y / fade, (h - n.y) / fade, 1);
        return Math.max(0, e);
      };

      // edges
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let k = i + 1; k < nodes.length; k++) {
          const a = nodes[i];
          const b = nodes[k];
          const dx = px(a) - px(b);
          const dy = py(a) - py(b);
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const d = Math.sqrt(d2);
          const prox = 1 - d / LINK;
          const vis = prox * Math.min(edgeAlpha(a), edgeAlpha(b));
          // cyan-tint edges near the cursor, dim white elsewhere
          const nearCursor =
            pointer.active &&
            (Math.hypot(px(a) - pointer.x, py(a) - pointer.y) < RADIUS ||
              Math.hypot(px(b) - pointer.x, py(b) - pointer.y) < RADIUS);
          ctx.strokeStyle = nearCursor
            ? `rgba(${CYAN},${vis * 0.5})`
            : `rgba(255,255,255,${vis * 0.16})`;
          ctx.beginPath();
          ctx.moveTo(px(a), py(a));
          ctx.lineTo(px(b), py(b));
          ctx.stroke();
        }
      }

      // packets (data flowing along links)
      for (const p of packets) {
        p.t += p.sp * dt;
        if (p.t >= 1) {
          p.a = p.b;
          p.b = neighbor(p.a);
          p.t = 0;
        }
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = px(a) + (px(b) - px(a)) * p.t;
        const y = py(a) + (py(b) - py(a)) * p.t;
        const vis = Math.min(edgeAlpha(a), edgeAlpha(b));
        ctx.fillStyle = `rgba(${CYAN},${0.85 * vis})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes on top, gently pulsing
      for (const n of nodes) {
        const a = edgeAlpha(n);
        const pulse = 0.32 + 0.18 * Math.sin(t * 1.6 + n.ph);
        ctx.fillStyle = `rgba(255,255,255,${pulse * a})`;
        ctx.beginPath();
        ctx.arc(px(n), py(n), 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawStatic = () => {
      // no rise, no packets — just the mesh + nodes once
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let k = i + 1; k < nodes.length; k++) {
          const a = nodes[i];
          const b = nodes[k];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const prox = 1 - Math.sqrt(d2) / LINK;
          ctx.strokeStyle = `rgba(255,255,255,${prox * 0.14})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!last) last = now;
      if (now - last < 1000 / 30) return; // throttle ~30fps
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      draw(dt);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };

    resize();
    if (reduce) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener('pointermove', onMove, { passive: true });
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) drawStatic();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
