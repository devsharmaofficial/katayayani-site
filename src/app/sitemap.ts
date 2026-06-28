import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = "https://katayayanienterprises.vercel.app";
  const CURRENT_DATE = new Date("2026-06-28");

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
      priority: 0.9,
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
      priority: 0.6,
    },
  ];
}
