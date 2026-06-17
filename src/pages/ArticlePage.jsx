import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { articleBySlug, relatedArticles } from "../data/journal.js";
import { Reveal } from "../components/Reveal.jsx";
import { Media } from "../components/Media.jsx";
import { NotFound } from "./NotFound.jsx";

const EASE = [0.16, 1, 0.3, 1];

export function ArticlePage() {
  const { slug } = useParams();
  const article = articleBySlug(slug);
  if (!article) return <NotFound />;

  const related = relatedArticles(slug, 2);

  return (
    <article className="bg-ink">
      {/* Hero */}
      <header className="shell pb-12 pt-32 md:pt-40">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <Link to="/journal" data-cursor className="link-underline font-mono text-xs uppercase tracking-[0.16em] text-bone/70 hover:text-bone">
            ← Journal
          </Link>
        </motion.div>

        <div className="mt-8 flex items-center gap-4">
          <span
            className="rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink"
            style={{ backgroundColor: article.accent }}
          >
            {article.tag}
          </span>
          <span className="font-mono text-xs text-bone/50">{article.date} · {article.readingTime}</span>
        </div>

        <h1 className="mt-6 max-w-[20ch] text-balance text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight">
          {article.title}
        </h1>

        <div className="mt-8 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-ink"
            style={{ backgroundColor: article.accent }}
          >
            {article.author.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="text-sm font-semibold">{article.author.name}</div>
            <div className="text-xs text-bone/55">{article.author.role}</div>
          </div>
        </div>
      </header>

      {/* Cover */}
      <div className="shell pb-16">
        <div className="h-[44vh] overflow-hidden rounded-xl md:h-[64vh]">
          <Media src={article.cover} alt={article.title} accent={article.accent} className="h-full w-full" priority />
        </div>
      </div>

      {/* Body */}
      <div className="shell pb-20 md:pb-28">
        <div className="mx-auto max-w-[68ch]">
          {article.body.map((block, i) => (
            <Block key={i} block={block} accent={article.accent} />
          ))}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-bone/10 bg-ink-800">
          <div className="shell py-20">
            <span className="eyebrow mb-10 block">Keep reading</span>
            <div className="grid gap-px overflow-hidden md:grid-cols-2">
              {related.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <Link
                    to={`/journal/${post.slug}`}
                    data-cursor="Read"
                    className="group flex h-full flex-col justify-between gap-8 py-6 md:pr-10"
                  >
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-bone/55">{post.tag} · {post.readingTime}</span>
                    <h3 className="text-pretty text-2xl font-bold leading-snug transition-colors group-hover:text-ember">
                      {post.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function Block({ block, accent }) {
  switch (block.type) {
    case "h2":
      return (
        <Reveal>
          <h2 className="mt-14 text-balance text-2xl font-extrabold tracking-tight md:text-3xl">{block.text}</h2>
        </Reveal>
      );
    case "quote":
      return (
        <Reveal>
          <blockquote className="my-12 border-l-2 pl-6 md:pl-8" style={{ borderColor: accent }}>
            <p className="text-balance text-xl font-semibold leading-snug md:text-2xl">{block.text}</p>
            {block.cite && <cite className="mt-4 block text-sm not-italic text-bone/50">— {block.cite}</cite>}
          </blockquote>
        </Reveal>
      );
    case "list":
      return (
        <Reveal>
          <ul className="my-7 flex flex-col gap-3">
            {block.items.map((it, i) => (
              <li key={i} className="flex items-start gap-3 text-lg leading-relaxed text-bone/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "image":
      return (
        <Reveal>
          <figure className="my-12">
            <div className="h-[40vh] overflow-hidden rounded-lg md:h-[52vh]">
              <Media src={block.src} alt={block.caption || ""} accent={accent} className="h-full w-full" />
            </div>
            {block.caption && <figcaption className="mt-3 text-center text-sm text-bone/45">{block.caption}</figcaption>}
          </figure>
        </Reveal>
      );
    case "p":
    default:
      return (
        <Reveal>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75">{block.text}</p>
        </Reveal>
      );
  }
}
