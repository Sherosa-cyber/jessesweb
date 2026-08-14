import { useEffect, useState } from "react";
import { readFile, writeFile } from "./gh.js";
import { Field, TextInput, TextArea, Select, Section, Button, Status } from "./fields.jsx";

// Generic list editor used for Portfolio and Media items.
export default function ListEditor({ token, file, itemName, getList, setList, makeNew, fields }) {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(null); // null = list, {} = new
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

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
    await writeFile(file, JSON.stringify(setList(data, next), null, 2) + "\n", message, token);
  };

  const remove = async (index) => {
    if (!window.confirm(`Delete this ${itemName}? This cannot be undone.`)) return;
    try {
      const next = items.filter((_, i) => i !== index);
      await saveList(next, `Delete ${itemName}`);
      setData(setList(data, next));
      setStatus("Deleted — the site will update in about 2 minutes.");
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
          setStatus(`Saved — the site will update in about 2 minutes.`);
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
        <Button onClick={() => setEditing({ __new: true })}>+ New {itemName}</Button>
      </div>
      {status && <div className="mb-6" />}

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-ink-100 bg-white p-4 shadow-[--shadow-card] sm:p-5"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-ink-400">
                {item.category || item.type || "Item"} · {item.date || ""}
              </p>
              <h3 className="mt-1 truncate font-serif text-lg font-semibold text-ink-950">
                {item.title}
              </h3>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" onClick={() => setEditing({ ...item, __index: i })}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => remove(i)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
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