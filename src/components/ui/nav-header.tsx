"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavHeaderProps {
  className?: string;
}

export default function NavHeader({ className }: NavHeaderProps) {
  const pathname = usePathname();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const activeRef = useRef<HTMLLIElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const resetToActive = () => {
    if (activeRef.current) {
      const { width } = activeRef.current.getBoundingClientRect();
      setPosition({
        width,
        opacity: 1,
        left: activeRef.current.offsetLeft,
      });
    } else {
      setPosition((pv) => ({ ...pv, opacity: 0 }));
    }
  };

  useEffect(() => {
    // Brief delay to ensure layout and refs are fully calculated
    const timer = setTimeout(() => {
      resetToActive();
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <ul
      className={cn(
        "relative flex w-fit rounded-full border-2 border-black bg-white p-1 select-none",
        className
      )}
      onMouseLeave={resetToActive}
    >
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Tab
            key={item.href}
            href={item.href}
            active={active}
            activeRef={activeRef}
            setPosition={setPosition}
          >
            {item.label}
          </Tab>
        );
      })}

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  href,
  active,
  activeRef,
  setPosition,
}: {
  children: React.ReactNode;
  href: string;
  active: boolean;
  activeRef: React.MutableRefObject<HTMLLIElement | null>;
  setPosition: any;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (active && ref.current) {
      activeRef.current = ref.current;
    }
  }, [active]);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-4 py-2 text-sm font-semibold uppercase text-white mix-blend-difference"
    >
      <Link href={href} className="block w-full h-full">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 top-1 bottom-1 rounded-full bg-black"
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    />
  );
};
