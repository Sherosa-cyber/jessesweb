import { useEffect, useState } from "react";
import { readFile, writeFile } from "./gh.js";
import {
  Field,
  TextInput,
  TextArea,
  Section,
  Button,
  Status,
  inputClass,
} from "./fields.jsx";

const FILE = "src/data/site.json";

const platforms = ["X", "Facebook", "Instagram", "LinkedIn", "YouTube", "WhatsApp", "RSS"];

export default function SiteEditor({ token }) {
  const [siteData, setSiteData] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const file = await readFile(FILE, token);
        setSiteData(JSON.parse(file.content));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [token]);

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!siteData) return <p className="text-sm text-ink-400">Loading site settings…</p>;

  const set = (key) => (e) =>
    setSiteData((s) => ({ ...s, [key]: e.target.value }));

  const setLineArray = (key) => (e) =>
    setSiteData((s) => ({
      ...s,
      [key]: e.target.value.split("\n").map((l) => l.trim()).filter(Boolean),
    }));

  const save = async () => {
    setSaving(true);
    try {
      await writeFile(
        FILE,
        JSON.stringify(siteData, null, 2) + "\n",
        "Update site settings",
        token
      );
      setStatus("Saved — your changes are live on this device.");
    } catch (e) {
      setError(e.message);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-500">
          Your name, biography, social links, contact details and more.
        </p>
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save all changes"}</Button>
      </div>

      {status && <Status status={status} />}
      {error && <p role="alert" className="mb-4 text-sm font-medium text-accent">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Identity">
          <Field label="Your name">
            <TextInput value={siteData.name} onChange={set("name")} />
          </Field>
          <Field label="First name">
            <TextInput value={siteData.firstName} onChange={set("firstName")} />
          </Field>
          <Field label="Publication name (shown in the header/footer)">
            <TextInput value={siteData.publication} onChange={set("publication")} />
          </Field>
          <Field label="Role / title">
            <TextInput value={siteData.role} onChange={set("role")} />
          </Field>
          <Field label="Tagline" hint="One-liner used on the homepage, footer and search results.">
            <TextArea rows={2} value={siteData.tagline} onChange={set("tagline")} />
          </Field>
          <Field label="Hero headline">
            <TextArea rows={2} value={siteData.heroHeadline} onChange={set("heroHeadline")} />
          </Field>
        </Section>

        <Section title="Biography">
          <Field label="Short bio" hint="Shown on the homepage and in author boxes.">
            <TextArea rows={4} value={siteData.bioShort} onChange={set("bioShort")} />
          </Field>
          <Field label="Full biography" hint="One paragraph per line — used on the About page.">
            <TextArea rows={6} value={(siteData.bioLong || []).join("\n")} onChange={setLineArray("bioLong")} />
          </Field>
        </Section>

        <Section title="Photo & contact">
          <Field label="Portrait path" hint="Upload a new photo in the Photos tab, then paste its path here.">
            <TextInput value={siteData.portrait} onChange={set("portrait")} />
          </Field>
          <Field label="Portrait caption">
            <TextInput value={siteData.portraitCaption} onChange={set("portraitCaption")} />
          </Field>
          <Field label="Email">
            <TextInput value={siteData.email} onChange={set("email")} />
          </Field>
          <Field label="Location">
            <TextInput value={siteData.location} onChange={set("location")} />
          </Field>
          <Field label="Response note">
            <TextArea rows={2} value={siteData.responseNote} onChange={set("responseNote")} />
          </Field>
          <Field label="Availability">
            <TextArea rows={2} value={siteData.availability} onChange={set("availability")} />
          </Field>
        </Section>

        <Section title="Social media">
          <div className="space-y-3">
            {(siteData.socials || []).map((social, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="grid flex-1 grid-cols-[1fr_2fr] gap-3">
                  <select
                    className={inputClass}
                    value={social.platform}
                    onChange={(e) =>
                      setSiteData((s) => {
                        const socials = [...s.socials];
                        socials[i] = { ...socials[i], platform: e.target.value };
                        return { ...s, socials };
                      })
                    }
                  >
                    {platforms.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <TextInput
                    value={social.url}
                    placeholder="https://…"
                    onChange={(e) =>
                      setSiteData((s) => {
                        const socials = [...s.socials];
                        socials[i] = { ...socials[i], url: e.target.value };
                        return { ...s, socials };
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSiteData((s) => ({ ...s, socials: s.socials.filter((_, j) => j !== i) }))
                  }
                  className="mt-1 text-xs font-medium text-accent hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setSiteData((s) => ({ ...s, socials: [...(s.socials || []), { platform: "X", url: "" }] }))
              }
            >
              + Add social link
            </Button>
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-3">
            {(siteData.education || []).map((edu, i) => (
              <div key={i} className="space-y-3 rounded-md border border-ink-100 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                    Entry {i + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setSiteData((s) => ({ ...s, education: s.education.filter((_, j) => j !== i) }))
                    }
                    className="text-xs font-medium text-accent hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <Field label="Degree">
                  <TextInput
                    value={edu.degree}
                    onChange={(e) =>
                      setSiteData((s) => {
                        const education = [...s.education];
                        education[i] = { ...education[i], degree: e.target.value };
                        return { ...s, education };
                      })
                    }
                  />
                </Field>
                <Field label="School">
                  <TextInput
                    value={edu.school}
                    onChange={(e) =>
                      setSiteData((s) => {
                        const education = [...s.education];
                        education[i] = { ...education[i], school: e.target.value };
                        return { ...s, education };
                      })
                    }
                  />
                </Field>
                <Field label="Period (e.g. 2012 – 2013)">
                  <TextInput
                    value={edu.period}
                    onChange={(e) =>
                      setSiteData((s) => {
                        const education = [...s.education];
                        education[i] = { ...education[i], period: e.target.value };
                        return { ...s, education };
                      })
                    }
                  />
                </Field>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setSiteData((s) => ({ ...s, education: [...(s.education || []), { degree: "", school: "", period: "" }] }))
              }
            >
              + Add education entry
            </Button>
          </div>
        </Section>

        <Section title="Experience">
          <div className="space-y-3">
            {(siteData.experience || []).map((job, i) => (
              <div key={i} className="space-y-3 rounded-md border border-ink-100 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                    Entry {i + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setSiteData((s) => ({ ...s, experience: s.experience.filter((_, j) => j !== i) }))
                    }
                    className="text-xs font-medium text-accent hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                <Field label="Role">
                  <TextInput
                    value={job.role}
                    onChange={(e) =>
                      setSiteData((s) => {
                        const experience = [...s.experience];
                        experience[i] = { ...experience[i], role: e.target.value };
                        return { ...s, experience };
                      })
                    }
                  />
                </Field>
                <Field label="Organisation">
                  <TextInput
                    value={job.org}
                    onChange={(e) =>
                      setSiteData((s) => {
                        const experience = [...s.experience];
                        experience[i] = { ...experience[i], org: e.target.value };
                        return { ...s, experience };
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Period (e.g. 2018 – 2022)">
                <TextInput
                  value={job.period}
                  onChange={(e) =>
                    setSiteData((s) => {
                      const experience = [...s.experience];
                      experience[i] = { ...experience[i], period: e.target.value };
                      return { ...s, experience };
                    })
                  }
                />
              </Field>
              <Field label="Key points" hint="One per line">
                <TextArea
                  rows={3}
                  value={(job.points || []).join("\n")}
                  onChange={(e) =>
                    setSiteData((s) => {
                      const experience = [...s.experience];
                      experience[i] = {
                        ...experience[i],
                        points: e.target.value.split("\n").map((l) => l.trim()).filter(Boolean),
                      };
                      return { ...s, experience };
                    })
                  }
                />
              </Field>
            </div>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setSiteData((s) => ({
                  ...s,
                  experience: [...(s.experience || []), { role: "", org: "", period: "", points: [] }],
                }))
              }
            >
              + Add experience entry
            </Button>
          </div>
        </Section>

        <Section title="Specialisations, awards & publications">
          <Field label="Specialisations" hint="One per line">
            <TextArea rows={4} value={(siteData.specialisations || []).join("\n")} onChange={setLineArray("specialisations")} />
          </Field>
          <Field label="Awards" hint="Format: year | title | organisation — one per line">
            <TextArea
              rows={4}
              value={(siteData.awards || []).map((a) => `${a.year} | ${a.title} | ${a.org}`).join("\n")}
              onChange={(e) =>
                setSiteData((s) => ({
                  ...s,
                  awards: e.target.value
                    .split("\n")
                    .map((l) => {
                      const [year, title, org] = l.split("|").map((p) => p.trim());
                      return year || title ? { year: year || "", title: title || "", org: org || "" } : null;
                    })
                    .filter(Boolean),
                }))
              }
            />
          </Field>
          <Field label="Publications / organisations worked with" hint="One per line">
            <TextArea rows={4} value={(siteData.organisations || []).join("\n")} onChange={setLineArray("organisations")} />
          </Field>
        </Section>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save all changes"}</Button>
      </div>
    </div>
  );
}