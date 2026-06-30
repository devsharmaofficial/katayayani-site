import type { Metadata } from "next";

const SITE_URL = "https://katayayanienterprises.vercel.app";

export const metadata: Metadata = {
  title: "About Katayayani Enterprises | India's #1 Tractor Fiber Hood Manufacturer Meerut UP",
  description:
    "Katayayani Enterprises — India's #1 tractor fiber hood (punjabi hood / fiber chatri) manufacturer in Meerut, Uttar Pradesh. IndiaMART TrustSEAL verified, GST compliant. 15+ years manufacturing premium FRP canopies for Swaraj, Mahindra, Sonalika & all brands. Factory-direct pricing. Call +91-9358273054.",
  keywords: [
    "Katayayani Enterprises about",
    "tractor fiber hood manufacturer Meerut",
    "tractor fiber hood manufacturer India",
    "FRP canopy manufacturer Meerut",
    "FRP canopy manufacturer UP",
    "tractor canopy manufacturer Uttar Pradesh",
    "Katayayani Enterprises Meerut",
    "IndiaMART verified FRP canopy",
    "trusted tractor fiber hood manufacturer",
    "Ashok Kumar Sharma Katayayani",
    "FRP canopy supplier India",
    "fiber hood manufacturer Meerut",
    "punjabi hood manufacturer India",
    "fiber chatri manufacturer Meerut",
    "best tractor fiber hood company India",
    "tractor fiber hood factory Meerut",
    "GST compliant tractor canopy manufacturer",
    "tractor fiber hood wholesale supplier",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katayayani Enterprises",
    url: `${SITE_URL}/about`,
    title: "About Katayayani Enterprises | Trusted Tractor Fiber Hood Manufacturer Meerut",
    description:
      "IndiaMART TrustSEAL verified FRP tractor canopy manufacturer from Meerut, UP. GST compliant, 15+ years experience. Premium punjabi hood & fiber chatri for all tractor brands.",
    images: [
      {
        url: `${SITE_URL}/katayayani-enterprises-indiamart-trust-certificate.png`,
        width: 800,
        height: 1120,
        alt: "Katayayani Enterprises IndiaMART Trust Certificate - Tractor Fiber Hood Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Katayayani Enterprises | Tractor Fiber Hood Manufacturer Meerut",
    description: "IndiaMART TrustSEAL verified FRP canopy manufacturer. 15+ years. India's #1 tractor fiber hood manufacturer in Meerut, Uttar Pradesh.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
