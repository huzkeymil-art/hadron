import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { values, team, studioStory } from "../data/content.js";
import { RevealText, Reveal } from "../components/Reveal.jsx";
import { Media } from "../components/Media.jsx";
import { Magnetic } from "../components/Magnetic.jsx";
import { ErrorBoundary } from "../components/ErrorBoundary.jsx";
import { HeroFallback } from "../three/HeroFallback.jsx";
import { Seo } from "../components/Seo.jsx";
import { isWebGLAvailable } from "../lib/utils.js";
import { Process } from "../sections/Process.jsx";
import { Stats } from "../sections/Stats.jsx";
import { Awards } from "../sections/Awards.jsx";

const ProjectScene = lazy(() => import("../three/ProjectScene.jsx"));
const EASE = [0.16, 1, 0.3, 1];

export function StudioPage() {
  const reduce = useReducedMotion();
  const [use3D] = useState(() => !reduce && isWebGLAvailable());

  return (
    <div className="bg-ink">
      <Seo
        title="Studio"
        description="Hadron is a small, senior design & engineering studio. Meet the team and the way we work."
      />

      {/* Hero */}
      <header className="relative flex min-h-[88svh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          {use3D ? (
            <ErrorBoundary fallback={<HeroFallback />}>
              <Suspense fallback={<HeroFallback />}>
                <ProjectScene variant="rings" color="#ff3d00" />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <HeroFallback />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" />

        <div className="shell relative flex flex-1 flex-col justify-end pb-16 pt-36">
          <span className="eyebrow mb-6 block">The studio — est. 2018</span>
          <h1 className="display text-display-sm md:text-display">
            <RevealText text="Small team," />
            <br />
            <span className="text-ember">
              <RevealText text="senior hands." delay={0.08} />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-bone/70"
          >
            {studioStory.lead}
          </motion.p>
        </div>
      </header>

      {/* Story */}
      <section className="shell grid gap-10 py-20 md:grid-cols-[0.5fr_1fr] md:py-28">
        <span className="eyebrow">✦ Who we are</span>
        <Reveal>
          <p className="text-balance text-[clamp(1.4rem,3vw,2.2rem)] font-semibold leading-snug tracking-tight">
            {studioStory.body}
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="border-y border-bone/10 bg-ink-800">
        <div className="shell py-20 md:py-28">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="display text-display-sm">
              <RevealText text="How we think" />
            </h2>
            <span className="eyebrow hidden md:block">Four principles</span>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl bg-bone/10 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.k} delay={i * 0.06} className="flex flex-col gap-3 bg-ink-800 p-8 md:p-10">
                <span className="font-mono text-sm text-ember">0{i + 1}</span>
                <h3 className="text-2xl font-bold tracking-tight">{v.k}</h3>
                <p className="text-pretty leading-relaxed text-bone/60">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="shell py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between border-b border-bone/10 pb-6">
          <h2 className="display text-display-sm">
            <RevealText text="The team" />
          </h2>
          <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-bone/50 md:block">
            The people in the room
          </span>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.07}>
              <div className="group">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-xl">
                  <Media
                    src={m.photo}
                    alt={m.name}
                    accent="#ff3d00"
                    className="h-full w-full"
                    imgClassName="grayscale transition-all duration-700 ease-expo group-hover:grayscale-0 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">{m.role}</p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-bone/55">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reused sections */}
      <Process />
      <Stats />
      <Awards />

      {/* CTA */}
      <section className="shell py-24 text-center md:py-32">
        <h2 className="display mx-auto max-w-[16ch] text-display-sm md:text-display">
          Let's build the next one.
        </h2>
        <Magnetic className="mt-10 inline-block">
          <Link
            to="/#contact"
            data-cursor
            className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white"
          >
            Start a project →
          </Link>
        </Magnetic>
      </section>
    </div>
  );
}
