"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hello, I am interested in the ${product.brand} ${product.shortName} FRP canopy. Please share details and pricing.`;
    const whatsappUrl = `https://wa.me/919358273054?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-3 flex flex-col relative"
    >
      {/* Top Image Area */}
      <div className="relative aspect-[4/5] w-full bg-[#f4f4f4] rounded-[24px] overflow-hidden mb-4">
        
        {/* Animated Carousel Container */}
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentImageIndex}
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
                x: { type: "spring", stiffness: 380, damping: 38 },
                opacity: { duration: 0.25 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={product.images[currentImageIndex]?.src ?? "/placeholder.jpg"}
                alt={product.images[currentImageIndex]?.alt ?? product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
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
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentImageIndex ? "bg-[#318664] w-3" : "bg-[#c6ded3]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Heart Icon Button - placed outside overflow-hidden to allow particles to burst outward */}
      <button
        onClick={handleLike}
        className={`absolute top-[28px] right-[28px] p-2.5 rounded-full shadow-sm cursor-pointer transition-all duration-300 backdrop-blur-sm z-20 border flex items-center justify-center outline-none ${
          isLiked
            ? "bg-white border-white text-[#ff4b6e] scale-105"
            : "bg-black/30 hover:bg-black/45 border-white/10 text-white hover:scale-105"
        }`}
      >
        <motion.div
          animate={{
            scale: isLiked ? [1, 1.45, 0.85, 1.15, 1] : 1,
            rotate: isLiked ? [0, 15, -15, 0] : 0,
          }}
          transition={{
            duration: 0.45,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center"
        >
          <Heart
            className="w-4 h-4"
            fill={isLiked ? "currentColor" : "none"}
            strokeWidth={isLiked ? 0 : 2}
          />
        </motion.div>

        {/* Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0, 1.4, 0.8, 0],
                opacity: [1, 1, 0.6, 0],
                rotate: p.angle * (180 / Math.PI) - 90 + (Math.random() * 40 - 20),
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              style={{
                left: "50%",
                top: "50%",
                width: p.size,
                height: p.size,
                x: "-50%",
                y: "-50%",
              }}
            >
              <Heart
                className="w-full h-full"
                style={{ color: p.color, fill: p.color }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </button>

      {/* Content Area */}
      <div className="px-2 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-[#012d1d] text-[22px] font-bold mb-1 tracking-wide">
            {product.brand}
          </h3>
          <div className="text-[16px] font-medium text-gray-500 mb-5">
            Enquire for Price
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pb-1">
          <div
            className="w-full bg-[#2a2a2a] text-white py-[14px] rounded-[24px] text-[15px] font-medium hover:bg-black transition-colors text-center"
          >
            Buy Now
          </div>
        </div>
      </div>
    </Link>
  );
}
