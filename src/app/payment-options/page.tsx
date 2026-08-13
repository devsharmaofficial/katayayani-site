"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CreditCard, Wallet, AlertCircle, BadgeCheck, Truck, Plus, Minus, Fan, Lightbulb, Speaker, Wrench, Package } from "lucide-react";
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
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState({
    fan: 1,
    light: 1,
    speakers: 1,
    mirrors: 1,
    handles: 1,
    siren: 1,
    upipe: 1,
    tailLights: 1,
    drl: 1,
    speakers: 0
  });

  const addonPrices = {
    fan: 800,
    light: 600,
    speakers: 2500,
    mirrors: 500,
    handles: 200,
    siren: 400,
    upipe: 300,
    tailLights: 500,
    drl: 400
  };

  const basePrice = 7300; // Base canopy + Toolbox (13500 - 6200 for accessories)
  
  const unitPrice = basePrice + 
    (addons.fan * addonPrices.fan) + 
    (addons.light * addonPrices.light) + 
    (addons.speakers * addonPrices.speakers) + 
    (addons.mirrors * addonPrices.mirrors) + 
    (addons.handles * addonPrices.handles) + 
    (addons.siren * addonPrices.siren) + 
    (addons.upipe * addonPrices.upipe) + 
    (addons.tailLights * addonPrices.tailLights) + 
    (addons.drl * addonPrices.drl);

  const totalPrice = unitPrice * quantity;
  
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
    if (bookingAmount !== 'full' && (typeof bookingAmount !== 'number' || bookingAmount < 3000)) {
      setError("Booking amount must be at least ₹3,000.");
      return;
    }
    setError("");
    const url = `/checkout?product=${product.slug}&qty=${quantity}${bookingAmount !== 'full' ? `&bookingAmount=${bookingAmount * quantity}` : ''}&addons=${encodeURIComponent(JSON.stringify(addons))}`;
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] pt-16 sm:pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Unified Order Configuration Box */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Product Summary */}
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
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
                <p className="font-bold text-gray-900 text-sm leading-snug pr-4">{product.name}</p>
                <p className="text-gray-500 font-bold text-sm mt-1">₹{unitPrice.toLocaleString('en-IN')} <span className="font-medium text-xs">/ each</span></p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1 shadow-inner flex-shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:hover:bg-transparent disabled:active:scale-100"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-black text-gray-900 text-[15px] tabular-nums select-none">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-gray-100" />

          {/* Customization Section */}
          <div className="p-5 sm:p-6 bg-gray-50/30">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Customize Your Build</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'fan', name: 'Heavy Duty Fan', icon: <Fan className="w-4 h-4" />, max: 2 },
                { id: 'light', name: 'LED Projector Light', icon: <Lightbulb className="w-4 h-4" />, max: 4 },
                { id: 'mirrors', name: 'Side Mirrors', icon: <Wrench className="w-4 h-4" />, max: 1 },
                { id: 'handles', name: 'Handles', icon: <Wrench className="w-4 h-4" />, max: 1 },
                { id: 'siren', name: 'Siren Light', icon: <AlertCircle className="w-4 h-4" />, max: 1 },
                { id: 'upipe', name: 'U Pipe', icon: <Wrench className="w-4 h-4" />, max: 1 },
                { id: 'tailLights', name: 'Tail Lights', icon: <Lightbulb className="w-4 h-4" />, max: 2 },
                { id: 'drl', name: 'DRL Lights', icon: <Lightbulb className="w-4 h-4" />, max: 2 },
                { id: 'speakers', name: 'Music Speakers', icon: <Speaker className="w-4 h-4" />, max: 1 },
              ].map((addon) => (
                <div key={addon.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 border border-gray-100">
                      {addon.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-gray-900 leading-none">{addon.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-0.5 shadow-inner">
                    <button
                      onClick={() => setAddons(prev => ({ ...prev, [addon.id]: Math.max(0, prev[addon.id as keyof typeof prev] - 1) }))}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm transition-all active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent"
                      disabled={addons[addon.id as keyof typeof addons] === 0}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-black text-gray-900 text-[13px]">
                      {addons[addon.id as keyof typeof addons]}
                    </span>
                    <button
                      onClick={() => setAddons(prev => ({ ...prev, [addon.id]: Math.min(addon.max, prev[addon.id as keyof typeof prev] + 1) }))}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm transition-all active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent"
                      disabled={addons[addon.id as keyof typeof addons] >= addon.max}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* RIGHT COLUMN: Payment Options */}
        <div className="flex flex-col space-y-6">
          {/* Error Banner */}
          {error && (
          <div className="mb-4 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 px-4 rounded-xl border border-red-100 animate-in fade-in zoom-in-95">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        {/* Payment Options */}
        <div className="space-y-5">
          
          {/* Option: Full Payment */}
          <div 
            onClick={() => setBookingAmount('full')}
            className={`group cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 border-2 ${bookingAmount === 'full' ? 'bg-white border-primary shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02] ring-4 ring-primary/10' : 'bg-gray-50/50 border-gray-200 hover:bg-white hover:border-gray-300'}`}
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${bookingAmount === 'full' ? 'bg-primary text-white scale-110' : 'bg-white text-gray-400 border border-gray-200 group-hover:scale-105'}`}>
                <CreditCard className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 
                  className={`text-xl sm:text-2xl font-black mb-1 tracking-tight ${bookingAmount === 'full' ? 'text-gray-900' : 'text-gray-600'}`}
                  style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}
                >
                  Pay Full Amount
                </h3>
                <p className="text-sm text-gray-500 font-medium">Pay <span className="font-bold text-gray-700">₹{totalPrice.toLocaleString('en-IN')}</span> now. No hidden charges.</p>
              </div>
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${bookingAmount === 'full' ? 'border-primary bg-primary' : 'border-gray-300 bg-white'}`}>
                {bookingAmount === 'full' && <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-in zoom-in" />}
              </div>
            </div>
          </div>

          {/* Option: Custom Booking Amount */}
          <div 
            onClick={() => {
              if (bookingAmount === 'full') setBookingAmount(5000);
            }}
            className={`group cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 border-2 ${bookingAmount !== 'full' ? 'bg-white border-primary shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02] ring-4 ring-primary/10' : 'bg-gray-50/50 border-gray-200 hover:bg-white hover:border-gray-300'}`}
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${bookingAmount !== 'full' ? 'bg-primary text-white scale-110' : 'bg-white text-gray-400 border border-gray-200 group-hover:scale-105'}`}>
                <Truck className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 
                  className={`text-xl sm:text-2xl font-black mb-1 tracking-tight ${bookingAmount !== 'full' ? 'text-gray-900' : 'text-gray-600'}`}
                  style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}
                >
                  Cash on Delivery
                </h3>
                {bookingAmount !== 'full' && bookingAmount ? (
                  <p className="text-sm font-bold text-primary bg-primary/5 inline-block px-2 py-0.5 rounded-md mt-0.5">
                    ₹{(bookingAmount * quantity).toLocaleString('en-IN')} booking charges + Cash on delivery
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 font-medium mt-0.5">Pay a small amount now, rest on delivery</p>
                )}
              </div>
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${bookingAmount !== 'full' ? 'border-primary bg-primary' : 'border-gray-300 bg-white'}`}>
                {bookingAmount !== 'full' && <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-in zoom-in" />}
              </div>
            </div>

            {bookingAmount !== 'full' && (
              <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 flex flex-col items-center text-center">
                
                <p className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">How much would you like to pay?</p>
                
                <div className="relative w-full max-w-[280px] mx-auto mb-8 group/input">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-black text-3xl transition-colors group-focus-within/input:text-primary">₹</span>
                  <input
                    type="number"
                    value={bookingAmount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) setBookingAmount(val);
                      else setBookingAmount('' as any);
                    }}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl py-5 pl-16 pr-6 text-gray-900 font-black text-4xl sm:text-5xl text-center focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                    placeholder="0"
                  />
                </div>
                
                <div className="flex gap-3 sm:gap-4 justify-center w-full">
                  <button
                    onClick={(e) => { e.stopPropagation(); setBookingAmount(3000); }}
                    className={`flex-1 max-w-[140px] py-4 rounded-2xl text-xl font-black transition-all duration-300 border-2 shadow-sm ${bookingAmount === 3000 ? 'bg-primary text-white border-primary shadow-primary/20 scale-105' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50 hover:scale-105'}`}
                  >
                    ₹3,000
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setBookingAmount(5000); }}
                    className={`flex-1 max-w-[140px] py-4 rounded-2xl text-xl font-black transition-all duration-300 border-2 shadow-sm ${bookingAmount === 5000 ? 'bg-primary text-white border-primary shadow-primary/20 scale-105' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50 hover:scale-105'}`}
                  >
                    ₹5,000
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

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
