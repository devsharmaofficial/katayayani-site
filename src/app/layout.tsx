import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { WebsiteBackground } from "@/components/ui/website-background";

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

const SITE_URL = "https://katyayanienterprises.com";
const BUSINESS_NAME = "Katyayani Enterprises";
const BUSINESS_PHONE_PRIMARY = "+91-9358273054";
const BUSINESS_PHONE_SECONDARY = "+91-8077004688";
const BUSINESS_EMAIL = "agroindustriesmeerut@gmail.com";
const BUSINESS_ADDRESS = "Tirupati complex wali gali, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh - 250002, India";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS_NAME} — India's #1 FRP Tractor Canopy Manufacturer`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    "Katyayani Enterprises is India's leading FRP tractor canopy manufacturer based in Meerut, UP. Premium fiber roof canopies for Swaraj, Mahindra, John Deere, Sonalika, Eicher, New Holland & all brands. UV-resistant, 3-year warranty, best price guaranteed. Call +91-9358273054.",
  keywords: [
    // Primary product keywords
    "FRP canopy",
    "FRP tractor canopy",
    "tractor canopy",
    "tractor fiber roof",
    "fiber roof canopy",
    "tractor roof",
    // Brand-specific keywords
    "Swaraj canopy",
    "Swaraj FRP canopy",
    "Mahindra canopy",
    "Mahindra FRP canopy",
    "John Deere canopy",
    "Sonalika canopy",
    "Eicher canopy",
    "New Holland canopy",
    "Massey Ferguson canopy",
    "Deutz Fahr canopy",
    "Farmtrac canopy",
    "Powertrac canopy",
    // Location-based keywords
    "tractor canopy Meerut",
    "FRP canopy Meerut",
    "tractor canopy manufacturer Meerut",
    "tractor canopy UP",
    "FRP canopy Uttar Pradesh",
    // Business keywords
    "Katyayani Enterprises",
    "Katyayani tractor canopy",
    "FRP canopy manufacturer India",
    "tractor canopy manufacturer India",
    // Feature keywords
    "UV resistant canopy",
    "weather resistant canopy",
    "lightweight tractor roof",
    "gel coat canopy",
    "agricultural canopy",
    "tractor sun shade",
    // Buy intent keywords
    "buy FRP canopy online",
    "FRP canopy price",
    "tractor canopy price India",
    "best FRP canopy India",
    "cheap tractor canopy",
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
    title: `${BUSINESS_NAME} — India's #1 FRP Tractor Canopy Manufacturer`,
    description:
      "Premium FRP fiber roof canopies for all tractor brands. Swaraj, Mahindra, John Deere, Sonalika & more. Manufactured in Meerut, UP. UV-resistant, 3-year warranty, best price. Call +91-9358273054.",
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
    title: `${BUSINESS_NAME} — Premium FRP Tractor Canopies`,
    description:
      "India's leading FRP tractor canopy manufacturer. Premium fiber roofs for Swaraj, Mahindra, John Deere & all brands. Meerut, UP. 3-year warranty.",
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
        "Katyayani Enterprises is India's leading manufacturer of premium FRP (Fiber Reinforced Plastic) tractor canopies, based in Meerut, Uttar Pradesh. We supply fiber roof canopies for all major tractor brands including Swaraj, Mahindra, John Deere, Sonalika, Eicher, New Holland, Massey Ferguson, and more.",
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
        "FRP Canopy Manufacturing",
        "Fiber Reinforced Plastic",
        "Tractor Accessories",
        "Agricultural Equipment",
        "Tractor Fiber Roof",
      ],
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Swaraj FRP Canopy" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mahindra FRP Canopy" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "John Deere FRP Canopy" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sonalika FRP Canopy" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Eicher FRP Canopy" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "New Holland FRP Canopy" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Massey Ferguson FRP Canopy" } },
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
      </body>
    </html>
  );
}
