import Icons from "./Icons.jsx";

// Renders a row of social icon links. Takes the array from
// src/data/site.js. `variant` controls the style.
export default function SocialLinks({ items, variant = "default" }) {
  const styles = {
    default:
      "h-10 w-10 rounded-full border border-ink-200 text-ink-600 hover:border-ink-950 hover:bg-ink-950 hover:text-white",
    dark: "h-10 w-10 rounded-full border border-white/15 text-ink-300 hover:bg-accent hover:border-accent hover:text-white",
    text: "flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-accent",
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((s) => (
        <a
          key={s.platform}
          href={s.url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${s.platform} — ${s.handle}`}
          className={`inline-flex items-center justify-center transition-colors duration-200 ${styles[variant]}`}
        >
          {variant === "text" ? (
            <>
              <PlatformIcon platform={s.platform} className="h-4 w-4 shrink-0" />
              <span>{s.platform}</span>
            </>
          ) : (
            <PlatformIcon platform={s.platform} className="h-4.5 w-4.5" />
          )}
        </a>
      ))}
    </div>
  );
}

function PlatformIcon({ platform, className }) {
  const Component = Icons[platform] || Icons.Mail;
  return <Component className={className} />;
}