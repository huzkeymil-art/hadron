import { motion } from "framer-motion";
import { pricing } from "../data/content.js";
import { RevealText } from "../components/Reveal.jsx";
import { Magnetic } from "../components/Magnetic.jsx";
import { Chapter } from "../components/Chapter.jsx";
import { cn } from "../lib/utils.js";

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-ink">
      <div className="shell py-24 md:py-36">
        <Chapter index={7} label="Pricing" />
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-display-sm">
            <RevealText text="Honest" />{" "}
            <span className="accent-serif text-bone/95">
              <RevealText text="numbers." delay={0.08} />
            </span>
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
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className={cn(
                "flex flex-col border-t p-7 pt-8 md:p-9 md:pt-10",
                tier.featured ? "border-ember bg-ink-800" : "border-bone/15 bg-ink-800/50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/50">
                  {tier.name}
                </span>
                {tier.featured && (
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone/60">
                    Most popular
                  </span>
                )}
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="display text-[clamp(2.4rem,5vw,3.5rem)] leading-none">{tier.price}</span>
                <span className="mb-1 text-sm text-bone/55">/ {tier.cadence}</span>
              </div>

              <p className="mt-4 text-pretty text-sm leading-relaxed text-bone/60">{tier.summary}</p>

              <div className="my-7 h-px w-full bg-bone/12" />

              <ul className="flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="text-bone/35">—</span>
                    <span className="text-bone/75">{f}</span>
                  </li>
                ))}
              </ul>

              <Magnetic className="mt-9">
                <a
                  href="#contact"
                  data-cursor
                  className={cn(
                    "flex items-center justify-between rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                    tier.featured
                      ? "bg-ember text-white hover:bg-ember-deep"
                      : "bg-bone text-ink hover:bg-bone-muted"
                  )}
                >
                  Choose {tier.name}
                  <span>→</span>
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-bone/55">
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
