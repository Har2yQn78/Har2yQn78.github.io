'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { AsciiAscent } from '@/components/ui/AsciiAscent';
import { AgeCounter } from '@/components/ui/AgeCounter';

const socials = [
  { label: 'X', href: 'https://x.com/Harry_Qn' },
  { label: 'GitHub', href: 'https://github.com/Har2yQn78' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hamidreza-amiri-mleng/' },
  { label: 'Email', href: 'mailto:hamidreza.amiri800@gmail.com' },
];

const ease = [0.16, 1, 0.3, 1] as const;

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
        <AsciiAscent className="h-full w-full" />
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
        className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32 lg:px-12"
      >
        <motion.h2
          variants={item}
          className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          HARRY AMIRI
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-3 text-xl text-white/55 lg:text-2xl"
        >
          Building Zimmer.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-8 max-w-3xl text-base leading-relaxed text-white/70 lg:text-lg"
        >
          Hamidreza on the birth certificate. A <AgeCounter />
          -year-old engineer working where <span className="text-white">systems</span> meet{' '}
          <span className="text-white">design</span>. Right now I&apos;m Technical Lead at{' '}
          <span className="text-white">Zimmer</span>, shipping software that has to hold up in the
          real world. Off the clock it&apos;s games, both playing and building them, plus books and
          music. What I care about: clean architecture, design systems that scale, and{' '}
          <span className="text-white">problems worth solving</span>.
        </motion.p>

        <motion.nav
          variants={item}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-white/50"
          aria-label="Social links"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="transition-colors duration-200 hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </motion.nav>
      </motion.div>
    </section>
  );
}
