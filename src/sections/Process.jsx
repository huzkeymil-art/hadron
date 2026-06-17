import { process } from "../data/content.js";
import { Reveal, RevealText } from "../components/Reveal.jsx";

export function Process() {
  return (
    <section className="relative border-t border-bone/10 bg-ink-800">
      <div className="shell py-24 md:py-32">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-display-sm max-w-[14ch]">
            <RevealText text="How the work happens" />
          </h2>
          <span className="eyebrow">✦ 002 — Process</span>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg bg-bone/10 md:grid-cols-4">
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
