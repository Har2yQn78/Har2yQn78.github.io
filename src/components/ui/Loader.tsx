'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * First-launch boot screen. Counts 000->100, fills a hairline bar, then the
 * whole overlay slides up (the "ascent") to reveal the page. Shows once per
 * browser session via sessionStorage. Under reduced motion it skips the count
 * and curtain, fading out instantly.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [instant, setInstant] = useState(false);

  const count = useMotionValue(0);
  const scaleX = useTransform(count, [0, 100], [0, 1]);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only the first load of a browser session gets the boot screen.
    if (sessionStorage.getItem('booted')) {
      setInstant(true);
      setShow(false);
      return;
    }

    const done = () => {
      sessionStorage.setItem('booted', '1');
      setShow(false);
    };

    if (reduce) {
      const t = setTimeout(done, 350);
      return () => clearTimeout(t);
    }

    const unsub = count.on('change', (v) => {
      if (numRef.current) {
        numRef.current.textContent = String(Math.floor(v)).padStart(3, '0');
      }
    });
    const controls = animate(count, 100, { duration: 2.2, ease: EASE });
    let tail: ReturnType<typeof setTimeout>;
    controls.then(() => {
      tail = setTimeout(done, 450);
    });

    return () => {
      unsub();
      controls.stop();
      clearTimeout(tail);
    };
  }, [reduce, count]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black font-mono text-white"
          initial={{ opacity: 1 }}
          exit={
            instant || reduce
              ? { opacity: 0, transition: { duration: 0.2 } }
              : { y: '-100%', transition: { duration: 1, ease: EASE } }
          }
        >
          <div className="w-[min(80vw,420px)]">
            <div className="flex items-center justify-between text-[11px] tracking-[0.28em] text-white/55">
              <span className="inline-flex items-center">
                HARRY WAS HERE.
                <motion.span
                  className="ml-1 inline-block h-3 w-[0.5em] bg-white/70"
                  animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                />
              </span>
              <span className="text-white/35">BOOT</span>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <span
                ref={numRef}
                className="text-6xl font-bold tabular-nums tracking-tight lg:text-7xl"
              >
                000
              </span>
              <span className="mb-1.5 text-xl text-white/35">%</span>
            </div>

            <div className="mt-5 h-0.5 w-full overflow-hidden bg-white/15">
              <motion.div style={{ scaleX }} className="h-full w-full origin-left bg-white" />
            </div>

            <p className="mt-4 text-[11px] tracking-[0.22em] text-white/40">ESTABLISHING ASCENT</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
