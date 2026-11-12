import { useReducedMotion } from "framer-motion";

/**
 * Fresh look hero art: a hadron drawn like a diagram in a lab notebook.
 * Three orbits in fine ink, one nucleus, and particles tracing the orbits.
 * Pure SVG — no Three.js download, works on every phone. Particles hold
 * still for visitors who prefer reduced motion.
 */
const ORBITS = [0, 60, 120];

export function HeroFallback({ color = "#2b4bff", align = "end" }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center overflow-hidden ${
        align === "end" ? "md:justify-end md:pr-[6%]" : ""
      }`}
    >
      <svg viewBox="0 0 400 400" className="h-[min(78vh,88vw)] w-[min(78vh,88vw)] max-w-none opacity-90" aria-hidden>
        {/* measurement ticks around the edge, like a protractor */}
        <g stroke="#15161a" strokeOpacity="0.25">
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i * 5 * Math.PI) / 180;
            const r1 = 186;
            const r2 = i % 6 === 0 ? 174 : 180;
            return (
              <line
                key={i}
                x1={200 + r1 * Math.cos(a)}
                y1={200 + r1 * Math.sin(a)}
                x2={200 + r2 * Math.cos(a)}
                y2={200 + r2 * Math.sin(a)}
                strokeWidth="1"
              />
            );
          })}
        </g>
        <circle cx="200" cy="200" r="186" fill="none" stroke="#15161a" strokeOpacity="0.15" />

        {ORBITS.map((deg, i) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <ellipse
              id={`orbit-${i}`}
              cx="200"
              cy="200"
              rx="150"
              ry="52"
              fill="none"
              stroke="#15161a"
              strokeOpacity="0.55"
              strokeWidth="1.1"
            />
            <circle r="5.5" fill={color} cx={reduce ? 350 : 0} cy={reduce ? 200 : 0}>
              {!reduce && (
                <animateMotion
                  dur={`${7 + i * 2.5}s`}
                  repeatCount="indefinite"
                  begin={`${-i * 1.7}s`}
                  path="M 350 200 A 150 52 0 1 1 50 200 A 150 52 0 1 1 350 200"
                />
              )}
            </circle>
          </g>
        ))}

        {/* nucleus: three quarks */}
        <circle cx="200" cy="200" r="26" fill="none" stroke={color} strokeWidth="1.4" />
        <circle cx="192" cy="194" r="7" fill={color} />
        <circle cx="209" cy="195" r="7" fill="#15161a" />
        <circle cx="200" cy="209" r="7" fill={color} fillOpacity="0.45" />

        {/* annotation */}
        <g fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#15161a" fillOpacity="0.55" letterSpacing="1">
          <text x="236" y="168">FIG. 1 — HADRON</text>
          <line x1="226" y1="174" x2="232" y2="170" stroke="#15161a" strokeOpacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
