'use client';
import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
}

const TextMarquee = forwardRef<HTMLDivElement, ComponentProps>(({
  children,
  className,
}, ref) => {
  return (
    <div className="overflow-hidden w-full flex" ref={ref}>
      <div className="animate-marquee-horizontal flex">
        <span className={cn("block shrink-0", className)}>{children}</span>
        <span className={cn("block shrink-0", className)}>{children}</span>
        <span className={cn("block shrink-0", className)}>{children}</span>
        <span className={cn("block shrink-0", className)}>{children}</span>
      </div>
    </div>
  );
});

TextMarquee.displayName = "TextMarquee";
export { TextMarquee };

