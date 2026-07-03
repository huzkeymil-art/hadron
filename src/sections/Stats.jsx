import { stats } from "../data/content.js";
import { Reveal } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";

/** Numbers set huge and still — static scale contrast, not counters. */
export function Stats() {
  return (
    <section className="relative bg-ink">
      <div className="shell py-32 md:py-40">
        <Chapter index={5} label="By the numbers" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <span className="display nums block text-[clamp(2.8rem,7vw,5.5rem)] leading-none tracking-tighter">
                {s.value}
                {s.suffix}
              </span>
              <div className="mt-4 h-px w-10 bg-bone/25" />
              <p className="mt-4 max-w-[18ch] text-sm text-bone/55">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
