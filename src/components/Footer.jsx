import { Link } from "react-router-dom";
import { site, categories } from "../data/site.js";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-white">
      <div className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Masthead + tagline */}
        <div>
          <p className="font-serif text-3xl font-bold tracking-tight">
            {site.publication}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">{site.tagline}</p>
          <div className="mt-6">
            <SocialLinks items={site.socials} variant="dark" />
          </div>
        </div>

        {/* Navigate */}
        <nav aria-label="Footer navigation">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Navigate</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/articles", label: "Articles" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/media", label: "Media" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ink-300 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Topics */}
        <nav aria-label="Topics">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Topics</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  to={`/articles?category=${encodeURIComponent(c)}`}
                  className="text-ink-300 transition-colors hover:text-white"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-300">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.location}</li>
            <li>
              <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-accent">
                Send a message <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Reporting with care since 2014.</p>
        </div>
      </div>
    </footer>
  );
}