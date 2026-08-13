"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Phone, Menu, X, ArrowUpRight, MapPin, CheckCircle2 } from "lucide-react";
import NavHeader from "@/components/ui/nav-header";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHeroPage = pathname === "/";
  const isSolid = scrolled || !isHeroPage;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ---- Navbar ---- */}
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b",
        isSolid 
          ? "bg-white border-gray-200/60 shadow-[0_2px_15px_rgba(0,0,0,0.06)]" 
          : "bg-transparent border-transparent"
      )}>

        <div className={cn(
          "max-w-[1280px] mx-auto px-[24px] flex justify-between items-center transition-all duration-300 ease-in-out",
          scrolled ? "h-16" : "h-20"
        )}>
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3"
          >
            <div className={cn(
              "relative transition-all duration-300 ease-in-out group-hover:scale-[1.03] flex-shrink-0",
              scrolled ? "w-8 h-8 min-[360px]:w-9 min-[360px]:h-9" : "w-9 h-9 min-[360px]:w-11 min-[360px]:h-11"
            )}>
              <Image
                src="/katayayani-enterprises-logo.png"
                alt="Katayayani Enterprises Logo"
                fill
                className="object-contain"
                sizes="44px"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[16px] min-[340px]:text-[18px] min-[380px]:text-[20px] md:text-[22px] lg:text-[26px] font-black font-serif tracking-tight transition-all duration-300 leading-none whitespace-nowrap drop-shadow-sm">
                <span className="text-[#012d1d]">Katayayani</span> <span className="text-[#b36b00]">Enterprises</span>
              </div>
              <div className={cn(
                "flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-[8.5px] min-[360px]:text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13px] text-gray-800 font-medium transition-all duration-300 whitespace-nowrap",
                scrolled ? "mt-0.5" : "mt-1 sm:mt-1.5"
              )}>
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3 md:h-3 lg:w-4 lg:h-4 stroke-[2px]" />
                  Meerut, UP
                </span>
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-emerald-500 stroke-[2.5px]" />
                  GST: <span className="font-extrabold">09BGDPS3254A1ZL</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavHeader className="hidden md:flex" />

          {/* Desktop Call to Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <a
              href="https://www.katayayanienterprises.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-200 text-[#012d1d] font-semibold text-[14px] hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm"
              title="Visit our Official Business Catalog"
            >
              <span>Full Catalog</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+919358273054"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#012d1d] text-white font-medium text-[14px] hover:bg-[#024a31] transition-colors duration-200 shadow-sm border border-transparent hover:border-[#024a31]/50"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline tracking-wide">+91 9358273054</span>
              <span className="inline sm:hidden tracking-wide">Call Us</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-on-surface p-2 min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* ---- Mobile Menu (CSS transition instead of framer-motion) ---- */}
      <div
        className={cn(
          "fixed inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-lg md:hidden transition-all duration-200 ease-in-out",
          scrolled ? "top-16" : "top-20",
          mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="max-w-[1280px] mx-auto px-[24px] py-[20px] flex flex-col gap-[6px]">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-body-lg px-[16px] py-[12px] rounded-xl transition-colors duration-300 block min-h-[48px] flex items-center",
                  active ? "bg-[#012d1d]/5" : ""
                )}
              >
                <span className={cn(
                  "transition-colors duration-300 text-[15px] tracking-wide",
                  active ? "text-[#012d1d] font-bold" : "text-gray-500 font-medium"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          <div className="h-[1px] bg-gray-100 mt-2 mb-4" />
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
            <a
              href="https://www.katayayanienterprises.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 text-[#012d1d] font-bold text-[15px] border border-gray-200 active:scale-95 transition-all min-h-[48px]"
            >
              <span>View Full Catalog</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+919358273054"
              className="flex items-center justify-center gap-2 px-4 py-3.5 mt-2 rounded-lg bg-[#012d1d] text-white font-medium shadow-sm hover:bg-[#024a31] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="w-4 h-4" />
              <span className="tracking-wide">Call Us: +91 9358273054</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
