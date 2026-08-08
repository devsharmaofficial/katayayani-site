"use client";
import { SITE_URL, getAbsoluteImageUrl } from "@/config/site";

import { useState, useEffect, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Package,
  Truck,
  FileText,
  Star,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ProductCard from "@/components/ui/ProductCard";
import PincodeChecker from "@/components/ui/PincodeChecker";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  getProductBySlug,
  getRelatedProducts,
  getAllProducts,
} from "@/lib/products";



export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return <ProductDetailContent slug={slug} />;
}

function ProductDetailContent({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);

  const allMedia = useMemo(() => {
    if (!product) return [];
    const media: any[] = [];
    (product.images || []).forEach(img => {
      media.push({ type: 'image', data: img });
    });
    (product.videos || []).forEach(url => {
      let videoId = "";
      if (url.includes("/shorts/")) {
        videoId = url.split("/shorts/")[1].split("?")[0];
      } else if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      }
      if (videoId) {
        media.push({ type: 'video', data: { url, videoId } });
      }
    });
    return media;
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [autoplayKey, setAutoplayKey] = useState(0);
  
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [lightboxPosition, setLightboxPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!product || allMedia.length <= 1) return;
    if (allMedia[selectedImage]?.type === 'video') return;
    const interval = setInterval(() => {
      setDirection(1);
      setSelectedImage((prev) => (prev + 1) % allMedia.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [product, autoplayKey]);

  if (!product) {
    notFound();
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (allMedia.length <= 1) return;
    setDirection(-1);
    setSelectedImage((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    setAutoplayKey((k) => k + 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (allMedia.length <= 1) return;
    setDirection(1);
    setSelectedImage((prev) => (prev + 1) % allMedia.length);
    setAutoplayKey((k) => k + 1);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setLightboxPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setLightboxScale(1);
    setLightboxPosition({ x: 0, y: 0 });
  };



  const relatedProducts = getRelatedProducts(slug);

  const whatsappMessage = encodeURIComponent(
    `Hello Katayayani Enterprises,\n\nI am looking to upgrade my tractor with your premium *${product.brand} ${product.name.replace(product.brand + ' ', '')}*.\n\nCould you please share the latest pricing, available colors, and delivery details?\n\nThank you!`
  );

  return (
    <>
      <Navbar />
      {/* JSON-LD Product Schema — tells Google exactly what this product is */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${product.brand} Tractor Fiber Hood (Punjabi Hood / Fiber Chatri)`,
            alternateName: [
              `${product.brand} fiber hood`,
              `${product.brand} fiber chatri`,
              `${product.brand} punjabi hood`,
              `${product.brand} tractor fiber hood price`,
            ],
            description: product.description,
            image: product.images.map((img) => getAbsoluteImageUrl(img.src)),
            brand: {
              "@type": "Brand",
              name: product.brand,
            },
            sku: product.slug,
            mpn: product.slug,
            manufacturer: {
              "@type": "Organization",
              name: "Katayayani Enterprises",
              vatID: "09BGDPS3254A1ZL",
              url: `${SITE_URL}`,
              telephone: "+91-9358273054",
              image: `${SITE_URL}/katayayani-enterprises-logo.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "30,9A, Tirupati Complex Wali Gali, Baghpat Road, Sabun Godam",
                addressLocality: "Meerut",
                addressRegion: "Uttar Pradesh",
                postalCode: "250002",
                addressCountry: "IN",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              bestRating: "5",
              worstRating: "1",
              ratingCount: "148",
              reviewCount: "124",
            },
            review: [
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                  worstRating: "1",
                },
                name: `Best ${product.brand} fiber hood at factory price`,
                reviewBody: `Excellent quality fiber hood for my ${product.brand} tractor. Perfect fit, durable material and delivered in 5 days. Highly recommend Katayayani Enterprises.`,
                datePublished: "2025-11-15",
                author: {
                  "@type": "Person",
                  name: "Rajesh Kumar",
                },
              },
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                  worstRating: "1",
                },
                name: `${product.brand} tractor punjabi hood — superb quality`,
                reviewBody: `Bought the fiber chatri for my ${product.brand} tractor. Build quality is very strong and price is the best in India. Pan India delivery was fast too.`,
                datePublished: "2025-12-20",
                author: {
                  "@type": "Person",
                  name: "Suresh Singh",
                },
              },
            ],
            offers: {
              "@type": "Offer",
              price: "13500",
              priceCurrency: "INR",
              priceValidUntil: "2027-12-31",
              validFrom: "2025-01-01",
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/products/${product.slug}`,
              seller: {
                "@type": "Organization",
                name: "Katayayani Enterprises",
                vatID: "09BGDPS3254A1ZL",
                url: `${SITE_URL}`,
                telephone: "+91-9358273054",
                image: `${SITE_URL}/katayayani-enterprises-logo.png`,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "30,9A, Tirupati Complex Wali Gali, Baghpat Road, Sabun Godam",
                  addressLocality: "Meerut",
                  addressRegion: "Uttar Pradesh",
                  postalCode: "250002",
                  addressCountry: "IN",
                },
              },
              areaServed: "IN",
              deliveryLeadTime: {
                "@type": "QuantitativeValue",
                minValue: 10,
                maxValue: 12,
                unitCode: "DAY",
              },
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "IN",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 7,
                returnMethod: "https://schema.org/ReturnInStore",
                returnFees: "https://schema.org/FreeReturn",
              },
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: 0,
                  currency: "INR",
                },
                shippingDestination: {
                  "@type": "DefinedRegion",
                  addressCountry: "IN",
                },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 1,
                    maxValue: 3,
                    unitCode: "d",
                  },
                  transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: 10,
                    maxValue: 12,
                    unitCode: "d",
                  },
                },
              },
            },
            additionalProperty: [
              { "@type": "PropertyValue", name: "Material", value: "Heavy-Duty Fiber Hood (FRP)" },
              { "@type": "PropertyValue", name: "Compatible Brand", value: product.brand },
            ],
          }),
        }}
      />
      <main className="flex-grow pt-28">
        <div className="max-w-[1280px] mx-auto px-[24px] pt-4 pb-12">
          {/* Breadcrumb */}
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Products", url: "/products" },
              { name: `${product.brand} Fiber Hood`, url: `/products/${product.slug}` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-[48px]">
            {/* Left: Image Gallery (3 cols) */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                {/* Main Image */}
                <div className="group/carousel relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white/40 backdrop-blur-md border border-white/50 mb-[16px]">
                  
                  {/* Carousel Container */}
                  <div 
                    onClick={() => {
                      if (allMedia[selectedImage]?.type === 'image') {
                        setIsLightboxOpen(true);
                        setLightboxScale(1);
                        setLightboxPosition({ x: 0, y: 0 });
                      }
                    }}
                    className={`relative w-full h-full overflow-hidden ${allMedia[selectedImage]?.type === 'image' ? 'cursor-zoom-in' : ''}`}
                  >
                    <div
                      key={selectedImage}
                      className="absolute inset-0 w-full h-full animate-in fade-in duration-300"
                    >
                      {allMedia[selectedImage]?.type === 'image' ? (
                        <Image
                          src={allMedia[selectedImage].data.src ?? "/placeholder.jpg"}
                          alt={allMedia[selectedImage].data.alt ?? product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority
                          fetchPriority="high"
                        />
                      ) : (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${allMedia[selectedImage]?.data.videoId}?autoplay=1&mute=1`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      )}
                    </div>
                  </div>

                  {/* Brand Badge */}
                  <div className="absolute top-[16px] left-[16px] bg-white/90 backdrop-blur-sm px-[12px] py-[6px] rounded-lg shadow-sm border border-outline-variant/20 z-10 pointer-events-none">
                    <span className="text-label-sm text-primary tracking-wider uppercase font-bold">
                      {product.brand}
                    </span>
                  </div>
                  {product.isNew && (
                    <div className="absolute top-[16px] right-[16px] bg-secondary-container px-[12px] py-[6px] rounded-lg shadow-sm z-10 pointer-events-none">
                      <span className="text-label-sm text-on-secondary-container tracking-wider uppercase font-bold">
                        New
                      </span>
                    </div>
                  )}

                  {/* Zoom indicator button */}
                  {allMedia[selectedImage]?.type === 'image' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLightboxOpen(true);
                      setLightboxScale(1);
                      setLightboxPosition({ x: 0, y: 0 });
                    }}
                    className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-primary shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200/50 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Enlarge image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </button>
                  )}

                  {/* Navigation Arrows */}
                  {allMedia.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200/50 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 pointer-events-auto z-20 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200/50 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 pointer-events-auto z-20 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {allMedia.length > 1 && (
                  <div className="flex gap-[8px] overflow-x-auto pb-2 scrollbar-none snap-x">
                    {allMedia.map((media, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDirection(idx > selectedImage ? 1 : -1);
                          setSelectedImage(idx);
                          setAutoplayKey((k) => k + 1);
                        }}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 snap-start ${
                          idx === selectedImage
                            ? "border-primary"
                            : "border-transparent hover:border-outline-variant"
                        }`}
                      >
                        {media.type === 'image' ? (
                          <Image
                            src={media.data.src}
                            alt={media.data.alt}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full relative group flex items-center justify-center bg-black">
                            <Image 
                               src={`https://img.youtube.com/vi/${media.data.videoId}/hqdefault.jpg`}
                               alt="Video Thumbnail"
                               fill
                               className="object-cover opacity-60"
                               sizes="80px"
                             />
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                               <svg className="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M8 5v14l11-7z" />
                               </svg>
                             </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </ScrollReveal>
            </div>

            {/* Right: Product Info + Sticky Enquiry (2 cols) */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="right">
                <div className="lg:sticky lg:top-[104px]">
                  {/* Product Name */}
                  <h1 className="text-headline-md text-on-surface mb-[8px]">
                    {product.name}
                  </h1>

                  {/* Trust Badge */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-3 mb-[24px]">
                    <span className="text-[12px] text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Verified Quality Manufacturer
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="mb-[24px] p-5 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-transparent to-primary/5 border border-emerald-600/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#318664] font-black bg-[#318664]/10 px-2 py-0.5 rounded">Special Factory Price</span>
                      <span className="text-[9px] uppercase tracking-widest text-amber-700 font-black bg-amber-500/10 px-2 py-0.5 rounded">Limited Offer</span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[34px] font-black text-[#318664] tracking-tight">₹13,500</span>
                      <span className="text-body-md text-on-surface-variant/60 line-through">₹18,000</span>
                      <span className="text-body-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Save ₹4,500 (25% off)</span>
                    </div>

                    <p className="text-[12px] text-on-surface-variant/80 mt-2 flex items-center gap-1 font-medium">
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Inclusive of GST & All Taxes
                    </p>

                    <div className="mt-4 pt-3 border-t border-dashed border-gray-200/60 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-on-surface-variant/75 font-semibold">
                      <span className="flex items-center gap-1">🟢 Fast Dispatch</span>
                    </div>
                  </div>

                  {/* Compatible Models - Natural height to fill space and align buttons */}
                  <div className="mb-[24px] p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
                    
                    <h3 className="text-label-md font-bold text-primary uppercase tracking-wider mb-[10px] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Perfect Fit Guarantee
                    </h3>
                    
                    <p className="text-body-md text-on-surface font-semibold mb-[14px]">
                      Engineered to fit <span className="text-primary font-black">EVERY SINGLE {product.brand.toUpperCase()}</span> tractor model seamlessly, with zero vibration.
                    </p>
                    
                    <div className="flex flex-wrap gap-[6px]">
                      {product.compatibleModels.map((model) => (
                        <span
                          key={model}
                          className="inline-flex items-center px-[10px] py-[4px] bg-white text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors rounded-lg text-label-sm border border-outline-variant/30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        >
                          {model}
                        </span>
                      ))}
                      <span className="inline-flex items-center px-[10px] py-[4px] bg-primary/10 text-primary font-bold rounded-lg text-label-sm border border-primary/20">
                        & All Other {product.brand} Models
                      </span>
                    </div>
                  </div>

                  <PincodeChecker />

                  <div className="divider-gold mb-[16px] mt-6" />

                  {/* CTA Buttons */}
                  <div className="space-y-[12px]">
                    <Link
                      href={`https://wa.me/919358273054?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full h-12 p-1 ps-6 pe-14 flex items-center justify-center text-sm font-medium rounded-full group transition-all duration-500 hover:ps-14 hover:pe-6 overflow-hidden cursor-pointer bg-primary text-on-primary hover:bg-primary-container"
                    >
                      <span className="relative z-10 transition-all duration-500 font-bold">
                        Buy at Best Price
                      </span>
                      <div className="absolute right-1 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </div>
                    </Link>
                    <Link
                      href={`/checkout?product=${product.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-[#6528F7] text-white text-label-md px-[24px] py-[14px] rounded-lg hover:bg-[#501EC7] transition-colors font-bold"
                    >
                      <ShieldCheck className="w-[18px] h-[18px]" />
                      Buy Now
                    </Link>
                    <Link
                      href={`https://wa.me/919358273054?text=${whatsappMessage}`}
                      target="_blank"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white text-label-md px-[24px] py-[14px] rounded-lg hover:bg-[#20BD5A] transition-colors font-bold"
                    >
                      <MessageCircle className="w-[18px] h-[18px]" />
                      WhatsApp Us
                    </Link>
                    <Link
                      href="tel:+919358273054"
                      className="w-full flex items-center justify-center gap-2 border border-secondary text-secondary text-label-md px-[24px] py-[14px] rounded-lg hover:bg-secondary/5 transition-colors font-bold"
                    >
                      <Phone className="w-[18px] h-[18px]" />
                      Call for Pricing
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Detailed Product Information */}
          <div className="mt-[64px] space-y-[48px]">
            {/* MOQ and Delivery Banner */}
            <ScrollReveal>
              <div className="group relative flex flex-col sm:flex-row gap-8 justify-around bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 border border-primary/20 rounded-[32px] p-8 shadow-[0_8px_32px_rgba(31,38,135,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(31,38,135,0.08)] hover:border-primary/40 backdrop-blur-md">
                 
                 {/* Decorative background gradients */}
                 <div className="absolute inset-0 bg-white/40 pointer-events-none" />
                 <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none" />
                 <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] group-hover:bg-secondary/30 transition-colors duration-700 pointer-events-none" />

                 <div className="relative flex items-center gap-6 z-10">
                   <div className="w-16 h-16 bg-gradient-to-br from-white to-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-white/80 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                     <Package className="w-8 h-8 drop-shadow-sm" />
                   </div>
                   <div>
                     <p className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] font-bold mb-1 opacity-80">Minimum Order Quantity</p>
                     <p className="text-headline-md text-primary font-black drop-shadow-sm">1 Piece</p>
                   </div>
                 </div>
                 
                 <div className="w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden sm:block relative z-10"></div>
                 
                 <div className="relative flex items-center gap-6 z-10">
                   <div className="w-16 h-16 bg-gradient-to-br from-white to-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-white/80 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                     <Truck className="w-8 h-8 drop-shadow-sm" />
                   </div>
                   <div>
                     <p className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] font-bold mb-1 opacity-80">Delivery Time</p>
                     <p className="text-headline-md text-primary font-black drop-shadow-sm">10 - 12 Days</p>
                   </div>
                 </div>
              </div>
            </ScrollReveal>

            {/* Detailed Product Information: 3-Column Specifications & Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              
              {/* Column 1: Technical Specifications */}
              <ScrollReveal direction="up" delay={0.1}>
                <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
                  <h3 className="text-title-md text-primary mb-6 flex items-center gap-3 font-bold">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span>Technical Specifications</span>
                  </h3>
                  
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="divide-y divide-outline-variant/10 text-body-sm">
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[11px] opacity-85">Brand</span>
                        <span className="text-primary font-black text-right">{product.brand}</span>
                      </div>
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[11px] opacity-85">Type of Part</span>
                        <span className="text-on-surface font-semibold text-right">Tractor Roof Fibre Canopy</span>
                      </div>
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[11px] opacity-85">Frame Material</span>
                        <span className="text-on-surface font-semibold text-right">Mild Steel</span>
                      </div>
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[11px] opacity-85">Surface Finish</span>
                        <span className="text-on-surface font-semibold text-right">Paint Coated</span>
                      </div>
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[11px] opacity-85">Country of Origin</span>
                        <span className="text-on-surface font-semibold flex items-center gap-1.5 justify-end">
                          <span>Made in India</span>
                          <span>🇮🇳</span>
                        </span>
                      </div>
                      <div className="py-3 flex justify-between items-center border-none">
                        <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[11px] opacity-85">Available For</span>
                        <span className="text-primary font-black text-right">All {product.brand} Models</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Column 2: Premium Features */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
                  <h3 className="text-title-md text-primary mb-6 flex items-center gap-3 font-bold">
                    <div className="p-2 bg-secondary/10 rounded-xl text-secondary flex items-center justify-center">
                      <Star className="w-5 h-5 fill-secondary/20" />
                    </div>
                    <span>Premium Accessories</span>
                  </h3>
                  
                  <div className="flex-grow flex flex-col justify-center">
                    <ul className="space-y-3.5">
                      {[
                        "ToolBox with Lock & Key",
                        "LED PREMIUM Indicator Lights",
                        "PROJECTOR LED Lights",
                        "Heavy Duty Fan",
                        "Side Mirrors",
                        "HANDLES",
                        "Music Speakers (Custom Fit)"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-body-sm text-on-surface font-semibold group/item">
                          <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:scale-110" />
                          <span className="group-hover/item:text-primary transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

              {/* Column 3: Quality & Build */}
              <ScrollReveal direction="up" delay={0.3}>
                <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
                  <h3 className="text-title-md text-primary mb-6 flex items-center gap-3 font-bold">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span>FRP Quality & Build</span>
                  </h3>
                  
                  <div className="flex-grow flex flex-col justify-center">
                    <ul className="space-y-3.5">
                      {[
                        "Heavy Duty Support Pipe",
                        "High-Strength Fibre Canopy",
                        "Interlocking Bolts (No Vibration)",
                        "Guaranteed Precision Fitting"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-body-sm text-on-surface font-semibold group/item">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:scale-110" />
                          <span className="group-hover/item:text-primary transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Customization Accent Footer */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-outline-variant/20 flex items-center justify-center gap-3 text-xs sm:text-sm text-on-surface-variant font-bold uppercase tracking-wider text-center mt-6">
                <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse flex-shrink-0" />
                <span>✨ 100% Customizable — Get custom colors, lighting options, and sound setup as per your needs</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-[64px]">
              <ScrollReveal>
                <div className="divider-gold mb-[32px]" />
                <h2 className="text-headline-sm text-primary mb-[24px]">
                  More Tractor Fiber Hood Options
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                {relatedProducts.map((p) => (
                  <ScrollReveal key={p.id}>
                    <ProductCard product={p} />
                  </ScrollReveal>
                ))}
                
                <ScrollReveal>
                  <Link
                    href="/products"
                    className="group bg-white rounded-[32px] shadow-sm border border-gray-100/50 hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between h-full relative w-full max-w-[420px] mx-auto md:max-w-none transform hover:-translate-y-1"
                  >
                    <div>
                      {/* Visual Stacked Cards Effect */}
                      <div className="relative aspect-[4/3] w-full bg-[#f8fbf9] rounded-[24px] overflow-hidden flex items-center justify-center mb-4 border border-gray-100 group-hover:bg-[#f2f7f4] transition-colors duration-300">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                        
                        <div className="relative w-20 h-20">
                          {/* Stacked Card 3 (Back) */}
                          <div className="absolute inset-0 bg-white border border-primary/5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] transform translate-x-4 -translate-y-3 rotate-6 group-hover:translate-x-6 group-hover:-translate-y-5 group-hover:rotate-12 transition-all duration-300" />
                          {/* Stacked Card 2 (Middle) */}
                          <div className="absolute inset-0 bg-white border border-primary/10 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] transform -translate-x-2 -translate-y-2 -rotate-3 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:-rotate-6 transition-all duration-300" />
                          {/* Stacked Card 1 (Front) */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#318664] to-[#225f46] border border-white/20 rounded-2xl flex flex-col items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                            <span className="text-[20px] font-black leading-none text-white">11+</span>
                            <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider mt-1.5">Brands</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-1 flex-grow flex flex-col justify-between">
                        <div>

                          {/* Title Row */}
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-gray-900 text-[18px] md:text-[20px] font-bold tracking-tight w-full">
                              Explore All Options
                            </h3>
                          </div>

                          {/* Short Description */}
                          <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 min-h-[40px] mt-1.5">
                            Custom heavy-duty fiber hoods & canopies for Swaraj, Mahindra, Sonalika, and all other major tractor brands.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pb-1">
                      <div className="w-full bg-[#18181b] hover:bg-black text-white py-3.5 rounded-2xl text-[14px] font-semibold text-center transition-all duration-200 shadow-sm hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer">
                        <span>View All Brands</span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            </section>
          )}
          {/* ── SEO CONTENT BLOCK — Keyword-rich visible text for Google ── */}
          <ScrollReveal>
            <div className="mt-16 bg-gradient-to-br from-[#f0faf5] to-white border border-[#012d1d]/10 rounded-2xl p-8">
              <h2 className="text-[20px] font-black text-[#012d1d] mb-3">
                {product.brand} Fiber Hood Price | {product.brand} Fiber Chatri
              </h2>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Looking for the best <strong>{product.brand} fiber hood price</strong>? Katayayani Enterprises in Meerut is India's top manufacturer of premium{" "}
                <strong>{product.brand} fiber chatri</strong> and <strong>punjabi hood</strong>. Get your heavy-duty{" "}
                <strong>fiber hood for {product.brand} tractor</strong> directly from the factory at the lowest price guaranteed. For the exact{" "}
                <strong>{product.brand} tractor fiber hood price</strong>, call{" "}
                <a href="tel:+919358273054" className="text-[#012d1d] font-bold hover:underline">
                  +91-9358273054
                </a>
                . We provide fast pan-India home delivery. Order your <strong>{product.brand} fiber chatri online</strong> today via WhatsApp or call. We specialize in manufacturing the highest quality {product.brand} canopies, including searches for {
                  product.seo.keywords.slice(0, 5).map((kw, i) => (
                    <span key={i}>
                      <strong>{kw}</strong>{i < 4 ? ", " : ""}
                    </span>
                  ))
                } — all available at the best manufacturing price in India!
              </p>
            </div>

            {/* ── Brand-Specific SEO FAQ ── */}
            <div className="mt-6 bg-white border border-[#012d1d]/10 rounded-2xl p-8">
              <h3 className="text-[18px] font-black text-[#012d1d] mb-5">
                Frequently Asked Questions about {product.name}
              </h3>
              <div className="space-y-5">
                <div>
                  <h4 className="text-[15px] font-bold text-[#012d1d] mb-1">What is the {product.brand} fiber hood price in India?</h4>
                  <p className="text-[14px] text-gray-600">The <strong>{product.brand} tractor fiber hood price in India</strong> varies based on the specific model and customization options (like built-in music systems or LED lights). We offer factory-direct pricing which is significantly lower than retail stores. Contact us for the exact <strong>{product.brand} fiber hood price</strong>.</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#012d1d] mb-1">Do you manufacture {product.brand} Punjabi Hoods and Fiber Chatris?</h4>
                  <p className="text-[14px] text-gray-600">Yes! We are one of the leading manufacturers of both the traditional <strong>{product.brand} fiber chatri</strong> and the heavy-duty <strong>{product.brand} punjabi hood</strong>. All our hoods use premium FRP (Fiber Reinforced Plastic) to guarantee maximum durability and weather resistance in the field.</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#012d1d] mb-1">Is this fiber hood compatible with all {product.brand} tractor models?</h4>
                  <p className="text-[14px] text-gray-600">Our custom-fit designs ensure that whether you are searching for a <strong>fiber hood for {product.brand} tractor</strong> or a high-end canopy for a specific heavy-duty series, it will mount perfectly using the included robust U-pipe fitting system.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
      <FloatingActions />
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between select-none animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
            {/* Header: Zoom and Close Controls */}
            <div 
              className="flex justify-between items-center p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent absolute top-0 left-0 right-0 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white text-body-md font-medium px-4 py-2 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
                Image {selectedImage + 1} of {allMedia.length}
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={handleZoomOut}
                  disabled={lightboxScale <= 1}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                
                <span className="text-white text-label-md min-w-[50px] text-center bg-black/30 px-2.5 py-1 rounded-md border border-white/5">
                  {Math.round(lightboxScale * 100)}%
                </span>

                <button
                  onClick={handleZoomIn}
                  disabled={lightboxScale >= 4}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>

                <button
                  onClick={handleResetZoom}
                  disabled={lightboxScale === 1 && lightboxPosition.x === 0 && lightboxPosition.y === 0}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3 3m12 6V4.5M15 9h4.5M15 9l6-6m-6 12v4.5m0-4.5h4.5m-4.5 0l6 6M9 15v4.5M9 15H4.5m4.5 0L3 21" />
                  </svg>
                </button>

                <div className="w-px h-6 bg-white/10 mx-1" />

                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close Lightbox"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            {allMedia.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev(e);
                    handleResetZoom();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 z-30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext(e);
                    handleResetZoom();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 z-30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Interactive Zoomable Image Area */}
            <div 
              className="flex-grow w-full h-full flex items-center justify-center overflow-hidden p-4 md:p-8"
              onClick={() => setIsLightboxOpen(false)}
            >
              <div 
                className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    transform: `scale(${lightboxScale})`,
                    transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
                  }}
                  className="w-full h-full relative flex items-center justify-center"
                  onDoubleClick={() => {
                    if (lightboxScale > 1) {
                      handleResetZoom();
                    } else {
                      setLightboxScale(2.5);
                    }
                  }}
                >
                  {allMedia[selectedImage]?.type === 'image' ? (
                  <Image
                    src={allMedia[selectedImage].data.src ?? "/placeholder.jpg"}
                    alt={allMedia[selectedImage].data.alt ?? product.name}
                    fill
                    className="object-contain pointer-events-none"
                    sizes="100vw"
                    priority
                  />
                  ) : (
                    <div className="w-full h-full max-w-4xl mx-auto flex items-center justify-center">
                      <iframe
                        width="100%"
                        height="80%"
                        src={`https://www.youtube.com/embed/${allMedia[selectedImage]?.data.videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full aspect-video"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Caption and Hints */}
            <div 
              className="p-6 text-center bg-gradient-to-t from-black/80 to-transparent text-white relative z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-body-md font-semibold mb-2">
                {allMedia[selectedImage]?.type === 'image' ? (allMedia[selectedImage].data.alt ?? product.name) : `Video: ${product.name}`}
              </p>
              <p className="text-label-sm text-gray-400">
                Tip: Double-click to zoom in/out.
              </p>
            </div>
          </div>
        )}
    </>
  );
}
