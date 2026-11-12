import { useContext } from "react";
import { motion } from "framer-motion";
import { hero } from "../data/content.js";
import { RevealContext } from "../App.jsx";
import { HeroFallback } from "../three/HeroFallback.jsx";
import { EASE } from "../lib/motion.js";

/* Masked line reveal for the big headline. */
function Line({ children, delay, ready }) {
  return (
    <span className="mask-line block">
      <motion.span
        initial={{ y: "112%" }}
        animate={ready ? { y: 0 } : { y: "112%" }}
        transition={{ delay, duration: 1.1, ease: EASE.out }}
        className="inline-block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ready = useContext(RevealContext);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* The diagram — a hadron sketched in a lab notebook */}
      <div className="absolute inset-0 opacity-70 md:opacity-100">
        <HeroFallback />
      </div>

      {/* Keep the headline readable where it overlaps the drawing */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />

      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-24 pt-32">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.2, duration: 0.9, ease: EASE.out }}
          className="eyebrow mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-ember" />
          {hero.eyebrow}
        </motion.span>

        <h1 className="display text-[clamp(3.1rem,10vw,10rem)]">
          <Line ready={ready} delay={0.1}>Websites and</Line>
          <Line ready={ready} delay={0.2}>
            <span className="accent-serif pr-[0.06em] text-ember">apps</span> built to
          </Line>
          <Line ready={ready} delay={0.3}>stand out.</Line>
        </h1>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: 0.6, duration: 1, ease: EASE.out }}
            className="max-w-md text-pretty text-base leading-relaxed text-bone/70"
          >
            {hero.lead}
          </motion.p>
          <motion.a
            href="#work"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: EASE.out }}
            className="inline-flex w-fit items-center gap-3 rounded-full border border-bone/25 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/80 transition-colors hover:border-bone hover:text-bone"
          >
            See the work ↓
          </motion.a>
        </div>
      </div>
    </section>
  );
}
