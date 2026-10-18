"use client";

import { useEffect } from "react";

const GTM_ID_1 = "G-NQ3EFJ4G81";
const GTM_ID_2 = "G-JDL30B60KP";

export default function GoogleAnalytics() {
  useEffect(() => {
    let loaded = false;

    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      // Ensure dataLayer exists
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", GTM_ID_1);
      gtag("config", GTM_ID_2);

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID_1}`;
      script.async = true;
      document.head.appendChild(script);
    };

    // Trigger on first human interaction
    const triggerEvents = ["touchstart", "scroll", "keydown", "click", "mousemove"];
    const handler = () => {
      triggerEvents.forEach((e) => window.removeEventListener(e, handler));
      loadAnalytics();
    };

    triggerEvents.forEach((e) => window.addEventListener(e, handler, { passive: true, once: true }));

    // Fallback timer: load after 4 seconds of idle time if no interaction yet
    const timer = setTimeout(() => {
      handler();
    }, 4000);

    return () => {
      triggerEvents.forEach((e) => window.removeEventListener(e, handler));
      clearTimeout(timer);
    };
  }, []);

  return null;
}
