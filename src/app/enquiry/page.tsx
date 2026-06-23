"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ContactPage from "../contact/page";

function EnquiryContent() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");

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
      <ContactPage />
    </div>
  );
}

export default function EnquiryPage() {
  return (
    <Suspense fallback={<div className="pt-20 text-center">Loading...</div>}>
      <EnquiryContent />
    </Suspense>
  );
}
