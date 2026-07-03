import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../data/content.js";
import { ErrorBoundary } from "../components/ErrorBoundary.jsx";
import { HeroFallback } from "../three/HeroFallback.jsx";
import { isWebGLAvailable } from "../lib/utils.js";
import { EASE } from "../lib/motion.js";

// Isolate the heavy Three.js bundle so it loads after first paint.
const BlackHoleScene = lazy(() => import("../three/BlackHoleScene.jsx"));

/* Masked line reveal for the big headline. */
function Line({ children, delay }) {
  return (
    <span className="mask-line block">
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1.1, ease: EASE.out }}
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

  // House lights: the scene dims and drifts as content scrolls over it.
  // Scroll-linked, so the user conducts it — nothing plays on its own.
  const sceneRef = useRef(null);
  useEffect(() => {
    if (reduceMotion) return;
    const el = sceneRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.85)));
        el.style.opacity = String(1 - p * 0.92);
        el.style.transform = `translate3d(0, ${Math.round(p * 90)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* The black hole — the page's single living thing (with graceful fallback) */}
      <div ref={sceneRef} className="absolute inset-0 will-change-[opacity,transform]">
        {use3D ? (
          <ErrorBoundary fallback={<HeroFallback />}>
            <Suspense fallback={<HeroFallback />}>
              <BlackHoleScene />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* Cinematic framing: legibility scrims + a single radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_42%,transparent_55%,rgba(7,7,7,0.72)_100%)]" />

      {/* Content — one label, one headline, one paragraph. Nothing else. */}
      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-24 pt-32">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE.out }}
          className="eyebrow mb-8 block"
        >
          {hero.eyebrow}
          <span className="hidden sm:inline"> — Brooklyn, NY</span>
        </motion.span>

        <h1 className="display text-[clamp(3.1rem,11vw,11.5rem)]">
          <Line delay={0.4}>We engineer</Line>
          <Line delay={0.5}>
            <span className="accent-serif pr-[0.06em] text-bone/95">websites</span> that move
          </Line>
          <Line delay={0.6}>
            <span className="text-ember">markets.</span>
          </Line>
        </h1>

        {/* Lead sits right — the same editorial counter-position as the Manifesto */}
        <div className="mt-12 flex justify-end">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 1, ease: EASE.out }}
            className="max-w-md text-pretty text-base leading-relaxed text-bone/70 md:mr-[8%]"
          >
            {hero.lead}
          </motion.p>
        </div>
      </div>

      {/* Scroll cue — a label and a hairline, at rest */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2, ease: EASE.out }}
        className="absolute bottom-28 right-[var(--gutter)] z-10 hidden flex-col items-center gap-4 md:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/45 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-16 w-px bg-gradient-to-b from-bone/40 to-bone/5" />
      </motion.div>
    </section>
  );
}
