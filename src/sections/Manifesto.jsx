import { manifesto } from "../data/content.js";
import { RevealText, Reveal } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";

/**
 * The light interlude — a hard cut from the dark hero to a bone-white frame.
 * The contrast does the drama; nothing in here moves after the reveal.
 */
export function Manifesto() {
  return (
    <section id="studio" className="relative bg-bone text-ink">
      <div className="shell py-32 md:py-44">
        <Chapter index={1} label={manifesto.kicker} invert />

        <h2 className="display text-display-sm md:text-display">
          <span className="mask-line block">
            <RevealText text="Strategy" className="inline-block" />
          </span>
          <span className="mask-line block">
            <span className="accent-serif">
              <RevealText text="before" className="inline-block" delay={0.08} />
            </span>
          </span>
          <span className="mask-line block">
            <RevealText text="pixels." className="inline-block" delay={0.16} />
          </span>
        </h2>

        <div className="mt-16 flex justify-end">
          <Reveal className="max-w-xl text-pretty text-lg leading-relaxed text-ink/70">
            {manifesto.body}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
