"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavHeaderProps {
  className?: string;
}

export default function NavHeader({ className }: NavHeaderProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className={cn("select-none", className)}>
      <ul className="flex items-center gap-4 lg:gap-6 xl:gap-[32px]">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href} className="relative py-1">
              <Link
                href={item.href}
                className={cn(
                  "text-[15px] font-medium tracking-wide transition-colors duration-200 relative block py-1.5",
                  active 
                    ? "text-[#012d1d] font-semibold" 
                    : "text-gray-500 hover:text-[#012d1d]"
                )}
              >
                {item.label}
                {/* Pure CSS active indicator — no framer-motion needed */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2px] bg-[#795900] rounded-full transition-all duration-300 ease-out",
                    active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  )}
                  style={{ transformOrigin: "left" }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
