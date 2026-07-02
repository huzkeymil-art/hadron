import { stats } from "../data/content.js";
import { AnimatedCounter } from "../components/AnimatedCounter.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";

export function Stats() {
  return (
    <section className="relative bg-ink">
      <div className="shell py-24 md:py-32">
        <Chapter index={5} label="By the numbers" meta="Measured, not claimed" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                className="display block text-[clamp(2.8rem,7vw,5.5rem)] leading-none tracking-tighter"
              />
              <div className="mt-4 h-px w-10 bg-ember" />
              <p className="mt-4 max-w-[18ch] text-sm text-bone/55">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
