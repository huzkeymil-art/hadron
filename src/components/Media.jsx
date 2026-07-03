import { useState } from "react";
import { cn } from "../lib/utils.js";

/**
 * Image with a graceful loading state: an accent-tinted placeholder that fades
 * to the photo once it loads. If the image fails entirely, the tinted block
 * remains, so layouts never collapse into broken-image icons.
 */
export function Media({ src, alt, accent = "#1d1d1d", className, imgClassName, priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-ink-700", className)}>
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-expo"
        style={{
          opacity: loaded ? 0 : 1,
          background: `radial-gradient(120% 120% at 30% 20%, ${accent}22, #111 70%)`,
        }}
      />
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-expo",
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
            imgClassName
          )}
        />
      )}
    </div>
  );
}
