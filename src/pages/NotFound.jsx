import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

export function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ink">
      <Seo title="Page not found" />
      <div className="shell text-center">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="display text-display-sm md:text-display">
          Lost in <span className="text-ember">space.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-md text-pretty text-bone/60">
          The page you're after has drifted out of orbit. Let's get you back to something solid.
        </p>
        <Link
          to="/"
          data-cursor
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white"
        >
          Back to home →
        </Link>
      </div>
    </section>
  );
}
