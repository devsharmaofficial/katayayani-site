import { SITE_URL } from "@/config/site";
import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { getAllBlogs } from "@/lib/blogs";

// Force static generation — Next.js will pre-render this at build time
// and serve it as a pure static file with no server overhead
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a real content-update date rather than build time. Identical lastmod
  // values on every URL (the previous behaviour) are a weak trust signal.
  const SITE_UPDATED = new Date("2026-11-26");

  // ── Static Routes ────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/enquiry`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/return-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/shipping-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // ── Product Routes (auto-discovers every product) ─────────────────────
  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map(
    (product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: new Date(product.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })
  );

  // ── Blog Routes (auto-discovers every blog post) ───────────────────────
  const blogRoutes: MetadataRoute.Sitemap = getAllBlogs().map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
