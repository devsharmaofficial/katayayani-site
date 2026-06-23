// ============================================================================
// Katayayani Enterprises — Structured Data Helpers
// For generating JSON-LD structured data for SEO.
// ============================================================================

import type { Product } from "@/types";

const SITE_URL = "https://katayayani-site.vercel.app";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Katyayani Enterprises",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`, // Placeholder for actual logo
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "GIDC Industrial Estate",
      addressLocality: "Rajkot",
      addressRegion: "Gujarat",
      postalCode: "360002",
      addressCountry: "IN",
    },
  };
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.src),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      offerCount: "1",
      availability: "https://schema.org/InStock",
      // Prices are typically custom quotes in this industry, but structure exists
      priceCurrency: "INR",
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
