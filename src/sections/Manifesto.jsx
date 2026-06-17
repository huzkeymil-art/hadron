import { manifesto } from "../data/content.js";
import { RevealText, Reveal } from "../components/Reveal.jsx";

export function Manifesto() {
  return (
    <section id="studio" className="relative bg-ember text-ink">
      <div className="shell py-24 md:py-36">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ink/60">
            {manifesto.kicker}
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ink/60">
            ✦ 001
          </span>
        </div>

        <div className="hairline my-8 bg-ink/20" />

        <h2 className="display text-display-sm md:text-display leading-[0.85]">
          {manifesto.lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <RevealText text={line} className="inline-block" delay={i * 0.05} />
            </span>
          ))}
        </h2>

        <div className="mt-12 flex justify-end">
          <Reveal className="max-w-xl text-pretty text-lg leading-relaxed text-ink/80">
            {manifesto.body}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
