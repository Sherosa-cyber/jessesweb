// Loads articles from articles.json (editable via the admin panel at
// /admin). To add an article by hand: open articles.json, copy any
// article object, give it a unique "slug" and add it to the array.
import articleData from "./articles.json";

export const articles = articleData;

// ---------- Helpers (no need to edit these) ----------

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle() {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getLatestArticles(count = 6) {
  return [...articles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}

export function getRelatedArticles(article, count = 3) {
  const sameCategory = articles.filter(
    (a) => a.slug !== article.slug && a.category === article.category
  );
  const others = articles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function getAdjacentArticles(article) {
  const ordered = [...articles].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const index = ordered.findIndex((a) => a.slug === article.slug);
  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function getArticlesByCategory(category) {
  return articles.filter((a) => a.category === category);
}

export function formatDate(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}