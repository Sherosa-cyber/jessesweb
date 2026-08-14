import { useEffect, useRef, useState } from "react";
import {
  listLocalImages,
  setLocalImage,
  removeLocalImage,
} from "../utils/localContent.js";
import { Section, Button, Status } from "./fields.jsx";

const MAX_SIZE = 1.5 * 1024 * 1024; // ~1.5 MB per photo (localStorage budget)

export default function Photos({ token }) {
  const [files, setFiles] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState("");
  const fileRef = useRef(null);

  const refresh = () => setFiles(listLocalImages());

  useEffect(() => {
    refresh();
  }, [token]);

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!files) return <p className="text-sm text-ink-400">Loading photos…</p>;

  const sanitize = (name) =>
    name.toLowerCase().replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-");

  const upload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setStatus(`Photo too large. Please use an image under ${Math.round(MAX_SIZE / 1024 / 1024)} MB.`);
      return;
    }
    setUploading(true);
    setStatus("");
    try {
      const name = sanitize(file.name);
      const dataUrl = await fileToDataUrl(file);
      setLocalImage(name, dataUrl);
      refresh();
      setSelected(`images/${name}`);
      setStatus(`Photo added. Use "images/${name}" in articles, portfolio or site settings.`);
    } catch (e) {
      setStatus(e.message);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const remove = (name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    removeLocalImage(name);
    refresh();
    setSelected("");
    setStatus(`Deleted — your changes are live on this device.`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <Section title="Add a photo">
        <p className="text-sm leading-relaxed text-ink-500">
          Photos you add here are stored on this device and appear on the site
          immediately. Keep them under ~1.5 MB each.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="block w-full cursor-pointer rounded-sm border border-dashed border-ink-300 bg-ink-50 p-6 text-sm text-ink-500 file:mr-4 file:rounded-sm file:border-0 file:bg-ink-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-accent"
        />
        <Button onClick={upload} disabled={uploading}>
          {uploading ? "Adding…" : "Add photo"}
        </Button>
        {status && <Status status={status} />}
      </Section>

      <Section title="Your photos">
        <p className="text-sm text-ink-500">
          Click a photo to select it — its path appears below, ready to paste into an
          article, portfolio item or the site settings.
        </p>
        {files.length === 0 ? (
          <p className="text-sm text-ink-400">No photos added yet — add your first one.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {files.map((f) => (
              <li key={f.name} className="overflow-hidden rounded-md border border-ink-100 bg-white">
                <button
                  type="button"
                  onClick={() => setSelected(`images/${f.name}`)}
                  className="block w-full text-left"
                >
                  <div
                    className={`aspect-[4/3] w-full overflow-hidden border-b-2 ${
                      selected === `images/${f.name}` ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <img
                      src={f.dataUrl}
                      alt={f.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="block truncate bg-ink-50 px-2 py-1.5 text-xs text-ink-500">
                    {f.name}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => remove(f.name)}
                  className="block w-full border-t border-ink-100 bg-ink-50 px-2 py-1 text-xs font-medium text-accent hover:bg-accent hover:text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        {selected && (
          <div className="mt-4 rounded-md bg-ink-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              Selected photo path (copy this)
            </p>
            <p className="mt-1 break-all font-mono text-sm text-ink-900">{selected}</p>
            <p className="mt-2 text-xs text-ink-500">
              Paste this path into an article's "Image" field, a portfolio or media item,
              or the Site Settings portrait field.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}