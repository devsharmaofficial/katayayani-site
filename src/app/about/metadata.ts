import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: { absolute: "About Katayayani Enterprises | India's #1 Tractor Fiber Hood Manufacturer Meerut UP" },
  description:
    "Katayayani Enterprises — India's #1 tractor fiber hood (punjabi hood / fiber chatri) manufacturer in Meerut, UP. IndiaMART TrustSEAL verified & GST compliant. Download our corporate product catalogue PDF & watch official video showcases on our YouTube channel. Factory-direct pricing. Call +91-9358273054.",
  keywords: [
    "Katayayani Enterprises about",
    "tractor fiber hood manufacturer Meerut",
    "tractor fiber hood manufacturer India",
    "tractor fiber hood catalogue PDF",
    "download tractor canopy catalogue",
    "Katayayani Enterprises YouTube channel",
    "tractor fiber hood video demos",
    "IndiaMART TrustSEAL certificate Meerut",
    "tractor fiber hood manufacturer Meerut",
    "tractor fiber hood manufacturer UP",
    "tractor canopy manufacturer Uttar Pradesh",
    "Katayayani Enterprises Meerut",
    "IndiaMART verified tractor fiber hood",
    "trusted tractor fiber hood manufacturer",
    "Ashok Kumar Sharma Katayayani",
    "tractor fiber hood supplier India",
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
    description: "IndiaMART TrustSEAL verified tractor fiber hood manufacturer. 15+ years. India's #1 tractor fiber hood manufacturer in Meerut, Uttar Pradesh.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
