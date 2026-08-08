/**
 * Build-only entry point.
 *
 * scripts/postbuild.mjs bundles this with esbuild and imports the result in
 * Node, so the static HTML it generates comes from the exact same modules the
 * browser uses. It deliberately re-exports nothing that touches the DOM.
 */
export {
  SITE_URL,
  SITE_NAME,
  LOCALE,
  DEFAULT_OG_IMAGE,
  CONTACT,
  PAGES,
  PAGE_BY_PATH,
  NOT_FOUND_SEO,
  canonicalFor,
} from "./config";

export { graphFor, organizationNode, websiteNode } from "./structuredData";
