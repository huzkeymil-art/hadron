import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../data/content.js";
import { RevealText } from "../components/Reveal.jsx";

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative bg-ink">
      <div className="shell py-24 md:py-36">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display text-display-sm max-w-[12ch]">
            <RevealText text="What we do" as="span" />
          </h2>
          <p className="max-w-sm text-pretty text-bone/60">
            Three disciplines, one team. No handoffs, no translation tax — the people who design it are the people who build it.
          </p>
        </div>

        <div className="border-t border-bone/10">
          {services.map((s, i) => {
            const open = active === i;
            return (
              <div
                key={s.id}
                className="group border-b border-bone/10"
                onMouseEnter={() => setActive(i)}
              >
                <button
                  onClick={() => setActive(i)}
                  data-cursor
                  className="flex w-full items-center gap-6 py-7 text-left md:gap-12"
                >
                  <span className="font-mono text-sm text-ember">{s.id}</span>
                  <span
                    className={`display text-[clamp(2rem,6vw,4.5rem)] leading-none transition-colors duration-500 ${
                      open ? "text-bone" : "text-bone/35"
                    }`}
                  >
                    {s.title}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    className="ml-auto text-2xl text-bone/50"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-9 pl-0 md:grid-cols-[1fr_1fr] md:pl-[calc(3rem+1.5rem)]">
                        <p className="max-w-md text-pretty text-lg leading-relaxed text-bone/70">
                          {s.blurb}
                        </p>
                        <ul className="flex flex-wrap content-start gap-x-8 gap-y-3">
                          {s.points.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-bone/60">
                              <span className="text-ember">→</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
