import type { Metadata } from "next";
export { metadata } from "./metadata";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
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
      <Navbar />
      <main className="flex-grow pt-28 w-full max-w-[1280px] mx-auto px-[24px] pb-12">

        {/* Brand Logos Strip */}
        <ScrollReveal>
          <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.07)] p-[24px] mb-[48px] border border-white/50">
            <h2 className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] text-center mb-[20px] font-bold">
              Select your Tractor Brand
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-[12px] items-center justify-center">
              {brands.map((brand) => {
                const LogoComponent = brand.Logo;
                return (
                  <Link
                    key={brand.slug}
                    href={`/products/${brand.slug}`}
                    className="group flex flex-col items-center justify-center bg-white/60 hover:bg-white border border-white/85 hover:border-primary/50 rounded-xl p-[12px] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 h-[96px] w-full"
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
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
