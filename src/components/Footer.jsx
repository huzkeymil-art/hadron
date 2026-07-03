import { Link } from "react-router-dom";
import { nav, studio } from "../data/content.js";
import { LogoMark } from "./Logo.jsx";
import { Clock } from "./Clock.jsx";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <div className="shell pt-20">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark className="h-8 w-8 text-ember" />
              <span className="text-xl font-semibold uppercase tracking-tight">Hadron®</span>
            </div>
            <p className="mt-5 text-pretty leading-relaxed text-bone/55">
              A design & engineering studio building high-impact websites for ambitious brands. Strategy, design and code under one roof.
            </p>
            <Link
              to="/#contact"
              data-cursor
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ember hover:text-white"
            >
              Start a project →
            </Link>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow mb-2">Sitemap</span>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} data-cursor className="link-underline w-fit text-bone/75 hover:text-bone">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow mb-2">Connect</span>
            <a href={`mailto:${studio.email}`} className="link-underline w-fit text-bone/75 hover:text-bone">
              {studio.email}
            </a>
            <span className="text-bone/55">{studio.phone}</span>
            <div className="mt-3 flex flex-wrap gap-4">
              {studio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="link-underline font-mono text-xs uppercase tracking-[0.14em] text-bone/65 hover:text-bone"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-bone/10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-bone/45">
            © {year} Hadron Studio — All rights reserved
          </p>
          <Clock className="font-mono text-xs uppercase tracking-[0.12em] text-bone/45" />
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-bone/45">
            Built with React · Three.js · Node
          </p>
        </div>
      </div>

      {/* Oversized wordmark — held almost silent; it simply breathes brighter on hover */}
      <div className="group relative select-none" data-cursor>
        <div className="shell">
          <h2
            aria-hidden
            className="display w-full translate-y-[14%] text-center text-[clamp(4rem,23vw,20rem)] leading-none"
          >
            <span className="text-bone/[0.06] transition-colors duration-500 ease-expo group-hover:text-bone/[0.16]">
              HADRON
            </span>
          </h2>
        </div>
      </div>
    </footer>
  );
}
