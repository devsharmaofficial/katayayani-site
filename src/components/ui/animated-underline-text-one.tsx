"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 0.8,
      ...props
    },
    ref
  ) => {
    const textVariants: Variants = {
      hidden: { 
        y: -10, 
        opacity: 0,
        scaleY: 1.25,
        transformOrigin: "bottom",
      },
      visible: {
        y: 0,
        opacity: 1,
        scaleY: 1.25,
        transformOrigin: "bottom",
        transition: { 
          duration: 0.4, 
          ease: "easeOut" 
        },
      },
      hover: {
        scaleX: 1.02,
        scaleY: 1.275,
        transformOrigin: "bottom",
        transition: { 
          duration: 0.15, 
          ease: "easeOut" 
        },
      }
    };

    const pathVariants: Variants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
        },
      },
      hover: {
        d: underlineHoverPath,
        transition: { 
          duration: 0.25, 
          ease: "easeOut" 
        },
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={cn("flex flex-col items-center justify-center gap-1 cursor-pointer select-none", props.className)}
        {...(props as any)}
      >
        <div className="relative">
          <motion.h1
            variants={textVariants}
            className={cn(
              "text-3xl font-black text-black text-center tracking-tight",
              montserrat.className,
              textClassName
            )}
          >
            {text}
          </motion.h1>

          <motion.svg
            width="100%"
            height="16"
            viewBox="0 0 300 16"
            preserveAspectRatio="none"
            className={cn("absolute -bottom-3 left-0 pointer-events-none", underlineClassName)}
          >
            <motion.path
              d={underlinePath}
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          </motion.svg>
        </div>
      </motion.div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
