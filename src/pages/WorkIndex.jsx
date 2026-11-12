import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects.js";
import { RevealText, Reveal } from "../components/Reveal.jsx";
import { ProjectCover } from "../components/ProjectCover.jsx";
import { Seo } from "../components/Seo.jsx";

const EASE = [0.16, 1, 0.3, 1];

export function WorkIndex() {
  return (
    <div className="bg-ink">
      <Seo title="Work" description="Apps and websites designed and built by Hadron Studio." />
      {/* Header */}
      <header className="shell pb-12 pt-36 md:pt-44">
        <span className="eyebrow mb-6 block">Selected work</span>
        <h1 className="display text-display-sm md:text-display">
          <RevealText text="Things I've" />
          <br />
          <span className="accent-serif text-bone/95">
            <RevealText text="built." delay={0.08} />
          </span>
        </h1>
        <Reveal delay={0.2} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-bone/60">
          Apps and websites, each one designed and built from scratch. Real projects only: what you see here is what actually shipped or is being built.
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
            transition={{ duration: 0.95, ease: EASE }}
            className={i % 2 === 1 ? "md:mt-16" : ""}
          >
            <Link to={`/work/${p.slug}`} data-cursor="View" className="group block">
              <div className="relative h-[46vh] overflow-hidden rounded-xl md:h-[56vh]">
                <ProjectCover
                  project={p}
                  showName={false}
                  className="h-full w-full transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.03]"
                  imgClassName="transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-60" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-bone/90 transition-colors duration-300 group-hover:text-bone md:text-3xl">
                    {p.name}
                  </h2>
                  <p className="mt-1 max-w-md text-pretty text-bone/55">{p.title}</p>
                </div>
                <span className="shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-bone/45">
                  {p.category}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
