import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Truck,
  Award,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import dynamic from "next/dynamic";
import { getAllProducts } from "@/lib/products";
import { getAllBrands } from "@/lib/brands";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import HomepageSEOContent from "@/components/seo/HomepageSEOContent";
import { HeroSlider } from "@/components/ui/hero-slider";
const YouTubeSection = dynamic(() => import("@/components/sections/YouTubeSection"));
const InstagramSection = dynamic(() => import("@/components/sections/InstagramSection"));

// Dynamically import heavy UI components to reduce unused JavaScript
const TextMarquee = dynamic(() => import("@/components/ui/text-marque").then(m => m.TextMarquee));
const ScrollReveal = dynamic(() => import("@/components/motion/ScrollReveal")); // Kept SSR for above-the-fold content
const InfiniteSlider = dynamic(() => import("@/components/ui/infinite-slider").then(m => m.InfiniteSlider));
const Testimonials = dynamic(() => import("@/components/ui/testimonials-columns-1").then(m => m.Testimonials));
const ProductCard = dynamic(() => import("@/components/ui/ProductCard"));
const VideoShowcaseTeaser = dynamic(() => import("@/components/ui/video-showcase-teaser").then(m => m.VideoShowcaseTeaser));

const indianStates = [
  "Punjab", "Haryana", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh", 
  "Gujarat", "Maharashtra", "Andhra Pradesh", "Karnataka", "Tamil Nadu", 
  "Telangana", "Bihar", "West Bengal", "Odisha"
];


import ReactDOM from "react-dom";

