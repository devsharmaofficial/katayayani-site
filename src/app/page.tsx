import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import dynamic from "next/dynamic";
import { getFeaturedProducts } from "@/lib/products";
import { getAllBrands } from "@/lib/brands";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import HomepageSEOContent from "@/components/seo/HomepageSEOContent";
import { HeroSlider } from "@/components/ui/hero-slider";

// Dynamically import heavy UI components to reduce unused JavaScript
const TextMarquee = dynamic(() => import("@/components/ui/text-marque").then(m => m.TextMarquee));
const ScrollReveal = dynamic(() => import("@/components/motion/ScrollReveal"));
const InfiniteSlider = dynamic(() => import("@/components/ui/infinite-slider").then(m => m.InfiniteSlider));
const Testimonials = dynamic(() => import("@/components/ui/testimonials-columns-1").then(m => m.Testimonials));
const ProductCard = dynamic(() => import("@/components/ui/ProductCard"));

const indianStates = [
  "Maharashtra", "Andhra Pradesh", "Rajasthan", "Tamil Nadu", "Bihar", 
  "Uttar Pradesh", "Mizoram", "Assam", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Telangana", "Chhattisgarh", "Gujarat", "Punjab", 
  "Haryana", "West Bengal", "Odisha", "Jharkhand", "Uttarakhand", 
  "Himachal Pradesh", "Goa", "Tripura", "Meghalaya", "Manipur", 
  "Nagaland", "Arunachal Pradesh", "Sikkim"
];

import { preload } from "react-dom";

export default function HomePage() {
  preload("/hero-slider/tractor-fiber-hood-manufacturer-banner-1.avif", { as: "image", fetchPriority: "high" });
  
  const featuredProducts = getFeaturedProducts();
  const brands = getAllBrands();

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-0">
        <section className="relative w-full bg-white pt-[96px] md:pt-[100px] pb-[40px] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
             <HeroSlider />
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
                  Tractor Fiber Hood Supply <span className="font-semibold text-secondary">All Over India</span>
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
              <GetStartedButton href="/products" text="View All Fiber Hoods" />
            </div>
          </ScrollReveal>
          </div>
        </section>


        {/* ================================================================
            TESTIMONIALS SECTION
            ================================================================ */}
        <Testimonials />

        {/* ================================================================
            SEO CONTENT — H1, Brand Grid, About, FAQ
            Placed at bottom so it doesn't interrupt the visual flow
            ================================================================ */}
        <HomepageSEOContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
