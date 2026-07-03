import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../data/projects.js";
import { RevealText } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";
import { useHasPointer } from "../hooks/useMediaQuery.js";

export function Work() {
  const hasPointer = useHasPointer();
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 30, mass: 0.6 });

  const onMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="work" className="relative bg-ink" onMouseMove={hasPointer ? onMove : undefined}>
      <div className="shell py-32 md:py-44">
        <Chapter index={3} label="Selected work" />
        <div className="mb-16 border-b border-bone/10 pb-8">
          <h2 className="display text-display-sm">
            <RevealText text="Work that" />{" "}
            <span className="accent-serif text-bone/95">
              <RevealText text="performs." delay={0.08} />
            </span>
          </h2>
        </div>

        <ul className="relative">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                to={`/work/${p.slug}`}
                data-cursor
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group grid grid-cols-[auto_1fr] items-center gap-4 border-b border-bone/10 py-7 md:grid-cols-[3rem_1fr_auto_8rem] md:gap-8 md:py-9"
              >
                <span className="font-mono text-xs text-bone/40">0{i + 1}</span>

                <span className="display text-[clamp(1.7rem,5.5vw,4rem)] leading-none text-bone/60 transition-[transform,color] duration-500 ease-expo group-hover:translate-x-3 group-hover:text-bone">
                  {p.client}
                </span>

                <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/45 md:block">
                  {p.category}
                </span>

                <span className="col-start-2 flex flex-wrap gap-x-3 gap-y-1 md:col-start-4 md:justify-end">
                  <span className="font-mono text-xs text-bone/45">{p.year}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            to="/work"
            data-cursor
            className="link-underline font-mono text-xs uppercase tracking-[0.14em] text-bone/70 hover:text-bone"
          >
            View all work →
          </Link>
        </div>
      </div>

      {/* Cursor-following preview — appears only in response to hover */}
      {hasPointer && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[60] h-64 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full"
              >
                <img
                  src={projects[active].cover}
                  alt={projects[active].client}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/20" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
