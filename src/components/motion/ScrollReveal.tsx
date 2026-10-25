"use client";

import { type ReactNode, useRef, useEffect, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Default to true on initial render to prevent blank/unrendered pages on SSR and Googlebot crawls
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    // Check if element is already inside or near viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 150) {
      setVisible(true);
      return;
    }

    // If it's below the fold, smoothly hide it initially for scroll animation
    setVisible(false);

    // Guaranteed safety fallback: reveal after 300ms if intersection observer is slow/throttled
    const fallbackTimer = setTimeout(() => {
      setVisible(true);
    }, 300);

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return () => clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          clearTimeout(fallbackTimer);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0, rootMargin: "120px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [once]);

  const getTransform = () => {
    if (!mounted || visible) return "translate3d(0,0,0)";
    switch (direction) {
      case "up":    return "translate3d(0,25px,0)";
      case "down":  return "translate3d(0,-25px,0)";
      case "left":  return "translate3d(25px,0,0)";
      case "right": return "translate3d(-25px,0,0)";
      default:      return "translate3d(0,0,0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: !mounted || visible ? 1 : 0,
        transform: getTransform(),
        transition: mounted ? `opacity ${duration}s ease, transform ${duration}s ease` : "none",
        transitionDelay: mounted ? `${delay}s` : "0s",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// Stagger container — reliable CSS render
export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
