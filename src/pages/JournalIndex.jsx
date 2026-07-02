import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { journal } from "../data/journal.js";
import { RevealText, Reveal } from "../components/Reveal.jsx";
import { Media } from "../components/Media.jsx";
import { Seo } from "../components/Seo.jsx";

const EASE = [0.16, 1, 0.3, 1];

export function JournalIndex() {
  const [featured, ...rest] = journal;

  return (
    <div className="bg-ink">
      <Seo title="Journal" description="Essays on craft, engineering and how we run the studio — from the Hadron team." />
      <header className="shell pb-12 pt-36 md:pt-44">
        <span className="eyebrow mb-6 block">Journal — notes from the studio</span>
        <h1 className="display text-display-sm md:text-display">
          <RevealText text="Field" />{" "}
          <span className="accent-serif text-bone/95">
            <RevealText text="notes." delay={0.08} />
          </span>
        </h1>
        <Reveal delay={0.15} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-bone/60">
          Essays on craft, engineering and how we run the studio — written by the people doing the work.
        </Reveal>
      </header>

      {/* Featured */}
      <section className="shell pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Link to={`/journal/${featured.slug}`} data-cursor="Read" className="group grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative h-[42vh] overflow-hidden rounded-xl md:h-[60vh]">
              <Media
                src={featured.cover}
                alt={featured.title}
                accent={featured.accent}
                className="h-full w-full"
                imgClassName="transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.05]"
                priority
              />
            </div>
            <div>
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-full border border-bone/20 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/65">
                  {featured.tag}
                </span>
                <span className="font-mono text-xs text-bone/45">{featured.date} · {featured.readingTime}</span>
              </div>
              <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight transition-colors duration-300 group-hover:text-ember md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-lg text-pretty leading-relaxed text-bone/60">{featured.excerpt}</p>
              <span className="link-underline mt-7 inline-block font-mono text-xs uppercase tracking-[0.16em] text-bone/75">
                Read article →
              </span>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Rest */}
      <section className="shell grid gap-px overflow-hidden border-t border-bone/10 pb-28 md:grid-cols-3">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link
              to={`/journal/${post.slug}`}
              data-cursor="Read"
              className="group flex h-full min-h-[20rem] flex-col justify-between border-b border-bone/10 py-8 md:border-b-0 md:pr-8"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-bone/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-bone/55">
                  {post.tag}
                </span>
                <span className="font-mono text-xs text-bone/40">{post.readingTime}</span>
              </div>
              <div>
                <h3 className="text-pretty text-xl font-bold leading-snug transition-colors group-hover:text-ember">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/50">{post.excerpt}</p>
                <span className="mt-5 block font-mono text-xs text-bone/40">{post.date}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
