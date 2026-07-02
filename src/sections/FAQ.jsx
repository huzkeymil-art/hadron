import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "../data/content.js";
import { RevealText } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-ink">
      <div className="shell py-24 md:py-32">
        <Chapter index={9} label="FAQ" meta="Before you ask" />
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="display text-display-sm max-w-[10ch]">
            <RevealText text="Questions," />{" "}
            <span className="accent-serif text-bone/95">
              <RevealText text="answered." delay={0.08} />
            </span>
          </h2>
        </div>

        <div className="border-t border-bone/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-bone/10">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-cursor
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold md:text-xl">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-2xl text-ember">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 text-pretty leading-relaxed text-bone/60">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
