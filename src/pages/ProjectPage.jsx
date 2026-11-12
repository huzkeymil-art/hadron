import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projectBySlug, nextProject, isPlaceholder } from "../data/projects.js";
import { Reveal } from "../components/Reveal.jsx";
import { Magnetic } from "../components/Magnetic.jsx";
import { HeroFallback } from "../three/HeroFallback.jsx";
import { ProjectCover } from "../components/ProjectCover.jsx";
import { Seo } from "../components/Seo.jsx";
import { NotFound } from "./NotFound.jsx";

const EASE = [0.16, 1, 0.3, 1];

export function ProjectPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  if (!project) return <NotFound />;

  const next = nextProject(slug);

  return (
    <article className="bg-ink">
      <Seo
        title={`${project.name} — ${project.category}`}
        description={isPlaceholder(project.subtitle) ? `${project.name}, a ${project.category} by Hadron Studio.` : project.subtitle}
        image={project.cover || undefined}
        type="article"
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="relative flex min-h-[86svh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          {/* Static, lightweight backdrop — no 3D download on project pages */}
          <HeroFallback color={project.accent} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" />

        <div className="shell relative flex flex-1 flex-col justify-between pb-16 pt-28">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
            <Link
              to="/work"
              data-cursor
              className="link-underline font-mono text-xs uppercase tracking-[0.14em] text-bone/70 hover:text-bone"
            >
              ← All work
            </Link>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
              className="mb-5 flex items-center gap-4"
            >
              <span
                className="rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em]"
                style={{ borderColor: `${project.accent}88`, color: project.accent }}
              >
                {project.category}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-bone/55">{project.name}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 1, ease: EASE }}
              className="display max-w-[18ch] text-[clamp(2.4rem,7vw,6rem)]"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
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
          <Meta label="Type" value={project.category} />
          <Meta label="Role" value={project.role.join(", ")} />
          <Meta label="Built with" value={project.stack.join(" · ")} />
          <Meta label="Status" value={project.status} />
        </div>
      </section>

      {/* ── Story + what I did ───────────────────────────────── */}
      <section className="shell grid gap-14 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
        <Reveal>
          <span className="eyebrow mb-6 block">The story</span>
          <p className="max-w-3xl text-balance text-[clamp(1.4rem,3vw,2.3rem)] font-semibold leading-[1.25] tracking-tight">
            {project.intro}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="eyebrow mb-6 block">What I did</span>
          <ul className="border-t border-bone/10">
            {project.did.map((d) => (
              <li key={d} className="flex gap-4 border-b border-bone/10 py-4 text-bone/75">
                <span style={{ color: project.accent }}>—</span>
                {d}
              </li>
            ))}
          </ul>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ember hover:text-white"
            >
              Visit {project.name} ↗
            </a>
          )}
        </Reveal>
      </section>

      {/* ── Cover ────────────────────────────────────────────── */}
      <section className="shell pb-20 md:pb-28">
        <Reveal>
          <ProjectCover project={project} priority className="h-[48vh] w-full rounded-xl md:h-[64vh]" />
          {!project.cover && (
            <p className="mt-4 font-mono text-xs text-bone/40">[Add: a screenshot of {project.name} in /public/work/]</p>
          )}
        </Reveal>
      </section>

      {/* ── Next project ─────────────────────────────────────── */}
      <section className="shell py-20 md:py-28">
        <span className="eyebrow mb-6 block">Next project</span>
        <Magnetic strength={0.25}>
          <Link to={`/work/${next.slug}`} data-cursor="View" className="group block">
            <div className="flex items-end justify-between gap-6 border-t border-bone/15 pt-6">
              <span className="display text-[clamp(2.2rem,8vw,7rem)] leading-none text-bone/85" style={{ "--accent": next.accent }}>
                <span className="transition-colors duration-500 group-hover:text-[var(--accent)]">{next.name}</span>
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
