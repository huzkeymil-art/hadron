import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../data/content.js";
import { Chapter } from "../components/Chapter.jsx";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (dir) => setI((p) => (p + dir + testimonials.length) % testimonials.length);

  return (
    <section className="relative bg-ink-800">
      <div className="shell py-24 md:py-36">
        <Chapter index={8} label="What clients say" meta="Verbatim" />
        <div className="mb-12 flex items-center justify-end">
          <div className="flex items-center gap-3">
            <NavBtn onClick={() => go(-1)} label="Previous">←</NavBtn>
            <span className="font-mono text-xs text-bone/50">
              0{i + 1} / 0{testimonials.length}
            </span>
            <NavBtn onClick={() => go(1)} label="Next">→</NavBtn>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="accent-serif max-w-[22ch] text-balance text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[1.12] md:max-w-[28ch]">
              <span className="text-ember">“</span>
              {t.quote}
              <span className="text-ember">”</span>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember text-sm font-bold text-white">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-bone/55">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}

function NavBtn({ children, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      data-cursor
      className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-colors hover:border-ember hover:bg-ember hover:text-white"
    >
      {children}
    </button>
  );
}
