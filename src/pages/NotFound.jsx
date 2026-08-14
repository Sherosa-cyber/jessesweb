import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { site } from "../data/site.js";

export default function NotFound() {
  return (
    <>
      <Seo
        title={`Page not found — ${site.name}`}
        description="The page you're looking for doesn't exist."
      />

      <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">Error 404</p>
        <p className="mt-4 font-serif text-7xl font-bold tracking-tight text-ink-950 sm:text-9xl">
          404<span className="text-accent">.</span>
        </p>
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
          This story doesn't exist
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
          The page you're looking for may have been moved, renamed, or never printed. Every
          good journalist fact-checks — so let's get you back to something verified.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            Back to homepage
          </Link>
          <Link to="/articles" className="btn-outline">
            Browse articles
          </Link>
        </div>
        <p className="mt-12 text-xs uppercase tracking-widest text-ink-400">
          {site.name} · {site.location}
        </p>
      </section>
    </>
  );
}