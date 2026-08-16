import { useEffect, useState } from "react";
import { readFile, writeFile } from "./localStore.js";
import LocalImage from "../components/LocalImage.jsx";
import { Field, TextInput, TextArea, Select, Section, Button, Status, inputClass } from "./fields.jsx";

// Generic list editor used for Portfolio and Media items.
export default function ListEditor({ token, file, itemName, getList, setList, makeNew, fields }) {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(null); // null = list, {} = new
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const f = await readFile(file, token);
        setData(JSON.parse(f.content));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [file, token]);

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!data) return <p className="text-sm text-ink-400">Loading…</p>;

  const items = getList(data);

  const saveList = async (next, message) => {
    await writeFile(file, JSON.stringify(setList(data, next), null, 2) + "\n", message);
  };

  const remove = async (index) => {
    if (!window.confirm(`Delete this ${itemName}? This cannot be undone.`)) return;
    try {
      const next = items.filter((_, i) => i !== index);
      await saveList(next, `Delete ${itemName}`);
      setData(setList(data, next));
      setStatus("Deleted — your changes are live on this device.");
    } catch (e) {
      setStatus(e.message);
    }
  };

  const move = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    try {
      await saveList(next, `Reorder ${itemName}`);
      setData(setList(data, next));
      setStatus("Saved — your changes are live on this device.");
    } catch (e) {
      setStatus(e.message);
    }
  };

  if (editing !== null) {
    return (
      <ItemForm
        token={token}
        itemName={itemName}
        fields={fields}
        item={editing}
        isNew={editing.__new}
        onCancel={() => setEditing(null)}
        onSave={async (item) => {
          const next = editing.__new ? [...items, item] : items.map((it, i) => (i === editing.__index ? item : it));
          await saveList(next, editing.__new ? `Add ${itemName}: ${item.title}` : `Update ${itemName}: ${item.title}`);
          setData(setList(data, next));
          setStatus(`Saved — your changes are live on this device.`);
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div>
      {status && <Status status={status} />}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-500">
          <strong className="text-ink-900">{items.length}</strong> {itemName}s
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${itemName}s…`}
            aria-label={`Search ${itemName}s in admin`}
            className={`${inputClass} max-w-[220px]`}
          />
          <Button onClick={() => setEditing({ __new: true })}>+ New {itemName}</Button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ink-200 bg-ink-50 p-8 text-center text-sm text-ink-400">
          Nothing here yet — add your first {itemName}.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items
            .map((item, i) => ({ item, i }))
            .filter(({ item }) => {
              const q = query.trim().toLowerCase();
              if (!q) return true;
              return [item.title, item.category, item.type, item.outlet, item.description]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q));
            })
            .map(({ item, i }) => (
              <li
                key={i}
                className="flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-[--shadow-card] transition-shadow hover:shadow-[--shadow-card-hover]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-ink-50">
                  <LocalImage src={item.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-sm bg-ink-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    {item.category || item.type || "Item"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-medium text-ink-400">{item.date || ""}</p>
                  <h3 className="mt-1 line-clamp-2 font-serif text-lg font-semibold leading-snug text-ink-950">
                    {item.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 border-t border-ink-100 pt-3">
                    <Button variant="outline" onClick={() => setEditing({ ...item, __index: i })}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => remove(i)}>
                      Delete
                    </Button>
                    <div className="ml-auto flex gap-1">
                      <button
                        type="button"
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label={`Move ${item.title} up`}
                        className="rounded-sm border border-ink-200 px-2.5 py-1.5 text-sm text-ink-600 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white disabled:opacity-30 disabled:hover:border-ink-200 disabled:hover:bg-transparent disabled:hover:text-ink-600"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => move(i, 1)}
                        disabled={i === items.length - 1}
                        aria-label={`Move ${item.title} down`}
                        className="rounded-sm border border-ink-200 px-2.5 py-1.5 text-sm text-ink-600 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white disabled:opacity-30 disabled:hover:border-ink-200 disabled:hover:bg-transparent disabled:hover:text-ink-600"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

function ItemForm({ itemName, fields, item, isNew, onCancel, onSave }) {
  const [form, setForm] = useState(() => {
    const f = {};
    for (const field of fields) f[field.key] = item[field.key] ?? "";
    return f;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setError("");
    if (!form.title?.trim()) return setError("Please add a title.");
    setSaving(true);
    try {
      const clean = { ...item, __index: undefined, __new: undefined };
      for (const field of fields) {
        let value = form[field.key];
        if (field.type === "tags") {
          value = String(value || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        }
        clean[field.key] = value;
      }
      await onSave(clean);
    } catch (e) {
      setError(e.message);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-ink-950">
          {isNew ? `New ${itemName}` : `Edit ${itemName}`}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        </div>
      </div>

      {error && <p role="alert" className="mb-4 text-sm font-medium text-accent">{error}</p>}

      <Section title={`${itemName} details`}>
        {fields.map((field) => (
          <Field key={field.key} label={field.label}>
            {field.type === "textarea" ? (
              <TextArea rows={3} value={form[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))} />
            ) : field.type === "select" ? (
              <Select options={field.options} value={form[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))} />
            ) : (
              <TextInput value={form[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))} />
            )}
          </Field>
        ))}
      </Section>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
      </div>
    </div>
  );
}