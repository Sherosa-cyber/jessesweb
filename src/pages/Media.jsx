import { useState } from "react";
import Seo from "../components/Seo.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Icons from "../components/Icons.jsx";
import LocalImage from "../components/LocalImage.jsx";
import { mediaItems, mediaTypes } from "../data/media.js";
import { site } from "../data/site.js";

const badgeStyles = {
  Video: "bg-accent text-white",
  Podcast: "bg-ink-950 text-white",
  TV: "bg-blue-900 text-white",
  Radio: "bg-emerald-800 text-white",
  Print: "bg-amber-700 text-white",
};

const verbs = {
  Video: "Watch",
  Podcast: "Listen",
  TV: "Watch",
  Radio: "Listen",
  Print: "Read",
};

export default function Media() {
  const [type, setType] = useState("All");

  const items =
    type === "All" ? mediaItems : mediaItems.filter((m) => m.type === type);

  return (
    <>
      <Seo
        title={`Media & Interviews — ${site.name}`}
        description={`Interviews, videos, podcasts and appearances by ${site.name}.`}
      />

      <PageHeader
        eyebrow="Media"
        title="Interviews & appearances"
        description="Podcasts, documentaries, panel discussions and print columns — the conversations and collaborations beyond the byline."
      />

      <section className="container-x py-12 sm:py-16">
        {/* Type filters */}
        <div role="group" aria-label="Filter media by type" className="flex flex-wrap gap-2">
          {mediaTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`chip ${type === t ? "chip-active" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-[--shadow-card] transition-all duration-300 hover:-translate-y-1 hover:shadow-[--shadow-card-hover]"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${item.title} — open ${item.type}`}
                className="relative block aspect-video overflow-hidden bg-ink-950"
              >
                <LocalImage
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-60"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-ink-950 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icons.Play className="ml-0.5 h-5 w-5" />
                  </span>
                </span>
                <span
                  className={`absolute left-4 top-4 rounded-sm px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${badgeStyles[item.type] || "bg-ink-950 text-white"}`}
                >
                  {item.type}
                </span>
              </a>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-400">
                  {item.outlet} · {item.date}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug tracking-tight text-ink-950 transition-colors group-hover:text-accent">
                  <a href={item.link} target="_blank" rel="noreferrer noopener">
                    {item.title}
                  </a>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{item.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
                  <span className="text-xs font-medium text-ink-400">{item.duration}</span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors hover:text-accent"
                  >
                    {verbs[item.type] || "Open"}
                    <Icons.ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}