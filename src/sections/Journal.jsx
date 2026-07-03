import { Link } from "react-router-dom";
import { journal } from "../data/journal.js";
import { Reveal, RevealText } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";

export function Journal() {
  // Show the three most recent on the homepage.
  const posts = journal.slice(0, 3);

  return (
    <section className="relative bg-ink-800">
      <div className="shell py-32 md:py-40">
        <Chapter index={10} label="Journal" />
        <div className="mb-12 flex items-end justify-between border-b border-bone/10 pb-6">
          <h2 className="display text-display-sm">
            <RevealText text="Field" />{" "}
            <span className="accent-serif text-bone/95">
              <RevealText text="notes." delay={0.08} />
            </span>
          </h2>
          <Link
            to="/journal"
            data-cursor
            className="link-underline hidden font-mono text-xs uppercase tracking-[0.2em] text-bone/60 hover:text-bone md:block"
          >
            All articles →
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden bg-bone/10 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                to={`/journal/${post.slug}`}
                data-cursor="Read"
                className="group flex h-full min-h-[18rem] flex-col justify-between bg-ink-800 p-7 transition-colors duration-500 hover:bg-ink-700"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone/55">
                    {post.tag}
                  </span>
                  <span className="font-mono text-xs text-bone/40">{post.date}</span>
                </div>
                <div className="mt-10">
                  <h3 className="text-pretty text-xl font-bold leading-snug text-bone/90 transition-colors duration-300 group-hover:text-bone">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/50">{post.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
