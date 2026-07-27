import { SITE_URL } from "@/config/site";
import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { getAllBlogs } from "@/lib/blogs";

// Force static generation — Next.js will pre-render this at build time
// and serve it as a pure static file with no server overhead
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const CURRENT_DATE = new Date();

  // ── Static Routes ────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
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
    {
      url: `${SITE_URL}/blogs`,
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
      priority: 0.65,
    },
  ];

  // ── Product Routes (auto-discovers every product) ─────────────────────
  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map(
    (product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: CURRENT_DATE,
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
