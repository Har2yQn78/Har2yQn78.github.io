'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { AsciiField } from '@/components/ui/AsciiField';

const content = {
  wordmark: 'HARRY WAS HERE.',
  role: 'INTELLIGENT SYSTEMS ENGINEER',
  headline: ['ENDLESS', 'ASCENT'],
  subtext:
    'Like Sisyphus, the work is never finished. Every system rebuilt, every model retrained, the climb starts again.',
  ctas: [
    { label: 'CONTACT', href: '#contact', primary: true },
    { label: 'ABOUT ME', href: '#about', primary: false },
  ],
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-black font-mono text-white">
      {/* Background: animated ASCII (desktop) / static starfield (mobile) */}
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        <AsciiField className="h-full w-full" />
      </div>
      <div className="absolute inset-0 lg:hidden starfield" aria-hidden="true" />

      {/* Left-side scrim for text legibility over the field */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"
        aria-hidden="true"
      />

      {/* Corner frame accents */}
      <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-white/25 lg:h-12 lg:w-12" />
      <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-white/25 lg:h-12 lg:w-12" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-white/25 lg:h-12 lg:w-12" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-white/25 lg:h-12 lg:w-12" />

      {/* Top bar: wordmark + role */}
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-4 lg:px-12">
          <span className="text-base font-bold tracking-widest text-white lg:text-lg">
            {content.wordmark}
          </span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" />
          <span className="hidden text-[10px] tracking-[0.22em] text-white/55 sm:block">
            {content.role}
          </span>
        </div>
      </header>

      {/* Content: anchored lower-left */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-24 lg:px-12 lg:pb-28"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={item}
            className="mb-4 text-[11px] tracking-[0.28em] text-white/55"
          >
            {content.role}
          </motion.p>

          <motion.h1
            variants={item}
            className="mb-6 text-5xl font-bold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-8xl"
          >
            {content.headline.map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-8 max-w-md text-sm leading-relaxed text-white/65 lg:text-base"
          >
            {content.subtext}
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            {content.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className={
                  'group inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-widest transition-[background-color,color,transform] duration-200 active:scale-[0.98] lg:text-sm ' +
                  (cta.primary
                    ? 'bg-white text-black hover:bg-white/85'
                    : 'border border-white/70 text-white hover:bg-white hover:text-black')
                }
              >
                {cta.label}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .starfield {
          background-image: radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 12%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 82%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 72% 40%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%,
            240% 240%, 210% 210%, 230% 230%;
          opacity: 0.25;
        }
      `}</style>
    </section>
  );
}
