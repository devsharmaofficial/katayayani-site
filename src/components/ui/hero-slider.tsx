"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const HERO_IMAGE_PATH = "/hero-slider/tractor-fiber-hood-manufacturer-banner-1.avif";

const heroBanners = [
  {
    src: HERO_IMAGE_PATH,
    alt: "Premium Swaraj & Mahindra Tractor Fiber Hood Manufacturer India"
  },
  {
    src: "/hero-slider/best-tractor-fiber-chatri-price-banner-2.avif",
    alt: "Best Price Tractor Fiber Chatri & Canopy Manufacturer Meerut"
  },
  {
    src: "/hero-slider/punjabi-hood-canopy-manufacturer-banner-3.avif",
    alt: "Heavy Duty Punjabi Hood Fiber Chatri Canopy Factory"
  },
  {
    src: "/hero-slider/premium-frp-canopy-factory-banner-4.avif",
    alt: "High Quality Tractor Fiber Hood Roof for All Tractor Models"
  },
  {
    src: "/hero-slider/heavy-duty-tractor-fiber-hood-banner-5.avif",
    alt: "Weatherproof Heavy Duty Tractor Fiber Hood and Roof"
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Static LCP img stays visible until the first Next.js Image fires onLoad
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % 5;
        setLoadedSlides((loaded) => {
          if (loaded.has(next)) return loaded;
          const copy = new Set(loaded);
          copy.add(next);
          return copy;
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
    setLoadedSlides((loaded) => {
      if (loaded.has(idx)) return loaded;
      const copy = new Set(loaded);
      copy.add(idx);
      return copy;
    });
  }, []);

  // Encoded URL for Next.js image optimizer (proper sizing for mobile)
  const encPath = encodeURIComponent(HERO_IMAGE_PATH);

  return (
    <div className="w-full flex flex-col relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] bg-white mt-2">
      {/* Image Section */}
      <div className="w-full relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9] lg:aspect-[2.5/1] xl:aspect-[2.8/1] bg-[#f8f8f8]">

        {/* Static LCP image — always visible until Next.js Image slot 0 fires onLoad.
            Uses /_next/image srcset so the browser downloads the correctly-sized image
            that matches the preload link in layout.tsx. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="hero-lcp-image"
          src={`/_next/image?url=${encPath}&w=828&q=80`}
          srcSet={`/_next/image?url=${encPath}&w=640&q=80 640w, /_next/image?url=${encPath}&w=828&q=80 828w, /_next/image?url=${encPath}&w=1080&q=80 1080w, /_next/image?url=${encPath}&w=1200&q=80 1200w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1300px"
          alt="Premium Swaraj & Mahindra Tractor Fiber Hood Manufacturer India"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: firstLoaded ? 0 : 1,
            zIndex: firstLoaded ? -1 : 20,
            transition: "opacity 0.3s ease",
          }}
          width={828}
          height={466}
        />

        {/* Interactive slides */}
        {heroBanners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {loadedSlides.has(index) && (
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1300px"
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
                quality={index === 0 ? 80 : 60}
                onLoad={index === 0 ? () => setFirstLoaded(true) : undefined}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Bottom Bar: Pagination and Buttons */}
      <div className="w-full relative px-5 py-4 md:px-8 md:py-6 bg-white flex flex-col md:flex-row items-center justify-center gap-5 border-t border-black/5">
          {/* Pagination dashes */}
          <div className="flex gap-2.5 w-full justify-center md:absolute md:left-8 md:w-auto">
            {[0, 1, 2, 3, 4].map((idx) => (
              <button 
                key={idx} 
                onClick={() => goToSlide(idx)}
                className={`h-[5px] cursor-pointer transition-all duration-300 rounded-full ${idx === currentSlide ? 'w-10 sm:w-12 bg-[#012d1d]' : 'w-5 sm:w-6 bg-black/10 hover:bg-black/20'}`} 
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 w-full md:w-auto z-10">
              <div className="flex-1 md:flex-none flex justify-center">
                <InteractiveHoverButton 
                  href="/products" 
                  text="Buy Now" 
                  className="w-full justify-center"
                />
              </div>
              <Link href="/contact" className="flex-1 md:flex-none text-center px-6 md:px-8 py-3 bg-white text-[#012d1d] font-bold border-2 border-[#012d1d]/10 rounded-full hover:bg-black/5 transition-all shadow-sm text-[15px] tracking-wide h-[54px] flex items-center justify-center">
                  Request Quote
              </Link>
          </div>
      </div>
    </div>
  );
}
