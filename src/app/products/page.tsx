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
import { getAllProducts } from "@/lib/products";
import {
  SwarajLogo,
  MahindraLogo,
  JohnDeereLogo,
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
      "Best price tractor fiber hood, fiber chatri and punjabi hood for all tractor brands — Mahindra, Swaraj, Sonalika, John Deere, Eicher, New Holland, Massey Ferguson, Farmtrac, Powertrac, Solis, Deutz Fahr.",
    url: "https://kataayanienterprises.vercel.app/products",
    itemListElement: allProducts.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${p.brand} Tractor Fiber Hood Price`,
      url: `https://kataayanienterprises.vercel.app/products/${p.slug}`,
    })),
  };

  const brands = [
    { name: "Swaraj", slug: "swaraj-frp-canopy", Logo: SwarajLogo },
    { name: "Mahindra", slug: "mahindra-frp-canopy", Logo: MahindraLogo },
    { name: "John Deere", slug: "john-deere-frp-canopy", Logo: JohnDeereLogo },
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

        {/* ── H1 PAGE HEADER ── Keyword-rich, tells Google exactly what this page is about */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <h1 className="text-[26px] md:text-[36px] font-black text-[#012d1d] leading-tight mb-2">
              Tractor Fiber Hood Price — All Brands
            </h1>
            <p className="text-[14px] md:text-[16px] text-gray-600 max-w-[680px] mx-auto">
              Buy <strong>tractor fiber hood</strong> (punjabi hood / fiber chatri) online at best price.{" "}
              <strong>Mahindra, Swaraj 744/855, Sonalika, John Deere, Eicher, New Holland, Massey, Farmtrac</strong> —
              all brands available. Factory direct from <strong>Kataayani Enterprises, Meerut</strong>.
            </p>
            {/* Keyword anchor links — help Google understand keyword relevance per brand */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 text-[12px]">
              {[
                { label: "Swaraj Fiber Hood", slug: "swaraj-frp-canopy" },
                { label: "Mahindra Fiber Hood", slug: "mahindra-frp-canopy" },
                { label: "Sonalika Fiber Hood", slug: "sonalika-frp-canopy" },
                { label: "John Deere Fiber Hood", slug: "john-deere-frp-canopy" },
                { label: "Eicher Fiber Hood", slug: "eicher-frp-canopy" },
                { label: "New Holland Fiber Hood", slug: "new-holland-frp-canopy" },
                { label: "Massey Fiber Hood", slug: "massey-ferguson-frp-canopy" },
                { label: "Farmtrac Fiber Hood", slug: "farmtrac-frp-canopy" },
              ].map((b) => (
                <Link
                  key={b.slug}
                  href={`/products/${b.slug}`}
                  className="bg-[#f0faf5] text-[#012d1d] font-semibold px-3 py-1 rounded-full border border-[#012d1d]/10 hover:bg-[#012d1d] hover:text-white transition-colors"
                >
                  {b.label}
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Brand Logos Strip */}
        <ScrollReveal>
          <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.07)] p-[24px] mb-[48px] border border-white/50">
            <h2 className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] text-center mb-[20px] font-bold">
              Select Your Tractor Brand — Fiber Hood Price
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-[12px] items-center justify-center">
              {brands.map((brand) => {
                const LogoComponent = brand.Logo;
                return (
                  <Link
                    key={brand.slug}
                    href={`/products/${brand.slug}`}
                    className="group flex flex-col items-center justify-center bg-white/60 hover:bg-white border border-white/85 hover:border-primary/50 rounded-xl p-[12px] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 h-[96px] w-full"
                    title={`${brand.name} Tractor Fiber Hood Price`}
                  >
                    <div className="relative w-full h-[40px] flex items-center justify-center mb-1">
                      <div className="w-full h-full max-h-[38px] max-w-[90%] filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <LogoComponent />
                      </div>
                    </div>
                    <span className="text-[11px] text-on-surface-variant font-bold tracking-wider uppercase opacity-85 group-hover:text-primary transition-colors text-center truncate w-full">
                      {brand.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {allProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
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
              Kataayani Enterprises — Meerut (UP) — India's #1 <strong>tractor fiber hood</strong> (punjabi
              hood / fiber chatri) manufacturer. <strong>Swaraj 744 fiber hood price</strong>,{" "}
              <strong>Mahindra tractor fiber chatri price</strong>,{" "}
              <strong>Sonalika fiber hood price</strong>,{" "}
              <strong>John Deere 5050D fiber hood price</strong> — all at the best factory-direct rate.{" "}
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
