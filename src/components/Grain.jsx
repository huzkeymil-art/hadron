import { memo } from "react";

/**
 * Animated film-grain overlay. Sits above everything, ignores pointer events,
 * and gives the dark UI a tactile, premium texture.
 */
function GrainComponent() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-overlay"
    >
      <div
        className="grain absolute -inset-[120%] h-[340%] w-[340%]"
        style={{ animation: "grain-shift 0.7s steps(3) infinite" }}
      />
      <style>{`
        @keyframes grain-shift {
          0%   { transform: translate(0, 0); }
          33%  { transform: translate(-8%, 4%); }
          66%  { transform: translate(6%, -6%); }
          100% { transform: translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export const Grain = memo(GrainComponent);
