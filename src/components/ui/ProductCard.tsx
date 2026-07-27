"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { useState, useEffect, useRef } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string; angle: number }[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [autoplayKey, setAutoplayKey] = useState(0);

  useEffect(() => {
    if (product.images.length <= 1) return;
    
    // Create a unique, deterministic interval for each product based on its ID
    const idHash = product.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const uniqueInterval = 3500 + (idHash % 5) * 500; // Will result in 3500, 4000, 4500, 5000, or 5500 ms

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, uniqueInterval);
    return () => clearInterval(interval);
  }, [product.images.length, autoplayKey, product.id]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images.length <= 1) return;
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    setAutoplayKey((k) => k + 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images.length <= 1) return;
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setAutoplayKey((k) => k + 1);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    
    if (nextLiked) {
      const colors = ["#ff4b6e", "#ff85a1", "#ff0a54", "#ff477e", "#ff5c8a", "#ff7096"];
      const newParticles = Array.from({ length: 10 }).map((_, i) => {
        const angle = (i * 36 + Math.random() * 15) * (Math.PI / 180);
        const distance = 35 + Math.random() * 35;
        return {
          id: Math.random(),
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: angle,
        };
      });
      setParticles(newParticles);
      
      setTimeout(() => {
        setParticles([]);
      }, 800);
    }
  };



  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-[32px] shadow-sm border border-gray-100/50 hover:shadow-lg transition-all duration-300 p-4 flex flex-col relative w-full max-w-[420px] mx-auto md:max-w-none"
    >
      <div className="relative aspect-[4/3] w-full bg-[#f4f4f4] rounded-[24px] overflow-hidden mb-4">
        
        {/* CSS-based Carousel — only renders prev/current/next slides */}
        <div className="relative w-full h-full overflow-hidden">
          {product.images.map((img, idx) => {
            const total = product.images.length;
            // Only render prev, current, and next to avoid loading all images
            const isPrev = idx === (currentImageIndex - 1 + total) % total;
            const isCurr = idx === currentImageIndex;
            const isNext = idx === (currentImageIndex + 1) % total;
            if (!isPrev && !isCurr && !isNext && total > 3) return null;

            const offset = idx - currentImageIndex;
            // Wrap around for prev/next at edges
            const wrappedOffset = offset > total / 2 ? offset - total : offset < -total / 2 ? offset + total : offset;

            return (
              <div
                key={idx}
                className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${wrappedOffset * 100}%)`,
                  opacity: isCurr ? 1 : 0.85,
                }}
              >
                <Image
                  src={img.src ?? "/placeholder.jpg"}
                  alt={img.alt ?? product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                  quality={60}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
        

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto z-20 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-200/50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto z-20 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-auto">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDirection(idx > currentImageIndex ? 1 : -1);
                  setCurrentImageIndex(idx);
                  setAutoplayKey((k) => k + 1);
                }}
                className="p-2 -m-2 cursor-pointer flex items-center justify-center outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? "bg-[#318664] w-3" : "bg-[#c6ded3] w-1.5"
                }`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Heart Icon Button - placed outside overflow-hidden to allow particles to burst outward */}
      <button
        onClick={handleLike}
        className={`absolute top-[28px] left-[28px] p-2.5 rounded-full shadow-sm cursor-pointer transition-all duration-300 backdrop-blur-sm z-20 border flex items-center justify-center outline-none ${
          isLiked
            ? "bg-white border-white text-[#ff4b6e] scale-105"
            : "bg-white/50 hover:bg-white/70 border-white/30 text-white hover:scale-105"
        }`}
        aria-label={isLiked ? "Unlike product" : "Like product"}
      >
        {/* Pure CSS heart bounce animation */}
        <span
          className="flex items-center justify-center"
          style={{
            animation: isLiked ? "heartBounce 0.45s ease-in-out" : "none",
          }}
        >
          <Heart
            className="w-4 h-4"
            fill={isLiked ? "currentColor" : "none"}
            strokeWidth={isLiked ? 0 : 2}
          />
        </span>

        {/* CSS Particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              width: p.size,
              height: p.size,
              animation: `particle 0.7s ease-out forwards`,
              "--tx": `${p.x}px`,
              "--ty": `${p.y}px`,
              color: p.color,
              fill: p.color,
            } as React.CSSProperties}
          >
            <Heart className="w-full h-full" style={{ color: p.color, fill: p.color }} />
          </span>
        ))}
      </button>

      {/* Content Area */}
      <div className="px-1 flex-grow flex flex-col justify-between">
        <div>


          {/* Title Row */}
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-gray-900 text-[18px] md:text-[20px] font-bold tracking-tight w-full">
              {product.shortName}
            </h3>
          </div>

          {/* Short Description */}
          <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 min-h-[40px] mt-1.5">
            {product.shortDescription}
          </p>
        </div>

        {/* Price Row */}
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 px-0.5">
          <span className="text-[20px] font-black text-[#318664]">₹13,500</span>
          <span className="text-[13px] text-gray-500 line-through">₹18,000</span>
          <span className="text-[11px] font-bold text-[#318664] bg-[#318664]/10 px-1.5 py-0.5 rounded">25% OFF</span>
          <span className="text-[11px] text-gray-500 font-semibold block w-full mt-0.5">Free Delivery • Inclusive of GST</span>
        </div>

        {/* CTA Button */}
        <div className="mt-4 pb-1">
          <div
            className="w-full bg-[#18181b] hover:bg-black text-white py-3.5 rounded-2xl text-[14px] font-semibold text-center transition-all duration-200 shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Buy Now
          </div>
        </div>
      </div>
    </Link>
  );
}
