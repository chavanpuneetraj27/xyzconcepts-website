import {
  CONTACT,
  DEFAULT_OG_IMAGE,
  LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  canonicalFor,
  type PageSeo,
} from "./config";

/**
 * JSON-LD graph builders.
 *
 * Everything hangs off two stable @id nodes — the organisation and the website —
 * so every page can reference them instead of repeating the business details.
 * Google uses these to build the knowledge panel and local pack entry.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationNode() {
  return {
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    alternateName: ["XYZ Concepts", "XYZ Concepts Hyderabad"],
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-black.png`,
      caption: `${SITE_NAME} logo`,
    },
    image: DEFAULT_OG_IMAGE,
    description:
      "Event management and event design company based in Hyderabad, India, delivering corporate events, weddings, social celebrations, brand activations and exhibitions.",
    slogan: "Your search ends with us, literally!",
    email: CONTACT.email,
    telephone: CONTACT.phonesE164[0],
    priceRange: "$$",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.latitude,
      longitude: CONTACT.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "Country", name: CONTACT.countryName },
    ],
    contactPoint: CONTACT.phonesE164.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "sales",
      areaServed: CONTACT.country,
      availableLanguage: ["en", "hi", "te"],
    })),
    openingHoursSpecification: CONTACT.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [CONTACT.instagram, CONTACT.instagramSocial],
    founder: [
      { "@type": "Person", name: "Shreya", jobTitle: "Co-founder & Experience Designer" },
      { "@type": "Person", name: "Vaishali", jobTitle: "Co-founder & Creative Director" },
    ],
    knowsAbout: [
      "Corporate event management",
      "Conference and summit production",
      "Wedding planning",
      "Brand activations",
      "Exhibition and stall design",
      "Corporate gifting",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Event management services",
      itemListElement: [
        "Corporate Conferences & Summits",
        "Annual Days & Town Halls",
        "Product Launches",
        "Brand Activations",
        "Exhibitions & Stall Design",
        "Weddings & Engagements",
        "Birthdays & Milestone Celebrations",
        "Corporate Gifting",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, serviceType: name, provider: { "@id": ORG_ID } },
      })),
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

function webPageNode(page: PageSeo) {
  return {
    "@type": "WebPage",
    "@id": `${canonicalFor(page.path)}#webpage`,
    url: canonicalFor(page.path),
    name: page.title,
    description: page.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-IN",
    primaryImageOfPage: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
  };
}

function breadcrumbNode(page: PageSeo) {
  if (!page.breadcrumb) return null;
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalFor(page.path)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: page.breadcrumb, item: canonicalFor(page.path) },
    ],
  };
}

/** Extra per-route nodes: service pages describe what is actually sold there. */
function pageSpecificNodes(page: PageSeo): object[] {
  if (page.path === "/corporate-events") {
    return [
      {
        "@type": "Service",
        "@id": `${canonicalFor(page.path)}#service`,
        name: "Corporate Event Management",
        serviceType: "Corporate event management",
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: CONTACT.countryName },
        description:
          "End-to-end planning and execution of corporate conferences, summits, annual days, town halls, inaugurations, sports events, corporate gifting and product launches.",
      },
    ];
  }
  if (page.path === "/social-events") {
    return [
      {
        "@type": "Service",
        "@id": `${canonicalFor(page.path)}#service`,
        name: "Wedding & Social Event Planning",
        serviceType: "Social event planning",
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: CONTACT.countryName },
        description:
          "Planning, design and execution of weddings, engagements, birthdays, anniversaries, baby showers and cultural celebrations.",
      },
    ];
  }
  if (page.path === "/contact") {
    return [
      {
        "@type": "ContactPage",
        "@id": `${canonicalFor(page.path)}#contactpage`,
        url: canonicalFor(page.path),
        mainEntity: { "@id": ORG_ID },
      },
    ];
  }
  if (page.path === "/about") {
    return [
      {
        "@type": "AboutPage",
        "@id": `${canonicalFor(page.path)}#aboutpage`,
        url: canonicalFor(page.path),
        mainEntity: { "@id": ORG_ID },
      },
    ];
  }
  return [];
}

/** Full JSON-LD graph for a given route. */
export function graphFor(page: PageSeo) {
  const nodes: object[] = [organizationNode(), websiteNode(), webPageNode(page)];
  const crumb = breadcrumbNode(page);
  if (crumb) nodes.push(crumb);
  nodes.push(...pageSpecificNodes(page));
  return { "@context": "https://schema.org", "@graph": nodes };
}
