import { lazy, Suspense, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../data/content.js";
import { Marquee } from "../components/Marquee.jsx";
import { ErrorBoundary } from "../components/ErrorBoundary.jsx";
import { HeroFallback } from "../three/HeroFallback.jsx";
import { isWebGLAvailable } from "../lib/utils.js";
import { EASE } from "../lib/motion.js";

// Isolate the heavy Three.js bundle so it loads after first paint.
const ColliderScene = lazy(() => import("../three/ColliderScene.jsx"));

/* Masked line reveal for the big headline. */
function Line({ children, delay }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1, ease: EASE.out }}
        className="inline-block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  // Decide once, on the client, whether to mount the 3D scene at all.
  const [use3D] = useState(() => !reduceMotion && isWebGLAvailable());

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 3D collider background (with graceful fallback) */}
      <div className="absolute inset-0">
        {use3D ? (
          <ErrorBoundary fallback={<HeroFallback />}>
            <Suspense fallback={<HeroFallback />}>
              <ColliderScene />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* Legibility vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/5 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

      {/* Content */}
      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-32 pt-32">
        {/* Data readout — the lab instrument strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: EASE.out }}
          className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-bone/10 pb-4 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bone/55"
        >
          <span className="flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            Accepting Q3 projects
          </span>
          <span className="hidden sm:inline">40.6782° N / 73.9442° W</span>
          <span className="hidden md:inline">Est. 2018</span>
          <span className="ml-auto hidden lg:inline">Run 05 — Live</span>
        </motion.div>

        <h1 className="display text-[clamp(3rem,10.5vw,10.5rem)] leading-[0.9]">
          <Line delay={0.4}>We engineer</Line>
          <Line delay={0.52}>
            <span className="accent-serif pr-[0.06em] text-bone/95">websites</span> that move
          </Line>
          <Line delay={0.64}>
            <span className="text-ember">markets.</span>
          </Line>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: EASE.out }}
            className="max-w-md text-pretty text-base leading-relaxed text-bone/70"
          >
            {hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: EASE.out }}
            className="flex gap-10"
          >
            {hero.meta.map((m) => (
              <div key={m.k}>
                <div className="nums font-display text-2xl font-bold tracking-tight">{m.v}</div>
                <div className="eyebrow mt-1">{m.k}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 right-[var(--gutter)] z-10 hidden flex-col items-center gap-4 md:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-bone/45 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-bone/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ember"
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: EASE.out }}
          />
        </span>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute inset-x-0 bottom-0 border-t border-bone/10 bg-ink/40 py-3 backdrop-blur-sm">
        <Marquee speed={34}>
          {["Strategy", "Art Direction", "Web Design", "React Engineering", "Three.js / WebGL", "Motion", "E-commerce", "SEO & Performance"].map(
            (w) => (
              <span key={w} className="mx-8 flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-bone/55">
                {w} <span className="text-ember">✦</span>
              </span>
            )
          )}
        </Marquee>
      </div>
    </section>
  );
}
