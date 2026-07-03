import { Link } from "react-router-dom";

/** Hadron wordmark + geometric "atom" mark. */
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="6"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="6"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(120 16 16)"
      />
    </svg>
  );
}

export function Logo({ className }) {
  return (
    <Link
      to="/"
      data-cursor
      className={`group flex items-center gap-2.5 ${className ?? ""}`}
      aria-label="Hadron Studio — home"
    >
      <LogoMark className="h-6 w-6 text-ember transition-transform duration-500 ease-expo group-hover:rotate-180" />
      <span className="text-[1.05rem] font-semibold uppercase tracking-tight leading-none">
        Hadron<span className="text-ember">®</span>
      </span>
    </Link>
  );
}
