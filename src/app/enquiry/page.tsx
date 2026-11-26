"use client";

import { useEffect, useState } from "react";
import ContactPage from "../contact/page";

function EnquiryContent() {
  // Read ?product= on the client so the page can be server-rendered.
  // useSearchParams would force a client-only "Loading..." document.
  const [productSlug, setProductSlug] = useState<string | null>(null);

  useEffect(() => {
    setProductSlug(new URLSearchParams(window.location.search).get("product"));
  }, []);

  // In a real app we'd pass this down to the contact form to pre-fill it.
  // For now, since ContactPage handles its own state, we'll just reuse the Contact page layout
  // with a slightly different header.
  
  return (
    <div className="relative">
      {productSlug && (
        <div className="bg-secondary-container text-on-secondary-container py-2 text-center text-label-md">
          You are enquiring about: <span className="font-bold">{productSlug.replace(/-/g, " ")}</span>
        </div>
      )}
      <ContactPage isEnquiry={true} />
    </div>
  );
}

export default function EnquiryPage() {
  return <EnquiryContent />;
}
