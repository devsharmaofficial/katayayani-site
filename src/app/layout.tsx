import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { WebsiteBackground } from "@/components/ui/website-background";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://katayayanienterprises.vercel.app";
const BUSINESS_NAME = "Katayayani Enterprises";
const BUSINESS_PHONE_PRIMARY = "+91-9358273054";
const BUSINESS_PHONE_SECONDARY = "+91-8077004688";
const BUSINESS_EMAIL = "agroindustriesmeerut@gmail.com";
const BUSINESS_ADDRESS = "Tirupati complex wali gali, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh - 250002, India";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tractor Fiber Hood Price | Punjabi Hood | Fiber Chatri Manufacturer India — Katayayani Enterprises",
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    "Best price tractor fiber hood (punjabi hood / fiber chatri) in India. Katayayani Enterprises — factory-direct FRP canopy manufacturer in Meerut UP. Fits Swaraj 744/855, Mahindra, Sonalika, John Deere, Eicher, New Holland, Massey & Farmtrac. Home delivery all over India. Call +91-9358273054.",
  keywords: [
    // ── TIER 1: TOP BUYER-INTENT KEYWORDS (720+ monthly searches) ──
    "tractor fiber hood price",
    "tractor fiber hood price in india",
    "tractor fiber hood online",
    "tractor fiber hood buy",
    "tractor fiber hood near me",
    "tractor fiber hood home delivery",
    "tractor fiber hood for sale",
    "fiber hood for tractor price",
    "fiber hood for tractor price in india",
    "fiber hood for tractor online",
    "fiber hood for tractor buy",
    "fiber hood for tractor near me",
    "fiber hood for tractor home delivery",
    "fiber hood for tractor for sale",
    "mahindra tractor fiber hood price",
    "mahindra tractor fiber hood price in india",
    "mahindra tractor fiber hood online",
    "mahindra tractor fiber hood buy",
    "mahindra tractor fiber hood near me",
    "mahindra tractor fiber hood home delivery",
    "punjabi tractor hood price",
    "punjabi tractor hood price in india",
    "punjabi tractor hood online",
    "punjabi tractor hood buy",
    "punjabi tractor hood near me",
    "punjabi tractor hood home delivery",
    "punjabi hood",
    "punjabi hood price",
    "punjabi hood tractor",
    "punjabi tractor hood",
    "tractor punjabi hood",
    "sonalika tractor fiber hood price",
    "sonalika tractor fiber hood price in india",
    "sonalika tractor fiber hood online",
    "sonalika tractor fiber hood buy",
    "sonalika tractor fiber hood near me",
    "swaraj 744 fiber hood price",
    "swaraj 744 fiber hood price in india",
    "swaraj 744 fiber hood online",
    "swaraj 744 fiber hood buy",
    "swaraj fiber hood price",
    "swaraj fiber hood price in india",
    "swaraj fiber hood online",
    "swaraj fiber hood buy",
    "tractor fiber hood",
    "fiber hood for tractor",
    "mahindra tractor fiber chatri price",
    "mahindra tractor fiber chatri price in india",
    "mahindra tractor fiber chatri online",
    "swaraj 855 fiber hood price",
    "swaraj 855 fiber hood price in india",
    "swaraj 855 fiber hood online",
    "swaraj 855 fiber hood buy",
    "swaraj tractor fiber hood price",
    "swaraj tractor fiber hood price in india",
    "swaraj tractor fiber hood online",
    "sonalika fiber hood price",
    "sonalika fiber hood price in india",
    "sonalika fiber hood",
    "mahindra fiber hood",
    "mahindra tractor fiber hood",
    "fiber hood for mahindra tractor",
    "fiber hood for sonalika tractor",
    "massey tractor fiber hood price",
    "massey tractor fiber hood price in india",
    "massey tractor fiber hood online",
    "swaraj 855 fiber chatri price",
    "swaraj 855 fiber chatri price in india",
    "swaraj 744 tractor fiber chatri price",
    "sonalika fiber chatri price",
    "sonalika tractor fiber chatri price",
    "tractor fiber chatri price",
    "tractor fiber chatri price in india",
    "tractor fiber chatri online",
    "tractor fiber chatri buy",
    "tractor fiber chatri near me",
    "tractor fiber chatri home delivery",
    "tractor fiber chatri",
    "fiber chatri tractor price",
    // ── TIER 2: BRAND & MODEL SPECIFIC ──
    "john deere fiber hood",
    "john deere fiber hood price",
    "john deere tractor fiber hood price",
    "john deere 5050d fiber hood price",
    "john deere 5310 fiber hood price",
    "massey 241 tractor fiber hood price",
    "massey 1035 tractor fiber hood price",
    "swaraj 744 tractor fiber hood price",
    "mahindra 575 tractor fiber hood price",
    "mahindra 275 tractor fiber hood price",
    "eicher tractor fiber hood price",
    "eicher tractor fiber hood",
    "eicher tractor fiber hood online",
    "farmtrac fiber hood price",
    "farmtrac tractor fiber hood",
    "farmtrac tractor fiber hood price",
    "new holland tractor fiber hood price",
    "new holland tractor fiber hood",
    "new holland 3630 tractor fiber hood price",
    "digitrac tractor fiber hood price",
    "digitrac tractor fiber hood",
    "arjun tractor fiber hood",
    "arjun tractor fiber hood price",
    "ace tractor fiber hood",
    "ace tractor fiber hood price",
    "swaraj fiber hood",
    "massey tractor fiber hood",
    // ── PRODUCT VARIANTS ──
    "tractor fiber hood chatri",
    "tractor fiber hood chatri price",
    "tractor fiber hood cover",
    "tractor fiber hood accessories",
    "tractor fiber canopy price",
    "fiber hood tractor chatri",
    "punjab hood for tractor",
    // ── COMMERCIAL INTENT ──
    "buy fiber hood for tractor",
    "tractor fiber hood for sale",
    "tractor fiber hood online",
    "online tractor fiber hood price",
    "tractor fiber hood price in india",
    "tractor fiber hood home delivery",
    "fiber hood for tractor swaraj",
    "fiber hood for tractor price swaraj",
    "fiber hood tractor price",
    // ── LOCATION-BASED ──
    "tractor fiber hood price in gujarat",
    "tractor fiber chatri price in punjab",
    "tractor fiber chatri near me",
    "fiber hood for tractor near me",
    "tractor fiber hood price in up",
    "tractor fiber hood price in haryana",
    "tractor fiber hood price in rajasthan",
    "tractor fiber hood price in maharashtra",
    "tractor canopy Meerut",
    "tractor fiber hood manufacturer Meerut",
    // ── FRP/CANOPY ALTERNATES ──
    "FRP tractor canopy",
    "FRP canopy manufacturer India",
    "fiberglass tractor hood",
    "tractor fiber hood manufacturer India",
    "tractor u pipe and fiber hood",
    "tractor fiber roof canopy",
    // ── BUSINESS ──
    "Katayayani Enterprises",
    "katayayani fiber hood",
    "Katayayani Enterprises Meerut",
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
      "India's #1 factory-direct tractor fiber hood manufacturer in Meerut. Best price punjabi hood, fiber chatri for Swaraj 744/855, Mahindra, Sonalika, John Deere & all brands. Home delivery across India. Call +91-9358273054.",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  category: "Agricultural Equipment, Tractor Parts, FRP Canopies",
};

