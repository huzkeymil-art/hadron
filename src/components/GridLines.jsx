import { memo } from "react";

/**
 * Fixed blueprint column rules — four vertical hairlines that sit under the
 * content everywhere, giving every page the drafting-table structure the
 * lab-instrument aesthetic asks for. Pure CSS, zero runtime cost.
 */
function GridLinesComponent() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <div className="shell relative h-full">
        {[0, 25, 50, 75, 100].map((x) => (
          <span
            key={x}
            className="absolute top-0 h-full w-px bg-bone/[0.045]"
            style={{ left: `${x}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export const GridLines = memo(GridLinesComponent);
