// Shared motion language — one source of truth for easing + timing so every
// component animates like part of the same object. Import these instead of
// re-declaring cubic-bezier arrays inline.

export const EASE = {
  // expressive "settle" — the studio's primary curve
  out: [0.16, 1, 0.3, 1],
  // symmetric, for curtains / clip reveals
  inOut: [0.83, 0, 0.17, 1],
  // gentle
  soft: [0.4, 0, 0.2, 1],
};

export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 0.9,
  xslow: 1.1,
};

// Common Framer Motion variants reused across the site.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const maskUp = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const viewportOnce = { once: true, margin: "-12% 0px" };
