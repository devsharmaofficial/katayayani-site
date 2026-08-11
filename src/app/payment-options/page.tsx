"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CreditCard, Wallet, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductBySlug } from "@/lib/products";
import { Product } from "@/types";

function PaymentOptionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("product");

  const [product, setProduct] = useState<Product | null>(null);
  const [bookingAmount, setBookingAmount] = useState<number | 'full'>('full');
  
  useEffect(() => {
    if (slug) {
      const p = getProductBySlug(slug);
      if (p) setProduct(p);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 pt-28 pb-16">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  const handleContinue = () => {
    const url = `/checkout?product=${product.slug}${bookingAmount !== 'full' ? `&bookingAmount=${bookingAmount}` : ''}`;
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] pt-16 sm:pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Select Payment Mode</h1>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Product
          </Link>
        </div>

        {/* Product Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-200">
            <Image
              src={product.images[0]?.src ?? "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">{product.brand}</p>
            <p className="font-bold text-gray-900 text-sm leading-snug">{product.name}</p>
            <p className="text-gray-500 font-bold text-sm mt-1">₹13,500</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          
          {/* Option: Full Payment */}
          <div 
            onClick={() => setBookingAmount('full')}
            className={`cursor-pointer bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${bookingAmount === 'full' ? 'border-primary ring-2 ring-primary/20 shadow-md scale-[1.02]' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${bookingAmount === 'full' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-black ${bookingAmount === 'full' ? 'text-gray-900' : 'text-gray-700'}`}>Pay Full Amount</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Pay ₹13,500 + GST now. No hidden charges.</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${bookingAmount === 'full' ? 'border-primary' : 'border-gray-300'}`}>
                {bookingAmount === 'full' && <div className="w-3 h-3 bg-primary rounded-full" />}
              </div>
            </div>
          </div>

          {/* Option: Booking Amount ₹5000 */}
          <div 
            onClick={() => setBookingAmount(5000)}
            className={`cursor-pointer bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${bookingAmount === 5000 ? 'border-primary ring-2 ring-primary/20 shadow-md scale-[1.02]' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${bookingAmount === 5000 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-black ${bookingAmount === 5000 ? 'text-gray-900' : 'text-gray-700'}`}>Pay ₹5,000 Booking</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Pay ₹5,000 now. Rest Cash on Delivery.</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${bookingAmount === 5000 ? 'border-primary' : 'border-gray-300'}`}>
                {bookingAmount === 5000 && <div className="w-3 h-3 bg-primary rounded-full" />}
              </div>
            </div>
          </div>

          {/* Option: Booking Amount ₹3000 */}
          <div 
            onClick={() => setBookingAmount(3000)}
            className={`cursor-pointer bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${bookingAmount === 3000 ? 'border-primary ring-2 ring-primary/20 shadow-md scale-[1.02]' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${bookingAmount === 3000 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                <Wallet className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-black ${bookingAmount === 3000 ? 'text-gray-900' : 'text-gray-700'}`}>Pay ₹3,000 Booking</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Pay ₹3,000 now. Rest Cash on Delivery.</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${bookingAmount === 3000 ? 'border-primary' : 'border-gray-300'}`}>
                {bookingAmount === 3000 && <div className="w-3 h-3 bg-primary rounded-full" />}
              </div>
            </div>
          </div>
        </div>

        {/* Warning Banner for COD */}
        {bookingAmount !== 'full' && (
          <div className="mt-6 flex items-start gap-3 bg-[#fff7ed] border border-[#ffedd5] text-[#9a3412] rounded-xl px-5 py-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold">By choosing a booking amount, you agree to pay the remaining balance in cash upon delivery.</p>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-8">
          <button
            onClick={handleContinue}
            className="w-full bg-primary text-white font-black text-lg py-4 rounded-xl shadow-lg hover:bg-primary-container transition-all active:scale-[0.98]"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}

export default function PaymentOptionsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[#f5f7f6]" />}>
        <PaymentOptionsContent />
      </Suspense>
      <Footer />
    </>
  );
}
