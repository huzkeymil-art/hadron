import { awards } from "../data/content.js";
import { Reveal } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";

export function Awards() {
  return (
    <section className="relative bg-ink">
      <div className="shell py-14">
        <Chapter index={6} label="Recognition" meta="Independent juries" />
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 md:gap-x-12">
            {awards.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.06} className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">{a.name}</span>
                <span className="mt-1 text-sm text-bone/55">{a.detail}</span>
                <span className="mt-0.5 font-mono text-xs text-ember">{a.year}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
