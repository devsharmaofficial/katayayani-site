import { SITE_URL, getAbsoluteImageUrl } from "@/config/site";
// ============================================================================
// Katayayani Enterprises — Structured Data Helpers
// For generating JSON-LD structured data for SEO.
// ============================================================================

import type { Product } from "@/types";


export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Katayayani Enterprises",
    url: SITE_URL,
    logo: `${SITE_URL}/katayayani-enterprises-logo.png`,
    telephone: "+91-9358273054",
    email: "agroindustriesmeerut@gmail.com",
    vatID: "09BGDPS3254A1ZL",
    sameAs: [
      "https://www.katayayanienterprises.com/",
      "https://www.indiamart.com/katayayanienterprises/",
      "https://youtube.com/@katayayanienterprises.meerut",
      "https://www.instagram.com/katayayani.enterprises/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9358273054",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["Hindi", "English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "30,9A, Tirupati Complex Wali Gali, Baghpat Road, Sabun Godam",
      addressLocality: "Meerut",
      addressRegion: "Uttar Pradesh",
      postalCode: "250002",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.97119,
      longitude: 77.6657833,
    },
  };
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => getAbsoluteImageUrl(img.src)),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      offerCount: "1",
      lowPrice: "14500",
      highPrice: "19500",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/products/${product.slug}`,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnInStore",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },
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
