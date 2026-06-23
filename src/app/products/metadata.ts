import type { Metadata } from "next";

const SITE_URL = "https://katayayani-site.vercel.app";

export const metadata: Metadata = {
  title: "FRP Tractor Canopy Manufacturer | Best Price India | Katyayani Enterprises",
  description:
    "Browse all FRP fiber roof canopies from Katyayani Enterprises. Premium tractor canopies for Swaraj, Mahindra, John Deere, Sonalika, Eicher, New Holland & more. Best price guaranteed. Meerut manufacturer. Call +91-9358273054.",
  keywords: [
    "FRP tractor canopy",
    "tractor fiber roof",
    "tractor canopy manufacturer India",
    "buy FRP canopy",
    "FRP canopy price India",
    "Swaraj canopy price",
    "Mahindra FRP canopy price",
    "John Deere canopy price",
    "Sonalika canopy price",
    "Eicher canopy price",
    "tractor canopy Meerut",
    "fiber roof tractor India",
    "all brand tractor canopy",
    "tractor canopy manufacturer UP",
  ],
  alternates: {
    canonical: `${SITE_URL}/products`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katyayani Enterprises",
    url: `${SITE_URL}/products`,
    title: "FRP Tractor Canopy - All Brands | Katyayani Enterprises",
    description:
      "Premium FRP fiber roof canopies for all tractor brands. Swaraj, Mahindra, John Deere, Sonalika, Eicher & more. Best price in India. Meerut manufacturer.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katyayani Enterprises - All FRP Tractor Canopy Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FRP Tractor Canopy - All Brands | Katyayani Enterprises",
    description: "Premium FRP canopies for Swaraj, Mahindra, John Deere & all tractor brands. Best price guaranteed.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
