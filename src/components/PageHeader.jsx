// Shared page header for interior pages (Articles, Portfolio, etc.)
export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="border-b border-ink-100 bg-ink-50">
      <div className="container-x py-14 sm:py-20">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}