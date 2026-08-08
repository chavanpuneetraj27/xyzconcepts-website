import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  LOCALE,
  SITE_NAME,
  SITE_URL,
  canonicalFor,
  type PageSeo,
} from "./config";
import { graphFor } from "./structuredData";

/**
 * Applies a route's SEO metadata to <head>.
 *
 * The build step (scripts/postbuild.mjs) already writes correct static tags into
 * each route's HTML file, so a crawler that does not run JS still sees them.
 * This component keeps the tags correct during client-side navigation, and is
 * what social-preview scrapers that do run JS will observe.
 *
 * Every tag it manages is marked data-seo so it can be replaced idempotently
 * rather than accumulating duplicates across navigations.
 */

const MANAGED = "data-seo";

function upsertMeta(key: "name" | "property", value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, value);
    el.setAttribute(MANAGED, "");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(MANAGED, "");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function Seo({ page, noindex = false }: { page: PageSeo; noindex?: boolean }) {
  useEffect(() => {
    const canonical = canonicalFor(page.path);
    const image = page.ogImage ? `${SITE_URL}${page.ogImage}` : DEFAULT_OG_IMAGE;

    document.title = page.title;

    upsertMeta("name", "description", page.description);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    upsertLink("canonical", canonical);

    // Open Graph — controls WhatsApp, LinkedIn and Facebook link previews.
    upsertMeta("property", "og:type", page.path === "/" ? "website" : "article");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", LOCALE);
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", `${SITE_NAME} — ${page.breadcrumb ?? "Event management in Hyderabad"}`);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);
    upsertMeta("name", "twitter:image", image);

    if (!noindex) {
      upsertJsonLd("graph", graphFor(page));
    }
  }, [page, noindex]);

  return null;
}
