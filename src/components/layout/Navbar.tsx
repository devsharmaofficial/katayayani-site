"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, MapPin, ShieldCheck, BadgeCheck, Award, Star } from "lucide-react";
import { CartoonButton } from "@/components/ui/cartoon-button";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import NavHeader from "@/components/ui/nav-header";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          scrolled ? "h-16" : "h-24 md:h-24"
        )}>
          {/* Brand Logo & Details */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className={cn(
              "relative transition-all duration-300 ease-in-out group-hover:scale-105",
              scrolled ? "w-11 h-11" : "w-14 h-14 md:w-16 md:h-16"
            )}>
              <Image
                src="/katyayani-enterprises-logo.png"
                alt="Katayayani Enterprises Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[1.25rem] sm:text-[1.35rem] md:text-3xl text-black font-black leading-none tracking-tight">
                Katayayani Enterprises
              </div>
              <div className={cn(
                "flex flex-wrap items-center gap-2 md:gap-4 opacity-80 transition-all duration-300 overflow-hidden", 
                scrolled ? "h-0 opacity-0 mt-0" : "h-auto opacity-100 mt-2"
              )}>
                <span className="text-[9px] md:text-[11px] font-bold text-gray-600 flex items-center gap-1 tracking-wide">
                  <BadgeCheck className="w-3 h-3 text-green-600" /> Govt. Reg GST: 09***********1ZL
                </span>
                <span className="hidden sm:flex text-[9px] md:text-[11px] font-bold text-gray-600 items-center gap-1 tracking-wide">
                  <Award className="w-3 h-3 text-[#ffc641]" /> 10+ Yrs Excellence
                </span>
                <span className="hidden xl:flex text-[9px] md:text-[11px] font-bold text-gray-600 items-center gap-1 tracking-wide">
                  <Star className="w-3 h-3 text-[#ffc641] fill-[#ffc641]" /> Rated 3.9/5 by 500+
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavHeader className="hidden md:flex" />

          {/* Call Us Button (Desktop) */}
          <div className="hidden md:flex">
            <CartoonButton href="tel:+919358273054">
              <Phone className="w-[16px] h-[16px]" />
              Call Us
            </CartoonButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-on-surface p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* ---- Mobile Menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-x-0 top-20 z-40 bg-surface/95 backdrop-blur-lg border-b border-secondary/30 shadow-lg md:hidden"
          >
            <nav className="max-w-[1280px] mx-auto px-[24px] py-[24px] flex flex-col gap-[8px]">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="relative text-body-lg px-[16px] py-[12px] rounded-lg transition-colors duration-300 block"
                  >
                    {active && (
                      <motion.div
                        layoutId="mobileActiveNavBg"
                        className="absolute inset-0 bg-primary-fixed/20 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className={cn(
                      "transition-colors duration-300",
                      active ? "text-primary font-semibold" : "text-on-surface-variant"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              <div className="divider-gold mt-[8px] mb-[16px]" />
              <div className="flex justify-center">
                <CartoonButton
                  href="tel:+919358273054"
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone className="w-[16px] h-[16px]" />
                  Call Us Now
                </CartoonButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
