'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const currentDuration = isHovered && durationOnHover ? durationOnHover : duration;

  return (
    <div 
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'flex w-max',
          direction === 'horizontal' ? 'animate-marquee-horizontal' : 'animate-marquee-vertical'
        )}
        style={{
          animationDuration: `${currentDuration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
      >
        <div
          className="flex shrink-0"
          style={{
            gap: `${gap}px`,
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            ...(direction === 'horizontal' ? { paddingRight: `${gap}px` } : { paddingBottom: `${gap}px` })
          }}
        >
          {children}
        </div>
        <div
          className="flex shrink-0"
          style={{
            gap: `${gap}px`,
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            ...(direction === 'horizontal' ? { paddingRight: `${gap}px` } : { paddingBottom: `${gap}px` })
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
