/**
 * Unified chapter header — the top row of every section. Gives the whole site
 * one editorial indexing system: a hairline, the chapter number, a label on
 * the left and an optional annotation on the right.
 */
export function Chapter({ index, label, meta, invert = false }) {
  const tone = invert ? "text-ink/60 border-ink/25" : "text-bone/60 border-bone/15";
  const num = invert ? "text-ink" : "text-ember";

  return (
    <div className={`chapter ${tone}`}>
      <span className="flex items-baseline gap-3 font-mono text-[0.7rem] uppercase tracking-[0.28em]">
        <span className={`font-medium ${num}`}>{String(index).padStart(2, "0")}</span>
        <span aria-hidden>/</span>
        {label}
      </span>
      {meta && (
        <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.28em] md:block">
          {meta}
        </span>
      )}
    </div>
  );
}
