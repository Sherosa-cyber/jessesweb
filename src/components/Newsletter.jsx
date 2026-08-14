import { useState } from "react";

// Newsletter subscription UI (front-end only — no backend required).
// Wire up the "success" behaviour to your email service later if needed.
export default function Newsletter({ dark = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("success");
    setError("");
  };

  const container =
    dark
      ? "bg-ink-950 text-white"
      : "border border-ink-100 bg-ink-50 text-ink-950";

  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className={`py-16 sm:py-20 ${container}`}>
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Newsletter</p>
          <h2 id="newsletter-title" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            The Week, in writing
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${dark ? "text-ink-300" : "text-ink-500"}`}>
            One carefully written email every Friday: what I'm reporting on, what I've
            learned, and the stories that deserve your attention. No noise, ever.
          </p>

          {status === "success" ? (
            <div
              role="status"
              className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-sm border border-accent/30 bg-accent-soft px-6 py-4 text-sm font-medium text-accent-dark"
            >
              <span aria-hidden="true">✓</span>
              You're on the list — see you Friday.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Your email address"
                  className={`w-full rounded-sm border px-4 py-3 text-sm outline-none transition-colors focus:border-accent ${
                    dark
                      ? "border-white/15 bg-white/5 text-white placeholder:text-ink-400"
                      : "border-ink-200 bg-white text-ink-950 placeholder:text-ink-400"
                  }`}
                />
                <button
                  type="submit"
                  className="btn-primary shrink-0 justify-center"
                >
                  Subscribe
                </button>
              </div>
              {status === "error" && (
                <p role="alert" className="mt-3 text-sm font-medium text-accent">
                  {error}
                </p>
              )}
            </form>
          )}

          <p className={`mt-6 text-xs ${dark ? "text-ink-400" : "text-ink-400"}`}>
            Unsubscribe at any time. No spam — that would be a poor way to start a relationship.
          </p>
        </div>
      </div>
    </section>
  );
}