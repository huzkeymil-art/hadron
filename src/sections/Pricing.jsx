import { motion } from "framer-motion";
import { pricing } from "../data/content.js";
import { RevealText } from "../components/Reveal.jsx";
import { Magnetic } from "../components/Magnetic.jsx";
import { cn } from "../lib/utils.js";

export function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-bone/10 bg-ink">
      <div className="shell py-24 md:py-36">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-display-sm">
            <RevealText text="Pricing" />
          </h2>
          <p className="max-w-sm text-pretty text-bone/60">
            Transparent, fixed-scope engagements. No hourly surprises — you know the number before we start.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className={cn(
                "flex flex-col rounded-xl border p-7 md:p-9",
                tier.featured
                  ? "border-ember bg-ember text-ink"
                  : "border-bone/12 bg-ink-800 text-bone"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-mono text-[0.7rem] uppercase tracking-[0.2em]",
                    tier.featured ? "text-ink/60" : "text-bone/50"
                  )}
                >
                  {tier.name}
                </span>
                {tier.featured && (
                  <span className="rounded-full bg-ink px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-bone">
                    Most popular
                  </span>
                )}
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="display text-[clamp(2.4rem,5vw,3.5rem)] leading-none">{tier.price}</span>
                <span className={cn("mb-1 text-sm", tier.featured ? "text-ink/60" : "text-bone/45")}>
                  / {tier.cadence}
                </span>
              </div>

              <p className={cn("mt-4 text-pretty text-sm leading-relaxed", tier.featured ? "text-ink/75" : "text-bone/60")}>
                {tier.summary}
              </p>

              <div className={cn("my-7 h-px w-full", tier.featured ? "bg-ink/20" : "bg-bone/12")} />

              <ul className="flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={tier.featured ? "text-ink" : "text-ember"}>✦</span>
                    <span className={tier.featured ? "text-ink/85" : "text-bone/75"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Magnetic className="mt-9">
                <a
                  href="#contact"
                  data-cursor
                  className={cn(
                    "flex items-center justify-between rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] transition-colors",
                    tier.featured
                      ? "bg-ink text-bone hover:bg-ink-700"
                      : "bg-bone text-ink hover:bg-ember hover:text-white"
                  )}
                >
                  Choose {tier.name}
                  <span>→</span>
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-bone/45">
          Need something bespoke?{" "}
          <a href="#contact" className="link-underline text-bone/80">
            Let's scope it together
          </a>
          .
        </p>
      </div>
    </section>
  );
}
