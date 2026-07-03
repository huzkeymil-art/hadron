/**
 * Static, dependency-free hero backdrop shown when WebGL is unavailable, while
 * the 3D scene loads, or for visitors who prefer reduced motion. A still frame
 * of the black hole: event horizon, photon ring, and an angled accretion disk
 * — so the brand reads even without Three.js.
 */
export function HeroFallback({ color = "#ff3d00" }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-ink md:justify-end md:pr-[10%]">
      {/* ambient plasma glow */}
      <div
        className="absolute h-[52vh] w-[52vh] rounded-full blur-[130px]"
        style={{ backgroundColor: `${color}26` }}
      />
      <svg viewBox="0 0 400 400" className="h-[72vh] w-[72vh] max-w-none" aria-hidden>
        <defs>
          <linearGradient id="bh-disk" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="30%" stopColor={color} stopOpacity="0.75" />
            <stop offset="55%" stopColor="#fff3ea" stopOpacity="0.9" />
            <stop offset="80%" stopColor={color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="bh-halo" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#000000" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* gravitational darkening */}
        <circle cx="200" cy="200" r="150" fill="url(#bh-halo)" />

        {/* accretion disk — angled ellipse passing behind and in front */}
        <ellipse cx="200" cy="204" rx="150" ry="34" stroke="url(#bh-disk)" strokeWidth="7" fill="none" opacity="0.85" />

        {/* lensed arc bowing over the top */}
        <path d="M 132 156 A 82 82 0 0 1 268 156" stroke="#ffd9c2" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />

        {/* event horizon + photon ring */}
        <circle cx="200" cy="200" r="62" fill="#000000" />
        <circle cx="200" cy="200" r="64" stroke="#ffddc8" strokeWidth="1.4" fill="none" opacity="0.8" />
        <circle cx="200" cy="200" r="67" stroke={color} strokeWidth="1.6" fill="none" opacity="0.45" />
      </svg>
    </div>
  );
}