// JSON-LD Structured Data — Organization + LocalBusiness + WebSite
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_NAME,
      alternateName: ["Katayayani Agro Industries", "Katayayani Enterprises"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/katayayani-enterprises-logo.png`,
        width: 200,
        height: 200,
        caption: "Katayayani Enterprises Logo - FRP Tractor Canopy Manufacturer",
      },
      image: `${SITE_URL}/og-image.jpg`,
      description:
        "Katayayani Enterprises is India's #1 tractor fiber hood (punjabi hood / fiber chatri) manufacturer in Meerut, Uttar Pradesh. Best price tractor fiber hood for Mahindra, Swaraj 744/855, Sonalika, John Deere, Eicher, New Holland, Massey Ferguson, Farmtrac & all brands. Buy online with home delivery across India.",
      foundingDate: "2010",
      telephone: BUSINESS_PHONE_PRIMARY,
      email: BUSINESS_EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tirupati complex wali gali, Baghpat Rd, Sabun Godam",
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
          contactOption: "TollFree",
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
        `https://www.indiamart.com/katayayanienterprises/`,
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
        "Punjabi Tractor Hood",
        "Fiber Chatri for Tractors",
        "FRP Canopy Manufacturing",
        "Fiber Reinforced Plastic",
        "Tractor Accessories",
        "Agricultural Equipment",
        "Tractor Fiber Hood Price",
        "Tractor Fiber Hood Online",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS_NAME,
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
    <html lang="en-IN" className={`${inter.variable} ${outfit.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <WebsiteBackground>
          {children}
        </WebsiteBackground>
        <Analytics />
      </body>
    </html>
  );
}
