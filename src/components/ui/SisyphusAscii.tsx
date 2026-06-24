'use client';

/**
 * Animated ASCII Sisyphus: a figure pushing a boulder up an incline.
 * The boulder rolls (rotates) and the whole scene climbs a little then resets,
 * never arriving. Pure CSS keyframes (off main thread). Static under reduced-motion.
 */
export function SisyphusAscii({ className = '' }: { className?: string }) {
  return (
    <div className={`sis ${className}`} aria-hidden="true">
      <div className="scene">
        <pre className="figure">{`  o
 /|
 / \\`}</pre>
        <pre className="boulder">{` .-~~-.
/ .  . \\
|  ()  |
\\ .  . /
 '-~~-'`}</pre>
        <div className="ground" />
      </div>

      <style jsx>{`
        .sis {
          color: rgba(255, 255, 255, 0.72);
          font-family: monospace;
        }
        .scene {
          position: relative;
          width: max-content;
          animation: climb 7s ease-in-out infinite;
        }
        .figure,
        .boulder {
          margin: 0;
          white-space: pre;
          font-size: clamp(13px, 1.4vw, 20px);
          line-height: 1.05;
        }
        .figure {
          position: absolute;
          left: -2.4em;
          bottom: 0.1em;
          opacity: 0.85;
        }
        .boulder {
          animation: roll 4.5s linear infinite;
          transform-origin: 50% 50%;
        }
        .ground {
          position: absolute;
          left: -6em;
          right: -2.5em;
          bottom: -0.5em;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.35);
        }
        @keyframes roll {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes climb {
          0% {
            transform: rotate(-15deg) translate(0, 0);
            opacity: 0.55;
          }
          50% {
            transform: rotate(-15deg) translate(1.4em, -1.4em);
            opacity: 1;
          }
          100% {
            transform: rotate(-15deg) translate(0, 0);
            opacity: 0.55;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scene,
          .boulder {
            animation: none;
          }
          .scene {
            transform: rotate(-15deg);
          }
        }
      `}</style>
    </div>
  );
}
