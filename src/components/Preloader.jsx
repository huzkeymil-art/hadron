import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.83, 0, 0.17, 1];

/**
 * Full-screen intro: a percentage counter races to 100 while a word cycles,
 * then the panel splits and lifts to reveal the site. Calls `onDone` when gone.
 */
export function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const words = ["Strategy", "Design", "Engineering", "Hadron"];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    let n = 0;
    const tick = () => {
      // ease the counter so it slows as it approaches 100
      const step = Math.max(1, Math.round((100 - n) / 12));
      n = Math.min(100, n + step);
      setCount(n);
      setWordIdx((i) => (i + 1) % words.length);
      if (n < 100) {
        timer = setTimeout(tick, 130);
      } else {
        setTimeout(() => setDone(true), 420);
      }
    };
    let timer = setTimeout(tick, 260);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col bg-ink"
      initial={{ opacity: 1 }}
      animate={done ? { y: "-100%" } : {}}
      transition={{ duration: 1.0, ease: EASE }}
      onAnimationComplete={() => done && onDone?.()}
    >
      <div className="shell flex flex-1 flex-col justify-between py-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Hadron Studio</span>
          <span className="eyebrow">© 2026</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <motion.span
            key={wordIdx}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="accent-serif text-[clamp(2rem,8vw,6rem)] leading-none text-bone"
          >
            {words[wordIdx]}
          </motion.span>
          <span className="display nums text-[clamp(3rem,14vw,11rem)] leading-none text-ember">
            {String(count).padStart(2, "0")}
          </span>
        </div>

        <div className="relative h-px w-full overflow-hidden bg-bone/15">
          <motion.div
            className="absolute inset-y-0 left-0 bg-ember"
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear", duration: 0.12 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
