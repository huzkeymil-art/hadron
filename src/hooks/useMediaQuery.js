import { useEffect, useState } from "react";

/** Reactively track a CSS media query. SSR-safe (defaults to false). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Convenience: true when a precise pointer + hover is available (desktop). */
export function useHasPointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
