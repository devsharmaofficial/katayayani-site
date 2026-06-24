import type { Metadata } from "next";

const SITE_URL = "https://katayayanienterprises.vercel.app";

export const metadata: Metadata = {
  title: "Contact Katayayani Enterprises | Get FRP Canopy Quote | Meerut UP",
  description:
    "Contact Katayayani Enterprises for FRP tractor canopy quotes and inquiries. Call +91-9358273054 or +91-8077004688. WhatsApp: wa.me/919358273054. Email: agroindustriesmeerut@gmail.com. Address: Meerut, Uttar Pradesh.",
  keywords: [
    "contact Katayayani Enterprises",
    "FRP canopy quote",
    "tractor canopy price quote",
    "FRP canopy dealer Meerut",
    "buy tractor canopy Meerut",
    "tractor canopy enquiry",
    "FRP canopy contact number",
    "Katayayani Enterprises phone number",
    "tractor canopy whatsapp",
    "agro industries Meerut contact",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katayayani Enterprises",
    url: `${SITE_URL}/contact`,
    title: "Contact Us | Get FRP Tractor Canopy Quote | Katayayani Enterprises",
    description:
      "Get in touch with Katayayani Enterprises for FRP tractor canopy quotes. Call, WhatsApp, or visit us in Meerut, UP. Fast response guaranteed.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Katayayani Enterprises - FRP Tractor Canopy Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact Katayayani Enterprises | FRP Canopy Manufacturer Meerut",
    description: "Get FRP tractor canopy quotes. Call +91-9358273054. Located in Meerut, UP.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
