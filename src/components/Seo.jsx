import { useEffect } from "react";

// Sets the document <title> and meta description (and Open Graph tags)
// for each page. Improves SEO without a heavy meta library.
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr, name, content) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
  }, [title, description]);

  return null;
}