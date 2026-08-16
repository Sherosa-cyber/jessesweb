import { useState } from "react";
import LocalImage from "../components/LocalImage.jsx";
import { inputClass } from "./fields.jsx";

const TYPES = [
  { value: "p", label: "Paragraph" },
  { value: "h2", label: "Heading" },
  { value: "h3", label: "Sub-heading" },
  { value: "quote", label: "Quote" },
  { value: "list", label: "Bullet list" },
  { value: "img", label: "Image" },
];

// Visual block editor: each part of the article (paragraph, heading, quote,
// list, image) is its own card that can be edited, reordered or deleted.
export default function BlockEditor({ value = [], onChange, images = [] }) {
  const [blocks, setBlocks] = useState(() =>
    value.length ? value.map((b) => ({ ...b })) : [{ type: "p", text: "" }]
  );

  const update = (next) => {
    setBlocks(next);
    onChange(next.filter((b) => blockNonEmpty(b)));
  };

  const patch = (i, patchData) => update(blocks.map((b, j) => (j === i ? { ...b, ...patchData } : b)));
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    update(next);
  };
  const remove = (i) => update(blocks.filter((_, j) => j !== i));
  const add = (type = "p") => {
    const blank = type === "img" ? { type: "img", src: "", caption: "" } : type === "quote" ? { type: "quote", text: "", cite: "" } : type === "list" ? { type: "list", items: [""] } : { type, text: "" };
    update([...blocks, blank]);
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div key={i} className="rounded-md border border-ink-100 bg-ink-50/60 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={block.type}
              onChange={(e) => {
                const type = e.target.value;
                const next =
                  type === "img"
                    ? { type, src: block.src || "", caption: block.caption || "" }
                    : type === "quote"
                      ? { type, text: block.text || "", cite: block.cite || "" }
                      : type === "list"
                        ? { type, items: block.items || [""] }
                        : { type, text: block.text || "" };
                update(blocks.map((b, j) => (j === i ? next : b)));
              }}
              aria-label={`Block ${i + 1} type`}
              className={`${inputClass} w-auto min-w-[150px] py-1.5`}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <span className="text-[11px] font-medium uppercase tracking-widest text-ink-400">
              Block {i + 1}
            </span>
            <div className="ml-auto flex gap-1">
              <BlockBtn label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</BlockBtn>
              <BlockBtn label="Move down" onClick={() => move(i, 1)} disabled={i === blocks.length - 1}>↓</BlockBtn>
              <BlockBtn label="Delete block" onClick={() => remove(i)} danger>✕</BlockBtn>
            </div>
          </div>

          <div className="mt-3">
            {block.type === "img" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-3">
                  <input
                    list="admin-images"
                    value={block.src}
                    onChange={(e) => patch(i, { src: e.target.value })}
                    placeholder="images/photo.jpg"
                    aria-label={`Block ${i + 1} image path`}
                    className={inputClass}
                  />
                  <input
                    value={block.caption || ""}
                    onChange={(e) => patch(i, { caption: e.target.value })}
                    placeholder="Caption / credit (optional)"
                    aria-label={`Block ${i + 1} image caption`}
                    className={inputClass}
                  />
                  <datalist id="admin-images">
                    {images.map((img) => (
                      <option key={img} value={img} />
                    ))}
                  </datalist>
                </div>
                <div className="overflow-hidden rounded-md border border-ink-100 bg-white">
                  {block.src ? (
                    <LocalImage src={block.src} alt="Block preview" className="aspect-video w-full object-cover" />
                  ) : (
                    <p className="px-4 py-8 text-center text-xs text-ink-400">
                      Pick a photo path to preview it here
                    </p>
                  )}
                </div>
              </div>
            ) : block.type === "quote" ? (
              <div className="space-y-3">
                <textarea
                  rows={2}
                  value={block.text || ""}
                  onChange={(e) => patch(i, { text: e.target.value })}
                  placeholder="The quote…"
                  aria-label={`Block ${i + 1} quote text`}
                  className={inputClass}
                />
                <input
                  value={block.cite || ""}
                  onChange={(e) => patch(i, { cite: e.target.value })}
                  placeholder="Who said it (optional)"
                  aria-label={`Block ${i + 1} quote source`}
                  className={inputClass}
                />
              </div>
            ) : block.type === "list" ? (
              <textarea
                rows={4}
                value={(block.items || []).join("\n")}
                onChange={(e) => patch(i, { items: e.target.value.split("\n") })}
                placeholder={"One bullet point per line…"}
                aria-label={`Block ${i + 1} list items`}
                className={inputClass}
              />
            ) : (
              <textarea
                rows={block.type === "p" ? 4 : 2}
                value={block.text || ""}
                onChange={(e) => patch(i, { text: e.target.value })}
                placeholder={block.type === "h2" ? "Heading text…" : block.type === "h3" ? "Sub-heading text…" : "Write your paragraph…"}
                aria-label={`Block ${i + 1} text`}
                className={`${inputClass} resize-y`}
              />
            )}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => add("p")}
          className="rounded-sm border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white"
        >
          + Paragraph
        </button>
        <button
          type="button"
          onClick={() => add("img")}
          className="rounded-sm border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white"
        >
          + Image
        </button>
        <button
          type="button"
          onClick={() => add("quote")}
          className="rounded-sm border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white"
        >
          + Quote
        </button>
        <button
          type="button"
          onClick={() => add("list")}
          className="rounded-sm border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white"
        >
          + Bullet list
        </button>
      </div>
    </div>
  );
}

function BlockBtn({ label, onClick, disabled, danger, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`rounded-sm border px-2.5 py-1 text-sm transition-colors disabled:opacity-30 ${
        danger
          ? "border-accent/30 bg-accent-soft text-accent-dark hover:bg-accent hover:text-white"
          : "border-ink-200 text-ink-600 hover:border-ink-950 hover:bg-ink-950 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function blockNonEmpty(b) {
  if (b.type === "img") return Boolean(b.src);
  if (b.type === "list") return (b.items || []).some((l) => String(l).trim());
  return Boolean(String(b.text || "").trim());
}