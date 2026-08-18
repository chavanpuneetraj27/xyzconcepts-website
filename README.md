# XYZconcepts — website

Marketing site for [XYZconcepts](https://xyzconcepts.com), an event management
and event design company in Hyderabad, India.

React 19 + Vite + Tailwind v4 + Framer Motion, routed with Wouter. Pure static
output — no backend, no database.

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

```bash
pnpm build        # type check is separate; this builds + runs the SEO step
pnpm preview      # serve dist/ locally
pnpm typecheck
```

---

## How SEO is handled

The site is a client-rendered SPA, which normally means every URL serves the
same `index.html` — so five of the six pages would show the home page's title,
description and social preview to anything that does not run JavaScript. Three
pieces prevent that.

### 1. One source of truth

[`src/seo/config.ts`](src/seo/config.ts) holds the domain, the business details
and the title/description/keywords for every route.
[`src/seo/structuredData.ts`](src/seo/structuredData.ts) builds the schema.org
JSON-LD graph from the same data.

**To change a page title, description or the phone number, edit only
`src/seo/config.ts`.** Everything else derives from it.

### 2. Runtime — `<Seo />`

[`src/seo/Seo.tsx`](src/seo/Seo.tsx) is mounted per route in `App.tsx`. It keeps
the head tags correct during client-side navigation, updating tags in place
rather than appending duplicates.

### 3. Build time — pre-rendered route shells

[`scripts/postbuild.mjs`](scripts/postbuild.mjs) runs after `vite build`. For
each route it writes a copy of `index.html` with that route's metadata and
JSON-LD baked into the static markup:

```
dist/index.html                    /
dist/corporate-events/index.html   /corporate-events
dist/social-events/index.html      /social-events
dist/portfolio/index.html          /portfolio
dist/about/index.html              /about
dist/contact/index.html            /contact
dist/404.html                      unknown URLs (noindex)
dist/sitemap.xml                   generated from config.ts
```

Every copy loads the same JS bundle, so the app behaves identically. The only
difference is what a crawler sees before any JavaScript runs.

The script imports the real `src/seo/*` modules through esbuild, so the static
HTML and the runtime tags cannot drift apart.

### Build-time guardrails

`pnpm build` **fails** if any route has a missing or wrong canonical, a
duplicated title or description, a title over 65 characters, a description
outside 110–165 characters, missing JSON-LD, or if `robots.txt`, `favicon.svg`,
`opengraph.jpg` or `site.webmanifest` did not reach `dist/`.

Note that `vercel.json` must contain no `//` comment keys. Vercel's config
schema rejects unknown properties and the deployment fails outright.

---

## Deployment

**Vercel**, building directly from `main`. Push to `main` and Vercel builds and
deploys; pull requests get their own preview URL. There is no publish branch and
no deploy step to run by hand.

[`vercel.json`](vercel.json) holds the hosting config: clean URLs, the
`www` → apex redirect, cache headers and security headers. Vercel serves HTTPS
itself, so unlike the Apache setup this replaced there is no HTTPS redirect rule.

`dist/404.html` is served with a real 404 status for unknown paths — deliberately
not a rewrite to the SPA shell, which would produce a soft 404.

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) type checks and builds on
every push and PR. It publishes nothing; it exists so a broken build or a
regressed SEO invariant is caught independently of Vercel.

### Domain

`xyzconcepts.com` is registered at Hostinger and resolves via Hostinger DNS;
only the records point at Vercel. Both the apex and `www` must be added as
domains in the Vercel project, with the apex primary — the redirect in
`vercel.json` only fires for requests that actually reach the project.

Changing the canonical hostname means editing three places: `SITE_URL` in
`src/seo/config.ts`, the redirect in `vercel.json`, and the Vercel domain
settings.

### pnpm version

`packageManager` is deliberately **not** pinned in `package.json`. Vercel's
builder does not recognise pnpm 11 and fails the install if it is pinned there.
The lockfile (`lockfileVersion: 9.0`) is what actually pins dependency versions.
`pnpm-workspace.yaml` carries both `allowBuilds` (pnpm 11) and
`onlyBuiltDependencies` (pnpm 9/10) so esbuild and sharp compile on any of them.

---

## Notes for whoever edits this next

- **Images.** Imports go through `vite-imagetools`. Always add a query string:
  `import x from "@assets/foo.png?w=800&format=webp&quality=82"`. Without it the
  original file ships as-is — that mistake once put ~13 MB of raw PNGs on the
  portfolio page. Extensions must be lowercase; `.JPG` silently skips
  processing.
- **One `<h1>` per page.** Hero headings that render as several visual lines use
  one `<h1>` containing `<span>` elements, not one `<h1>` per line.
- **Adding a page** means: a route in `App.tsx`, an entry in
  `src/seo/config.ts`, and a link somewhere in `Navbar.tsx` or `Footer.tsx`.
  The sitemap and the pre-rendered shell follow automatically.
- **`index.html`** contains a `<!-- SEO:START -->` / `<!-- SEO:END -->` block.
  The build replaces everything between those markers per route; the build
  throws if they are missing.
