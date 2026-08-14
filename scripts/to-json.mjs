// Converts the current JS data modules into JSON files so the admin
// panel can safely edit them through the GitHub API.
import fs from "node:fs";
import { articles } from "../src/data/articles.js";
import { site } from "../src/data/site.js";
import { portfolioItems, portfolioCategories } from "../src/data/portfolio.js";
import { mediaItems, mediaTypes } from "../src/data/media.js";

const write = (name, data) =>
  fs.writeFileSync(`src/data/${name}.json`, JSON.stringify(data, null, 2) + "\n");

write("site", site);
write("articles", articles);
write("portfolio", { categories: portfolioCategories, items: portfolioItems });
write("media", { types: mediaTypes, items: mediaItems });

console.log("JSON files written:");
for (const f of ["site", "articles", "portfolio", "media"]) {
  const size = fs.statSync(`src/data/${f}.json`).size;
  console.log(`  src/data/${f}.json (${(size / 1024).toFixed(1)} KB)`);
}