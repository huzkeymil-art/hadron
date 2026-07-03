import { process } from "../data/content.js";
import { Reveal, RevealText } from "../components/Reveal.jsx";
import { Chapter } from "../components/Chapter.jsx";

export function Process() {
  return (
    <section className="relative bg-ink-800">
      <div className="shell py-32 md:py-40">
        <Chapter index={4} label="Process" />
        <div className="mb-16">
          <h2 className="display text-display-sm max-w-[16ch]">
            <RevealText text="How the work" />{" "}
            <span className="accent-serif text-bone/95">
              <RevealText text="happens." delay={0.08} />
            </span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden bg-bone/10 md:grid-cols-4">
          {process.map((step, i) => (
            <Reveal
              key={step.k}
              delay={i * 0.08}
              className="flex min-h-[15rem] flex-col justify-between bg-ink-800 p-7 transition-colors duration-500 hover:bg-ink-700"
            >
              <span className="font-mono text-sm text-ember">{step.k}</span>
              <div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-bone/60">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
