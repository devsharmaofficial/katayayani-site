"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["800", "900"],
    display: "swap",
});

interface AnimatedTextProps {
    text?: string;
    className?: string;
}

export function Text_03({
    text = "Hover me",
    className = "",
}: AnimatedTextProps) {
    return (
        <motion.span
            className={cn(
                "w-full text-center inline-block cursor-pointer text-2xl sm:text-3xl lg:text-4xl transition-all font-black text-black tracking-tighter whitespace-nowrap",
                montserrat.className,
                className
            )}
        >
            {text.split("").map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ y: 0 }}
                    whileHover={{ y: -12, scale: 1.05 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 12,
                        mass: 0.8
                    }}
                    className="inline-block origin-bottom"
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}
