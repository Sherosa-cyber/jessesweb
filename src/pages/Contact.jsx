import { useState } from "react";
import Seo from "../components/Seo.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import Icons from "../components/Icons.jsx";
import { site } from "../data/site.js";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (form.message.trim().length < 20)
      next.message = "Please write a message of at least 20 characters.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  };

  const field = (name) => ({
    value: form[name],
    onChange: (e) => {
      setForm((f) => ({ ...f, [name]: e.target.value }));
      if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    },
  });

  const inputClass = (hasError) =>
    `w-full rounded-sm border bg-white px-4 py-3 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-400 focus:border-accent ${
      hasError ? "border-accent" : "border-ink-200"
    }`;

  return (
    <>
      <Seo
        title={`Contact ${site.name}`}
        description={`Get in touch with ${site.name} — commissions, interviews, speaking engagements and media enquiries.`}
      />

      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description={site.availability}
      />

      <section className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.6fr_1fr]">
        {/* Form */}
        <div>
          {sent ? (
            <div className="flex h-full flex-col items-start justify-center rounded-lg border border-accent/30 bg-accent-soft px-8 py-16">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
                <Icons.Check className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-serif text-3xl font-semibold text-ink-950">
                Message sent
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink-600">
                Thank you for getting in touch, {form.name.split(" ")[0] || "friend"}. I read
                every message personally and will reply to{" "}
                <span className="font-semibold">{form.email}</span> within two working days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setSent(false);
                }}
                className="btn-outline mt-8"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-ink-900">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className={inputClass(!!errors.name)}
                    {...field("name")}
                  />
                  {errors.name && <p className="mt-2 text-xs font-medium text-accent">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-ink-900">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass(!!errors.email)}
                    {...field("email")}
                  />
                  {errors.email && <p className="mt-2 text-xs font-medium text-accent">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold text-ink-900">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Commission, interview, collaboration…"
                  className={inputClass(!!errors.subject)}
                  {...field("subject")}
                />
                {errors.subject && <p className="mt-2 text-xs font-medium text-accent">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-ink-900">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="Tell me what you have in mind…"
                  className={`${inputClass(!!errors.message)} resize-y`}
                  {...field("message")}
                />
                {errors.message && <p className="mt-2 text-xs font-medium text-accent">{errors.message}</p>}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button type="submit" className="btn-primary">
                  <Icons.Send className="h-4 w-4" />
                  Send message
                </button>
                <p className="text-xs text-ink-400">
                  This form is a working prototype — connect it to your email service (e.g.
                  Formspree) in <code className="rounded bg-ink-100 px-1.5 py-0.5">src/pages/Contact.jsx</code>.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Contact info */}
        <aside className="space-y-6">
          <div className="rounded-lg border border-ink-100 bg-ink-50 p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Direct</p>
            <ul className="mt-5 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-[--shadow-card]">
                  <Icons.Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-ink-900">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink-500 transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-[--shadow-card]">
                  <Icons.MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-ink-900">Location</p>
                  <p className="text-ink-500">{site.location}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-ink-100 bg-ink-50 p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Elsewhere</p>
            <div className="mt-5">
              <SocialLinks items={site.socials} />
            </div>
          </div>

          <div className="rounded-lg border border-ink-100 bg-ink-950 p-7 text-white">
            <p className="font-serif text-xl font-semibold">Response time</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">{site.responseNote}</p>
          </div>
        </aside>
      </section>
    </>
  );
}