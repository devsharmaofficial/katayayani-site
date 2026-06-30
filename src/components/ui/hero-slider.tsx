"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const heroBanners = [
  {
    src: "/hero-slider/tractor-fiber-hood-manufacturer-banner-1.avif",
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
    alt: "High Quality FRP Canopy Roof for All Tractor Models"
  },
  {
    src: "/hero-slider/heavy-duty-tractor-fiber-hood-banner-5.avif",
    alt: "Weatherproof Heavy Duty Tractor Fiber Hood and Roof"
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] bg-white mt-2">
      {/* Image Section */}
      <div className="w-full relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9] lg:aspect-[2.5/1] xl:aspect-[2.8/1] bg-[#f8f8f8]">
        {heroBanners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image 
              src={banner.src} 
              alt={banner.alt}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1300px"
              priority={index === 0}
              quality={70}
            />
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
                onClick={() => setCurrentSlide(idx)}
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
