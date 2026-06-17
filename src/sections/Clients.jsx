import { clients } from "../data/content.js";
import { Marquee } from "../components/Marquee.jsx";

export function Clients() {
  return (
    <section className="relative overflow-hidden border-y border-bone/10 bg-ink py-8">
      <Marquee speed={30} className="edge-fade">
        {clients.map((c) => (
          <span
            key={c}
            className="mx-10 whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight text-bone/30 transition-colors hover:text-bone md:text-4xl"
          >
            {c}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
