import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface GetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  className?: string;
}

export function GetStartedButton({
  text = "View All Products",
  href,
  className,
  ...props
}: GetStartedButtonProps) {
  const content = (
    <Button
      className={cn(
        "group relative overflow-hidden text-base md:text-lg px-10 py-7 rounded-full bg-[#012d1d] hover:bg-[#104e33] text-white shadow-md hover:shadow-lg transition-all duration-300",
        className
      )}
      size="lg"
      {...props}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0 select-none">
        {text}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid w-12 place-items-center transition-all duration-500 bg-white/20 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white not-italic">
        <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" />
      </i>
    </Button>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
