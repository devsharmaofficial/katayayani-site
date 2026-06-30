import type { Metadata } from "next";

const SITE_URL = "https://katayayanienterprises.vercel.app";

export const metadata: Metadata = {
  title: "Tractor Fiber Hood Gallery | Real Photos — Swaraj, Mahindra, Sonalika | Katayayani Enterprises",
  description:
    "Browse the Katayayani Enterprises product gallery — real photos of premium tractor fiber hood (punjabi hood / fiber chatri) for Swaraj 744/855, Mahindra, Sonalika, John Deere, Eicher, New Holland & all brands. See quality before you buy. Home delivery all over India.",
  keywords: [
    "tractor fiber hood gallery",
    "tractor fiber hood photos",
    "tractor fiber hood images",
    "punjabi hood gallery",
    "fiber chatri photos",
    "FRP canopy gallery India",
    "tractor canopy real photos",
    "swaraj fiber hood images",
    "mahindra fiber hood photos",
    "sonalika fiber hood gallery",
    "tractor fiber hood product images",
    "fiber hood for tractor gallery",
    "Katayayani canopy gallery",
    "FRP canopy product photos",
    "tractor fiber hood design photos",
    "tractor fiber hood real images India",
  ],
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katayayani Enterprises",
    url: `${SITE_URL}/gallery`,
    title: "Tractor Fiber Hood Gallery | Real Product Photos | Katayayani Enterprises",
    description:
      "Real product photos of premium tractor fiber hood, punjabi hood & fiber chatri for all brands. See quality before you buy.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katayayani Enterprises FRP Tractor Fiber Hood Gallery - All Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tractor Fiber Hood Gallery | Katayayani Enterprises",
    description: "Real product photos of premium tractor fiber hood, punjabi hood & fiber chatri. All brands available.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
