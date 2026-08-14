import { Link } from "react-router-dom";
import { formatDate } from "../data/articles.js";
import LocalImage from "./LocalImage.jsx";

// Reusable article card used in grids across the site.
// `variant` = "default" | "featured" (featured: larger layout).
export default function ArticleCard({ article, variant = "default" }) {
  if (variant === "featured") {
    return (
      <article className="group grid overflow-hidden rounded-lg border border-ink-100 bg-white shadow-[--shadow-card] transition-all duration-300 hover:shadow-[--shadow-card-hover] lg:grid-cols-2">
        <Link
          to={`/articles/${article.slug}`}
          className="relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-full"
        >
          <LocalImage
            src={article.image}
            alt={article.imageCaption || article.title}
            loading="eager"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-4 top-4 rounded-sm bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            Featured
          </span>
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-ink-400">
            <span className="text-accent">{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>
          <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink-950 transition-colors group-hover:text-accent sm:text-4xl">
            <Link to={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink-500">{article.excerpt}</p>
          <div className="mt-8">
            <Link
              to={`/articles/${article.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-950 transition-colors hover:text-accent"
            >
              Read the story
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-[--shadow-card] transition-all duration-300 hover:-translate-y-1 hover:shadow-[--shadow-card-hover]">
      <Link
        to={`/articles/${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <LocalImage
          src={article.image}
          alt={article.imageCaption || article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-sm bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ink-950">
          {article.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-ink-400">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span className="h-1 w-1 rounded-full bg-ink-300" />
          <span>{article.readTime} min read</span>
        </div>
        <h3 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-tight text-ink-950 transition-colors group-hover:text-accent">
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
          {article.excerpt.length > 140
            ? article.excerpt.slice(0, 140).trimEnd() + "…"
            : article.excerpt}
        </p>
        <div className="mt-5">
          <Link
            to={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors hover:text-accent"
          >
            Read more
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}