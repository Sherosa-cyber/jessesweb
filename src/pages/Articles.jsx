import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import Icons from "../components/Icons.jsx";
import { site, categories } from "../data/site.js";
import { articles } from "../data/articles.js";

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const [query, setQuery] = useState("");

  const setCategory = (category) => {
    const next = new URLSearchParams(searchParams);
    if (category === "All") {
      next.delete("category");
    } else {
      next.set("category", category);
    }
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...articles]
      .filter((a) => (activeCategory === "All" ? true : a.category === activeCategory))
      .filter(
        (a) =>
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          (a.tags || []).some((t) => t.toLowerCase().includes(q))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeCategory, query]);

  return (
    <>
      <Seo
        title={`Articles — ${site.name}`}
        description={`Browse all articles by ${site.name}, filter by category and search the archive of investigations, features and opinion.`}
      />

      <PageHeader
        eyebrow="The Archive"
        title="Articles"
        description="Every investigation, feature and opinion piece — searchable, filterable, and updated as new work is published."
      />

      <section className="container-x py-12 sm:py-16">
        {/* Search */}
        <div className="relative max-w-xl">
          <label htmlFor="article-search" className="sr-only">
            Search articles
          </label>
          <Icons.Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, keywords…"
            className="w-full rounded-sm border border-ink-200 bg-white py-3.5 pl-12 pr-4 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-400 focus:border-accent"
          />
        </div>

        {/* Category filters */}
        <div
          role="group"
          aria-label="Filter articles by category"
          className="mt-6 flex flex-wrap gap-2"
        >
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`chip ${activeCategory === cat ? "chip-active" : ""}`}
            >
              {cat}
              <span
                className={`ml-2 text-xs ${activeCategory === cat ? "text-ink-300" : "text-ink-400"}`}
              >
                {cat === "All"
                  ? articles.length
                  : articles.filter((a) => a.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-10 flex items-baseline justify-between gap-4">
          <p className="text-sm text-ink-400" role="status">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            {activeCategory !== "All" && (
              <>
                {" "}
                in <span className="font-semibold text-ink-700">{activeCategory}</span>
              </>
            )}
            {query.trim() && (
              <>
                {" "}
                matching <span className="font-semibold text-ink-700">"{query.trim()}"</span>
              </>
            )}
          </p>
          {query.trim() && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-sm font-medium text-accent hover:text-accent-dark"
            >
              Clear search
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-ink-200 bg-ink-50 px-6 py-20 text-center">
            <p className="font-serif text-2xl font-semibold text-ink-900">Nothing found</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
              No articles match your current search and category filters. Try a different
              keyword or clear the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="btn-outline mt-8"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}