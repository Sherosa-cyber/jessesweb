// Consistent section heading: optional eyebrow + serif title +
// optional description, with an optional "view all" link.
export default function SectionHeading({
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel = "View all",
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-base text-ink-500">{description}</p>}
      </div>
      {linkTo && (
        <a
          href={linkTo}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
        >
          {linkLabel}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      )}
    </div>
  );
}