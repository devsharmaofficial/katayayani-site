"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function LeadTracker() {
  const pathname = usePathname();
  const trackedPagesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Check if customer is a known lead
    const leadId = localStorage.getItem('kk_customer_lead_id');
    if (!leadId) return;

    // Only track if it's a product page or specific meaningful page, and avoid tracking the same page multiple times in one session
    if (!pathname || pathname.startsWith('/admin')) return;
    
    // Prevent spamming the API for the same page in the same session
    if (trackedPagesRef.current.has(pathname)) return;

    const trackLeadActivity = async () => {
      try {
        // Try to extract product info if on a product page
        let productName = undefined;
        let productSlug = undefined;

        if (pathname.startsWith('/products/')) {
          productSlug = pathname.split('/').pop();
          // Capitalize and format slug to Name (e.g. "swaraj-frp-canopy" -> "Swaraj Frp Canopy")
          if (productSlug) {
            productName = productSlug
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          }
        }

        const res = await fetch('/api/leads/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId,
            page: pathname,
            productName,
            productSlug,
          }),
        });

        if (res.ok) {
          trackedPagesRef.current.add(pathname);
        }
      } catch (err) {
        // Silently fail if tracking fails
        console.error('Failed to track lead activity');
      }
    };

    // Small delay to ensure page is actually viewed and not just quickly bounced
    const timeout = setTimeout(() => {
      trackLeadActivity();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
