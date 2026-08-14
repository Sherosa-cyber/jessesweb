import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { getToken, setToken, clearToken } from "./gh.js";
import { publishToGitHub, listLocalContentKeys } from "./localStore.js";
import { Button, Status, inputClass } from "./fields.jsx";
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
  const [tab, setTab] = useState("articles");
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const draftCount = listLocalContentKeys().length;

  const publish = async (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    setPublishing(true);
    setStatus("");
    setError("");
    try {
      const messages = await publishToGitHub(token.trim());
      setStatus(
        `Published to the web — ${messages.length} change${messages.length === 1 ? "" : "s"} sent. The live site updates in about 2 minutes.`
      );
      setToken(token.trim());
      setPublishOpen(false);
    } catch (err) {
      setError(err.message);
    }
    setPublishing(false);
  };

  return (
    <>
      <Seo title={`Admin — ${site.publication}`} description="Content admin panel." />

      <div className="container-x py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Admin panel</p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-ink-950 sm:text-4xl">
              {site.publication}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">
              Edit anything below and press <strong className="text-ink-900">Save</strong> —
              your changes appear on the site instantly, right on this device. When you want
              them on the <strong className="text-ink-900">live website</strong>, press{" "}
              <strong className="text-ink-900">Publish to web</strong>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="btn-outline">View site</Link>
            <button type="button" onClick={() => setPublishOpen(true)} className="btn-primary">
              Publish to web
            </button>
          </div>
        </div>

        <div className="mt-6">
          {status && <Status status={status} />}
          {error && (
            <p role="alert" className="rounded-sm border border-accent bg-accent-soft px-4 py-2.5 text-sm font-medium text-accent-dark">
              {error}
            </p>
          )}
          {draftCount > 0 && !publishOpen && (
            <p className="mt-3 text-xs text-ink-400">
              {draftCount} saved local change{draftCount === 1 ? "" : "s"} waiting — press{" "}
              <strong className="text-ink-700">Publish to web</strong> to put them on the
              live site.
            </p>
          )}
        </div>

        {publishOpen && (
          <PublishPanel
            token={token}
            setToken={setTokenState}
            publishing={publishing}
            onPublish={publish}
            onClose={() => setPublishOpen(false)}
          />
        )}

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
    </>
  );
}

function PublishPanel({ token, setToken, publishing, onPublish, onClose }) {
  const [signedOut, setSignedOut] = useState(false);
  return (
    <div className="mt-6 rounded-lg border border-ink-100 bg-white p-6 shadow-[--shadow-card]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="font-serif text-xl font-semibold text-ink-950">Publish to the live website</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-ink-400 hover:text-ink-900"
        >
          Close
        </button>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">
        This sends every saved local change to your GitHub repository, and the live site
        rebuilds automatically in about 2 minutes. You only need the token{" "}
        <strong className="text-ink-900">once per browser</strong> — it stays on this
        device.
      </p>
      <form onSubmit={onPublish} className="mt-5 flex flex-wrap items-start gap-3">
        <input
          type="password"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            setSignedOut(false);
          }}
          placeholder="github_pat_…"
          className={`${inputClass} max-w-sm`}
          aria-label="GitHub token"
        />
        <Button type="submit" disabled={publishing || !token.trim()}>
          {publishing ? "Publishing…" : "Publish now"}
        </Button>
        {token && (
          <button
            type="button"
            onClick={() => {
              clearToken();
              setToken("");
              setSignedOut(true);
            }}
            className="text-xs font-medium text-ink-400 hover:text-accent"
          >
            Forget token on this device
          </button>
        )}
      </form>
      {signedOut && (
        <p className="mt-3 text-xs text-ink-400">Token removed from this device.</p>
      )}
      <details className="mt-5 text-sm text-ink-500">
        <summary className="cursor-pointer font-semibold text-ink-900">
          How to get the token (2 minutes)
        </summary>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 leading-relaxed">
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
            Permissions → <strong>Contents</strong> → set to <strong>Read and write</strong>
          </li>
          <li>Generate → copy the token → paste it above → Publish now</li>
        </ol>
      </details>
    </div>
  );
}