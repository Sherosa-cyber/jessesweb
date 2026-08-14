// Local-first content storage for the admin panel.
// Everything is saved in the browser (localStorage) — instant, no GitHub
// needed. The site reads local overrides first, then falls back to the
// bundled JSON, so saved changes appear immediately on this device.

const CONTENT_PREFIX = "ledger_content_";
const IMAGE_PREFIX = "ledger_image_";

export function loadLocalContent(key, fallback) {
  try {
    const raw = localStorage.getItem(CONTENT_PREFIX + key);
    if (raw !== null) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return fallback;
}

export function saveLocalContent(key, data) {
  localStorage.setItem(CONTENT_PREFIX + key, JSON.stringify(data));
}

export function hasLocalContent(key) {
  return localStorage.getItem(CONTENT_PREFIX + key) !== null;
}

export function clearLocalContent(key) {
  localStorage.removeItem(CONTENT_PREFIX + key);
}

export function listLocalContentKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CONTENT_PREFIX)) {
      keys.push(key.slice(CONTENT_PREFIX.length));
    }
  }
  return keys;
}

// ---- Local images (data URLs) ----

export function getLocalImage(name) {
  try {
    return localStorage.getItem(IMAGE_PREFIX + name) || "";
  } catch {
    return "";
  }
}

export function setLocalImage(name, dataUrl) {
  localStorage.setItem(IMAGE_PREFIX + name, dataUrl);
}

export function removeLocalImage(name) {
  localStorage.removeItem(IMAGE_PREFIX + name);
}

export function listLocalImages() {
  const images = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(IMAGE_PREFIX)) {
      images.push({
        name: key.slice(IMAGE_PREFIX.length),
        dataUrl: localStorage.getItem(key),
      });
    }
  }
  return images.sort((a, b) => a.name.localeCompare(b.name));
}

// Resolves an image path ("images/photo.jpg") to a locally stored data URL
// if one exists, otherwise returns the path unchanged.
export function resolveLocalImage(src) {
  if (!src || typeof src !== "string" || src.startsWith("data:")) return src;
  const name = src.replace(/^\.?\//, "").replace(/^images\//, "");
  const local = getLocalImage(name);
  return local || src;
}