import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects.js";
import { RevealText, Reveal } from "../components/Reveal.jsx";
import { Media } from "../components/Media.jsx";
import { Seo } from "../components/Seo.jsx";

const EASE = [0.16, 1, 0.3, 1];

export function WorkIndex() {
  return (
    <div className="bg-ink">
      <Seo title="Work" description="Selected case studies from Hadron Studio — strategy, design and engineering for ambitious brands." />
      {/* Header */}
      <header className="shell pb-12 pt-36 md:pt-44">
        <span className="eyebrow mb-6 block">Selected work — 2023–2026</span>
        <h1 className="display text-display-sm md:text-display">
          <RevealText text="Work that" />
          <br />
          <span className="accent-serif text-ember">
            <RevealText text="earns its keep." delay={0.08} />
          </span>
        </h1>
        <Reveal delay={0.2} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-bone/60">
          A selection of recent engagements — each one a problem worth solving, shipped with strategy, design and engineering under one roof.
        </Reveal>
      </header>

      {/* Grid */}
      <div className="shell grid gap-x-6 gap-y-16 pb-28 md:grid-cols-2 md:gap-y-24">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className={i % 2 === 1 ? "md:mt-16" : ""}
          >
            <Link to={`/work/${p.slug}`} data-cursor="View" className="group block">
              <div className="relative h-[46vh] overflow-hidden rounded-xl md:h-[56vh]">
                <Media
                  src={p.cover}
                  alt={p.client}
                  accent={p.accent}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-60" />
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink"
                  style={{ backgroundColor: p.accent }}
                >
                  {p.category}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-ember md:text-3xl">
                    {p.client}
                  </h2>
                  <p className="mt-1 max-w-md text-pretty text-bone/55">{p.title}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-bone/45">{p.year}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
