"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight, ArrowLeft, ShieldCheck, CheckCircle2, Copy,
  AlertCircle, Package, Truck, Lock, MapPin, Phone, User, Palette
} from "lucide-react";
import QRCode from "qrcode";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductBySlug } from "@/lib/products";
import { Product } from "@/types";

const UPI_ID = "devsharmaofficial.id@okaxis";
const BUSINESS_NAME = "Katayayani Enterprises";
const PRICE = 13500;

/* ──────────────────────────────────────────
   Step Progress Bar
────────────────────────────────────────── */
function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {["Delivery", "Payment", "Confirm"].map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-500 ${
                  done
                    ? "bg-green-500 border-green-500 text-white"
                    : active
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {done ? <CheckCircle2 className="w-5 h-5" /> : idx}
              </div>
              <span
                className={`text-xs font-bold tracking-wide hidden sm:block ${
                  active ? "text-primary" : done ? "text-green-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-700 ${
                  step > idx ? "bg-green-400" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────
   Order Summary Card
────────────────────────────────────────── */
function OrderSummary({ product, color }: { product: Product; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/70">
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
          <Package className="w-4 h-4 text-primary" />
          Order Summary
        </h3>
      </div>

      <div className="p-5">
        {/* Product row */}
        <div className="flex gap-4 pb-5 mb-5 border-b border-gray-100">
          <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
            <Image
              src={product.images[0]?.src ?? "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">1</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black text-primary uppercase tracking-widest mb-1">{product.brand}</p>
            <p className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">{product.name}</p>
            {color && (
              <p className="text-xs text-gray-500 mt-1.5">
                Color: <span className="font-semibold text-gray-700">{color}</span>
              </p>
            )}
          </div>
        </div>

        {/* Price rows */}
        <div className="space-y-2.5 text-sm pb-4 mb-4 border-b border-gray-100">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">₹{PRICE.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-bold text-green-600">FREE</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (incl.)</span>
            <span className="font-medium text-gray-900">Included</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-black text-gray-900 text-base">Total</span>
          <span className="text-2xl font-black text-primary">₹{PRICE.toLocaleString("en-IN")}</span>
        </div>

        {/* Trust strip */}
        <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
          {[
            { icon: <Lock className="w-3.5 h-3.5" />, text: "Secure Payment" },
            { icon: <Truck className="w-3.5 h-3.5" />, text: "Pan India Delivery" },
            { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: "Verified Seller" },
            { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "GST Invoice" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600">
              <span className="text-primary">{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   Main Checkout Component
────────────────────────────────────────── */
function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("product");

  const [product, setProduct] = useState<Product | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", pincode: "", color: "" });
  const [upiRefId, setUpiRefId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (slug) {
      const p = getProductBySlug(slug);
      if (p) {
        setProduct(p);
        setFormData(prev => ({ ...prev, color: p.colorVariants[0]?.name ?? "" }));
      }
    }
    setIsMobileDevice(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, [slug]);

  // Generate QR after product is loaded
  useEffect(() => {
    if (!product) return;
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(BUSINESS_NAME)}&am=${PRICE}&tn=${encodeURIComponent("Order " + product.name)}&cu=INR`;
    QRCode.toDataURL(upiUrl, { width: 280, margin: 2, color: { dark: "#012d1d", light: "#ffffff" } })
      .then(url => setQrDataUrl(url))
      .catch(console.error);
  }, [product]);

  const upiUrl = product
    ? `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(BUSINESS_NAME)}&am=${PRICE}&tn=${encodeURIComponent("Order " + product.name)}&cu=INR`
    : "";

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const onStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 10) { setError("Enter a valid 10-digit phone number."); return; }
    if (!formData.color) { setError("Please select a color variant."); return; }
    setError("");
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (upiRefId.trim().length < 6) { setError("Enter a valid UPI Reference / UTR number."); return; }
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productName: product!.name, productSlug: product!.slug, amount: PRICE, upiRefId }),
      });
      if (!res.ok) throw new Error();
      router.push(`/checkout/success?ref=${encodeURIComponent(upiRefId)}&name=${encodeURIComponent(formData.name)}`);
    } catch {
      setError("Failed to submit order. Please try again or contact us on WhatsApp.");
      setIsSubmitting(false);
    }
  };

  /* empty-product guard */
  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 pt-28 pb-16">
        <Package className="w-20 h-20 text-gray-200" />
        <h1 className="text-2xl font-bold text-gray-700">No product selected</h1>
        <p className="text-gray-500">Please select a product from our store first.</p>
        <Link href="/products" className="mt-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-container transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f6] pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page header & Back link ── */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Checkout</h1>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>
        </div>

        {/* ── Step progress ── */}
        <div className="mb-6">
          <StepBar step={step} />
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* ── LEFT: Steps ── */}
          <div className="space-y-5">

            {/* ═══ STEP 1 ═══ */}
            <div className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${step === 1 ? "border-primary ring-1 ring-primary" : "border-gray-200"}`}>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className={`flex items-center gap-2.5 font-bold text-sm ${step >= 1 ? "text-gray-900" : "text-gray-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors ${step === 1 ? "bg-primary text-white" : "bg-green-500 text-white"}`}>
                    {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
                  </span>
                  Delivery Details
                </h2>
                {step > 1 && (
                  <button
                    onClick={() => { setStep(1); setError(""); }}
                    className="text-xs font-bold text-primary border border-primary/30 px-3 py-1 rounded-md hover:bg-primary hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Collapsed summary */}
              {step > 1 && (
                <div className="px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-600">
                  <p><span className="font-bold text-gray-900">{formData.name}</span> • {formData.phone}</p>
                  <p className="truncate max-w-sm">{formData.address}, {formData.pincode}</p>
                  <p>Color: <span className="font-bold text-gray-900">{formData.color}</span></p>
                </div>
              )}

              {/* Form */}
              {step === 1 && (
                <form onSubmit={onStep1Submit} className="p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" /> Full Name *
                      </label>
                      <input
                        type="text" required
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all bg-gray-50 focus:bg-white"
                      />
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> WhatsApp Number *
                      </label>
                      <input
                        type="tel" required
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value.replace(/\D/g, "") }))}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> Delivery Address *
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                      placeholder="House / Plot No., Street, Village or City, District, State"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none h-24 transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="max-w-[220px]">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">PIN Code *</label>
                    <input
                      type="text" required
                      value={formData.pincode}
                      onChange={e => setFormData(p => ({ ...p, pincode: e.target.value.replace(/\D/g, "") }))}
                      placeholder="e.g. 250002"
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-gray-400" /> Select Color Variant *
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.colorVariants.map(c => (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, color: c.name }))}
                          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                            formData.color === c.name
                              ? "border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10"
                              : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className="w-4.5 h-4.5 rounded-full border-2 border-white shadow-md flex-shrink-0"
                            style={{ backgroundColor: c.hex, width: 18, height: 18 }}
                          />
                          {c.name}
                          {formData.color === c.name && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto sm:min-w-[220px] bg-primary text-white font-black py-4 px-8 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-base"
                    >
                      Continue to Payment
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ═══ STEP 2 ═══ */}
            <div className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${step === 2 ? "border-primary ring-1 ring-primary" : "border-gray-200"}`}>
              <div className="flex items-center px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className={`flex items-center gap-2.5 font-bold text-sm ${step === 2 ? "text-gray-900" : "text-gray-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${step === 2 ? "bg-primary text-white" : "bg-gray-300 text-white"}`}>
                    2
                  </span>
                  Secure UPI Payment
                </h2>
                {step === 2 && (
                  <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-[#146c43] bg-[#d1e7dd] px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure
                  </span>
                )}
              </div>

              {step === 2 && (
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* LEFT SIDE: QR CODE OR APP LINK */}
                    <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
                      {isMobileDevice ? (
                        /* Mobile: deep link button */
                        <div className="w-full text-center space-y-4">
                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Amount Payable</p>
                            <p className="font-black text-primary text-3xl mb-1">₹{PRICE.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-gray-500 font-medium">Inclusive of all taxes & shipping</p>
                          </div>
                          
                          <a
                            href={upiUrl}
                            className="block w-full py-3.5 rounded-xl font-bold text-base text-white bg-[#25D366] shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] active:scale-95 transition-all duration-200"
                          >
                            Pay via UPI App Now
                          </a>
                        </div>
                      ) : (
                        /* Desktop: QR code */
                        <div className="flex flex-col items-center w-full">
                          <div className="text-center mb-3">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Scan to Pay</p>
                            <p className="text-2xl font-black text-primary tracking-tight">₹{PRICE.toLocaleString('en-IN')}</p>
                          </div>

                          <div className="relative mb-6 group flex justify-center w-full">
                            {/* Background Lighting Orbs */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/40 rounded-full blur-[40px] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
                            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-32 bg-[#25D366]/30 rounded-full blur-[30px] opacity-60 group-hover:opacity-90 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none" />
                            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 h-32 bg-blue-500/30 rounded-full blur-[30px] opacity-60 group-hover:opacity-90 group-hover:translate-x-4 transition-all duration-700 pointer-events-none" />

                            {/* Liquid Glass Container */}
                            <div className="relative p-3.5 rounded-3xl border border-white bg-white/50 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden">
                              {/* Glossy reflection */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-white/20 pointer-events-none" />
                              
                              {qrDataUrl ? (
                                <img
                                  src={qrDataUrl}
                                  alt="UPI QR Code"
                                  width={160}
                                  height={160}
                                  className="rounded-2xl object-contain relative z-10 bg-white"
                                  style={{ imageRendering: "pixelated" }}
                                />
                              ) : (
                                <div className="w-[160px] h-[160px] bg-white/60 backdrop-blur-md animate-pulse rounded-2xl relative z-10" />
                              )}
                            </div>
                          </div>
                          <p className="font-semibold text-gray-700 text-xs text-center">Open any UPI app to scan</p>
                        </div>
                      )}

                      {/* App Logos */}
                      <div className="mt-5 w-full">
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                          <a href={upiUrl.replace('upi://pay', 'tez://upi/pay')} className="h-12 flex-1 flex items-center justify-center bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow hover:border-gray-200">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="h-5 object-contain" />
                          </a>
                          <a href={upiUrl.replace('upi://pay', 'phonepe://pay')} className="h-12 flex-1 flex items-center justify-center bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow hover:border-gray-200">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-6 object-contain" />
                          </a>
                          <a href={upiUrl.replace('upi://pay', 'paytmmp://pay')} className="h-12 flex-1 flex items-center justify-center bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow hover:border-gray-200">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-4 object-contain" />
                          </a>
                          <a href={upiUrl.replace('upi://pay', 'bhim://pay')} className="h-12 flex-1 flex items-center justify-center bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow hover:border-gray-200">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/BHIM_logo.svg" alt="BHIM" className="h-5 object-contain" />
                          </a>
                        </div>
                        <div className="mt-3 text-center">
                          <a href={upiUrl} className="inline-flex items-center justify-center w-full py-3 bg-[#012d1d] hover:bg-[#02422a] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-lg">
                            Pay with any UPI App
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE: UPI ID & UTR FORM */}
                    <div className="flex flex-col justify-center h-full">
                      {/* UPI ID Row */}
                      <div className="mb-5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Or pay manually to UPI ID</p>
                        <div className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 hover:border-gray-300 transition-colors">
                          <span className="font-mono font-bold text-gray-900 text-xs sm:text-sm truncate">
                            {UPI_ID}
                          </span>
                          <button
                            type="button"
                            onClick={copyUpiId}
                            className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-md transition-colors ${
                              isCopied
                                ? "bg-green-100 text-green-700"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {isCopied ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>

                      {/* Premium UTR Form */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] relative">
                        <form onSubmit={onConfirmPayment} className="relative z-10">
                          <div className="mb-4">
                            <label className="block font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-2">
                              Enter UTR / Reference No.
                            </label>
                            <p className="text-[11px] text-gray-500 mb-3 font-medium leading-relaxed">
                              Found in your UPI app's transaction history after payment.
                            </p>
                            <input
                              type="text"
                              required
                              value={upiRefId}
                              onChange={e => setUpiRefId(e.target.value.trim())}
                              placeholder="e.g. 312345678901"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-mono font-bold tracking-widest text-center placeholder:font-sans placeholder:tracking-normal placeholder:text-gray-400 placeholder:font-normal bg-gray-50 focus:bg-white transition-all"
                              maxLength={20}
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmitting || !upiRefId.trim()}
                            className="w-full py-3 rounded-lg font-bold text-sm text-white bg-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors shadow-sm"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Verifying...
                              </>
                            ) : (
                              "Confirm Order"
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Order Summary (sticky) ── */}
          <div className="lg:sticky lg:top-[108px]">
            <OrderSummary product={product} color={formData.color} />

            {/* Delivery timeline card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-4 p-5">
              <h4 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" /> Estimated Delivery
              </h4>
              <div className="space-y-3">
                {[
                  { dot: "bg-green-400", label: "Order Confirmed", sub: "Instantly after payment verification" },
                  { dot: "bg-primary", label: "Processing", sub: "1–3 business days" },
                  { dot: "bg-secondary", label: "Delivery", sub: "10–12 business days" },
                ].map(({ dot, label, sub }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${dot} mt-1.5 flex-shrink-0`} />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help card */}
            <div className="mt-4 bg-primary text-white rounded-2xl p-5">
              <p className="font-bold text-sm mb-1">Need help with your order?</p>
              <p className="text-xs text-white/70 mb-3">Call or WhatsApp us directly</p>
              <a
                href="https://wa.me/919358273054"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white text-primary font-black text-sm py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#f5f7f6] pt-28">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <p className="text-gray-500 font-medium">Loading checkout…</p>
            </div>
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
      <Footer />
    </>
  );
}
