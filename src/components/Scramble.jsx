import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·×";

/**
 * Decrypt-style text scramble that resolves left-to-right. Fires once when it
 * enters the viewport (and again on hover of the nearest [data-scramble-root]).
 * Designed for MONO labels so the width never shifts. Respects reduced motion.
 */
export function Scramble({ text, className, speed = 28 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const frame = useRef(null);
  const [out, setOut] = useState(text);

  const run = () => {
    if (reduce) return setOut(text);
    let step = 0;
    const total = text.length * 2.4;
    cancelAnimationFrame(frame.current);
    clearInterval(frame.current);
    frame.current = setInterval(() => {
      step += 1;
      const settled = Math.floor((step / total) * text.length * 1.6);
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " " || i < settled) return ch;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("")
      );
      if (settled >= text.length) {
        clearInterval(frame.current);
        setOut(text);
      }
    }, speed);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { rootMargin: "-5% 0px" }
    );
    io.observe(el);

    const root = el.closest("[data-scramble-root]");
    const onEnter = () => run();
    root?.addEventListener("mouseenter", onEnter);
    return () => {
      io.disconnect();
      clearInterval(frame.current);
      root?.removeEventListener("mouseenter", onEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduce]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  );
}
