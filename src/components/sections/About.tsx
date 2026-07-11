'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { NodeAscent } from '@/components/ui/NodeAscent';
import { AgeCounter } from '@/components/ui/AgeCounter';

const socials = [
  { label: 'X', href: 'https://x.com/Harry_Qn' },
  { label: 'GitHub', href: 'https://github.com/Har2yQn78' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hamidreza-amiri-mleng/' },
  { label: 'Email', href: 'mailto:hamidreza.amiri800@gmail.com' },
];

const ease = [0.16, 1, 0.3, 1] as const;

function Field({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-white/35">{label}</dt>
      <dd className={'text-right text-sm ' + (accent ? 'text-ctos' : 'text-white/85')}>
        {children}
      </dd>
    </div>
  );
}

export function About() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <section
      id="about"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-black font-mono text-white"
    >
      {/* Looping ascending ASCII background */}
      <div className="absolute inset-0" aria-hidden="true">
        <NodeAscent className="h-full w-full" />
      </div>
      {/* Soft vignette to keep the centered copy crisp */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_30%,transparent_78%)]"
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        className="relative z-10 mx-auto w-full max-w-4xl px-6 py-32 lg:px-12"
      >
        {/* ctOS status line */}
        <motion.div
          variants={item}
          className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ctos"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ctos" />
          ctOS <span className="text-white/25">/</span> Subject Profile
        </motion.div>

        {/* Framed readout with cyan corner brackets */}
        <div className="relative border border-white/10 bg-black/20 p-6 backdrop-blur-[1px] sm:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-ctos/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-ctos/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-ctos/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-ctos/70"
          />

          <motion.h2
            variants={item}
            className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            HARRY AMIRI
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-2 text-xs uppercase tracking-[0.28em] text-ctos sm:text-sm"
          >
            Intelligent Systems Engineer
          </motion.p>

          {/* Data fields */}
          <motion.dl
            variants={item}
            className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2"
          >
            <Field label="Subject">Hamidreza Amiri</Field>
            <Field label="Age">
              <AgeCounter />
            </Field>
            <Field label="Employer">
              <a
                href="https://zimmerai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-ctos hover:decoration-ctos"
              >
                Zimmer
              </a>{' '}
              — Technical Lead
            </Field>
            <Field label="OS">Linux</Field>
            <Field label="Status" accent>
              Climbing
            </Field>
            <Field label="Threat">Low</Field>
          </motion.dl>

          {/* Notes */}
          <motion.div variants={item} className="mt-8">
            <span className="text-[11px] uppercase tracking-[0.28em] text-ctos">Notes</span>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 lg:text-lg">
              Works where <span className="text-white">systems</span> meet{' '}
              <span className="text-white">design</span>. Off the clock it&apos;s games, both
              playing and building them, plus books and music. What he cares about: clean
              architecture, systems that scale, and{' '}
              <span className="text-white">problems worth solving</span>.
            </p>
          </motion.div>

          {/* Connections */}
          <motion.div variants={item} className="mt-8">
            <span className="text-[11px] uppercase tracking-[0.28em] text-ctos">Connections</span>
            <nav
              className="mt-3 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-white/50"
              aria-label="Social links"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="transition-colors duration-200 hover:text-ctos"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
