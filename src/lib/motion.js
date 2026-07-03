// Shared motion language — one source of truth for easing + timing so every
// component animates like part of the same object. Import these instead of
// re-declaring cubic-bezier arrays inline.

export const EASE = {
  // expressive "settle" — the studio's primary curve
  out: [0.16, 1, 0.3, 1],
  // symmetric, for curtains / clip reveals
  inOut: [0.83, 0, 0.17, 1],
};

// Bimodal duration law: micro-interactions live at ≤0.3s, macro reveals at
// 0.9–1.4s. Nothing ships in the 0.4–0.8s middle band — that range is what
// reads as "busy website" instead of cinema.
export const DUR = {
  micro: 0.25,
  base: 0.9,
  slow: 1.1,
  xslow: 1.4,
};

// Common Framer Motion variants reused across the site.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.out } },
};

export const maskUp = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const viewportOnce = { once: true, margin: "-12% 0px" };
