# jessesweb — Jesse Brooks, Journalist

A modern, professional personal website and portfolio for investigative journalist **Jesse Brooks**. Clean editorial design, fully responsive, no backend required.

## Tech stack

- **React 19** + **Vite 6**
- **React Router 7** (client-side routing)
- **Tailwind CSS 4** (`@tailwindcss/vite` + `@tailwindcss/typography`)
- Newsreader (serif headlines) + Inter (sans body) from Google Fonts
- Local images in `public/images` — zero external image dependencies

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
| `/*`                   | Custom 404 page                 |

## Where to personalise

| What                      | File                                              |
| ------------------------- | ------------------------------------------------- |
| Name, bio, photo, socials, education, awards | `src/data/site.js`  |
| Articles & article text   | `src/data/articles.js`        |
| Portfolio items           | `src/data/portfolio.js`       |
| Media appearances         | `src/data/media.js`           |
| Photos                    | Replace files in `public/images/` (same filenames) |
| Contact form backend      | `src/pages/Contact.jsx` (form is front-end only)   |

To add an article: copy any object in `src/data/articles.js`, give it a unique `slug`, and add it to the array — it appears everywhere automatically.

## Tests

The site ships with two headless-browser smoke tests (Playwright-core + system Edge, no downloads):

```bash
node scripts/smoke-test.mjs        # every route renders without console errors
node scripts/interaction-test.mjs  # filters, search, forms, menus, nav links
```

Both spin up `vite preview` on port 4173 automatically.

## Deployment

Build with `npm run build` and host the `dist/` folder on any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Add an SPA fallback/rewrite so `/articles/...` deep links serve `index.html`.