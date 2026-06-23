import type { Metadata } from "next";

const SITE_URL = "https://katayayani-site.vercel.app";

export const metadata: Metadata = {
  title: "Request FRP Canopy Quote | Fast Response | Katayayani Enterprises",
  description:
    "Submit your enquiry for premium FRP tractor canopies from Katayayani Enterprises. Get the best price quote for Swaraj, Mahindra, John Deere, Sonalika & all tractor brands. Fast 24-hour response. Call +91-9358273054.",
  keywords: [
    "FRP canopy enquiry",
    "tractor canopy quote",
    "FRP canopy price request",
    "buy FRP tractor canopy",
    "tractor canopy order India",
    "FRP canopy dealer",
    "Katayayani enquiry form",
    "tractor fiber roof price",
  ],
  alternates: {
    canonical: `${SITE_URL}/enquiry`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katayayani Enterprises",
    url: `${SITE_URL}/enquiry`,
    title: "Request Quote | FRP Tractor Canopy | Katayayani Enterprises",
    description:
      "Submit your canopy enquiry and get a price quote within 24 hours. FRP canopies for all tractor brands. Best price guaranteed.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katayayani Enterprises - Request FRP Tractor Canopy Quote",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Request FRP Canopy Quote | Katayayani Enterprises",
    description: "Get best price quote for FRP tractor canopies. 24-hour response guaranteed.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
