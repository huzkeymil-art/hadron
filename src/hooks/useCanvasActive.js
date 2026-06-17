import { useEffect, useState } from "react";

/**
 * Returns whether a 3D canvas should actively render. Combines an
 * IntersectionObserver (is the canvas on screen?) with the Page Visibility API
 * (is the tab focused?). Driving a Canvas's `frameloop` from this pauses the
 * render loop when the scene can't be seen — a large performance and battery
 * win with zero visible-quality cost, since nothing on screen changes.
 */
export function useCanvasActive(ref, rootMargin = "240px") {
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(
    typeof document !== "undefined" ? !document.hidden : true
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin,
    });
    io.observe(el);

    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ref, rootMargin]);

  return onScreen && tabVisible;
}

/** True on small / touch-first screens — used to scale 3D density down where it's imperceptible. */
export function isCompactViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}
