import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "../data/content.js";
import { RevealText } from "../components/Reveal.jsx";

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative border-t border-bone/10 bg-ink">
      <div className="shell grid gap-12 py-24 md:grid-cols-[0.8fr_1.2fr] md:py-32">
        <div>
          <span className="eyebrow mb-6 block">✦ 003 — FAQ</span>
          <h2 className="display text-display-sm max-w-[10ch]">
            <RevealText text="Questions, answered" />
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
    </section>
  );
}
