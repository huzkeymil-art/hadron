import { clients } from "../data/content.js";
import { Reveal } from "../components/Reveal.jsx";

/** A still row of names. The company you keep doesn't need to scroll by. */
export function Clients() {
  return (
    <section className="relative border-y border-bone/10 bg-ink">
      <div className="shell py-14">
        <Reveal className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {clients.map((c) => (
            <span
              key={c}
              className="whitespace-nowrap text-lg font-semibold tracking-tight text-bone/50 transition-colors duration-300 hover:text-bone/90 md:text-2xl"
            >
              {c}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
