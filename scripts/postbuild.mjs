/**
 * Post-build SEO step.
 *
 * Vite emits a single index.html. A crawler that does not execute JavaScript
 * would therefore see the home page's title, description, canonical and OG tags
 * on every URL — the classic SPA failure mode where five of six pages are
 * effectively invisible in search results and every WhatsApp or LinkedIn share
 * shows the wrong preview.
 *
 * This script fixes that without touching the runtime app or the design: for
 * each route it writes a copy of index.html with that route's metadata and
 * JSON-LD baked into the static markup. The JS bundle referenced by every copy
 * is identical, so the app boots and behaves exactly as before; the only
 * difference is what a non-JS client sees first.
 *
 * sitemap.xml is generated from the same source of truth, so it can never drift
 * from the pages that actually exist.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = join(root, "dist");

/**
 * Load the app's own SEO modules in Node.
 *
 * These are the exact same files the browser bundle imports, so the static
 * metadata written here and the metadata <Seo /> sets at runtime cannot
 * disagree. esbuild bundles them into one throwaway ESM module in memory.
 */
async function loadSeoModules() {
  const result = await build({
    entryPoints: [join(root, "src/seo/entry.build.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent",
  });
  const code = result.outputFiles[0].text;
  return import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
}

const { SITE_URL, SITE_NAME, LOCALE, DEFAULT_OG_IMAGE, PAGES, canonicalFor, graphFor } =
  await loadSeoModules();

// ── HTML generation ─────────────────────────────────────────────────────────

const escapeAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Stops a stray "</script>" inside JSON-LD from terminating the block early. */
const escapeJsonLd = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

function headFor(page) {
  const canonical = canonicalFor(page.path);
  const image = page.ogImage ? `${SITE_URL}${page.ogImage}` : DEFAULT_OG_IMAGE;
  const ogAlt = `${SITE_NAME} — ${page.breadcrumb ?? "Event management in Hyderabad"}`;

  return [
    `<title>${escapeAttr(page.title)}</title>`,
    `<meta name="description" content="${escapeAttr(page.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta property="og:type" content="${page.path === "/" ? "website" : "article"}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="${LOCALE}" />`,
    `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(ogAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json" data-seo-id="graph">${escapeJsonLd(graphFor(page))}</script>`,
  ].join("\n    ");
}

const template = readFileSync(join(dist, "index.html"), "utf8");

const MARKER = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/;
if (!MARKER.test(template)) {
  throw new Error(
    "dist/index.html has no SEO:START/SEO:END marker block. index.html was edited without updating scripts/postbuild.mjs.",
  );
}

/**
 * Route -> file inside dist. "/" is index.html; every other route gets
 * directory-style output (/about/index.html) so the clean URL resolves even if
 * the server does no rewriting at all.
 */
function outputPathFor(routePath) {
  if (routePath === "/") return join(dist, "index.html");
  return join(dist, routePath.replace(/^\//, ""), "index.html");
}

/**
 * Always substitute via a replacer function, never a replacement string.
 * String.replace treats $$, $&, $` and $' in a replacement *string* as special,
 * which silently corrupted "priceRange":"$$" into "$" the first time this ran.
 */
const injectHead = (html, headHtml) =>
  html.replace(MARKER, () => `<!-- SEO:START -->\n    ${headHtml}\n    <!-- SEO:END -->`);

let written = 0;
for (const page of PAGES) {
  const html = injectHead(template, headFor(page));
  const out = outputPathFor(page.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  written++;
  console.log(`  seo  ${page.path.padEnd(18)} -> ${out.slice(dist.length + 1)}`);
}

// 404 document for the server's ErrorDocument directive. noindex keeps it out
// of the index; "follow" still lets crawlers use the links on it.
const notFoundHtml = injectHead(
  template,
  [
    `<title>Page Not Found | ${SITE_NAME}</title>`,
    `<meta name="description" content="The page you were looking for does not exist. Explore XYZconcepts' event management services in Hyderabad instead." />`,
    `<meta name="robots" content="noindex, follow" />`,
  ].join("\n    "),
);
writeFileSync(join(dist, "404.html"), notFoundHtml);
console.log(`  seo  404                -> 404.html`);

// ── sitemap.xml ─────────────────────────────────────────────────────────────

const epoch = process.env.SOURCE_DATE_EPOCH
  ? new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000)
  : new Date();
const lastmod = epoch.toISOString().slice(0, 10);

const priorityOf = (p) => (p === "/" ? "1.0" : p === "/contact" ? "0.9" : "0.8");
const changefreqOf = (p) => (p === "/portfolio" ? "monthly" : "yearly");

const sitemapXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  PAGES.map(
    (p) =>
      `  <url>\n` +
      `    <loc>${canonicalFor(p.path)}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${changefreqOf(p.path)}</changefreq>\n` +
      `    <priority>${priorityOf(p.path)}</priority>\n` +
      `  </url>`,
  ).join("\n") +
  `\n</urlset>\n`;

writeFileSync(join(dist, "sitemap.xml"), sitemapXml);
console.log(`  seo  sitemap.xml        -> sitemap.xml (${PAGES.length} urls)`);

// ── checks ──────────────────────────────────────────────────────────────────
// These run on every build so a future content edit cannot silently ship a
// truncated title, a missing canonical, or a sitemap pointing at nothing.

const failures = [];
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const page of PAGES) {
  const html = readFileSync(outputPathFor(page.path), "utf8");

  if (!html.includes(`<link rel="canonical" href="${canonicalFor(page.path)}"`))
    failures.push(`${page.path}: canonical missing or wrong`);
  if (!html.includes(escapeAttr(page.description)))
    failures.push(`${page.path}: description not present in output`);
  if (!html.includes('type="application/ld+json"'))
    failures.push(`${page.path}: JSON-LD missing`);

  if (page.title.length > 65)
    failures.push(`${page.path}: title is ${page.title.length} chars (>65 truncates in results)`);
  if (page.description.length > 165)
    failures.push(`${page.path}: description is ${page.description.length} chars (>165 truncates)`);
  if (page.description.length < 110)
    failures.push(`${page.path}: description is ${page.description.length} chars (<110 wastes snippet space)`);

  if (seenTitles.has(page.title))
    failures.push(`${page.path}: duplicate title, same as ${seenTitles.get(page.title)}`);
  seenTitles.set(page.title, page.path);

  if (seenDescriptions.has(page.description))
    failures.push(`${page.path}: duplicate description, same as ${seenDescriptions.get(page.description)}`);
  seenDescriptions.set(page.description, page.path);
}

for (const required of ["robots.txt", "opengraph.jpg", "favicon.svg", "site.webmanifest"]) {
  if (!existsSync(join(dist, required))) failures.push(`${required} missing from dist`);
}

// Hosting config lives at the repo root, not in dist, but a build that produced
// no routing rules would silently ship broken redirects and caching.
if (!existsSync(join(root, "vercel.json"))) failures.push("vercel.json missing from the repo root");

const robots = existsSync(join(dist, "robots.txt")) ? readFileSync(join(dist, "robots.txt"), "utf8") : "";
if (robots && !robots.includes(`${SITE_URL}/sitemap.xml`))
  failures.push("robots.txt does not point at the sitemap");

if (failures.length) {
  console.error("\nSEO post-build checks FAILED:");
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log(`\n  ✓ ${written} routes + 404 + sitemap written; all SEO checks passed\n`);
void pathToFileURL;
