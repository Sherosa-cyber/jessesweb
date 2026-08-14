# The Parakuo Ledger — Jesse Parakuo

A modern, professional personal website and portfolio for investigative journalist **Jesse Parakuo**. Clean editorial design, fully responsive, no backend required.

## Tech stack

- **React 19** + **Vite 6**
- **React Router 7** (client-side routing)
- **Tailwind CSS 4** (`@tailwindcss/vite` + `@tailwindcss/typography`)
- Newsreader (serif headlines) + Inter (sans body) from Google Fonts
- Local images in `public/images` — zero external image dependencies
- Built-in admin panel at `/admin` (GitHub Contents API — no third-party services)

## Getting started

```bash
npm install
npm run dev       # local development
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Pages

| Route                  | Page                            |
| ---------------------- | ------------------------------- |
| `/`                    | Home (hero, featured, latest, topics, newsletter) |
| `/articles`            | Archive with category filters + search |
| `/articles/:slug`      | Individual article (share, related, prev/next) |
| `/portfolio`           | Selected work by discipline     |
| `/media`               | Interviews, podcasts, videos    |
| `/about`               | Biography, experience, awards   |
| `/contact`             | Contact form + details          |
| `/admin`               | Built-in content editor         |
| `/*`                   | Custom 404 page                 |

## Admin panel (no-code editing)

The whole site — articles, site settings, portfolio, media, and photo uploads — can be
edited in the browser at **`/admin`** (e.g. `https://sherosa-cyber.github.io/jessesweb/admin`).

### One-time setup: create a GitHub token

1. Go to **github.com → Settings → Developer settings → Fine-grained personal access tokens → Generate new token**.
2. Repository access: **Only select repositories → `jessesweb`**.
3. Permissions → **Contents**: set to **Read and write** (this is the only permission needed).
4. Click **Generate token** and copy the value that starts with `github_pat_`.
5. Open the site's `/admin` page, paste the token, and click **Connect**.

The token is stored **only in your browser** (localStorage on the device you use) — it is
never sent anywhere except GitHub's API, and it can be revoked at any time.

### Using the tabs

- **Articles** — add, edit, or delete articles. Body text uses a simple format: blank line
  between paragraphs, `## Heading`, `### Sub-heading`, `> Quote` (+ `> — Name` for the
  source), `- bullet`, and `![Caption](images/photo.jpg)` for images. New articles appear
  on the site automatically; they need an `images/...` photo.
- **Site settings** — name, publication, bio, portrait, social links, contact details,
  education, experience, awards, and more.
- **Portfolio** — add/edit/delete portfolio pieces.
- **Media** — add/edit/delete appearances (video, podcast, TV, radio, print).
- **Photos** — upload photos straight from your computer; they land in `public/images`
  and give you a ready-to-paste path like `images/my-photo.jpg`.

**Note:** after saving, the live site updates automatically within ~2 minutes (GitHub
Actions rebuild).

## Where to personalise (if editing files directly)

| What                      | File                                              |
| ------------------------- | ------------------------------------------------- |
| Name, bio, photo, socials, education, awards | `src/data/site.json` |
| Articles & article text   | `src/data/articles.json`        |
| Portfolio items           | `src/data/portfolio.json`       |
| Media appearances         | `src/data/media.json`           |
| Photos                    | Replace files in `public/images/` (same filenames) |
| Contact form backend      | `src/pages/Contact.jsx` (form is front-end only)   |

To add an article: copy any object in `src/data/articles.json`, give it a unique `slug`,
and add it to the array — it appears everywhere automatically.

## Tests

The site ships with two headless-browser smoke tests (Playwright-core + system Edge, no downloads):

```bash
node scripts/smoke-test.mjs        # every route renders without console errors
node scripts/interaction-test.mjs  # filters, search, forms, menus, nav links
```

Both spin up `vite preview` on port 4173 automatically.

## Deployment

**GitHub Pages (automated):** pushing to `main` triggers `.github/workflows/deploy.yml`,
which builds the site and publishes it via GitHub Actions. The live URL is:

- **https://sherosa-cyber.github.io/jessesweb/**

The site is configured for the `/jessesweb/` subpath (`vite.config.js` base + React Router
`basename`), and `public/404.html` provides an SPA fallback so deep links
(`/articles/...`) work after a refresh. Local `npm run dev` stays on the root (`/`).

For any other static host (Netlify, Vercel, Cloudflare Pages): build with `npm run build`
and add an SPA rewrite so unknown routes serve `index.html`.
