import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasPointer } from "../hooks/useMediaQuery.js";

/**
 * Custom cursor, kept deliberately quiet: a small dot that trails the pointer
 * and eases into a thin ring over interactive elements. No fill, no label,
 * no morphing — the cursor is an instrument, not a performance.
 */
export function Cursor() {
  const hasPointer = useHasPointer();
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 40, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (!hasPointer) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(Boolean(e.target.closest("[data-cursor], a, button")));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [hasPointer, x, y]);

  if (!hasPointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <motion.div
        className="absolute left-0 top-0 rounded-full"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 40 : 8,
          height: hovering ? 40 : 8,
          backgroundColor: hovering ? "rgba(244,241,234,0)" : "rgba(244,241,234,0.9)",
          border: hovering ? "1px solid rgba(244,241,234,0.55)" : "1px solid rgba(244,241,234,0)",
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />
    </div>
  );
}
