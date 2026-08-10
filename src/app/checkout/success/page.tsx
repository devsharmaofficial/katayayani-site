"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight, MessageCircle, Package, Truck, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function SuccessContent() {
  const sp = useSearchParams();
  const upiRef = sp.get("ref") ?? "";
  const customerName = sp.get("name") ?? "Customer";

  return (
    <div className="min-h-[80vh] bg-[#f5f7f6] pt-24 pb-20 flex items-center justify-center">
      <div className="mx-4" style={{ width: '100%', maxWidth: '32rem' }}>

        {/* ── Confetti-style success card ── */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden text-center">

          {/* Top green band */}
          <div className="bg-gradient-to-r from-primary to-[#1b4332] px-8 py-10 relative overflow-hidden">
            {/* Background pattern dots */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 20 + 4,
                    height: Math.random() * 20 + 4,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.6 + 0.2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-11 h-11 text-green-500" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
                  Order Placed! 🎉
                </h1>
                <p className="text-white/80 text-sm font-medium">
                  Thank you, {customerName}!
                </p>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-9">

            {/* UTR reference box */}
            {upiRef && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-7 text-left">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5">
                  Payment Reference (UTR)
                </p>
                <p className="text-xl font-mono font-black text-gray-900 tracking-widest break-all">
                  {upiRef}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Keep this number safe. You&apos;ll need it if you contact support.
                </p>
              </div>
            )}

            {/* What happens next */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-7 text-left">
              <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">i</span>
                What Happens Next?
              </h3>
              <div className="space-y-3.5">
                {[
                  { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: "Our team verifies your payment using the UTR number above." },
                  { icon: <MessageCircle className="w-4 h-4 text-blue-500" />, text: "You'll receive a WhatsApp confirmation within 30 minutes." },
                  { icon: <Package className="w-4 h-4 text-orange-500" />, text: "Order dispatched within 1–3 business days." },
                  { icon: <Truck className="w-4 h-4 text-purple-500" />, text: "Delivery in 10–12 business days across India." },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{icon}</div>
                    <p className="text-sm text-gray-700 font-medium leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <a
                href="https://wa.me/919358273054"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-white font-black py-3.5 rounded-xl hover:bg-[#20bd59] transition-colors shadow-lg shadow-green-500/20 text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp for Update
              </a>
              <a
                href="tel:+919358273054"
                className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:border-primary hover:text-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Call Us: +91 93582 73054
              </a>
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 w-full text-gray-500 font-semibold py-3 rounded-xl hover:text-primary transition-colors text-sm group"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 font-medium mt-5">
          KATAYAYANI ENTERPRISES · GST: 09BGDPS3254A1ZL · Meerut, UP
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#f5f7f6] pt-28">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
