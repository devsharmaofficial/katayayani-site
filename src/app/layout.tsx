import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebsiteBackground } from "@/components/ui/website-background";
import FloatingActions from "@/components/layout/FloatingActions";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BUSINESS_NAME = "Katayayani Enterprises";
const BUSINESS_PHONE_PRIMARY = "+91-9358273054";
const BUSINESS_PHONE_SECONDARY = "+91-8077004688";
const BUSINESS_EMAIL = "agroindustriesmeerut@gmail.com";
const BUSINESS_ADDRESS = "30,9A, Tirupati Complex Wali Gali, Baghpat Road, Sabun Godam, Meerut, Uttar Pradesh - 250002, India";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tractor Fiber Hood Price | Punjabi Hood & Fiber Chatri Manufacturer Meerut — Katayayani Enterprises",
    template: `%s | Katayayani Enterprises`,
  },
  description:
    "Best price tractor fiber hood (punjabi hood / fiber chatri) in India. Katayayani Enterprises — factory-direct tractor fiber hood manufacturer in Meerut UP. Download our corporate catalogue PDF & watch official video showcases on our YouTube channel. Fits Swaraj, Mahindra, Sonalika & all brands. Call +91-9358273054.",
  keywords: [
    // ── TIER 1: HIGH INTENT COMMERCIAL (Exact Match from Data) ──
    "mahindra tractor fiber hood roof canopy",
    "swaraj tractor fiber roof canopy",
    "heavy duty double pipe tractor punjabi hood",
    "double pipe tractor fiber hood",
    "swaraj tractor fiber hood with fan",
    "tractor music system fiber hood",
    "universal tractor fiber roof canopy",
    "john deere tractor fiber hood roof canopy",
    "sonalika tractor fiber roof canopy",
    "new holland tractor fiber roof canopy",
    "massey ferguson tractor fiber roof canopy",
    "tractor fiber hood price",
    "fiber hood for tractor",
    "mahindra tractor fiber hood price",
    "punjabi tractor hood price",
    "punjabi hood",
    "sonalika tractor fiber hood price",
    "swaraj 744 fiber hood price",
    "swaraj fiber hood price",
    "tractor fiber hood",
    "mahindra tractor fiber chatri price",
    "swaraj 855 fiber hood price",
    "swaraj tractor fiber hood price",
    "sonalika fiber hood price",
    "fiber hood for tractor price",
    "punjabi hood tractor",
    "punjabi tractor hood",
    "tractor punjabi hood",
    "swaraj 744 tractor fiber chatri price",
    "sonalika fiber hood",
    "mahindra fiber hood",
    "mahindra tractor fiber hood",
    "fiber hood for mahindra tractor",
    "fiber hood for sonalika tractor",
    "massey tractor fiber hood price",
    "swaraj 855 fiber chatri price",
    "sonalika fiber chatri price",
    "sonalika tractor fiber chatri price",
    "tractor fiber chatri price",
    "fiber chatri tractor price",
    "tractor fiber chatri",
    // ── TIER 2: BROADER SEO FOUNDATION ──
    "tractor fiber hood price in india",
    "tractor fiber hood online",
    "tractor fiber hood manufacturer india",
    "punjabi hood price in india",
    "fiber chatri manufacturer",
    "Katayayani Enterprises",
  ],
  authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  applicationName: BUSINESS_NAME,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BUSINESS_NAME,
    url: SITE_URL,
    title: `Tractor Fiber Hood Price | Punjabi Hood | Fiber Chatri Manufacturer — ${BUSINESS_NAME}`,
    description:
      "India's #1 factory-direct tractor fiber hood manufacturer in Meerut. Best price punjabi hood, fiber chatri for Swaraj 744/855, Mahindra, Sonalika, Eicher & all brands. Home delivery across India. Call +91-9358273054.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katayayani Enterprises - Premium FRP Tractor Fiber Hood Manufacturer Meerut India",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Tractor Fiber Hood Price | Punjabi Hood | Fiber Chatri — ${BUSINESS_NAME}`,
    description:
      "Best price tractor fiber hood, punjabi hood & fiber chatri. Swaraj 744/855, Mahindra, Sonalika, JD & all brands. India's #1 manufacturer in Meerut. Home delivery.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@katayayanienterprises",
    site: "@katayayanienterprises",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Agricultural Equipment, Tractor Parts, Tractor Fiber Hoods",
  verification: {
    google: "YiO-Pvs2bDvVO9OVe0pQWzmuT2OYSosnlC1cBlpQYhE",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-144x144.png", type: "image/png", sizes: "144x144" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-64.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

// JSON-LD Structured Data — Organization + LocalBusiness + WebSite
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_NAME,
      alternateName: ["Katayayani Agro Industries", "Katayayani Enterprises", "Katayayani Enterprises Meerut"],
      vatID: "09BGDPS3254A1ZL",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/katayayani-enterprises-logo.png`,
        width: 512,
        height: 512,
        caption: "Katayayani Enterprises Logo - FRP Tractor Canopy Manufacturer",
      },
      image: `${SITE_URL}/katayayani-enterprises-logo.png`,
      description:
        "Katayayani Enterprises is India's #1 tractor fiber hood (punjabi hood / fiber chatri) manufacturer in Meerut, Uttar Pradesh. Best price tractor fiber hood for Mahindra, Swaraj 744/855, Sonalika, Eicher, New Holland, Massey Ferguson, Farmtrac & all brands. Buy online with home delivery across India.",
      foundingDate: "2010",
      telephone: BUSINESS_PHONE_PRIMARY,
      email: BUSINESS_EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "30,9A, Tirupati Complex Wali Gali, Baghpat Road, Sabun Godam",
        addressLocality: "Meerut",
        addressRegion: "Uttar Pradesh",
        postalCode: "250002",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.97119,
        longitude: 77.6657833,
      },
      hasMap: "https://www.google.com/maps/place/Katayayani+Enterprises/@28.97119,77.6657833,17z",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: BUSINESS_PHONE_PRIMARY,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["Hindi", "English"],
        },
        {
          "@type": "ContactPoint",
          telephone: BUSINESS_PHONE_SECONDARY,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["Hindi", "English"],
        },
      ],
      sameAs: [
        `https://www.katayayanienterprises.com/`,
        `https://www.indiamart.com/katayayanienterprises/`,
        `https://youtube.com/@katayayanienterprises.meerut`,
        `https://www.instagram.com/katayayani.enterprises/`,
        `https://wa.me/919358273054`,
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Bank Transfer, UPI",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      knowsAbout: [
        "Tractor Fiber Hood Manufacturing",
        "Punjabi Tractor Hood Price",
        "Fiber Chatri for Tractors",
        "Tractor Fiber Hood Price",
        "Fiber Hood for Tractor",
        "Mahindra Tractor Fiber Hood Price",
        "Swaraj 744 Fiber Hood Price",
        "Sonalika Tractor Fiber Hood Price",
        "Fiber Reinforced Plastic",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS_NAME,
      alternateName: ["Katayayani Enterprises Meerut", "Katayayani Agro Industries", "katayayanienterprises.online"],
      description: "India's #1 FRP Tractor Canopy Manufacturer — Meerut, Uttar Pradesh",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Explicit Google Search & Browser Favicon Specification (Multiples of 48px square) */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/favicon-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Force Google site name */}
        <meta name="application-name" content="Katayayani Enterprises" />
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut, Uttar Pradesh, India" />
        <meta name="geo.position" content="28.97119;77.6657833" />
        <meta name="ICBM" content="28.97119, 77.6657833" />
        <meta name="contact" content={BUSINESS_EMAIL} />
        <meta name="reply-to" content={BUSINESS_EMAIL} />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        <meta name="revisit-after" content="7 days" />
        <meta name="classification" content="Agricultural Equipment, Tractor Parts" />
      </head>
      <body className="min-h-full flex flex-col antialiased text-on-surface">
        {/* Google Analytics deferred to user interaction to eliminate TBT & main-thread blocking */}
        <GoogleAnalytics />

        <WebsiteBackground>
          {children}
        </WebsiteBackground>
        <Analytics />
      </body>
    </html>
  );
}
