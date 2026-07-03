import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.83, 0, 0.17, 1];

/**
 * Full-screen intro, kept quiet: the wordmark holds the frame while a hairline
 * fills to 100, then the panel lifts to reveal the site. One element, one move.
 * Calls `onDone` when gone.
 */
export function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let n = 0;
    let timer;
    const tick = () => {
      // ease the counter so it slows as it approaches 100
      const step = Math.max(2, Math.round((100 - n) / 5));
      n = Math.min(100, n + step);
      setCount(n);
      if (n < 100) {
        timer = setTimeout(tick, 80);
      } else {
        timer = setTimeout(() => setDone(true), 420);
      }
    };
    timer = setTimeout(tick, 260);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[120] flex flex-col bg-ink"
      initial={{ opacity: 1 }}
      animate={done ? { y: "-100%" } : {}}
      transition={{ duration: 1.1, ease: EASE }}
      onAnimationComplete={() => done && onDone?.()}
    >
      <div className="shell flex flex-1 flex-col justify-between py-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Hadron Studio</span>
          <span className="eyebrow">© 2026</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="display text-[clamp(1.8rem,4vw,2.8rem)] text-bone"
          >
            Hadron<span className="align-super text-[0.4em]">®</span>
          </motion.span>
          <div className="relative mt-8 h-px w-40 overflow-hidden bg-bone/15">
            <motion.div
              className="absolute inset-y-0 left-0 bg-bone/70"
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.15 }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <span className="nums font-mono text-[0.7rem] tracking-[0.14em] text-bone/45">
            {String(count).padStart(3, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
