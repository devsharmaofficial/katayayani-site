"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PatternTextProps extends Omit<React.ComponentProps<"span">, "children"> {
  text: string;
}

export function PatternText({ text, className, ...props }: PatternTextProps) {
  return (
    <>
      <span
        data-shadow={text}
        className={cn(
          "relative inline-block font-black tracking-tight text-primary select-none whitespace-nowrap pattern-text-shadow",
          "[text-shadow:0.03em_0.03em_0_white]", // Solid outline mask to separate text from background pattern
          "after:absolute after:top-[0.04em] after:left-[0.04em] after:-z-10 after:content-[attr(data-shadow)]",
          "after:bg-[linear-gradient(45deg,transparent_45%,var(--color-secondary)_45%,var(--color-secondary)_55%,transparent_0)]",
          "after:bg-[size:0.04em_0.04em] after:bg-clip-text after:text-transparent",
          "after:animate-shadanim after:text-shadow-none",
          className
        )}
        {...props}
      >
        {text}
      </span>
      <style>{`
        .pattern-text-shadow::after {
          white-space: nowrap !important;
          width: 100% !important;
          display: block !important;
        }
      `}</style>
    </>
  );
}
