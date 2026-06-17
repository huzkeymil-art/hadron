import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../data/projects.js";
import { RevealText } from "../components/Reveal.jsx";
import { useHasPointer } from "../hooks/useMediaQuery.js";

export function Work() {
  const hasPointer = useHasPointer();
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  const onMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="work" className="relative bg-ink" onMouseMove={hasPointer ? onMove : undefined}>
      <div className="shell py-24 md:py-36">
        <div className="mb-12 flex items-end justify-between border-b border-bone/10 pb-6">
          <h2 className="display text-display-sm">
            <RevealText text="Selected work" />
          </h2>
          <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-bone/50 md:block">
            ({String(projects.length).padStart(2, "0")}) Case studies
          </span>
        </div>

        <ul className="relative">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                to={`/work/${p.slug}`}
                data-cursor="View"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group grid grid-cols-[auto_1fr] items-center gap-4 border-b border-bone/10 py-6 md:grid-cols-[3rem_1fr_auto_8rem] md:gap-8 md:py-8"
              >
                <span className="font-mono text-xs text-bone/40">0{i + 1}</span>

                <span
                  className="display text-[clamp(1.7rem,5.5vw,4rem)] leading-none text-bone/85 transition-all duration-500 group-hover:translate-x-3"
                  style={{ "--accent": p.accent }}
                >
                  <span className="transition-colors duration-500 group-hover:text-[var(--accent)]">
                    {p.client}
                  </span>
                </span>

                <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone/45 md:block">
                  {p.category}
                </span>

                <span className="col-start-2 flex flex-wrap gap-x-3 gap-y-1 md:col-start-4 md:justify-end">
                  <span className="font-mono text-xs text-bone/45">{p.year}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/work"
            data-cursor
            className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-bone/70 hover:text-bone"
          >
            View all work →
          </Link>
        </div>
      </div>

      {/* Cursor-following preview */}
      {hasPointer && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[60] h-64 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full"
              >
                <img
                  src={projects[active].cover}
                  alt={projects[active].client}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/20" />
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                  {projects[active].role.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-bone backdrop-blur"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
