import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";

/**
 * Counts up to `value` when scrolled into view. Handles decimals (e.g. 2.06)
 * by inferring the precision from the target value.
 */
export function AnimatedCounter({ value, suffix = "", duration = 1.8, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const decimals = Number.isInteger(value) ? 0 : String(value).split(".")[1]?.length ?? 1;

  useEffect(() => {
    const set = (v) => {
      if (ref.current) ref.current.firstChild.textContent = v.toFixed(decimals);
    };
    // Reduced motion (or once visible): show the real number, no count-up.
    if (reduce) return set(value);
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: set,
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, decimals, mv]);

  return (
    <span ref={ref} className={`nums ${className ?? ""}`}>
      <span>0</span>
      {suffix}
    </span>
  );
}
