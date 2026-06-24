import { MetadataRoute } from "next";
import { getProductSlugs, getAllProducts } from "@/lib/products";

const SITE_URL = "https://katayayanienterprises.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const productSlugs = getProductSlugs();

  // Product pages — highest priority commercial pages
  const productPages = productSlugs.map((slug) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified: new Date("2026-06-23").toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Static core routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date("2026-06-23").toISOString(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date("2026-06-23").toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-06-23").toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-06-23").toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date("2026-06-23").toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/enquiry`,
      lastModified: new Date("2026-06-23").toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [...routes, ...productPages];
}
