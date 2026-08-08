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
outside 110–165 characters, missing JSON-LD, or if `robots.txt`, `.htaccess`,
`favicon.svg` or `opengraph.jpg` did not reach `dist/`.

---

## Deployment

Hostinger shared hosting, served from `public_html`.

`main` holds the source. GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) builds every
push to `main` and force-pushes `dist/` to the **`deploy`** branch. Hostinger's
Git integration is pointed at `deploy`, so that branch *is* the web root.

Never commit to `deploy` by hand — it is overwritten on every build.

[`public/.htaccess`](public/.htaccess) ships with the build and handles the
canonical host (HTTPS, non-www), clean URLs without redirect hops, compression,
cache headers, security headers and the 404 document.

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
