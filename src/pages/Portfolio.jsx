import { useState } from "react";
import Seo from "../components/Seo.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Icons from "../components/Icons.jsx";
import LocalImage from "../components/LocalImage.jsx";
import { portfolioCategories, portfolioItems } from "../data/portfolio.js";
import { site } from "../data/site.js";

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const items =
    active === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === active);

  const isInternal = (link) => link.startsWith("/");

  return (
    <>
      <Seo
        title={`Portfolio — ${site.name}`}
        description={`Selected work by ${site.name}: investigative journalism, interviews, features, opinion and photography.`}
      />

      <PageHeader
        eyebrow="Portfolio"
        title="Selected work"
        description="Early work in progress: student reporting, first bylines, interviews, photography and multimedia experiments from the start of a journalism career."
      />

      <section className="container-x py-12 sm:py-16">
        {/* Category tabs */}
        <div role="group" aria-label="Filter portfolio by category" className="flex flex-wrap gap-2">
          {["All", ...portfolioCategories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`chip ${active === cat ? "chip-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-[--shadow-card] transition-all duration-300 hover:-translate-y-1 hover:shadow-[--shadow-card-hover]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <LocalImage
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-ink-950/85 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                  {item.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-400">{item.date}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug tracking-tight text-ink-950 transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-ink-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 border-t border-ink-100 pt-5">
                  {isInternal(item.link) ? (
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors hover:text-accent"
                    >
                      Read the story
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </a>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors hover:text-accent"
                    >
                      View project <Icons.ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-10 rounded-lg border border-dashed border-ink-200 bg-ink-50 px-6 py-20 text-center">
            <p className="font-serif text-2xl font-semibold text-ink-900">Nothing here yet</p>
            <p className="mt-3 text-sm text-ink-500">New work in this category will appear here soon.</p>
          </div>
        )}
      </section>
    </>
  );
}