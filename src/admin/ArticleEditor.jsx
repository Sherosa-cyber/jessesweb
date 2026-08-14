import { useEffect, useState } from "react";
import { readFile, writeFile, listDir, makeSlug, today } from "./gh.js";
import { blocksToText, textToBlocks } from "../utils/markup.js";
import { Field, TextInput, TextArea, Select, Checkbox, Section, Button, Status, inputClass } from "./fields.jsx";
import { categories } from "../data/site.js";

const FILE = "src/data/articles.json";

export default function ArticleEditor({ token }) {
  const [articles, setArticles] = useState(null);
  const [images, setImages] = useState([]);
  const [editing, setEditing] = useState(null); // null = list, {} = new
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const file = await readFile(FILE, token);
        setArticles(JSON.parse(file.content));
        try {
          const files = await listDir("public/images", token);
          setImages(files.map((f) => "images/" + f.name));
        } catch {
          setImages([]);
        }
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [token]);

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!articles) return <p className="text-sm text-ink-400">Loading articles…</p>;

  if (editing !== null) {
    return (
      <ArticleForm
        token={token}
        articles={articles}
        images={images}
        editing={editing}
        onCancel={() => setEditing(null)}
        onSaved={(next, savedArticle) => {
          setArticles(next);
          setStatus("Saved — the site will update in about 2 minutes.");
          setEditing(null);
        }}
      />
    );
  }

  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));

  const remove = async (slug) => {
    if (!window.confirm("Delete this article? This cannot be undone.")) return;
    try {
      const next = articles.filter((a) => a.slug !== slug);
      await writeFile(
        FILE,
        JSON.stringify(next, null, 2) + "\n",
        `Delete article: ${slug}`,
        token
      );
      setArticles(next);
      setStatus("Deleted — the site will update in about 2 minutes.");
    } catch (e) {
      setStatus(e.message);
    }
  };

  return (
    <div>
      {status && <Status status={status} />}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-500">
          <strong className="text-ink-900">{sorted.length}</strong> articles published
        </p>
        <Button onClick={() => setEditing({})}>+ New article</Button>
      </div>

      {status && <div className="mb-6" />}

      <ul className="space-y-3">
        {sorted.map((a) => (
          <li
            key={a.slug}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-ink-100 bg-white p-4 shadow-[--shadow-card] sm:p-5"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {a.featured && (
                  <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    Featured
                  </span>
                )}
                <span className="rounded-sm bg-ink-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ink-600">
                  {a.category}
                </span>
              </div>
              <h3 className="mt-2 truncate font-serif text-lg font-semibold text-ink-950">
                {a.title}
              </h3>
              <p className="mt-1 text-xs text-ink-400">
                {a.date} · {a.readTime} min read · /articles/{a.slug}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" onClick={() => setEditing(a)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => remove(a.slug)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArticleForm({ token, articles, images, editing, onCancel, onSaved }) {
  const isNew = !editing.slug;
  const [form, setForm] = useState(() => {
    const f = { ...editing };
    return {
      title: f.title || "",
      slug: f.slug || "",
      subtitle: f.subtitle || "",
      excerpt: f.excerpt || "",
      category: f.category || categories[0],
      date: f.date || today(),
      readTime: f.readTime || 5,
      image: f.image || "images/portrait.jpg",
      imageCaption: f.imageCaption || "",
      featured: !!f.featured,
      tags: (f.tags || []).join(", "),
      content: blocksToText(f.content || []),
    };
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async () => {
    setError("");
    if (!form.title.trim()) return setError("Please add a title.");
    if (!form.slug.trim()) return setError("Please add a slug (e.g. my-new-story).");

    const slugExists = articles.some(
      (a) => a.slug === form.slug && a.slug !== editing.slug
    );
    if (slugExists) return setError(`An article with the slug "${form.slug}" already exists.`);

    setSaving(true);
    try {
      const article = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        excerpt: form.excerpt.trim(),
        category: form.category,
        date: form.date,
        readTime: Number(form.readTime) || 5,
        image: form.image.trim(),
        imageCaption: form.imageCaption.trim(),
        featured: form.featured,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        content: textToBlocks(form.content),
      };
      const next = isNew ? [article, ...articles] : articles.map((a) => (a.slug === editing.slug ? article : a));
      await writeFile(
        FILE,
        JSON.stringify(next, null, 2) + "\n",
        isNew ? `Add article: ${article.title}` : `Update article: ${article.title}`,
        token
      );
      onSaved(next, article);
    } catch (e) {
      setError(e.message);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-ink-950">
          {isNew ? "New article" : "Edit article"}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save article"}</Button>
        </div>
      </div>

      {error && <p role="alert" className="mb-4 text-sm font-medium text-accent">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Title & summary">
          <Field label="Title">
            <TextInput value={form.title} onChange={set("title")} placeholder="The story title" />
          </Field>
          <Field
            label="Slug (URL)"
            hint="Used in the web address. Filled in automatically when you type a title — you can change it."
          >
            <TextInput
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value || makeSlug(form.title) }))}
              placeholder="my-new-story"
            />
          </Field>
          <Field label="Subtitle">
            <TextArea rows={2} value={form.subtitle} onChange={set("subtitle")} placeholder="A short compelling subtitle" />
          </Field>
          <Field label="Summary (shown on cards)">
            <TextArea rows={3} value={form.excerpt} onChange={set("excerpt")} placeholder="One or two sentences shown in the article card." />
          </Field>
        </Section>

        <Section title="Details">
          <Field label="Category">
            <Select options={categories} value={form.category} onChange={set("category")} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Publish date">
              <input type="date" className={inputClass} value={form.date} onChange={set("date")} />
            </Field>
            <Field label="Read time (minutes)">
              <input type="number" min="1" className={inputClass} value={form.readTime} onChange={set("readTime")} />
            </Field>
          </div>
          <Field label="Tags" hint="Comma separated — e.g. AI, Regulation">
            <TextInput value={form.tags} onChange={set("tags")} placeholder="AI, Regulation" />
          </Field>
          <Checkbox label="Feature on the homepage" checked={form.featured} onChange={set("featured")} />
        </Section>

        <Section title="Cover image">
          <Field label="Image" hint="Pick an uploaded photo from the Photos tab, or type a path.">
            <TextInput list="admin-images" value={form.image} onChange={set("image")} placeholder="images/photo.jpg" />
            <datalist id="admin-images">
              {images.map((img) => (
                <option key={img} value={img} />
              ))}
            </datalist>
          </Field>
          <Field label="Image caption / credit">
            <TextInput value={form.imageCaption} onChange={set("imageCaption")} placeholder="Caption for the featured image" />
          </Field>
          <div className="overflow-hidden rounded-md border border-ink-100 bg-ink-50">
            {form.image ? (
              <img src={form.image} alt="Cover preview" className="aspect-[16/9] w-full object-cover" />
            ) : (
              <p className="px-4 py-8 text-center text-sm text-ink-400">No image selected</p>
            )}
          </div>
        </Section>

        <Section title="Article content">
          <Field
            label="Write your article"
            hint={undefined}
          >
            <TextArea rows={16} value={form.content} onChange={set("content")} />
          </Field>
          <div className="rounded-sm bg-ink-50 p-4 text-xs leading-relaxed text-ink-500">
            <p className="font-semibold text-ink-700">How to format:</p>
            <p>• Blank line between paragraphs</p>
            <p>• <code className="rounded bg-ink-100 px-1">## Heading</code> for section headings</p>
            <p>• <code className="rounded bg-ink-100 px-1">&gt; Quote text</code> for a pull quote (add <code className="rounded bg-ink-100 px-1">&gt; — Name</code> for the source)</p>
            <p>• <code className="rounded bg-ink-100 px-1">![Caption](images/photo.jpg)</code> for an image with caption</p>
            <p>• <code className="rounded bg-ink-100 px-1">- Item</code> for bullet lists</p>
          </div>
        </Section>
      </div>

      <div className="mt-8 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save article"}</Button>
      </div>
    </div>
  );
}