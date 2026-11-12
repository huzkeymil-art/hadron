import { Media } from "./Media.jsx";
import { cn } from "../lib/utils.js";

/**
 * A project's cover. Uses the real screenshot when `project.cover` is set;
 * until then it draws an honest branded tile (accent glow + the project name)
 * instead of a stock photo.
 */
export function ProjectCover({ project, className, imgClassName, priority = false, showName = true }) {
  if (project.cover) {
    return (
      <Media
        src={project.cover}
        alt={`${project.name} screenshot`}
        accent={project.accent}
        className={className}
        imgClassName={imgClassName}
        priority={priority}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${project.name} cover`}
      className={cn("relative flex items-end overflow-hidden bg-ink-700", className)}
      style={{
        background: `radial-gradient(90% 90% at 75% 20%, ${project.accent}55, transparent 60%), radial-gradient(70% 70% at 10% 100%, ${project.accent}22, transparent 70%), #101010`,
      }}
    >
      <svg aria-hidden viewBox="0 0 200 200" className="absolute right-[-10%] top-[-10%] h-[90%] opacity-40">
        <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke={project.accent} strokeWidth="1.2" />
        <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke={project.accent} strokeWidth="1.2" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke={project.accent} strokeWidth="1.2" transform="rotate(120 100 100)" />
        <circle cx="100" cy="100" r="8" fill={project.accent} />
      </svg>
      {showName && (
        <div className="relative p-6 md:p-8">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-bone/60">{project.category}</span>
          <div className="display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none text-bone">{project.name}</div>
        </div>
      )}
    </div>
  );
}
