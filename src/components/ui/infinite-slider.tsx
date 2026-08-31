'use client';
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

/**
 * InfiniteSlider — pure CSS animation, no JS state.
 * 
 * Bug fixes vs old version:
 * - NO useState for hover (changing animationDuration mid-animation caused jump/reset bug)
 * - Uses CSS custom properties + CSS :hover to slow down on hover — no React re-render
 * - No visibility observer needed — CSS animations survive scroll and tab switches
 * - Works with IntersectionObserver to pause when off-screen (saves CPU/battery)
 */
export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause CSS animation when slider is off-screen (saves battery, fixes "stuck on return" bug)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When off screen, pause. When visible, resume.
        el.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isHorizontal = direction === 'horizontal';

  const trackStyle: React.CSSProperties = {
    ['--slider-duration' as string]: `${duration}s`,
    ['--slider-duration-hover' as string]: durationOnHover ? `${durationOnHover}s` : `${duration}s`,
    animationDuration: `var(--slider-duration)`,
    animationDirection: reverse ? 'reverse' : 'normal',
    flexDirection: isHorizontal ? 'row' : 'column',
  };

  const groupStyle: React.CSSProperties = {
    gap: `${gap}px`,
    flexDirection: isHorizontal ? 'row' : 'column',
    ...(isHorizontal ? { paddingRight: `${gap}px` } : { paddingBottom: `${gap}px` }),
  };

  return (
    <div
      className={cn('overflow-hidden', className)}
    >
      <div
        ref={trackRef}
        className={cn(
          'flex w-max infinite-slider-track',
          isHorizontal ? 'animate-marquee-horizontal' : 'animate-marquee-vertical'
        )}
        style={trackStyle}
      >
        {/* Group 1 */}
        <div className="flex shrink-0" style={groupStyle}>
          {children}
        </div>
        {/* Group 2 — duplicate for seamless loop */}
        <div className="flex shrink-0" style={groupStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}
