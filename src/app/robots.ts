import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/venv/",
          "/.venv/",
          "/node_modules/",
        ],
      },
      {
        // Allow Google image bot full access for image indexing
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        // Allow AdsBot for better ad targeting
        userAgent: "AdsBot-Google",
        allow: "/",
      },
    ],
    sitemap: "https://katyayanienterprises.com/sitemap.xml",
    host: "https://katyayanienterprises.com",
  };
}
