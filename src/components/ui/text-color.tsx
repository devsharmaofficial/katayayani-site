"use client";

import React from "react";

export function TextColor() {
  return (
    <div className="flex justify-center items-center py-2 w-full">
      <h1 className="tracking-tighter flex select-none flex-col text-center text-[48px] sm:text-6xl md:text-7xl lg:text-[80px] font-black leading-[1.05] sm:leading-none lg:flex-row lg:gap-3">
        <span
          data-content="Tractor."
          className="before:animate-gradient-background-1 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:text-[#012d1d]/90 before:content-[attr(data-content)] sm:before:top-0"
        >
          <span className="from-[#012d1d] to-[#16a34a] animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text text-transparent">
            Tractor.
          </span>
        </span>
        <span
          data-content="Fiber."
          className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:text-[#012d1d]/90 before:content-[attr(data-content)] sm:before:top-0"
        >
          <span className="from-[#012d1d] to-[#16a34a] animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text text-transparent">
            Fiber.
          </span>
        </span>
        <span
          data-content="Hood."
          className="before:animate-gradient-background-3 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:text-[#012d1d]/90 before:content-[attr(data-content)] sm:before:top-0"
        >
          <span className="from-[#b45309] to-[#fbbf24] animate-gradient-foreground-3 bg-gradient-to-r bg-clip-text text-transparent">
            Hood.
          </span>
        </span>
      </h1>
    </div>
  );
}
