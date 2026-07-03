import { memo } from "react";

/**
 * Static film-grain overlay. Sits above everything, ignores pointer events,
 * and gives the dark UI a tactile, printed texture. Deliberately static —
 * the page must be completely still at rest; the WebGL hero is the only
 * element allowed to breathe.
 */
function GrainComponent() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.04] mix-blend-overlay"
    />
  );
}

export const Grain = memo(GrainComponent);
