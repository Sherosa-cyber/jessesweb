// GitHub API wrapper used by the admin panel (/admin).
// All writes go through the repo's Contents API, which triggers the
// GitHub Actions deploy — the site updates itself after every save.

const REPO = {
  owner: "Sherosa-cyber",
  repo: "jessesweb",
  branch: "main",
};

export function getToken() {
  return localStorage.getItem("ledger_gh_token") || "";
}

export function setToken(token) {
  localStorage.setItem("ledger_gh_token", token.trim());
}

export function clearToken() {
  localStorage.removeItem("ledger_gh_token");
}

async function request(path, options = {}, token) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    let message = `GitHub error (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  return res.json();
}

// Reads a file from the repo. Returns { content, sha } with decoded text.
export async function readFile(path, token = getToken()) {
  const data = await request(
    `/repos/${REPO.owner}/${REPO.repo}/contents/${path}?ref=${REPO.branch}`,
    {},
    token
  );
  return { content: atob(data.content), sha: data.sha };
}

// Writes a text file to the repo (creates or updates).
export async function writeFile(path, content, message, token = getToken()) {
  let sha;
  try {
    sha = (await readFile(path, token)).sha;
  } catch {
    sha = undefined; // file doesn't exist yet
  }
  return request(
    `/repos/${REPO.owner}/${REPO.repo}/contents/${path}`,
    {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: btoa(unescape(encodeURIComponent(content))),
        branch: REPO.branch,
        ...(sha ? { sha } : {}),
      }),
    },
    token
  );
}

// Lists files inside a directory (e.g. public/images).
export async function listDir(path, token = getToken()) {
  const data = await request(
    `/repos/${REPO.owner}/${REPO.repo}/contents/${path}?ref=${REPO.branch}`,
    {},
    token
  );
  return data
    .filter((item) => item.type === "file")
    .map((item) => ({ name: item.name, path: item.path, size: item.size }));
}

// Uploads a binary file (photo) to the repo as base64.
export async function uploadBinary(path, base64Data, message, token = getToken()) {
  let sha;
  try {
    sha = (await readFile(path, token)).sha;
  } catch {
    sha = undefined;
  }
  return request(
    `/repos/${REPO.owner}/${REPO.repo}/contents/${path}`,
    {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: base64Data,
        branch: REPO.branch,
        ...(sha ? { sha } : {}),
      }),
    },
    token
  );
}

// Deletes a file from the repo.
export async function deleteFile(path, message, token = getToken()) {
  const { sha } = await readFile(path, token);
  return request(
    `/repos/${REPO.owner}/${REPO.repo}/contents/${path}`,
    {
      method: "DELETE",
      body: JSON.stringify({ message, sha, branch: REPO.branch }),
    },
    token
  );
}

// Verifies the token works and returns the authenticated user.
export async function verifyToken(token) {
  const data = await request("/user", {}, token);
  return data.login;
}

// Makes a slug from a title, e.g. "My Big Story" -> "my-big-story".
export function makeSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}