"use client";

import { useState, useEffect, use } from "react";
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
  Package,
  Truck,
  FileText,
  Star,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ProductCard from "@/components/ui/ProductCard";
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
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [autoplayKey, setAutoplayKey] = useState(0);

  useEffect(() => {
    if (!product || product.images.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [product, autoplayKey]);

  if (!product) {
    notFound();
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images.length <= 1) return;
    setDirection(-1);
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    setAutoplayKey((k) => k + 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images.length <= 1) return;
    setDirection(1);
    setSelectedImage((prev) => (prev + 1) % product.images.length);
    setAutoplayKey((k) => k + 1);
  };

  const relatedProducts = getRelatedProducts(slug);

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in the ${product.name}. Please share details and pricing.`
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
            image: product.images.map((img) => `https://kataayanienterprises.vercel.app${img.src}`),
            brand: {
              "@type": "Brand",
              name: product.brand,
            },
            manufacturer: {
              "@type": "Organization",
              name: "Kataayani Enterprises",
              url: "https://kataayanienterprises.vercel.app",
              telephone: "+91-9358273054",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Meerut",
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
            },
            offers: {
              "@type": "Offer",
              price: "12500",
              priceCurrency: "INR",
              priceValidUntil: "2027-12-31",
              availability: "https://schema.org/InStock",
              url: `https://kataayanienterprises.vercel.app/products/${product.slug}`,
              seller: {
                "@type": "Organization",
                name: "Kataayani Enterprises",
                telephone: "+91-9358273054",
              },
              areaServed: "IN",
              deliveryLeadTime: {
                "@type": "QuantitativeValue",
                minValue: 4,
                maxValue: 5,
                unitCode: "DAY",
              },
            },
            additionalProperty: [
              { "@type": "PropertyValue", name: "Material", value: "Fiber Reinforced Plastic (FRP)" },
              { "@type": "PropertyValue", name: "Compatible Brand", value: product.brand },
            ],
          }),
        }}
      />
      <main className="flex-grow pt-32">
        <div className="max-w-[1280px] mx-auto px-[24px] py-[48px]">
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
                  <div className="relative w-full h-full overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.div
                        key={selectedImage}
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({
                            x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
                            opacity: 0.8,
                          }),
                          center: {
                            x: 0,
                            opacity: 1,
                          },
                          exit: (dir: number) => ({
                            x: dir < 0 ? "100%" : dir > 0 ? "-100%" : 0,
                            opacity: 0.8,
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 350, damping: 35 },
                          opacity: { duration: 0.25 },
                        }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={
                            product.images[selectedImage]?.src ?? "/placeholder.jpg"
                          }
                          alt={product.images[selectedImage]?.alt ?? product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
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

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
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
                {product.images.length > 1 && (
                  <div className="flex gap-[8px] overflow-x-auto pb-2 scrollbar-none snap-x">
                    {product.images.map((img, idx) => (
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
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
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
                  <h1 className="text-headline-md text-on-surface mb-[24px]">
                    {product.name}
                  </h1>

                  {/* Color Selection */}
                  <div className="mb-[24px]">
                    <h3 className="text-label-md text-on-surface mb-[8px]">
                      Available Colors
                    </h3>
                    <div className="flex gap-[8px]">
                      {product.colorVariants.map((color, idx) => (
                        <button
                          key={color.slug}
                          onClick={() => setSelectedColor(idx)}
                          className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                            idx === selectedColor
                              ? "ring-2 ring-offset-2 ring-primary border-primary"
                              : "border-outline-variant/30 hover:border-primary/50"
                          } ${
                            color.hex === "#ffffff"
                              ? "border-outline-variant"
                              : ""
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {idx === selectedColor && (
                            <Check
                              className={`w-4 h-4 ${
                                color.hex === "#ffffff" ||
                                color.hex === "#facc15"
                                  ? "text-primary"
                                  : "text-white"
                              }`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-label-sm text-on-surface-variant mt-[4px]">
                      Selected: {product.colorVariants[selectedColor]?.name}
                    </p>
                  </div>

                  {/* Compatible Models */}
                  <div className="mb-[24px] p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
                    
                    <h3 className="text-label-md font-bold text-primary uppercase tracking-wider mb-[10px] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Perfect Fit Guarantee
                    </h3>
                    
                    <p className="text-body-md text-on-surface font-semibold mb-[14px]">
                      Engineered to fit <span className="text-primary font-black">EVERY SINGLE {product.brand.toUpperCase()}</span> tractor model seamlessly, with zero vibration.
                    </p>

                    <div className="flex flex-wrap gap-[6px] max-h-[140px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20">
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

                  <div className="divider-gold mb-[24px]" />

                  {/* CTA Buttons */}
                  <div className="space-y-[12px]">
                    <Link
                      href={`/enquiry?product=${product.slug}`}
                      className="relative w-full h-12 p-1 ps-6 pe-14 flex items-center justify-center text-sm font-medium rounded-full group transition-all duration-500 hover:ps-14 hover:pe-6 overflow-hidden cursor-pointer bg-primary text-on-primary hover:bg-primary-container"
                    >
                      <span className="relative z-10 transition-all duration-500">
                        Enquire Now
                      </span>
                      <div className="absolute right-1 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </div>
                    </Link>
                    <Link
                      href={`https://wa.me/919358273054?text=${whatsappMessage}`}
                      target="_blank"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white text-label-md px-[24px] py-[14px] rounded-lg hover:bg-[#20BD5A] transition-colors"
                    >
                      <MessageCircle className="w-[18px] h-[18px]" />
                      WhatsApp Us
                    </Link>
                    <Link
                      href="tel:+919358273054"
                      className="w-full flex items-center justify-center gap-2 border border-secondary text-secondary text-label-md px-[24px] py-[14px] rounded-lg hover:bg-secondary/5 transition-colors"
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
                     <p className="text-headline-md text-primary font-black drop-shadow-sm">4 - 5 Days</p>
                   </div>
                 </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px]">
              {/* Product Specifications Table */}
              <ScrollReveal>
                <div className="h-full">
                  <h2 className="text-headline-sm text-primary mb-[24px] flex items-center gap-3 font-bold">
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    Product Brochure
                  </h2>
                  <div className="bg-white/60 backdrop-blur-xl rounded-[32px] border border-white/80 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.03)] h-[calc(100%-70px)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] relative group/table">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/table:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <table className="w-full text-left border-collapse relative z-10">
                      <tbody className="divide-y divide-outline-variant/10">
                        <tr className="group/row hover:bg-white/60 transition-colors">
                          <th className="py-4 px-4 sm:px-8 text-label-md text-on-surface-variant font-bold uppercase tracking-wider w-1/3 group-hover/row:text-primary transition-colors">Brand</th>
                          <td className="py-4 px-4 sm:px-8 text-title-md text-primary font-black">{product.brand}</td>
                        </tr>
                        <tr className="group/row hover:bg-white/60 transition-colors">
                          <th className="py-4 px-4 sm:px-8 text-label-md text-on-surface-variant font-bold uppercase tracking-wider group-hover/row:text-primary transition-colors">Frame Material</th>
                          <td className="py-4 px-4 sm:px-8 text-body-lg text-on-surface font-semibold">Mild Steel</td>
                        </tr>
                        <tr className="group/row hover:bg-white/60 transition-colors">
                          <th className="py-4 px-4 sm:px-8 text-label-md text-on-surface-variant font-bold uppercase tracking-wider group-hover/row:text-primary transition-colors">Type Of Part</th>
                          <td className="py-4 px-4 sm:px-8 text-body-lg text-on-surface font-semibold">Tractor Roof Fibre Canopy</td>
                        </tr>
                        <tr className="group/row hover:bg-white/60 transition-colors">
                          <th className="py-4 px-4 sm:px-8 text-label-md text-on-surface-variant font-bold uppercase tracking-wider group-hover/row:text-primary transition-colors">Country of Origin</th>
                          <td className="py-4 px-4 sm:px-8 text-body-lg text-on-surface font-semibold flex items-center gap-2">
                            <span>Made in India</span>
                            <span className="text-xl leading-none">🇮🇳</span>
                          </td>
                        </tr>
                        <tr className="group/row hover:bg-white/60 transition-colors">
                          <th className="py-4 px-4 sm:px-8 text-label-md text-on-surface-variant font-bold uppercase tracking-wider group-hover/row:text-primary transition-colors">Surface Finish</th>
                          <td className="py-4 px-4 sm:px-8 text-body-lg text-on-surface font-semibold">Paint Coated</td>
                        </tr>
                        <tr className="group/row hover:bg-white/60 transition-colors border-none">
                          <th className="py-4 px-4 sm:px-8 text-label-md text-on-surface-variant font-bold uppercase tracking-wider group-hover/row:text-primary transition-colors border-none">Available For</th>
                          <td className="py-4 px-4 sm:px-8 text-body-md text-on-surface font-bold leading-relaxed">
                            <span className="inline-block mb-1 opacity-60 text-sm tracking-wider">ALL MODELS —</span><br />
                            <span className="text-primary font-black tracking-wide">
                              YUVO TECH + | ARJUN NOVO | OJA | YUVRAJ | JIVO | XP PLUS | SP PLUS
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>

              {/* Features & Quality */}
              <div className="space-y-[32px] h-full flex flex-col justify-between">
                <ScrollReveal direction="right" delay={0.1}>
                  <div className="group relative bg-gradient-to-br from-surface to-surface-variant/30 p-8 rounded-[32px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-bl-[100px] -z-10 transition-transform duration-700 group-hover:scale-125" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10 transition-opacity duration-700 group-hover:opacity-100 opacity-0" />
                    
                    <h3 className="text-title-xl text-primary mb-[28px] flex items-center gap-3 font-bold">
                      <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary">
                        <Star className="w-6 h-6 fill-secondary/20" />
                      </div>
                      Premium Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-[20px] gap-x-[16px]">
                      {[
                        "ToolBox with Lock & Key",
                        "LED PREMIUM Indicator Lights",
                        "PROJECTOR LED Lights",
                        "Heavy Duty Fan",
                        "Side Mirrors",
                        "HANDLES"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-[12px] text-body-lg text-on-surface font-semibold group/item">
                          <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-[2px] transition-transform duration-300 group-hover/item:scale-125 group-hover/item:rotate-6" />
                          <span className="group-hover/item:text-primary transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.2}>
                  <div className="group relative bg-gradient-to-br from-primary/10 via-primary-container/20 to-transparent p-8 rounded-[32px] border border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] hover:-translate-y-1 mt-[32px]">
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-tl-[120px] -z-10 transition-transform duration-700 group-hover:scale-125 group-hover:-translate-x-4 group-hover:-translate-y-4" />
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10 transition-opacity duration-700 group-hover:opacity-100 opacity-0" />

                    <h3 className="text-title-xl text-primary mb-[28px] flex items-center gap-3 font-bold">
                      <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      FRP Quality & Build
                    </h3>
                    <ul className="space-y-[20px]">
                      {[
                        "Heavy Duty Pipe",
                        "Heavy Duty Fibre Canopy",
                        "Interlocking bolts : No vibration",
                        "GUARANTEED FITTING"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-[16px] text-body-lg text-on-surface group/item">
                          <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/item:scale-125 group-hover/item:bg-primary group-hover/item:border-primary">
                            <Check className="w-5 h-5 text-primary group-hover/item:text-white transition-colors" />
                          </div>
                          <span className="font-black tracking-wide group-hover/item:text-primary transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.02)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                {relatedProducts.map((p) => (
                  <ScrollReveal key={p.id}>
                    <ProductCard product={p} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )}
          {/* ── SEO CONTENT BLOCK — Keyword-rich visible text for Google ── */}
          <ScrollReveal>
            <div className="mt-16 bg-gradient-to-br from-[#f0faf5] to-white border border-[#012d1d]/10 rounded-2xl p-8">
              <h2 className="text-[20px] font-black text-[#012d1d] mb-3">
                {product.brand} Tractor Fiber Hood Price — Kataayani Enterprises
              </h2>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Buy <strong>{product.brand} tractor fiber hood</strong> (fiber chatri / punjabi hood)
                at the best factory-direct price from Kataayani Enterprises, Meerut. Our{" "}
                <strong>{product.brand} fiber chatri</strong> is made from premium FRP (Fiber
                Reinforced Plastic) — UV resistant. For the latest{" "}
                <strong>{product.brand} tractor fiber hood price</strong>, call{" "}
                <a href="tel:+919358273054" className="text-[#012d1d] font-bold hover:underline">
                  +91-9358273054
                </a>
                . Home delivery available all over India — order{" "}
                <strong>tractor fiber hood online</strong> via WhatsApp or call. Also available:
                Swaraj 744 fiber hood, Mahindra fiber chatri, Sonalika fiber hood, John Deere
                5050D fiber hood — all at best price with pan-India delivery.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
