import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps {
  href: string;
  text?: string;
  className?: string;
}

export function InteractiveHoverButton({
  href,
  text = "Button",
  className,
}: InteractiveHoverButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative text-[15px] font-semibold rounded-full h-[54px] p-1.5 ps-7 pe-[56px] group/btn transition-all duration-500 hover:ps-[56px] hover:pe-7 w-fit overflow-hidden cursor-pointer bg-[#18181b] text-white flex items-center shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      <span className="relative z-10 transition-all duration-500 tracking-wide">
        {text}
      </span>
      <div className="absolute right-1.5 w-[42px] h-[42px] bg-white text-black rounded-full flex items-center justify-center transition-all duration-500 group-hover/btn:right-[calc(100%-48px)] group-hover/btn:rotate-45 shadow-sm">
        <ArrowUpRight size={20} strokeWidth={2.5} />
      </div>
    </Link>
  );
}
