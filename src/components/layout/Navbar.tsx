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
          scrolled ? "h-16" : "h-20"
        )}>
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3"
          >
            <div className={cn(
              "relative transition-all duration-300 ease-in-out group-hover:scale-[1.03] flex-shrink-0",
              scrolled ? "w-9 h-9" : "w-11 h-11"
            )}>
              <Image
                src="/katyayani-enterprises-logo.png"
                alt="Katayayani Enterprises Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-[17px] min-[360px]:text-[19px] md:text-[22px] font-bold font-heading text-[#012d1d] tracking-tight transition-all duration-300">
              Katayayani Enterprises
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavHeader className="hidden md:flex" />

          {/* Classy Call Us Button (Desktop) */}
          <div className="hidden md:flex">
            <a
              href="tel:+919358273054"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#012d1d] text-white font-semibold text-[14px] hover:bg-[#023e29] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow"
            >
              <Phone className="w-3.5 h-3.5 text-[#ffc641]" />
              <span>Call Us</span>
            </a>
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "fixed inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-lg md:hidden transition-all duration-300",
              scrolled ? "top-16" : "top-20"
            )}
          >
            <nav className="max-w-[1280px] mx-auto px-[24px] py-[20px] flex flex-col gap-[6px]">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="relative text-body-lg px-[16px] py-[10px] rounded-xl transition-colors duration-300 block"
                  >
                    {active && (
                      <motion.div
                        layoutId="mobileActiveNavBg"
                        className="absolute inset-0 bg-[#012d1d]/5 rounded-xl -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
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
              <div className="flex justify-center pb-2">
                <a
                  href="tel:+919358273054"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#012d1d] text-white font-semibold text-[15px] hover:bg-[#023e29] transition-all duration-300 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#ffc641]" />
                  <span>Call Us Now</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
