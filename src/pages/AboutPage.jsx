import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { values, studio, studioStory, toolkit } from "../data/content.js";
import { RevealText, Reveal } from "../components/Reveal.jsx";
import { Magnetic } from "../components/Magnetic.jsx";
import { HeroFallback } from "../three/HeroFallback.jsx";
import { Seo } from "../components/Seo.jsx";
import { Process } from "../sections/Process.jsx";

const EASE = [0.16, 1, 0.3, 1];

export function AboutPage() {
  const initials = studio.founder
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="bg-ink">
      <Seo title="About" description="Hadron Studio is an independent design and development studio for websites, apps and brand content." />

      {/* Hero */}
      <header className="relative flex min-h-[80svh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <HeroFallback />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" />

        <div className="shell relative flex flex-1 flex-col justify-end pb-16 pt-36">
          <span className="eyebrow mb-6 block">About the studio</span>
          <h1 className="display text-display-sm md:text-display">
            <RevealText text="One maker," />
            <br />
            <span className="accent-serif text-bone/95">
              <RevealText text="start to finish." delay={0.08} />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.95, ease: EASE }}
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-bone/70"
          >
            {studioStory.lead}
          </motion.p>
        </div>
      </header>

      {/* Founder + story */}
      <section className="shell grid gap-12 py-20 md:grid-cols-[0.6fr_1fr] md:py-28">
        <Reveal>
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ember text-2xl font-bold text-white">
              {initials}
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight">{studio.founder}</div>
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/50">{studio.founderRole}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-balance text-[clamp(1.3rem,2.6vw,2rem)] font-semibold leading-snug tracking-tight">
            {studioStory.body}
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="border-y border-bone/10 bg-ink-800">
        <div className="shell py-20 md:py-28">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="display text-display-sm">
              <RevealText text="How I work" />
            </h2>
            <span className="eyebrow hidden md:block">Four principles</span>
          </div>
          <div className="grid gap-px overflow-hidden bg-bone/10 md:grid-cols-2">
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

      {/* Toolkit */}
      <section className="shell py-20 md:py-28">
        <span className="eyebrow mb-8 block">Toolkit</span>
        <ul className="flex flex-wrap gap-3">
          {toolkit.map((t) => (
            <li key={t} className="rounded-full border border-bone/15 px-4 py-2 text-sm text-bone/75">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <Process />

      {/* CTA */}
      <section className="shell py-24 text-center md:py-32">
        <h2 className="display mx-auto max-w-[16ch] text-display-sm md:text-display">
          Let's build <span className="accent-serif text-ember">the next one.</span>
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
