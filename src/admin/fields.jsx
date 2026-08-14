// Shared form controls for the admin panel — simple, large and friendly.
import { cloneElement, useId } from "react";

export function Field({ label, hint, children }) {
  const id = useId();
  const child =
    children && typeof children === "object" && "type" in children
      ? cloneElement(children, { id: children.props.id || id })
      : children;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-900">
        {label}
      </label>
      {child}
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "w-full rounded-sm border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-400 focus:border-accent";

export function TextInput(props) {
  return <input type="text" className={inputClass} {...props} />;
}

export function TextArea({ rows = 4, ...props }) {
  return <textarea rows={rows} className={`${inputClass} resize-y leading-relaxed`} {...props} />;
}

export function Select({ options, ...props }) {
  return (
    <select className={inputClass} {...props}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-medium text-ink-800">
      <input
        type="checkbox"
        className="h-4 w-4 accent-[#b42318]"
        {...props}
      />
      {label}
    </label>
  );
}

export function Section({ title, children }) {
  return (
    <section className="rounded-lg border border-ink-100 bg-white p-5 shadow-[--shadow-card] sm:p-6">
      <h2 className="font-serif text-lg font-semibold text-ink-950">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function Button({ variant = "primary", ...props }) {
  const styles = {
    primary:
      "bg-ink-950 text-white hover:bg-accent disabled:opacity-50 disabled:hover:bg-ink-950",
    outline:
      "border border-ink-300 bg-white text-ink-900 hover:border-ink-950 hover:bg-ink-950 hover:text-white",
    danger:
      "border border-accent/30 bg-accent-soft text-accent-dark hover:bg-accent hover:text-white",
  };
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold transition-colors ${styles[variant]}`}
      {...props}
    />
  );
}

export function Status({ status }) {
  if (!status) return null;
  const ok =
    status.startsWith("Saved") ||
    status.startsWith("Uploaded") ||
    status.startsWith("Published") ||
    status.startsWith("Deleted") ||
    status.startsWith("Photo");
  return (
    <p
      role="status"
      className={`rounded-sm border px-4 py-2.5 text-sm font-medium ${
        ok
          ? "border-accent/30 bg-accent-soft text-accent-dark"
          : "border-accent bg-accent-soft text-accent-dark"
      }`}
    >
      {status}
    </p>
  );
}