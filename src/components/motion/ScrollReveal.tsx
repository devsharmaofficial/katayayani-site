"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

const getVariants = (direction: string): Variants => {
  const offset = 40;
  const initial: Record<string, number> = { opacity: 0 };

  switch (direction) {
    case "up":
      initial.y = offset;
      break;
    case "down":
      initial.y = -offset;
      break;
    case "left":
      initial.x = offset;
      break;
    case "right":
      initial.x = -offset;
      break;
  }

  return {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants(direction)}
      transition={{
        duration,
        delay,
        ease: [0.2, 0, 0, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for child animations
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.2, 0, 0, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
