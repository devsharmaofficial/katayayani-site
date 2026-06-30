import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = "https://katayayanienterprises.vercel.app";
  const CURRENT_DATE = new Date("2026-06-30");

  return [
    {
      url: `${SITE_URL}`,
      lastModified: CURRENT_DATE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: CURRENT_DATE,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    // All individual product pages
    {
      url: `${SITE_URL}/products/swaraj-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products/mahindra-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products/sonalika-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products/john-deere-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products/eicher-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/products/new-holland-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/products/massey-ferguson-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/products/farmtrac-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/products/deutz-fahr-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/products/solis-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/products/powertrac-frp-canopy`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/enquiry`,
      lastModified: CURRENT_DATE,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];
}
