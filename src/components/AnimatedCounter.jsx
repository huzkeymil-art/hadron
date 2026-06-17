import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

/**
 * Counts up to `value` when scrolled into view. Handles decimals (e.g. 2.06)
 * by inferring the precision from the target value.
 */
export function AnimatedCounter({ value, suffix = "", duration = 1.8, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const decimals = Number.isInteger(value) ? 0 : String(value).split(".")[1]?.length ?? 1;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.firstChild.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, mv]);

  return (
    <span ref={ref} className={className}>
      <span>0</span>
      {suffix}
    </span>
  );
}
