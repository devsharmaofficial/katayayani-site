import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: { absolute: "Request Tractor Fiber Hood Price Quote | Fast Response | Katayayani Enterprises Meerut" },
  description:
    "Submit your enquiry for tractor fiber hood (punjabi hood / fiber chatri) price from Katayayani Enterprises. Get the best factory-direct quote for Swaraj 744/855, Mahindra, Sonalika & all tractor brands. 24-hour response guaranteed. Call +91-9358273054.",
  keywords: [
    "tractor fiber hood price enquiry",
    "tractor fiber hood price request",
    "punjabi hood price enquiry",
    "fiber chatri price quote",
    "tractor fiber hood quote",
    "buy FRP tractor canopy enquiry",
    "tractor canopy order India",
    "tractor fiber hood dealer enquiry",
    "Katayayani enquiry form",
    "tractor fiber hood home delivery enquiry",
    "swaraj fiber hood price enquiry",
    "mahindra fiber hood price request",
    "sonalika fiber hood enquiry",
    
  ],
  alternates: {
    canonical: `${SITE_URL}/enquiry`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katayayani Enterprises",
    url: `${SITE_URL}/enquiry`,
    title: "Request Tractor Fiber Hood Price Quote | Katayayani Enterprises",
    description:
      "Submit your tractor fiber hood enquiry and get a price quote within 24 hours. Punjabi hood, fiber chatri for all tractor brands. Best factory-direct price guaranteed.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katayayani Enterprises - Request Tractor Fiber Hood Price Quote",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Request Tractor Fiber Hood Price Quote | Katayayani Enterprises",
    description: "Get best price quote for tractor fiber hood, punjabi hood & fiber chatri. 24-hour response guaranteed.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
