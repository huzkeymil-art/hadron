import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useHasPointer } from "../hooks/useMediaQuery.js";

/**
 * Custom cursor: a small dot that trails the pointer and morphs into a larger
 * ring with a label when hovering elements that declare `data-cursor`.
 *
 *   <a data-cursor="View">…</a>   → ring shows "View"
 *   <button data-cursor>…</button> → ring with no label
 */
export function Cursor() {
  const hasPointer = useHasPointer();
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 38, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 38, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 1100, damping: 60 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 60 });

  useEffect(() => {
    if (!hasPointer) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest("[data-cursor], a, button");
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute?.("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
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
      {/* Trailing ring */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 84 : 34,
          height: hovering ? 84 : 34,
          backgroundColor: hovering ? "#ff3d00" : "rgba(244,241,234,0)",
          border: hovering ? "1px solid rgba(255,61,0,0)" : "1px solid rgba(244,241,234,0.5)",
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <AnimatePresence>
          {hovering && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center dot (hidden while hovering a labelled target) */}
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-bone"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hovering ? 0 : 1 }}
      />
    </div>
  );
}
