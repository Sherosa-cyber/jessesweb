import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import LocalImage from "../components/LocalImage.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icons from "../components/Icons.jsx";
import { site } from "../data/site.js";
import {
  getArticleBySlug,
  getRelatedArticles,
  getAdjacentArticles,
  formatDate,
} from "../data/articles.js";

function ContentBlock({ block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.cite && <cite className="mt-2 block text-sm not-italic text-ink-400">— {block.cite}</cite>}
        </blockquote>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i} className="my-2">
              {item}
            </li>
          ))}
        </ul>
      );
    case "img":
      return (
        <figure className="my-10">
          <LocalImage
            src={block.src}
            alt={block.caption || "Article image"}
            className="w-full rounded-lg object-cover"
          />
          {block.caption && (
            <figcaption className="mt-3 border-l-2 border-accent pl-4 text-sm text-ink-400">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "p":
    default:
      return <p>{block.text}</p>;
  }
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  const [copied, setCopied] = useState(false);

  if (!article) return <Navigate to="/404" replace />;

  const related = getRelatedArticles(article, 3);
  const { previous, next } = getAdjacentArticles(article);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(article.title);

  const shareLinks = [
    { name: "X", href: `https://x.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${shareText}%20${encodeURIComponent(url)}` },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <>
      <Seo
        title={`${article.title} — ${site.name}`}
        description={article.excerpt}
      />

      <article>
        {/* Header */}
        <header className="border-b border-ink-100 bg-ink-50">
          <div className="container-x py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="text-xs text-ink-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/articles" className="transition-colors hover:text-accent">
                    Articles
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to={`/articles?category=${encodeURIComponent(article.category)}`}
                    className="transition-colors hover:text-accent"
                  >
                    {article.category}
                  </Link>
                </li>
              </ol>
            </nav>

            <p className="mt-8 inline-block rounded-sm bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              {article.category}
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink-950 sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-xl font-light leading-snug text-ink-600 sm:text-2xl">
              {article.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500">
              <span className="flex items-center gap-2 font-semibold text-ink-900">
                <LocalImage
                  src={site.portrait}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                />
                By {site.name}
              </span>
              <span className="hidden h-4 w-px bg-ink-200 sm:block" />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="hidden h-4 w-px bg-ink-200 sm:block" />
              <span className="flex items-center gap-1.5">
                <Icons.Clock className="h-4 w-4" /> {article.readTime} min read
              </span>
            </div>
          </div>
        </header>

        {/* Featured image */}
        <figure className="container-x mt-10 sm:mt-14">
          <LocalImage
            src={article.image}
            alt={article.imageCaption || article.title}
            className="aspect-[16/9] w-full rounded-lg object-cover shadow-[--shadow-card]"
          />
          {article.imageCaption && (
            <figcaption className="mt-3 max-w-3xl border-l-2 border-accent pl-4 text-sm text-ink-400">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Body */}
        <div className="container-x mt-10 sm:mt-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
            <div className="prose-article">
              {article.content.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}

              {/* Tags */}
              {article.tags && (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-ink-100 pt-8">
                  {article.tags.map((tag) => (
                    <span key={tag} className="chip">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar: share + author */}
            <aside className="lg:border-l lg:border-ink-100 lg:pl-10">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
                  Share this story
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {shareLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Share on ${s.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white"
                    >
                      <ShareIcon name={s.name} />
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={copyLink}
                    aria-label="Copy link to article"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white"
                  >
                    {copied ? <Icons.Check className="h-4 w-4" /> : <Icons.Copy className="h-4 w-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="mt-2 text-xs font-medium text-accent">Link copied!</p>
                )}

                <div className="mt-10 rounded-lg border border-ink-100 bg-ink-50 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
                    About the author
                  </p>
                  <LocalImage
                    src={site.portrait}
                    alt={`Portrait of ${site.name}`}
                    className="mt-4 aspect-square w-20 rounded-full object-cover"
                  />
                  <p className="mt-4 font-serif text-lg font-semibold text-ink-950">{site.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{site.bioShort}</p>
                  <Link
                    to="/about"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
                  >
                    Full biography <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Prev / Next */}
        <nav
          aria-label="Article navigation"
          className="container-x mt-16 grid gap-4 border-t border-ink-100 pt-10 sm:grid-cols-2 sm:pt-12"
        >
          {previous ? (
            <Link
              to={`/articles/${previous.slug}`}
              className="group rounded-lg border border-ink-100 p-6 transition-all duration-300 hover:border-accent hover:shadow-[--shadow-card]"
            >
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-400">
                <Icons.ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Previous article
              </p>
              <p className="mt-3 font-serif text-lg font-semibold leading-snug text-ink-950 transition-colors group-hover:text-accent">
                {previous.title}
              </p>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <Link
              to={`/articles/${next.slug}`}
              className="group rounded-lg border border-ink-100 p-6 text-right transition-all duration-300 hover:border-accent hover:shadow-[--shadow-card]"
            >
              <p className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-widest text-ink-400">
                Next article
                <Icons.ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </p>
              <p className="mt-3 font-serif text-lg font-semibold leading-snug text-ink-950 transition-colors group-hover:text-accent">
                {next.title}
              </p>
            </Link>
          )}
        </nav>

        {/* Related */}
        <section aria-labelledby="related-title" className="container-x py-16 sm:py-20">
          <SectionHeading
            eyebrow="Keep reading"
            title="Related stories"
            linkTo="/articles"
            linkLabel="All articles"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}

function ShareIcon({ name }) {
  const Component = Icons[name] || Icons.Mail;
  return <Component className="h-4 w-4" />;
}