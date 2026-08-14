import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Newsletter from "../components/Newsletter.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import Icons from "../components/Icons.jsx";
import { site, categories } from "../data/site.js";
import {
  getFeaturedArticle,
  getLatestArticles,
  getArticlesByCategory,
} from "../data/articles.js";

const stats = [
  { value: "10+", label: "Years reporting" },
  { value: "200+", label: "Stories published" },
  { value: "5", label: "National awards" },
  { value: "11", label: "Languages translated" },
];

export default function Home() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(6);

  return (
    <>
      <Seo
        title={`${site.name} — ${site.role}`}
        description={`${site.tagline} Explore ${site.firstName}'s investigations, features, interviews and multimedia reporting.`}
      />

      {/* ============ HERO ============ */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ink-50">
        <div className="container-x grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-28">
          <div className="fade-up">
            <p className="eyebrow">Journalist & Author · London</p>
            <h1
              id="hero-title"
              className="mt-5 font-serif text-5xl font-bold leading-[1.05] tracking-tight text-ink-950 sm:text-6xl xl:text-7xl"
            >
              {site.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-xl font-serif text-2xl font-light leading-snug text-ink-700 sm:text-[1.7rem]">
              {site.heroHeadline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500">
              {site.tagline} His reporting has shaped policy debates in three countries and
              been translated into eleven languages.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/articles" className="btn-primary">
                Read the latest
              </Link>
              <Link to="/about" className="btn-outline">
                About {site.firstName}
              </Link>
            </div>

            <div className="mt-9">
              <SocialLinks items={site.socials} />
            </div>
          </div>

          {/* Portrait */}
          <figure className="fade-up relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full rounded-lg border-2 border-accent/40 sm:-left-6 sm:-top-6"
            />
            <img
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              className="relative aspect-[4/5] w-full rounded-lg object-cover shadow-[--shadow-card-hover]"
            />
            <figcaption className="mt-4 flex items-center gap-2 text-xs text-ink-400">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              {site.portraitCaption}
            </figcaption>
          </figure>
        </div>

        {/* Stats strip */}
        <div className="border-t border-ink-200/70 bg-white">
          <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4 sm:py-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-ink-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED ARTICLE ============ */}
      <section aria-labelledby="featured-title" className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow="In depth"
          title="The featured story"
          linkTo="/articles"
          linkLabel="All articles"
        />
        <ArticleCard article={featured} variant="featured" />
      </section>

      {/* ============ LATEST ARTICLES ============ */}
      <section aria-labelledby="latest-title" className="border-t border-ink-100 bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Latest work"
            title="Recent articles"
            linkTo="/articles"
            linkLabel="View all articles"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section aria-labelledby="topics-title" className="border-t border-ink-100 bg-ink-50 py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Coverage"
            title="Topics I report on"
            description="From the corridors of power to the communities the headlines forget — a working beat."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const count = getArticlesByCategory(cat).length;
              const hues = [
                "bg-white hover:border-accent",
                "bg-ink-950 text-white hover:bg-ink-900",
              ];
              const isDark = i % 4 === 1;
              return (
                <Link
                  key={cat}
                  to={`/articles?category=${encodeURIComponent(cat)}`}
                  className={`group flex items-center justify-between rounded-lg border border-ink-200 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[--shadow-card-hover] ${hues[isDark ? 1 : 0]}`}
                >
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{cat}</h3>
                    <p className={`mt-1 text-xs uppercase tracking-widest ${isDark ? "text-ink-400" : "text-ink-400"}`}>
                      {count} {count === 1 ? "story" : "stories"}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`text-xl transition-transform duration-200 group-hover:translate-x-1 ${isDark ? "text-accent" : "text-ink-300 group-hover:text-accent"}`}
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ ABOUT TEASER ============ */}
      <section aria-labelledby="about-teaser-title" className="container-x py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <img
              src={site.portrait}
              alt={`${site.name} at work`}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-lg object-cover shadow-[--shadow-card]"
            />
            <div className="absolute -bottom-5 -right-5 hidden rounded-lg bg-accent px-6 py-4 text-white shadow-lg sm:block">
              <p className="font-serif text-3xl font-bold leading-none">2014</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest">
                Reporting since
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">About {site.firstName}</p>
            <h2 id="about-teaser-title" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
              A journalist who takes his time
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">{site.bioShort}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">
              {site.firstName} believes the best journalism is built on trust: with sources,
              with readers, and with the communities whose stories deserve to be told carefully.
            </p>
            <div className="mt-8">
              <Link to="/about" className="btn-outline">
                Read the full story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUOTE BAND ============ */}
      <section aria-label="Journalism philosophy" className="bg-ink-950 py-16 text-white sm:py-20">
        <div className="container-x">
          <blockquote className="mx-auto max-w-3xl text-center">
            <Icons.Quote className="mx-auto mb-6 h-8 w-8 text-accent" />
            <p className="font-serif text-3xl font-light italic leading-snug sm:text-4xl">
              "Journalism is not about the medium. It's about the promise: that someone,
              somewhere, read the whole thing carefully."
            </p>
            <footer className="mt-6 text-sm font-medium uppercase tracking-widest text-ink-400">
              — {site.name}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <Newsletter />
    </>
  );
}