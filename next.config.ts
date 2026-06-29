import type { NextConfig } from "next";

const SITE_URL = "https://katayayanienterprises.vercel.app";

const nextConfig: NextConfig = {
  // Compression for Core Web Vitals improvement
  compress: true,

  // Image optimization — allows remote patterns and enables WebP
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  // SEO & Security HTTP Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevents MIME type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controls referrer info for privacy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // XSS protection
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Permissions policy — restrict unnecessary browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
        ],
      },
      // Explicit Content-Type for sitemap as requested by Claude
      {
        source: "/sitemap/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      // Cache static assets aggressively for Core Web Vitals
      {
        source: "/products/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:file(.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2|woff))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirect trailing slashes for canonical URL consistency
  trailingSlash: false,

  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap/sitemap.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
