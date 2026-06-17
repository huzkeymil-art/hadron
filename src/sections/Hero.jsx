import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { hero } from "../data/content.js";
import { Marquee } from "../components/Marquee.jsx";

// Isolate the heavy Three.js bundle so it loads after first paint.
const HeroScene = lazy(() => import("../three/HeroScene.jsx"));

const EASE = [0.16, 1, 0.3, 1];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-ink" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Legibility vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-28 pt-32">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
          {hero.eyebrow} — Est. 2018
        </motion.span>

        <h1 className="display text-display max-w-[15ch]">
          {hero.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.45 + i * 0.12, duration: 1, ease: EASE }}
                className={`inline-block ${line.includes("move markets") ? "text-ember" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
            className="max-w-md text-pretty text-base leading-relaxed text-bone/70"
          >
            {hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
            className="flex gap-10"
          >
            {hero.meta.map((m) => (
              <div key={m.k}>
                <div className="text-2xl font-extrabold tracking-tight">{m.v}</div>
                <div className="eyebrow mt-1">{m.k}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

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
