import React from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type BrandLogo = {
  name: string;
  slug: string;
  Logo: React.FC;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  brands: BrandLogo[];
};

export function LogoCloud({ brands, className, ...props }: LogoCloudProps) {
  return (
    <div className="w-full">
      <section className="relative mx-auto grid max-w-7xl">
        <div
          className={cn(
            "relative grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 border-x border-[#012d1d]/10",
            className
          )}
          {...props}
        >
          <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-[#012d1d]/10" />

          {brands.map((brand, index) => {
            const isLastInRowMd = (index + 1) % 4 === 0;
            const isLastInRowLg = (index + 1) % 6 === 0;
            
            return (
              <LogoCard
                key={brand.slug}
                className={cn(
                  "relative border-b border-[#012d1d]/10 bg-white transition-colors",
                  "border-r", // Right border for all items by default
                  // For lg screens (6 columns), remove right border from every 6th item
                  "lg:[&:nth-child(6n)]:border-r-0",
                  // For md screens (4 columns), remove right border from every 4th item, but we need to override lg rules if they don't apply, so it's handled by media query classes, actually using nth-child is tricky with Tailwind.
                  // A simpler approach for the border is to use border-r everywhere and let outer border-x handle the edges, or hide the last one.
                )}
                brand={brand}
              >
                {/* We can place the plus icons on corners of the grid cells for the grid effect */}
                <PlusIcon
                  className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-[#012d1d]/20 pointer-events-none"
                  strokeWidth={2}
                />
              </LogoCard>
            );
          })}

          <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-[#012d1d]/10" />
        </div>
      </section>
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  brand: BrandLogo;
};

function LogoCard({ brand, className, children, ...props }: LogoCardProps) {
  const { Logo } = brand;
  return (
    <Link href={`/products/${brand.slug}`} className="group block w-full h-full cursor-pointer focus:outline-none">
      <div
        className={cn(
          "flex flex-col items-center justify-center p-3 sm:p-4 relative h-full",
          "md:hover:bg-[#f0faf5] transition-all duration-200",
          className
        )}
        {...props}
      >
        <div className="pointer-events-none h-5 sm:h-7 w-full max-w-[80px] sm:max-w-[100px] mb-1.5 transition-transform duration-300 md:group-hover:scale-110 flex items-center justify-center">
          <Logo />
        </div>
        <span className="pointer-events-none text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-widest md:group-hover:text-[#012d1d] transition-colors text-center w-full truncate">
          {brand.name}
        </span>
        {children}
      </div>
    </Link>
  );
}
