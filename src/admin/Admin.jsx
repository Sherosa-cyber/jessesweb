import { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";
import { getToken, setToken, clearToken, verifyToken } from "./gh.js";
import ArticleEditor from "./ArticleEditor.jsx";
import SiteEditor from "./SiteEditor.jsx";
import ListEditor from "./ListEditor.jsx";
import Photos from "./Photos.jsx";
import { site } from "../data/site.js";

const tabs = [
  { id: "articles", label: "Articles" },
  { id: "site", label: "Site Settings" },
  { id: "portfolio", label: "Portfolio" },
  { id: "media", label: "Media" },
  { id: "photos", label: "Photos" },
];

export default function Admin() {
  const [token, setTokenState] = useState(getToken());
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [tab, setTab] = useState("articles");

  // On load: try to restore a previous session
  useEffect(() => {
    const stored = getToken();
    if (stored) {
      verifyToken(stored)
        .then((login) => {
          setUser(login);
          setChecked(true);
        })
        .catch(() => {
          setChecked(true);
        });
    } else {
      setChecked(true);
    }
  }, []);

  const connect = async () => {
    setConnecting(true);
    setError("");
    try {
      const login = await verifyToken(token);
      setToken(token);
      setUser(login);
    } catch (e) {
      setError(e.message);
    }
    setConnecting(false);
  };

  const disconnect = () => {
    clearToken();
    setUser(null);
    setTokenState("");
  };

  return (
    <>
      <Seo title={`Admin — ${site.publication}`} description="Content admin panel." />

      {!checked ? (
        <div className="container-x py-20 text-center text-ink-400">Checking…</div>
      ) : !user ? (
        <Login
          token={token}
          setToken={setTokenState}
          error={error}
          connecting={connecting}
          onConnect={connect}
        />
      ) : (
        <div className="container-x py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Admin panel</p>
              <h1 className="mt-2 font-serif text-3xl font-semibold text-ink-950 sm:text-4xl">
                {site.publication}
              </h1>
              <p className="mt-2 text-sm text-ink-500">
                Signed in as <span className="font-semibold text-ink-900">@{user}</span>.
                Changes go live automatically in about 2 minutes.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="/" className="btn-outline">View site</a>
              <button type="button" onClick={disconnect} className="btn-outline">
                Sign out
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div role="tablist" aria-label="Admin sections" className="mt-8 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`chip ${tab === t.id ? "chip-active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {tab === "articles" && <ArticleEditor token={token} />}
            {tab === "site" && <SiteEditor token={token} />}
            {tab === "portfolio" && (
              <ListEditor
                token={token}
                file="src/data/portfolio.json"
                itemName="portfolio item"
                getList={(data) => data.items}
                setList={(data, items) => ({ ...data, items })}
                makeNew={(items) => ({
                  category: "Features",
                  title: "New work",
                  description: "",
                  date: new Date().toISOString().slice(0, 7),
                  image: "images/portrait.jpg",
                  tags: [],
                  link: "https://example.com",
                })}
                fields={[
                  { key: "title", label: "Title", type: "text" },
                  {
                    key: "category",
                    label: "Category",
                    type: "select",
                    options: ["Investigative Journalism", "Interviews", "Features", "Opinion", "Photography & Multimedia"],
                  },
                  { key: "description", label: "Description", type: "textarea" },
                  { key: "date", label: "Date (e.g. 2026-08)", type: "text" },
                  { key: "image", label: "Image path (e.g. images/photo.jpg)", type: "text" },
                  { key: "tags", label: "Tags (comma separated)", type: "tags" },
                  { key: "link", label: "Link (/articles/slug or full URL)", type: "text" },
                ]}
              />
            )}
            {tab === "media" && (
              <ListEditor
                token={token}
                file="src/data/media.json"
                itemName="media item"
                getList={(data) => data.items}
                setList={(data, items) => ({ ...data, items })}
                makeNew={() => ({
                  type: "Video",
                  title: "New appearance",
                  outlet: "",
                  date: new Date().toISOString().slice(0, 7),
                  duration: "",
                  description: "",
                  image: "images/portrait.jpg",
                  link: "https://example.com",
                })}
                fields={[
                  {
                    key: "type",
                    label: "Type",
                    type: "select",
                    options: ["Video", "Podcast", "TV", "Radio", "Print"],
                  },
                  { key: "title", label: "Title", type: "text" },
                  { key: "outlet", label: "Outlet / show", type: "text" },
                  { key: "date", label: "Date (e.g. 2026-08)", type: "text" },
                  { key: "duration", label: "Duration (e.g. 12 min)", type: "text" },
                  { key: "description", label: "Description", type: "textarea" },
                  { key: "image", label: "Image path (e.g. images/photo.jpg)", type: "text" },
                  { key: "link", label: "Link (YouTube, podcast URL…)", type: "text" },
                ]}
              />
            )}
            {tab === "photos" && <Photos token={token} />}
          </div>
        </div>
      )}
    </>
  );
}

function Login({ token, setToken, error, connecting, onConnect }) {
  return (
    <div className="container-x flex justify-center py-16 sm:py-24">
      <div className="w-full max-w-lg">
        <p className="eyebrow">Admin panel</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-ink-950 sm:text-4xl">
          Connect your GitHub account
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-500">
          Paste your GitHub token below to unlock the editor. You only do this{" "}
          <strong className="text-ink-900">once per browser</strong> — the token stays on
          this device and is never stored on the website.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="github_pat_..."
            className="w-full rounded-sm border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            onKeyDown={(e) => e.key === "Enter" && onConnect()}
          />
          {error && (
            <p role="alert" className="text-sm font-medium text-accent">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={onConnect}
            disabled={connecting || !token.trim()}
            className="btn-primary w-full justify-center"
          >
            {connecting ? "Connecting…" : "Connect"}
          </button>
        </div>

        <div className="mt-10 rounded-lg border border-ink-100 bg-ink-50 p-6 text-sm leading-relaxed text-ink-600">
          <p className="font-semibold text-ink-900">How to get your token (2 minutes):</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5">
            <li>
              Open{" "}
              <a
                href="https://github.com/settings/tokens?type=fine-grained"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-accent hover:underline"
              >
                github.com/settings/tokens
              </a>
            </li>
            <li>Click "Generate new token" (Fine-grained)</li>
            <li>Token name: anything (e.g. "Ledger Admin")</li>
            <li>
              Repository access → <strong>"Only select repositories"</strong> → choose{" "}
              <strong>jessesweb</strong>
            </li>
            <li>
              Permissions → <strong>Contents</strong> → set to{" "}
              <strong>Read and write</strong>
            </li>
            <li>Generate → copy the token → paste it above → Connect</li>
          </ol>
        </div>
      </div>
    </div>
  );
}