'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const BIRTH = Date.UTC(2002, 0, 2); // 2 Jan 2002
const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;

/**
 * Live decimal age, ticking. Writes directly to the DOM via ref (no React
 * re-render per frame). Renders a stable initial value for SSR/hydration.
 */
export function AgeCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (ref.current) {
        ref.current.textContent = ((Date.now() - BIRTH) / YEAR_MS).toFixed(9);
      }
      if (!reduce) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <span ref={ref} className="tabular-nums text-white/90">
      24.000000000
    </span>
  );
}
