import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
export { metadata } from "./metadata";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";
import { GradientText } from "@/components/ui/gradient-text-fill";
import { Hero } from "@/components/ui/hero-designali-demo";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { getAllProducts } from "@/lib/products";
import {
  SwarajLogo,
  MahindraLogo,
  SonalikaLogo,
  EicherLogo,
  NewHollandLogo,
  MasseyFergusonLogo,
  DeutzFahrLogo,
  FarmtracLogo,
  SolisLogo,
  PowertracLogo
} from "@/components/ui/BrandLogos";

export default function ProductsPage() {
  const allProducts = getAllProducts();

  // ─── JSON-LD PRODUCT LIST SCHEMA (Dynamic for 11 Brands) ───────────────────
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tractor Fiber Hood (Punjabi Hood / Fiber Chatri) — All Brands",
    description:
      "Best price tractor fiber hood, fiber chatri and punjabi hood for all tractor brands — Mahindra, Swaraj, Sonalika, Eicher, New Holland, Massey Ferguson, Farmtrac, Powertrac, Solis, Deutz Fahr.",
    url: `${SITE_URL}/products`,
    itemListElement: allProducts.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${p.brand} Tractor Fiber Hood Price`,
      url: `${SITE_URL}/products/${p.slug}`,
    })),
  };

  const brands = [
    { name: "Swaraj", slug: "swaraj-frp-canopy", Logo: SwarajLogo },
    { name: "Mahindra", slug: "mahindra-frp-canopy", Logo: MahindraLogo },
    { name: "Sonalika", slug: "sonalika-frp-canopy", Logo: SonalikaLogo },
    { name: "Eicher", slug: "eicher-frp-canopy", Logo: EicherLogo },
    { name: "New Holland", slug: "new-holland-frp-canopy", Logo: NewHollandLogo },
    { name: "Massey Ferguson", slug: "massey-ferguson-frp-canopy", Logo: MasseyFergusonLogo },
    { name: "Deutz Fahr", slug: "deutz-fahr-frp-canopy", Logo: DeutzFahrLogo },
    { name: "Farmtrac", slug: "farmtrac-frp-canopy", Logo: FarmtracLogo },
    { name: "Solis", slug: "solis-frp-canopy", Logo: SolisLogo },
    { name: "Powertrac", slug: "powertrac-frp-canopy", Logo: PowertracLogo }
  ];

  return (
    <>
      {/* JSON-LD Product List Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />

      <Navbar />
      <main className="flex-grow pt-28 w-full max-w-[1280px] mx-auto px-[24px] pb-12">
        {/* Visual Breadcrumb Trail */}
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Products", url: "/products" }]} />

        {/* ── NEW HERO SECTION WITH CANVAS AND ANIMATIONS ── */}
        <Hero />

        {/* Brand Logos Strip */}
        <ScrollReveal>
          <div className="mb-6">
            <LogoCloud brands={brands} />
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {allProducts.map((product, idx) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} priority={idx < 6} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── SEO FOOTER TEXT ── Keyword-rich paragraph below product grid */}
        <ScrollReveal>
          <div className="mt-16 bg-gradient-to-br from-[#f0faf5] to-white border border-[#012d1d]/10 rounded-2xl p-8 text-center">
            <h2 className="text-[20px] md:text-[24px] font-black text-[#012d1d] mb-3">
              India&apos;s Best Tractor Fiber Hood Manufacturer
            </h2>
            <p className="text-[14px] text-gray-600 max-w-[720px] mx-auto leading-relaxed mb-4">
              Katayayani Enterprises — Meerut (UP) — India's #1 <strong>tractor fiber hood</strong> (punjabi
              hood / fiber chatri) manufacturer. <strong>Swaraj 744 fiber hood price</strong>,{" "}
              <strong>Mahindra tractor fiber chatri price</strong>,{" "}
              <strong>Sonalika fiber hood price</strong> — all at the best factory-direct rate.{" "}
              Order <strong>tractor fiber hood online</strong> with home delivery anywhere in India.{" "}
              <strong>Eicher tractor fiber hood</strong>,{" "}
              <strong>Farmtrac fiber hood</strong>, <strong>New Holland tractor fiber hood</strong>,{" "}
              <strong>Massey tractor fiber hood</strong> — all brands available.
            </p>
            <a
              href="tel:+919358273054"
              className="inline-flex items-center gap-2 bg-[#012d1d] text-white font-bold px-8 py-4 rounded-full hover:bg-[#104e33] transition-all shadow-md"
            >
              📞 Call for Price: +91-9358273054
            </a>
          </div>
        </ScrollReveal>

      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
