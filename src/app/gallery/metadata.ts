import type { Metadata } from "next";

const SITE_URL = "https://katayayani-site.vercel.app";

export const metadata: Metadata = {
  title: "FRP Canopy Gallery | Real Product Photos | Katayayani Enterprises",
  description:
    "Browse the Katayayani Enterprises gallery of premium FRP tractor canopies. Real product photos for Swaraj, Mahindra, John Deere, Sonalika, Eicher, New Holland & all brands. See quality before you buy.",
  keywords: [
    "FRP canopy gallery",
    "tractor canopy photos",
    "FRP canopy images India",
    "tractor fiber roof gallery",
    "Katayayani canopy gallery",
    "FRP canopy product photos",
    "tractor canopy real images",
  ],
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katayayani Enterprises",
    url: `${SITE_URL}/gallery`,
    title: "Product Gallery | FRP Tractor Canopies | Katayayani Enterprises",
    description:
      "Real product photos of premium FRP tractor canopies for all brands. Browse our gallery and see quality before you buy.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katayayani Enterprises FRP Tractor Canopy Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FRP Canopy Gallery | Katayayani Enterprises",
    description: "Real product photos of premium FRP tractor canopies. All brands available.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
