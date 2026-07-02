import { manifesto } from "../data/content.js";
import { RevealText, Reveal } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";

export function Manifesto() {
  return (
    <section id="studio" className="relative bg-ember text-ink">
      <div className="shell py-24 md:py-36">
        <Chapter index={1} label={manifesto.kicker} meta="Manifesto" invert />

        <h2 className="display text-display-sm md:text-display leading-[0.85]">
          <span className="block overflow-hidden">
            <RevealText text="Strategy" className="inline-block" />
          </span>
          <span className="block overflow-hidden">
            <span className="accent-serif">
              <RevealText text="before" className="inline-block" delay={0.05} />
            </span>
          </span>
          <span className="block overflow-hidden">
            <RevealText text="pixels." className="inline-block" delay={0.1} />
          </span>
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
