import { useEffect, useRef, useState } from "react";
import { listDir, uploadBinary } from "./gh.js";
import { Section, Button, Status } from "./fields.jsx";

const IMG_DIR = "public/images";

export default function Photos({ token }) {
  const [files, setFiles] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState("");
  const fileRef = useRef(null);

  const refresh = async () => {
    try {
      const files = await listDir(IMG_DIR, token);
      setFiles(files.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!files) return <p className="text-sm text-ink-400">Loading photos…</p>;

  const sanitize = (name) =>
    name.toLowerCase().replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-");

  const upload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus("");
    try {
      const name = sanitize(file.name);
      const path = `${IMG_DIR}/${name}`;
      const base64 = await fileToBase64(file);
      await uploadBinary(path, base64, `Upload photo: ${name}`, token);
      await refresh();
      setSelected(`images/${name}`);
      setStatus(`Uploaded — the site will update in about 2 minutes. Use "images/${name}" in articles.`);
    } catch (e) {
      setStatus(e.message);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const saveCaptions = null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <Section title="Upload a photo">
        <p className="text-sm leading-relaxed text-ink-500">
          Photos you upload here become available instantly for articles, the portfolio,
          media items and your portrait.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="block w-full cursor-pointer rounded-sm border border-dashed border-ink-300 bg-ink-50 p-6 text-sm text-ink-500 file:mr-4 file:rounded-sm file:border-0 file:bg-ink-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-accent"
        />
        <Button onClick={upload} disabled={uploading}>
          {uploading ? "Uploading…" : "Upload photo"}
        </Button>
        {status && <Status status={status} />}
      </Section>

      <Section title="Photos in your library">
        <p className="text-sm text-ink-500">
          Click a photo to select it — its path appears below, ready to paste into an
          article.
        </p>
        {files.length === 0 ? (
          <p className="text-sm text-ink-400">No photos yet — upload your first one.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {files.map((f) => (
              <li key={f.name}>
                <button
                  type="button"
                  onClick={() => setSelected(`images/${f.name}`)}
                  className={`group w-full overflow-hidden rounded-md border-2 text-left transition-all ${
                    selected === `images/${f.name}`
                      ? "border-accent"
                      : "border-transparent hover:border-ink-300"
                  }`}
                >
                  <img
                    src={`images/${f.name}`}
                    alt={f.name}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className="block truncate bg-ink-50 px-2 py-1.5 text-xs text-ink-500">
                    {f.name}
                  </span>
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
              Paste this path into an article's "Image" field — or the Site Settings
              portrait field.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}