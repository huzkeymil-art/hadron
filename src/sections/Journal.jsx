import { journal } from "../data/content.js";
import { Reveal, RevealText } from "../components/Reveal.jsx";

export function Journal() {
  return (
    <section className="relative border-t border-bone/10 bg-ink-800">
      <div className="shell py-24 md:py-32">
        <div className="mb-12 flex items-end justify-between border-b border-bone/10 pb-6">
          <h2 className="display text-display-sm">
            <RevealText text="Journal" />
          </h2>
          <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-bone/50 md:block">
            Notes from the studio
          </span>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg bg-bone/10 md:grid-cols-3">
          {journal.map((post, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <a
                href="#contact"
                data-cursor="Read"
                className="group flex h-full min-h-[18rem] flex-col justify-between bg-ink-800 p-7 transition-colors duration-500 hover:bg-ink-700"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-bone/15 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/55">
                    {post.tag}
                  </span>
                  <span className="font-mono text-xs text-bone/40">{post.date}</span>
                </div>
                <h3 className="mt-10 text-pretty text-xl font-bold leading-snug transition-colors group-hover:text-ember">
                  {post.title}
                </h3>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
