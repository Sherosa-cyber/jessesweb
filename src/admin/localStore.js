// Local-first store for the admin editors. Mirrors the shape of the old
// GitHub-backed store (readFile/writeFile) but saves instantly to the
// browser. The "Publish to web" flow in Admin.jsx pushes these local
// changes to GitHub when the user provides a token.

import {
  loadLocalContent,
  saveLocalContent,
  clearLocalContent,
  hasLocalContent,
  listLocalImages,
  listLocalContentKeys,
} from "../utils/localContent.js";
import * as gh from "./gh.js";

// Maps the editor's file paths to the localStorage content keys.
const KEYS = {
  "src/data/articles.json": "articles",
  "src/data/site.json": "site",
  "src/data/portfolio.json": "portfolio",
  "src/data/media.json": "media",
};

async function bundledContent(key) {
  const mod = await import(`../data/${key}.json`);
  return JSON.stringify(mod.default, null, 2);
}

// Returns { content } — local override if saved, otherwise the bundled JSON.
export async function readFile(path) {
  const key = KEYS[path];
  if (hasLocalContent(key)) {
    return { content: localStorage.getItem("ledger_content_" + key) };
  }
  return { content: await bundledContent(key) };
}

// Saves to localStorage instantly (no token, no GitHub).
export async function writeFile(path, content) {
  const key = KEYS[path];
  saveLocalContent(key, JSON.parse(content));
  return { saved: true };
}

export async function listLocalFiles() {
  return listLocalImages().map((img) => ({ name: img.name }));
}

export function isLocal(path) {
  return hasLocalContent(KEYS[path]);
}

export { listLocalContentKeys } from "../utils/localContent.js";

export function resetLocal(path) {
  clearLocalContent(KEYS[path]);
}

// ---- Publish to web (optional, needs a GitHub token) ----

// Uploads every locally saved change (content + photos) to the repo via the
// GitHub Contents API. Returns a list of commit messages.
export async function publishToGitHub(token) {
  const messages = [];
  const keys = listLocalContentKeys();
  for (const key of keys) {
    const data = loadLocalContent(key, null);
    if (!data) continue;
    const path = `src/data/${key}.json`;
    const message = key === "articles"
      ? `Publish articles from admin panel`
      : `Publish ${key} from admin panel`;
    await gh.writeFile(path, JSON.stringify(data, null, 2) + "\n", message, token);
    messages.push(message);
  }
  const images = listLocalImages();
  for (const img of images) {
    const base64 = img.dataUrl.split(",")[1];
    if (!base64) continue;
    await gh.uploadBinary(`public/images/${img.name}`, base64, `Publish photo: ${img.name}`, token);
    messages.push(`Publish photo: ${img.name}`);
  }
  return messages;
}