"use client";

import Link from "next/link";
import React from "react";

interface CartoonButtonProps {
  label?: string;
  children?: React.ReactNode;
  color?: string;
  hasHighlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function CartoonButton({
  label,
  children,
  color = "bg-[#ffc641]",
  hasHighlight = true,
  disabled = false,
  onClick,
  href,
  className = "",
}: CartoonButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  const buttonClasses = `relative h-11 px-5 text-[15px] rounded-full font-bold text-neutral-900 border-2 border-neutral-900 transition-all duration-150 overflow-hidden group flex items-center justify-center gap-2
    ${color} hover:shadow-[0_3px_0_0_#171717]
    ${disabled ? "opacity-50 pointer-events-none" : "hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"}`;

  const innerContent = (
    <>
      <span className="relative z-10 whitespace-nowrap flex items-center gap-2">{children || label}</span>
      {hasHighlight && !disabled && (
        <div className="absolute top-1/2 left-[-100%] w-16 h-24 bg-white/40 -translate-y-1/2 rotate-12 transition-all duration-500 ease-in-out group-hover:left-[200%]"></div>
      )}
    </>
  );

  if (href) {
    return (
      <div className={`inline-block ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}>
        <Link href={href} onClick={handleClick} className={buttonClasses}>
          {innerContent}
        </Link>
      </div>
    );
  }

  return (
    <div className={`inline-block ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}>
      <button disabled={disabled} onClick={handleClick} className={buttonClasses}>
        {innerContent}
      </button>
    </div>
  );
}
