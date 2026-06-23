import type { Metadata } from "next";

const SITE_URL = "https://katayayani-site.vercel.app";

export const metadata: Metadata = {
  title: "About Katyayani Enterprises | FRP Tractor Canopy Manufacturer Meerut",
  description:
    "Katyayani Enterprises is a trusted FRP tractor canopy manufacturer based in Meerut, UP. IndiaMART TrustSEAL verified, GST compliant. Owner: Ashok Kumar Sharma. 15+ years supplying premium fiber roof canopies all over India. Contact: +91-9358273054.",
  keywords: [
    "Katyayani Enterprises about",
    "FRP canopy manufacturer Meerut",
    "tractor canopy manufacturer UP",
    "Katyayani Enterprises Meerut",
    "IndiaMART verified FRP canopy",
    "trusted tractor canopy manufacturer",
    "Ashok Kumar Sharma Katyayani",
    "FRP canopy supplier India",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Katyayani Enterprises",
    url: `${SITE_URL}/about`,
    title: "About Katyayani Enterprises | Trusted FRP Canopy Manufacturer - Meerut",
    description:
      "IndiaMART TrustSEAL verified FRP tractor canopy manufacturer from Meerut, UP. GST compliant, 15+ years experience. Premium canopies for all tractor brands.",
    images: [
      {
        url: `${SITE_URL}/katyayani-enterprises-indiamart-trust-certificate.png`,
        width: 800,
        height: 1120,
        alt: "Katyayani Enterprises IndiaMART Trust Certificate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Katyayani Enterprises | FRP Tractor Canopy Manufacturer - Meerut",
    description: "IndiaMART TrustSEAL verified FRP canopy manufacturer. 15+ years experience. Meerut, Uttar Pradesh.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};
