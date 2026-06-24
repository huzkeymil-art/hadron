import { motion } from "framer-motion";
import { EASE as EASES } from "../lib/motion.js";

const EASE = EASES.out;

/**
 * Reveals text word-by-word with a masked upward slide as it enters view.
 * `as` lets you render it as any element (h1, h2, p…).
 */
export function RevealText({ text, as = "span", className, delay = 0, stagger = 0.045 }) {
  const Tag = motion[as] ?? motion.span;
  const words = String(text).split(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Simple fade-and-rise wrapper for blocks (paragraphs, cards, media). */
export function Reveal({ children, className, delay = 0, y = 28, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