export default function HomePage() {
  const allProducts = getAllProducts();
  const brands = getAllBrands();
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-0">
        <section className="relative w-full bg-gradient-to-b from-[#f9fbf9] via-white to-white pt-[96px] md:pt-[110px] pb-[36px] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
            {/* Primary Hero Heading — Dominant Semantic Anchor for Google Ranking */}
            <div className="text-center max-w-[960px] mx-auto mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 bg-[#012d1d]/8 border border-[#012d1d]/15 text-[#012d1d] text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Factory-Direct Manufacturer &bull; Meerut, Uttar Pradesh
              </div>
              <h1 className="text-[30px] sm:text-[42px] md:text-[52px] lg:text-[58px] font-black text-[#012d1d] tracking-tight leading-[1.1] mb-4">
                Tractor Fiber Hood Price &amp; Punjabi Hood Manufacturer
              </h1>
              <p className="text-[15px] sm:text-[17px] md:text-[19px] text-gray-700 font-medium max-w-[820px] mx-auto leading-relaxed mb-6">
                India&apos;s #1 factory manufacturer of heavy-duty FRP <strong className="text-[#012d1d]">tractor fiber hood</strong>, <strong className="text-[#012d1d]">punjabi hood</strong>, and <strong className="text-[#012d1d]">fiber chatri</strong>. Precision custom fitment for Swaraj 744/855, Mahindra, Sonalika, Massey &amp; all tractor brands at best direct factory rates with safe all-India home delivery.
              </p>

              {/* Quick Action CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm font-semibold mb-6">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#012d1d] text-white px-7 py-3.5 rounded-full hover:bg-[#104e33] transition-all shadow-md hover:shadow-lg text-[14px]"
                >
                  Explore All Fiber Hoods
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/919358273054?text=Hello%20Katayayani%20Enterprises%2C%20I%20am%20interested%20in%20tractor%20fiber%20hood%20prices%20and%20models."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-[#012d1d] px-6 py-3.5 rounded-full hover:bg-[#20ba59] hover:text-white transition-all shadow-md font-bold text-[14px]"
                >
                  <MessageCircle size={16} />
                  WhatsApp Catalog
                </a>
                <a
                  href="tel:+919358273054"
                  className="inline-flex items-center gap-2 bg-white text-[#012d1d] border border-gray-300 px-6 py-3.5 rounded-full hover:bg-gray-50 transition-all shadow-2xs text-[14px]"
                >
                  <Phone size={16} />
                  Call: +91-9358273054
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] sm:text-[13px] text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><Truck size={14} className="text-[#012d1d]" /> Pan-India Home Delivery</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#012d1d]" /> 100% Genuine Heavy FRP</span>
                <span className="flex items-center gap-1.5"><Award size={14} className="text-[#012d1d]" /> Factory Price (₹14,500 Incl. GST)</span>
              </div>
            </div>

            <HeroSlider />
          </div>
        </section>

        {/* ================================================================
            MARQUEE SECTION
            ================================================================ */}
        <section
          className="bg-[#012d1d] py-[10px] md:py-[16px] overflow-hidden border-y border-[#795900]/25 shadow-md relative text-marquee-fixed"
          style={{ ['--slider-duration' as string]: '10s' } as React.CSSProperties}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none" />
          <TextMarquee
            baseVelocity={-1.5}
            className="text-[11px] md:text-[16px] font-bold text-white/90 px-[10px] md:px-[18px] uppercase tracking-[0.06em] md:tracking-[0.12em]"
          >
            <span className="text-[#ffc641]">🔥 Best Tractor Fiber Hood</span>
            <span className="opacity-40 mx-2">•</span>
            <span>Tractor Punjab Hood</span>
            <span className="opacity-40 mx-2">•</span>
            <span className="text-[#ffc641]">Tractor Fiber Chatri</span>
            <span className="opacity-40 mx-2">•</span>
            <span>Tractor Tractor Fiber Hood</span>
            <span className="opacity-40 mx-2">•</span>
            <span className="text-[#ffc641]">Tractor FRP Hood</span>
            <span className="opacity-40 mx-2">•</span>
            <span>Tractor Fiber Roof Price</span>
            <span className="opacity-40 mx-2">•</span>
            <span className="text-[#ffc641]">Punjabi Hood Price</span>
            <span className="opacity-40 mx-2">•</span>
            <span>Swaraj 744 Fiber Hood</span>
            <span className="opacity-40 mx-2">•</span>
            <span className="text-[#ffc641]">Mahindra Fiber Chatri</span>
            <span className="opacity-40 mx-2">•</span>
            <span>Sonalika Fiber Hood</span>
            <span className="opacity-40 mx-2">•</span>
            <span className="text-[#ffc641]">Massey Ferguson FRP Hood</span>
            <span className="opacity-40 mx-2">•</span>
            <span>Home Delivery All India</span>
            <span className="opacity-40 mx-2">•</span>
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
            ALL PRODUCTS SLIDER
            ================================================================ */}
        <section
          className="py-[48px] bg-transparent"
          aria-label="Tractor Fiber Hood Products — All Brands"
        >
          <div className="max-w-[1280px] mx-auto px-[24px]">
            <ScrollReveal>
              <div className="text-center mb-[24px]">
                <h2 className="text-headline-md text-primary">
                  Tractor <span className="font-semibold text-secondary">Fiber Hood</span> — All Brands
                </h2>
                <p className="text-[14px] text-gray-500 mt-2 max-w-[520px] mx-auto">
                  Best price fiber hood (punjabi hood / fiber chatri) for Swaraj, Mahindra, Sonalika, Eicher, New Holland, Massey &amp; more. Home delivery all over India.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Full-width slider — NO ScrollReveal wrapper to prevent animation stuck bug */}
          <div className="relative w-full py-4 overflow-hidden">
            <InfiniteSlider
              gap={24}
              duration={40}
              durationOnHover={120}
              className="py-4"
            >
              {allProducts.slice(0, 8).map((product, idx) => (
                <div
                  key={product.id}
                  className="w-[290px] min-[375px]:w-[320px] sm:w-[350px] md:w-[370px] shrink-0"
                >
                  <ProductCard product={product} priority={false} />
                </div>
              ))}
            </InfiniteSlider>
          </div>

          <ScrollReveal>
            <div className="text-center mt-[36px]">
              <GetStartedButton href="/products" text="View All Fiber Hoods" />
            </div>
          </ScrollReveal>
        </section>

        {/* ================================================================
            VIDEO SHOWCASE TEASER
            ================================================================ */}
        <ScrollReveal>
          <VideoShowcaseTeaser />
        </ScrollReveal>


        {/* ================================================================
            YOUTUBE SECTION
            ================================================================ */}
        <YouTubeSection />

        {/* ================================================================
            INSTAGRAM SECTION
            ================================================================ */}
        <InstagramSection />

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
