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

const SITE_URL = "https://katayayani-site.vercel.app";
const BUSINESS_NAME = "Katyayani Enterprises";
const BUSINESS_PHONE_PRIMARY = "+91-9358273054";
const BUSINESS_PHONE_SECONDARY = "+91-8077004688";
const BUSINESS_EMAIL = "agroindustriesmeerut@gmail.com";
const BUSINESS_ADDRESS = "Tirupati complex wali gali, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh - 250002, India";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Tractor Fiber Hood Price | Punjabi Hood | FRP Canopy Manufacturer — ${BUSINESS_NAME}`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    "Buy tractor fiber hood at best price in India. Punjabi tractor hood, fiber chatri for Mahindra, Swaraj, Sonalika, John Deere, Eicher & all brands. Katyayani Enterprises — India's #1 tractor fiber hood manufacturer in Meerut, UP. Call +91-9358273054 for price.",
  keywords: [
    // TIER 1 — Highest priority keywords (720–590 search volume)
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
    // TIER 2 — Brand + model specific
    "swaraj 744 tractor fiber hood price",
    "mahindra 575 tractor fiber hood price",
    "eicher tractor fiber hood price",
    "eicher tractor fiber hood",
    "farmtrac fiber hood price",
    "farmtrac tractor fiber hood",
    "new holland tractor fiber hood price",
    "new holland tractor fiber hood",
    "massey tractor fiber hood",
    "swaraj fiber hood",
    "john deere tractor fiber hood price",
    "john deere 5050d fiber hood price",
    "john deere 5310 fiber hood price",
    // Product variants
    "tractor fiber hood chatri",
    "tractor fiber hood cover",
    "tractor fiber canopy price",
    "fiber hood tractor chatri",
    "punjab hood for tractor",
    "tractor fiber chatri price in india",
    // Commercial intent
    "buy fiber hood for tractor",
    "tractor fiber hood for sale",
    "tractor fiber hood online",
    "fiber hood tractor price",
    "online tractor fiber hood price",
    "tractor fiber hood price in india",
    "tractor fiber hood home delivery",
    "fiber hood for tractor swaraj",
    "fiber hood for tractor price swaraj",
    // Location-based
    "tractor fiber hood price in gujarat",
    "tractor fiber chatri price in punjab",
    "tractor fiber chatri near me",
    "fiber hood for tractor near me",
    // FRP canopy terms (alternate)
    "FRP tractor canopy",
    "tractor canopy Meerut",
    "FRP canopy manufacturer India",
    "tractor fiber hood manufacturer Meerut",
    "fiberglass tractor hood",
    "tractor fiber hood accessories",
    "tractor u pipe and fiber hood",
    // Business
    "Katyayani Enterprises",
    "katyayani fiber hood",
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
    title: `Tractor Fiber Hood Price | Punjabi Tractor Hood | ${BUSINESS_NAME}`,
    description:
      "Buy tractor fiber hood (punjabi hood / fiber chatri) at best price. Mahindra, Swaraj 744/855, Sonalika, John Deere & all brands. Katyayani Enterprises — Meerut manufacturer. Call +91-9358273054.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katyayani Enterprises - Premium FRP Tractor Canopy Manufacturer in Meerut India",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Tractor Fiber Hood | Punjabi Hood Price | ${BUSINESS_NAME}`,
    description:
      "Best price tractor fiber hood, punjabi hood & fiber chatri for Swaraj, Mahindra, Sonalika, JD & all brands. India's #1 manufacturer in Meerut. Low price, 3-year warranty.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@katyayanienterprises",
    site: "@katyayanienterprises",
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
      alternateName: ["Katyayani Agro Industries", "Katayayani Enterprises"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/katyayani-enterprises-logo.png`,
        width: 200,
        height: 200,
        caption: "Katyayani Enterprises Logo - FRP Tractor Canopy Manufacturer",
      },
      image: `${SITE_URL}/og-image.jpg`,
      description:
        "Katyayani Enterprises is India's #1 tractor fiber hood (punjabi hood / fiber chatri) manufacturer in Meerut, Uttar Pradesh. Best price tractor fiber hood for Mahindra, Swaraj 744/855, Sonalika, John Deere, Eicher, New Holland, Massey Ferguson, Farmtrac & all brands. Buy online with home delivery across India.",
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
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Swaraj Tractor Fiber Hood", alternateName: "Swaraj Fiber Chatri" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Swaraj 744 Fiber Hood", alternateName: "Swaraj 744 Tractor Fiber Hood Price" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Swaraj 855 Fiber Hood", alternateName: "Swaraj 855 Fiber Chatri Price" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mahindra Tractor Fiber Hood", alternateName: "Mahindra Fiber Chatri" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sonalika Tractor Fiber Hood", alternateName: "Sonalika Fiber Chatri Price" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "John Deere Tractor Fiber Hood", alternateName: "John Deere 5050D Fiber Hood" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Eicher Tractor Fiber Hood", alternateName: "Eicher Fiber Hood Price" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "New Holland Tractor Fiber Hood", alternateName: "New Holland Fiber Hood Price" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Massey Ferguson Tractor Fiber Hood", alternateName: "Massey Fiber Hood Price" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Farmtrac Tractor Fiber Hood", alternateName: "Farmtrac Fiber Hood Price" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Punjabi Tractor Hood", alternateName: "Punjabi Hood Price" } },
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
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: `${SITE_URL}/products`,
        },
      ],
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
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="classification" content="Agricultural Equipment, Tractor Parts" />
        <link rel="canonical" href={SITE_URL} />
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
