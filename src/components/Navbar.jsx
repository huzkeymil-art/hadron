import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { nav, studio } from "../data/content.js";
import { Logo } from "./Logo.jsx";
import { Clock } from "./Clock.jsx";
import { Magnetic } from "./Magnetic.jsx";
import { cn } from "../lib/utils.js";

const EASE = [0.16, 1, 0.3, 1];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Hide on scroll-down, reveal on scroll-up. Add a backdrop once past the hero.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 420 && !open);
    setScrolled(y > 40);
  });

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[80]"
      >
        <div
          className={cn(
            "transition-colors duration-500",
            scrolled && !open ? "bg-ink/70 backdrop-blur-md" : "bg-transparent"
          )}
        >
          <div className="shell flex h-[var(--nav-h,72px)] items-center justify-between">
            <Logo />

            <nav className="hidden items-center gap-7 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  data-cursor
                  className="link-underline font-mono text-[0.72rem] uppercase tracking-[0.16em] text-bone/75 hover:text-bone"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <Clock className="hidden font-mono text-[0.72rem] uppercase tracking-[0.12em] text-bone/70 lg:inline" />
              <Magnetic className="hidden sm:block">
                <Link
                  to="/#contact"
                  data-cursor
                  className="group inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white"
                >
                  Start a project
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
              </Magnetic>

              <button
                onClick={() => setOpen((o) => !o)}
                data-cursor
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-7 bg-bone"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-7 bg-bone"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <Overlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function Overlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="shell flex flex-1 flex-col justify-center pt-24">
            <span className="eyebrow mb-8">Menu — where to?</span>
            <nav className="flex flex-col">
              {nav.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  data-cursor
                  className="group flex items-baseline gap-5 border-b border-bone/10 py-3"
                >
                  <span className="font-mono text-xs text-bone/40">0{i + 1}</span>
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="display inline-block text-[clamp(2.4rem,9vw,6.5rem)] text-bone transition-colors duration-300 group-hover:text-ember"
                  >
                    {item.label}
                  </motion.span>
                  <span className="ml-auto translate-y-[-0.4em] text-bone/30 opacity-0 transition group-hover:translate-x-2 group-hover:opacity-100">
                    ↗
                  </span>
                </Link>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-14 flex flex-wrap items-end justify-between gap-8"
            >
              <div>
                <span className="eyebrow block">Say hello</span>
                <a href={`mailto:${studio.email}`} className="link-underline mt-2 inline-block text-lg">
                  {studio.email}
                </a>
              </div>
              <div className="flex gap-6">
                {studio.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                    className="link-underline font-mono text-xs uppercase tracking-[0.16em] text-bone/70 hover:text-bone"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
