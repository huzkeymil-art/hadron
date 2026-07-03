/**
 * Unified chapter header — the top row of every section, and the site's single
 * ornament system: a hairline, the chapter number, and a label. The index is
 * the only place (besides CTAs) the accent color is allowed to live.
 */
export function Chapter({ index, label, invert = false }) {
  const tone = invert ? "text-ink/60 border-ink/25" : "text-bone/55 border-bone/15";
  const num = invert ? "text-ink" : "text-ember";

  return (
    <div className={`chapter ${tone}`}>
      <span className="flex items-baseline gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em]">
        <span className={`font-medium ${num}`}>{String(index).padStart(2, "0")}</span>
        <span aria-hidden>/</span>
        {label}
      </span>
    </div>
  );
}
