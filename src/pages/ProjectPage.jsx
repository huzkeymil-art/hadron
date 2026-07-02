import { lazy, Suspense, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { projectBySlug, nextProject, signatures, secondaryScene } from "../data/projects.js";
import { AnimatedCounter } from "../components/AnimatedCounter.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { Media } from "../components/Media.jsx";
import { Magnetic } from "../components/Magnetic.jsx";
import { ErrorBoundary } from "../components/ErrorBoundary.jsx";
import { HeroFallback } from "../three/HeroFallback.jsx";
import { Seo } from "../components/Seo.jsx";
import { isWebGLAvailable } from "../lib/utils.js";
import { NotFound } from "./NotFound.jsx";

const ProjectScene = lazy(() => import("../three/ProjectScene.jsx"));
const EASE = [0.16, 1, 0.3, 1];

export function ProjectPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  const reduce = useReducedMotion();
  const [use3D] = useState(() => !reduce && isWebGLAvailable());

  // Cover parallax
  const coverRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  if (!project) return <NotFound />;

  const next = nextProject(slug);

  return (
    <article className="bg-ink">
      <Seo
        title={`${project.client} — ${project.category}`}
        description={project.subtitle}
        image={project.cover}
        type="article"
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          {use3D ? (
            <ErrorBoundary fallback={<HeroFallback color={project.accent} />}>
              <Suspense fallback={<HeroFallback color={project.accent} />}>
                <ProjectScene variant={project.scene.variant} color={project.scene.color} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <HeroFallback color={project.accent} />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" />

        <div className="shell relative flex flex-1 flex-col justify-between pb-16 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link
              to="/work"
              data-cursor
              className="link-underline font-mono text-xs uppercase tracking-[0.16em] text-bone/70 hover:text-bone"
            >
              ← All work
            </Link>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
              className="mb-5 flex items-center gap-4"
            >
              <span
                className="rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink"
                style={{ backgroundColor: project.accent }}
              >
                {project.category}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-bone/55">
                {project.client} — {project.year}
              </span>
            </motion.div>

            <h1 className="display max-w-[18ch] text-[clamp(2.4rem,7vw,6rem)]">
              {project.title.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.04, duration: 0.9, ease: EASE }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-bone/70"
            >
              {project.subtitle}
            </motion.p>
          </div>
        </div>
      </header>

      {/* ── Meta bar ─────────────────────────────────────────── */}
      <section className="border-y border-bone/10">
        <div className="shell grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          <Meta label="Client" value={project.client} />
          <Meta label="Timeline" value={project.duration} />
          <Meta label="Discipline" value={project.role.join(", ")} />
          <Meta label="Stack" value={project.stack.join(" · ")} />
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="shell py-20 md:py-28">
        <Reveal>
          <p className="max-w-4xl text-balance text-[clamp(1.5rem,3.4vw,2.6rem)] font-semibold leading-[1.2] tracking-tight">
            {project.intro}
          </p>
        </Reveal>
      </section>

      {/* ── Cover with parallax ──────────────────────────────── */}
      <section ref={coverRef} className="shell pb-20 md:pb-28">
        <div className="relative h-[58vh] overflow-hidden rounded-xl md:h-[78vh]">
          <motion.div style={{ y: coverY }} className="absolute inset-x-0 -inset-y-[12%]">
            <Media src={project.cover} alt={project.client} accent={project.accent} className="h-full w-full" priority />
          </motion.div>
        </div>
      </section>

      {/* ── Narrative ────────────────────────────────────────── */}
      <section className="shell grid gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 md:grid-cols-3">
        {[
          { k: "The challenge", v: project.challenge },
          { k: "Our approach", v: project.approach },
          { k: "The outcome", v: project.solution },
        ].map((b, i) => (
          <Reveal key={b.k} delay={i * 0.08} className="flex flex-col gap-4 bg-ink p-7 md:p-9">
            <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: project.accent }}>
              0{i + 1} / {b.k}
            </span>
            <p className="text-pretty leading-relaxed text-bone/70">{b.v}</p>
          </Reveal>
        ))}
      </section>

      {/* ── Signature 3D band ────────────────────────────────── */}
      <section className="relative my-8 flex min-h-[80svh] items-center overflow-hidden border-y border-bone/10">
        <div className="absolute inset-0">
          {use3D ? (
            <ErrorBoundary fallback={<HeroFallback color={project.accent} />}>
              <Suspense fallback={<HeroFallback color={project.accent} />}>
                <ProjectScene variant={secondaryScene[project.scene.variant] ?? "sphere"} color={project.accent} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <HeroFallback color={project.accent} />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-ink/40" />
        <div className="shell relative">
          <Reveal>
            <p className="accent-serif max-w-[18ch] text-balance text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[1.02]">
              {signatures[project.slug] ?? project.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────────────── */}
      <section className="shell py-20 md:py-28">
        <span className="eyebrow mb-12 block">The results</span>
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {project.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07}>
              <AnimatedCounter
                value={m.value}
                suffix={m.suffix}
                className="display block text-[clamp(2.6rem,6vw,5rem)] leading-none tracking-tighter"
              />
              <div className="mt-4 h-px w-10" style={{ backgroundColor: project.accent }} />
              <p className="mt-4 max-w-[20ch] text-sm text-bone/55">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section className="shell grid gap-5 pb-20 md:grid-cols-2 md:pb-28">
        {project.gallery.map((src, i) => (
          <GalleryItem key={src} src={src} alt={`${project.client} ${i + 1}`} accent={project.accent} wide={i === 0} />
        ))}
      </section>

      {/* ── Testimonial ──────────────────────────────────────── */}
      {project.testimonial && (
        <section className="border-y border-bone/10 bg-ink-800">
          <div className="shell py-20 md:py-28">
            <Reveal>
              <blockquote className="max-w-4xl text-balance text-[clamp(1.5rem,3.4vw,2.6rem)] font-extrabold leading-[1.15] tracking-tight">
                <span style={{ color: project.accent }}>“</span>
                {project.testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-ink"
                  style={{ backgroundColor: project.accent }}
                >
                  {project.testimonial.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{project.testimonial.name}</div>
                  <div className="text-sm text-bone/55">{project.testimonial.role}</div>
                </div>
              </figcaption>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Next project ─────────────────────────────────────── */}
      <section className="shell py-20 md:py-28">
        <span className="eyebrow mb-6 block">Next project</span>
        <Magnetic strength={0.25}>
          <Link to={`/work/${next.slug}`} data-cursor="View" className="group block">
            <div className="flex items-end justify-between gap-6 border-t border-bone/15 pt-6">
              <span
                className="display text-[clamp(2.2rem,8vw,7rem)] leading-none text-bone/85 transition-colors duration-500"
                style={{ "--accent": next.accent }}
              >
                <span className="transition-colors duration-500 group-hover:text-[var(--accent)]">
                  {next.client}
                </span>
              </span>
              <span className="mb-2 shrink-0 text-3xl text-bone/40 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-bone md:text-5xl">
                ↗
              </span>
            </div>
          </Link>
        </Magnetic>
      </section>
    </article>
  );
}

function Meta({ label, value }) {
  return (
    <div className="px-1">
      <div className="eyebrow mb-2">{label}</div>
      <div className="text-pretty text-sm text-bone/85">{value}</div>
    </div>
  );
}

function GalleryItem({ src, alt, accent, wide }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <Reveal className={wide ? "md:col-span-2" : ""}>
      <div ref={ref} className={`relative overflow-hidden rounded-xl ${wide ? "h-[50vh] md:h-[70vh]" : "h-[40vh] md:h-[52vh]"}`}>
        <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[10%]">
          <Media src={src} alt={alt} accent={accent} className="h-full w-full" />
        </motion.div>
      </div>
    </Reveal>
  );
}
