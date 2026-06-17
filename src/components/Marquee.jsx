import { cn } from "../lib/utils.js";

/**
 * Infinite horizontal marquee. Duplicates its children so the loop is seamless,
 * and pauses on hover. `reverse` flips direction; `speed` overrides duration.
 */
export function Marquee({ children, className, reverse = false, speed = 28, separator }) {
  const items = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {children}
    </div>
  );

  return (
    <div className={cn("group relative flex w-full overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {items}
        {separator}
        {items}
        {separator}
      </div>
    </div>
  );
}
