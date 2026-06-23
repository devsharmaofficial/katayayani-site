import type { Metadata } from "next";

const SITE_URL = "https://katyayanienterprises.com";

export const metadata: Metadata = {
  title: "Request FRP Canopy Quote | Fast Response | Katyayani Enterprises",
  description:
    "Submit your enquiry for premium FRP tractor canopies from Katyayani Enterprises. Get the best price quote for Swaraj, Mahindra, John Deere, Sonalika & all tractor brands. Fast 24-hour response. Call +91-9358273054.",
  keywords: [
    "FRP canopy enquiry",
    "tractor canopy quote",
    "FRP canopy price request",
    "buy FRP tractor canopy",
    "tractor canopy order India",
    "FRP canopy dealer",
    "Katyayani enquiry form",
    "tractor fiber roof price",
  ],
  alternates: {
    canonical: `${SITE_URL}/enquiry`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katyayani Enterprises",
    url: `${SITE_URL}/enquiry`,
    title: "Request Quote | FRP Tractor Canopy | Katyayani Enterprises",
    description:
      "Submit your canopy enquiry and get a price quote within 24 hours. FRP canopies for all tractor brands. Best price guaranteed.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katyayani Enterprises - Request FRP Tractor Canopy Quote",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Request FRP Canopy Quote | Katyayani Enterprises",
    description: "Get best price quote for FRP tractor canopies. 24-hour response guaranteed.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
