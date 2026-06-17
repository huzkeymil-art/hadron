import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Drives scroll position on navigation:
 *  - new page (no hash)  → jump to top
 *  - hash present        → smooth-scroll to the target (retrying until the
 *                          section has mounted, e.g. when arriving from another
 *                          page and the home sections are still rendering)
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = window.__lenis;

    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      return;
    }

    let tries = 0;
    let raf;
    const find = () => {
      const el = document.querySelector(hash);
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.2 });
        else el.scrollIntoView({ behavior: "smooth" });
      } else if (tries++ < 30) {
        raf = requestAnimationFrame(find);
      }
    };
    raf = requestAnimationFrame(find);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
