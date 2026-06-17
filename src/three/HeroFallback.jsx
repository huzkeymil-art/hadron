/**
 * Static, dependency-free hero backdrop shown when WebGL is unavailable, while
 * the 3D scene loads, or for visitors who prefer reduced motion. It mirrors the
 * orbital-rings motif so the brand reads even without Three.js.
 */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-ink">
      <div className="absolute h-[55vh] w-[55vh] rounded-full bg-ember/20 blur-[140px]" />
      <svg
        viewBox="0 0 400 400"
        className="h-[88vh] w-[88vh] max-w-none opacity-80"
        aria-hidden
      >
        <g fill="none" strokeWidth="1">
          <ellipse cx="200" cy="200" rx="170" ry="64" stroke="#ff3d00" opacity="0.9" />
          <ellipse cx="200" cy="200" rx="170" ry="64" stroke="#4a4a4a" transform="rotate(60 200 200)" />
          <ellipse cx="200" cy="200" rx="170" ry="64" stroke="#6b6b6b" transform="rotate(120 200 200)" />
        </g>
        <circle cx="200" cy="200" r="22" fill="#141414" stroke="#ff3d00" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
