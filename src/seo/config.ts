/**
 * Single source of truth for all SEO metadata.
 *
 * This file is consumed twice:
 *  1. At runtime by <Seo /> to set document head tags per route.
 *  2. At build time by scripts/postbuild.mjs to generate a static HTML shell
 *     per route (so crawlers get correct metadata without executing JS) plus
 *     sitemap.xml.
 *
 * Keep it dependency-free and side-effect free so Node can import it directly.
 */

export const SITE_URL = "https://xyzconcepts.com";
export const SITE_NAME = "XYZconcepts";
export const LEGAL_NAME = "XYZconcepts";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;
export const LOCALE = "en_IN";

export const CONTACT = {
  email: "connect@xyzconcepts.com",
  phones: ["+91 90633 77915", "+91 74163 77915"],
  phonesE164: ["+919063377915", "+917416377915"],
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  countryName: "India",
  latitude: 17.385,
  longitude: 78.4867,
  instagram: "https://instagram.com/xyz.concepts",
  instagramSocial: "https://instagram.com/xyzconcepts.social",
  whatsapp: "https://wa.me/919063377915",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
  ],
} as const;

export type PageSeo = {
  /** Route path, exactly as registered in the router. */
  path: string;
  /** <title> — kept under ~60 chars so it is not truncated in results. */
  title: string;
  /** meta description — kept in the 140–160 char band. */
  description: string;
  /** Primary keyword cluster this page targets. Used for internal review. */
  keywords: string[];
  /** Breadcrumb label; omitted for the home page. */
  breadcrumb?: string;
  /** Optional page-specific OG image path, relative to the site root. */
  ogImage?: string;
};

export const PAGES: PageSeo[] = [
  {
    path: "/",
    title: "XYZconcepts | Event Management Company in Hyderabad",
    description:
      "XYZconcepts is a Hyderabad-based event management company designing corporate events, weddings and brand activations. 300+ events delivered across 10+ cities.",
    keywords: [
      "event management company hyderabad",
      "event planners hyderabad",
      "corporate event organisers hyderabad",
      "wedding planners hyderabad",
    ],
  },
  {
    path: "/corporate-events",
    title: "Corporate Event Management in Hyderabad | XYZconcepts",
    description:
      "Conferences, summits, annual days, town halls and product launches planned and executed end to end in Hyderabad and across India by XYZconcepts.",
    keywords: [
      "corporate event management hyderabad",
      "conference organisers hyderabad",
      "annual day event company",
      "product launch event hyderabad",
    ],
    breadcrumb: "Corporate Events",
  },
  {
    path: "/social-events",
    title: "Wedding & Social Event Planners in Hyderabad | XYZconcepts",
    description:
      "Weddings, engagements, birthdays, anniversaries and milestone celebrations designed around your story. Social event planning and decor in Hyderabad.",
    keywords: [
      "wedding planners hyderabad",
      "birthday party organisers hyderabad",
      "social event planners hyderabad",
      "engagement event decor hyderabad",
    ],
    breadcrumb: "Social Events",
  },
  {
    path: "/portfolio",
    title: "Event Portfolio & Past Work | XYZconcepts Hyderabad",
    description:
      "Browse XYZconcepts' event portfolio — corporate summits, weddings, brand activations and exhibitions delivered across Hyderabad and 10+ Indian cities.",
    keywords: [
      "event management portfolio hyderabad",
      "corporate event gallery",
      "wedding decor portfolio hyderabad",
    ],
    breadcrumb: "Portfolio",
  },
  {
    path: "/about",
    title: "About XYZconcepts | Event Planners in Hyderabad",
    description:
      "Founded by Shreya and Vaishali, XYZconcepts is a woman-led event management company in Hyderabad built on precision, composure and flawless execution.",
    keywords: [
      "about xyzconcepts",
      "women led event company hyderabad",
      "event management team hyderabad",
    ],
    breadcrumb: "About",
  },
  {
    path: "/contact",
    title: "Contact XYZconcepts | Event Planners in Hyderabad",
    description:
      "Plan your event with XYZconcepts. Call or WhatsApp +91 90633 77915, email connect@xyzconcepts.com, or send an enquiry. Hyderabad, Mon–Sat 10am–7pm.",
    keywords: [
      "contact event planner hyderabad",
      "event management enquiry hyderabad",
      "book event company hyderabad",
    ],
    breadcrumb: "Contact",
  },
];

export const PAGE_BY_PATH: Record<string, PageSeo> = Object.fromEntries(
  PAGES.map((p) => [p.path, p]),
);

export const NOT_FOUND_SEO: PageSeo = {
  path: "/404",
  title: "Page Not Found | XYZconcepts",
  description: "The page you were looking for does not exist. Explore XYZconcepts' event management services in Hyderabad instead.",
  keywords: [],
};

/** Absolute canonical URL for a route. Home has no trailing path segment. */
export function canonicalFor(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
