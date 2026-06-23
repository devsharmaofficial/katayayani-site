"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, MessageCircle, ArrowUpRight, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";
import { getAllProducts } from "@/lib/products";

export default function GalleryPage() {
  const allProducts = getAllProducts();

  // Dynamically compile all images from our products
  const galleryItems = useMemo(() => {
    interface GalleryItem {
      id: string;
      src: string;
      alt: string;
      brand: string;
      brandSlug: string;
      productName: string;
      productSlug: string;
      isHero: boolean;
    }
    const items: GalleryItem[] = [];
    allProducts.forEach((product) => {
      product.images.forEach((img, idx) => {
        items.push({
          id: `${product.slug}-${idx}`,
          src: img.src,
          alt: img.alt,
          brand: product.brand,
          brandSlug: product.brandSlug,
          productName: product.name,
          productSlug: product.slug,
          isHero: idx === 0,
        });
      });
    });
    // Shuffle or sort so it looks balanced, keeping hero images slightly higher or just as they are
    return items;
  }, [allProducts]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null || galleryItems.length <= 1) return;
    setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null || galleryItems.length <= 1) return;
    setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev! + 1));
  };

  const activeItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;
  const whatsappUrl = activeItem
    ? `https://wa.me/919358273054?text=${encodeURIComponent(
        `Hello, I saw this installation image of ${activeItem.brand} FRP canopy in your gallery (${activeItem.alt}). Please share details and pricing.`
      )}`
    : "";

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 md:pt-36 w-full max-w-[1280px] mx-auto px-[24px] pb-24">
        {/* Gallery Grid */}
        <StaggerContainer className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, idx) => (
            <StaggerItem key={item.id} className="break-inside-avoid">
              <div
                onClick={() => setLightboxIndex(idx)}
                className="group relative bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/60 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:min-h-[200px]">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex justify-between items-end text-white">
                    <div>
                      <span className="inline-block bg-primary text-on-primary px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider mb-2">
                        {item.brand}
                      </span>
                      <h3 className="text-title-sm font-bold truncate max-w-[180px] drop-shadow-md">
                        {item.productName.replace(" FRP Fiber Roof Canopy", "")}
                      </h3>
                      <p className="text-[11px] text-gray-300 font-medium line-clamp-1 opacity-90">
                        {item.alt}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Search className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 md:p-8"
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-all border border-white/10 z-50 cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full max-w-[1000px] flex flex-col md:flex-row gap-6 bg-[#121212] rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
                
                {/* Left: Image Carousel Area */}
                <div className="relative flex-grow flex items-center justify-center aspect-[4/3] md:aspect-auto md:h-[550px] bg-black/40 rounded-2xl overflow-hidden group">
                  <img
                    src={activeItem.src}
                    alt={activeItem.alt}
                    className="max-h-full max-w-full object-contain"
                  />

                  {/* Navigation Arrows */}
                  {galleryItems.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-4 w-11 h-11 rounded-full bg-black/50 hover:bg-black text-white border border-white/10 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-4 w-11 h-11 rounded-full bg-black/50 hover:bg-black text-white border border-white/10 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Right: Info and CTA Area */}
                <div className="w-full md:w-[320px] flex flex-col justify-between text-white py-2">
                  <div>
                    <span className="inline-block bg-primary text-on-primary px-3 py-1 rounded-full text-label-xs font-bold uppercase tracking-wider mb-4">
                      {activeItem.brand}
                    </span>
                    
                    <h2 className="text-headline-sm font-black mb-3">
                      {activeItem.brand} FRP Canopy
                    </h2>
                    
                    <p className="text-body-md text-gray-400 mb-6 leading-relaxed">
                      {activeItem.alt}
                    </p>

                    <div className="divider-gold opacity-30 mb-6" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-label-sm text-gray-400">
                        <span>Compatibility</span>
                        <span className="text-white font-bold">All {activeItem.brand} Models</span>
                      </div>
                      <div className="flex justify-between text-label-sm text-gray-400">
                        <span>Material</span>
                        <span className="text-white font-bold">Double-Layer FRP</span>
                      </div>
                      <div className="flex justify-between text-label-sm text-gray-400">
                        <span>Fittings</span>
                        <span className="text-white font-bold">No-Vibration Bolts</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-label-md px-[24px] py-[14px] rounded-full transition-all font-bold shadow-md hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-[18px] h-[18px]" />
                      WhatsApp Inquiry
                    </a>
                    
                    <Link
                      href={`/products/${activeItem.productSlug}`}
                      className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 text-label-md px-[24px] py-[14px] rounded-full transition-all font-bold hover:-translate-y-0.5"
                    >
                      View Product Details
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>

              {/* Slider Info Footer */}
              <div className="text-white/60 text-label-sm mt-4">
                Photo {lightboxIndex + 1} of {galleryItems.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
