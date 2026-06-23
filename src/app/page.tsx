"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ProductCard from "@/components/ui/ProductCard";

import { TextMarquee } from "@/components/ui/text-marque";
import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";
import { getFeaturedProducts } from "@/lib/products";
import { getAllBrands } from "@/lib/brands";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const indianStates = [
  "Maharashtra", "Andhra Pradesh", "Rajasthan", "Tamil Nadu", "Bihar", 
  "Uttar Pradesh", "Mizoram", "Assam", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Telangana", "Chhattisgarh", "Gujarat", "Punjab", 
  "Haryana", "West Bengal", "Odisha", "Jharkhand", "Uttarakhand", 
  "Himachal Pradesh", "Goa", "Tripura", "Meghalaya", "Manipur", 
  "Nagaland", "Arunachal Pradesh", "Sikkim"
];

const circularRevealItems = [
  {
    text: "PREMIUM QUALITY",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&h=600&q=80",
  },
  {
    text: "HEAVY DUTY FRP",
    image: "https://images.unsplash.com/photo-1599873979606-2f63e5e7ed8c?auto=format&fit=crop&w=600&h=600&q=80",
  },
  {
    text: "ALL WEATHER SHIELD",
    image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=600&h=600&q=80",
  },
  {
    text: "OEM PRECISION FIT",
    image: "https://images.unsplash.com/photo-1589923188900-85dae4400f7e?auto=format&fit=crop&w=600&h=600&q=80",
  },
];

const circularCenterText = (
  <div className="text-center select-none">
    <div className="text-[10px] uppercase tracking-widest text-[#795900] font-black mb-1">
      Katyayani
    </div>
    <div className="text-xl font-black text-[#012d1d] leading-none">
      FIBRE ROOFS
    </div>
    <div className="text-[9px] text-[#414844] uppercase font-bold mt-1.5 tracking-wider">
      Premium Canopies
    </div>
  </div>
);

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const brands = getAllBrands();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-0">
        <section className="relative w-full bg-white pt-[96px] md:pt-[100px] pb-[40px] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
             
             {/* Full Width Auto-scrolling Image Frame with Action Bar */}
             <div className="w-full flex flex-col relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] bg-white mt-2">
                
                {/* Image Section */}
                <div className="w-full relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9] lg:aspect-[2.5/1] xl:aspect-[2.8/1] bg-[#f8f8f8]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Image 
                        src={`/hero-slider/slide-${currentSlide + 1}.avif`} 
                        alt={`Featured Banner ${currentSlide + 1}`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
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
          </div>
        </section>

        {/* ================================================================
            MARQUEE SECTION
            ================================================================ */}
        <section className="bg-gradient-to-r from-[#012d1d] via-[#104e33] to-[#012d1d] py-[22px] overflow-hidden border-y border-[#795900]/25 shadow-md relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none" />
          <TextMarquee
            baseVelocity={-1.5}
            className="text-[22px] md:text-[26px] font-extrabold text-white/90 px-[20px] uppercase tracking-widest"
          >
            <span className="text-[#ffc641]">🔥 BEST PRICE TRACTOR FIBER HOOD IN INDIA</span> &nbsp; • &nbsp; 
            <span>PUNJABI TRACTOR HOOD</span> &nbsp; • &nbsp; 
            <span className="text-[#ffc641]">FIBER CHATRI — ALL BRANDS</span> &nbsp; • &nbsp; 
            <span>SWARAJ 744/855 • MAHINDRA • SONALIKA</span> &nbsp; • &nbsp; 
            <span className="text-[#ffc641]">HOME DELIVERY ALL OVER INDIA</span> &nbsp; • &nbsp;
            <span>3-YEAR WARRANTY</span> &nbsp; • &nbsp;
          </TextMarquee>
        </section>



        {/* ================================================================
            SUPPLY NETWORK / STATES SLIDER
            ================================================================ */}
        <section className="relative py-[36px] md:py-[48px] overflow-hidden bg-transparent">
          <div className="max-w-[1280px] mx-auto px-[24px]">
            <ScrollReveal>
              <div className="text-center mb-[24px]">
                <h2 className="text-headline-md text-primary">
                  We Supply <span className="font-semibold text-secondary">All Over India</span>
                </h2>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="relative w-full py-2.5 md:py-4 border-y border-primary/10">
              <InfiniteSlider gap={40} duration={50} durationOnHover={20}>
                {indianStates.map((state) => (
                  <span
                    key={state}
                    className="text-lg md:text-3xl font-bold tracking-tight text-black/90 uppercase whitespace-nowrap hover:opacity-75 transition-opacity duration-300 select-none"
                  >
                    {state}
                  </span>
                ))}
              </InfiniteSlider>
            </div>
          </ScrollReveal>
        </section>

        {/* ================================================================
            FEATURED PRODUCTS
            ================================================================ */}
        <section className="py-[48px] bg-transparent">
          <div className="max-w-[1280px] mx-auto px-[24px]">
            <ScrollReveal>
              <div className="text-center mb-[24px]">
                <h2 className="text-headline-md text-primary">
                  Tractor <span className="font-semibold text-secondary">Fiber Hood</span> — All Brands
                </h2>
                <p className="text-sm text-gray-500 mt-2">Punjabi Hood | Fiber Chatri | Best Price in India</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative w-full py-4 overflow-hidden">
                <InfiniteSlider gap={24} duration={35} durationOnHover={300} className="py-4">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="w-[290px] min-[375px]:w-[320px] sm:w-[350px] md:w-[370px] shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </InfiniteSlider>
              </div>
            </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mt-[48px]">
              <GetStartedButton href="/products" text="View All Products" />
            </div>
          </ScrollReveal>
          </div>
        </section>


        {/* ================================================================
            TESTIMONIALS SECTION
            ================================================================ */}
        <Testimonials />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
