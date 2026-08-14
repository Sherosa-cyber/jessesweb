import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import LocalImage from "../components/LocalImage.jsx";
import { site } from "../data/site.js";

function Timeline() {
  return (
    <ol className="relative space-y-10 border-l border-ink-200 pl-8">
      {site.experience.map((job) => (
        <li key={job.role} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-white"
          />
          <p className="text-xs font-bold uppercase tracking-widest text-accent">{job.period}</p>
          <h3 className="mt-2 font-serif text-xl font-semibold text-ink-950">{job.role}</h3>
          <p className="mt-1 text-sm font-medium text-ink-500">{job.org}</p>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-600">
            {job.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-300" />
                {point}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export default function About() {
  return (
    <>
      <Seo
        title={`About ${site.name}`}
        description={`${site.name} — biography, education, professional experience, awards and areas of specialisation.`}
      />

      <PageHeader
        eyebrow="About"
        title={`The person behind the byline`}
        description={`${site.role}. ${site.bioShort}`}
      />

      {/* Bio + portrait */}
      <section className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.5fr]">
        <figure className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rounded-lg border-2 border-accent/40 sm:-left-6 sm:-top-6"
          />
          <LocalImage
            src={site.portrait}
            alt={`Portrait of ${site.name}`}
            className="relative aspect-[4/5] w-full rounded-lg object-cover shadow-[--shadow-card-hover]"
          />
          <figcaption className="mt-4 text-xs text-ink-400">{site.portraitCaption}</figcaption>
        </figure>

        <div>
          <p className="eyebrow">Biography</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink-950">
            {site.name}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-600 sm:text-lg">
            {site.bioLong.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <SocialLinks items={site.socials} />
          </div>
        </div>
      </section>

      {/* Specialisations */}
      <section aria-labelledby="specialisations-title" className="border-t border-ink-100 bg-ink-50 py-14 sm:py-20">
        <div className="container-x">
          <p className="eyebrow mb-3">Areas of specialisation</p>
          <h2 id="specialisations-title" className="font-serif text-3xl font-semibold tracking-tight text-ink-950">
            The beats I know best
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {site.specialisations.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience + Education */}
      <section className="container-x grid gap-14 py-14 sm:py-20 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="eyebrow mb-3">Professional experience</p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink-950">
            Career in brief
          </h2>
          <div className="mt-10">
            <Timeline />
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3">Education</p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink-950">
            Academic background
          </h2>
          <div className="mt-10 space-y-6">
            {site.education.map((edu) => (
              <div key={edu.degree} className="rounded-lg border border-ink-100 bg-white p-6 shadow-[--shadow-card]">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">{edu.period}</p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-ink-950">{edu.degree}</h3>
                <p className="mt-1 text-sm text-ink-500">{edu.school}</p>
              </div>
            ))}
          </div>

          <p className="eyebrow mt-12 mb-3">Awards & achievements</p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink-950">
            Recognised work
          </h2>
          <ul className="mt-8 space-y-4">
            {site.awards.map((award) => (
              <li key={award.title} className="flex items-baseline gap-4 border-b border-ink-100 pb-4">
                <span className="font-serif text-xl font-bold text-accent">{award.year}</span>
                <div>
                  <p className="text-sm font-semibold text-ink-950">{award.title}</p>
                  <p className="text-xs text-ink-400">{award.org}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Organisations */}
      <section aria-labelledby="orgs-title" className="border-t border-ink-100 bg-ink-950 py-14 text-white sm:py-20">
        <div className="container-x">
          <p className="eyebrow mb-3">Publications & organisations</p>
          <h2 id="orgs-title" className="font-serif text-3xl font-semibold tracking-tight">
            Where the work has appeared
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {site.organisations.map((org) => (
              <li
                key={org}
                className="rounded-sm border border-white/15 px-5 py-2.5 font-serif text-lg text-ink-200"
              >
                {org}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-ink-300">
              Interested in commissioning work, collaboration or an interview? I'd love to
              hear from you.
            </p>
            <Link to="/contact" className="btn-primary shrink-0">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}