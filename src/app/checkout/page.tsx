"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight, ArrowLeft, ShieldCheck, CheckCircle2, Copy,
  AlertCircle, Package, Truck, Lock, MapPin, Phone, User, Palette, ChevronDown
} from "lucide-react";
import QRCode from "qrcode";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductBySlug } from "@/lib/products";
import { Product } from "@/types";
import { OTPInput } from "input-otp";

function Slot(props: { char: string | null; hasFakeCaret: boolean; isActive: boolean }) {
  return (
    <div
      className={`relative w-[24px] h-10 sm:w-8 sm:h-12 text-sm sm:text-lg font-bold flex items-center justify-center border-y border-r border-gray-300 first:border-l first:rounded-l-md last:rounded-r-md transition-all bg-white ${
        props.isActive ? "z-10 ring-2 ring-primary border-primary" : ""
      }`}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center animate-pulse">
          <div className="w-px h-5 sm:h-6 bg-primary" />
        </div>
      )}
    </div>
  );
}

const UPI_ID = "katayayanienterprises123@okicici";
const BUSINESS_NAME = "Katayayani Enterprises";
const BASE_PRICE = 14500;
const BASE_TOTAL = BASE_PRICE; // 5% GST already included in the ₹14,500 direct factory price

/* ──────────────────────────────────────────
   Step Progress Bar
────────────────────────────────────────── */
function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0 mb-4 sm:mb-6">
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
function OrderSummary({ product, color, bookingAmount }: { product: Product; color: string; bookingAmount: number | null }) {
  const isBooking = bookingAmount !== null && !isNaN(bookingAmount);
  const TOTAL = isBooking ? bookingAmount : BASE_TOTAL;

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
          {!isBooking ? (
            <>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{BASE_PRICE.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-600 items-center">
                <span>Shipping</span>
                <span className="font-bold text-gray-500 text-[10px] sm:text-xs text-right leading-tight max-w-[140px]">May vary depending on carrier</span>
              </div>
              <div className="flex justify-between text-gray-600 items-center">
                <span>GST (5%)</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs">Included in Price</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-gray-600 items-center">
                <span>Total Product Price</span>
                <div className="text-right">
                  <span className="font-medium text-gray-900">₹{BASE_TOTAL.toLocaleString("en-IN")}</span>
                  <span className="block text-[10px] font-semibold text-emerald-700">Incl. 5% GST</span>
                </div>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Advance Booking</span>
                <span className="font-medium text-gray-900">₹{bookingAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-600 items-center">
                <span>Remaining Balance (COD)</span>
                <span className="font-bold text-gray-900 text-sm">₹{(BASE_TOTAL - bookingAmount).toLocaleString("en-IN")}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="font-black text-gray-900 text-base">{isBooking ? "To Pay Now" : "Total"}</span>
            <p className="text-[11px] text-gray-500 font-medium">Inclusive of all taxes & 5% GST</p>
          </div>
          <span className="text-2xl font-black text-primary">₹{TOTAL.toLocaleString("en-IN")}</span>
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
  const bookingAmountParam = searchParams.get("bookingAmount");
  const parsedBookingAmount = bookingAmountParam ? parseInt(bookingAmountParam) : null;
  const isBooking = parsedBookingAmount !== null && !isNaN(parsedBookingAmount);
  const TOTAL = isBooking ? parsedBookingAmount : BASE_TOTAL;

  const [product, setProduct] = useState<Product | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", pincode: "", color: "" });
  const [upiRefId, setUpiRefId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

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
    const generateQr = async () => {
      if (!product) return;
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(BUSINESS_NAME)}&am=${TOTAL}&tn=${encodeURIComponent("Order " + product.name)}&cu=INR`;
      try {
        setQrDataUrl(await QRCode.toDataURL(upiUrl, {
          width: 300,
          margin: 2,
          color: { dark: "#0f172a", light: "#ffffff" }
        }));
      } catch (e) {
        console.error(e);
      }
    };
    generateQr();
  }, [product, step]);

  const upiUrl = product
    ? `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(BUSINESS_NAME)}&am=${TOTAL}&tn=${encodeURIComponent("Order " + product.name)}&cu=INR`
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
        body: JSON.stringify({ ...formData, productName: product!.name, productSlug: product!.slug, amount: TOTAL, upiRefId }),
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
    <div className="min-h-screen bg-[#f5f7f6] pt-16 sm:pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ── Page header & Back link ── */}
        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Checkout</h1>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>
        </div>

        {/* ── Step progress ── */}
        <div className="mb-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:items-start">

          {/* ── LEFT: Steps ── */}
          <div className="space-y-5 w-full min-w-0">

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
                <>
                  {/* Trust Badge Header */}
                  <div className="bg-[#2563eb] text-white px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 border-b border-[#1d4ed8]">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 border border-white/20 rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl bg-white/10 shadow-sm flex-shrink-0">
                      {BUSINESS_NAME.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base leading-tight">{BUSINESS_NAME}</h3>
                      <div className="flex items-center gap-1 mt-1 text-[9px] sm:text-[10px] bg-white/20 w-fit px-1.5 py-0.5 rounded backdrop-blur-sm shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-green-300" />
                        <span className="font-medium text-white tracking-wide uppercase">Trusted Business</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start">
                    
                    {/* LEFT SIDE: QR CODE OR APP LINK */}
                    <div className="w-full md:w-auto flex flex-col items-center flex-shrink-0">
                      <div className="flex flex-col items-center w-full">
                        {isMobileDevice && (
                          <div className="w-full text-center mb-5">
                            <a
                              href={upiUrl}
                              className="block w-full py-3.5 px-6 rounded-xl font-bold text-base text-white bg-[#25D366] shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] active:scale-95 transition-all duration-200"
                            >
                              Pay via UPI App Now
                            </a>
                          </div>
                        )}
                        <div className="relative p-2 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-3">
                            {qrDataUrl ? (
                              <div className="relative z-10 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
                                <img
                                  src={qrDataUrl}
                                  alt="UPI QR Code"
                                  className="w-full h-full rounded-xl object-contain bg-white"
                                  style={{ imageRendering: "pixelated" }}
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-md shadow-sm border border-gray-100 flex items-center justify-center w-10 h-10">
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="w-full h-full object-contain" />
                                </div>
                              </div>
                            ) : (
                              <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] bg-white/60 backdrop-blur-md animate-pulse rounded-xl relative z-10" />
                            )}
                          </div>
                          
                          <p className="font-semibold text-gray-500 text-[11px] mb-2">Scan with any UPI app</p>
                          <div className="flex items-center justify-center gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="h-3.5 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-4 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-3 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/BHIM_logo.svg" alt="BHIM" className="h-3.5 object-contain" />
                          </div>

                          {/* UPI ID block */}
                          <div className="mt-4 flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 w-full max-w-[220px] hover:border-gray-300 transition-colors shadow-sm">
                            <span className="font-mono font-bold text-gray-900 text-[10px] truncate" title={UPI_ID}>
                              {UPI_ID}
                            </span>
                            <button
                              type="button"
                              onClick={copyUpiId}
                              className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                                isCopied ? "bg-green-100 text-green-700" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              {isCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {isCopied ? "Copied" : "Copy"}
                            </button>
                          </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE: DETAILS & UTR */}
                    <div className="flex-1 w-full border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                      
                      {/* Amount & Timer */}
                      <div className="flex flex-col mb-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100 transition-all">
                        <div className="flex flex-row items-center justify-between cursor-pointer" onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 flex items-center gap-1">
                              AMOUNT PAYABLE 
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isBreakdownOpen ? "rotate-180" : ""}`} />
                            </p>
                            <p className="font-black text-primary text-2xl">₹{TOTAL.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-red-100">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                          </div>
                        </div>

                        {/* Breakdown Dropdown */}
                        <div className={`overflow-hidden transition-all duration-300 ${isBreakdownOpen ? "max-h-48 mt-3 pt-3 border-t border-gray-200 opacity-100" : "max-h-0 opacity-0"}`}>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between text-gray-600 items-center">
                              <span>Total Product Price</span>
                              <div className="text-right">
                                <span className="font-bold text-gray-900">₹{BASE_TOTAL.toLocaleString('en-IN')}</span>
                                <span className="ml-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">Incl. 5% GST</span>
                              </div>
                            </div>
                            {isBooking && (
                              <>
                                <div className="flex justify-between text-gray-600">
                                  <span>Advance Booking</span>
                                  <span className="font-bold text-gray-900">₹{TOTAL.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 items-center">
                                  <span>Remaining Balance (COD)</span>
                                  <span className="font-bold text-gray-900 text-sm">₹{(BASE_TOTAL - TOTAL).toLocaleString('en-IN')}</span>
                                </div>
                              </>
                            )}
                            <div className="flex justify-between font-bold text-sm text-gray-900 pt-2 border-t border-gray-100 items-center">
                              <span>{isBooking ? "To Pay Now" : "Grand Total"}</span>
                              <div className="text-right">
                                <span className="text-primary">₹{TOTAL.toLocaleString('en-IN')}</span>
                                <span className="block text-[10px] text-gray-400 font-normal">Incl. 5% GST</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Verify Payment Button */}
                      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center mt-auto md:mt-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-1.5">
                           <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">Have you completed the payment?</h4>
                        <p className="text-[10px] sm:text-[11px] text-gray-500 mb-3 leading-tight">
                          Once paid via your UPI app, click below to verify transaction.
                        </p>
                        <button
                          type="button"
                          onClick={() => { setStep(3); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="w-full py-3 rounded-lg font-bold text-sm text-white bg-primary hover:bg-primary-container transition-colors shadow-sm active:scale-[0.98]"
                        >
                          Yes, I have paid ₹{TOTAL.toLocaleString('en-IN')}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
                </>
              )}
            </div>

            {/* ═══ STEP 3 ═══ */}
            <div className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${step === 3 ? "border-primary ring-1 ring-primary" : "border-gray-200 mt-5"}`}>
              <div className="flex items-center px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className={`flex items-center gap-2.5 font-bold text-sm ${step === 3 ? "text-gray-900" : "text-gray-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${step === 3 ? "bg-primary text-white" : "bg-gray-300 text-white"}`}>
                    3
                  </span>
                  Verify Payment
                </h2>
              </div>

              {step === 3 && (
                <div className="w-full p-5 sm:p-8 text-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">Verify your Payment</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Enter the 12-digit UTR or Reference Number from your UPI app's transaction history to confirm your order.
                  </p>
                  
                  {/* Premium UTR Form */}
                  <div className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <form onSubmit={onConfirmPayment}>
                      <div className="mb-5">
                        <label className="block font-bold text-gray-900 text-sm mb-1.5">
                          Enter UTR / Reference No.
                        </label>
                        <p className="text-[11px] text-gray-500 mb-4 font-medium leading-relaxed">
                          Found in your UPI app's history after paying to<br/>
                          <span className="font-mono text-gray-900 block truncate mt-1">{UPI_ID}</span>
                        </p>
                        <div className="flex justify-center w-full overflow-hidden pb-1">
                          <OTPInput
                            value={upiRefId}
                            onChange={setUpiRefId}
                            maxLength={12}
                            containerClassName="group flex items-center has-[:disabled]:opacity-50"
                            render={({ slots }) => (
                              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-[280px] sm:max-w-none mx-auto">
                                <div className="flex">
                                  {slots.slice(0, 4).map((slot, idx) => (
                                    <Slot key={idx} {...slot} />
                                  ))}
                                </div>
                                <div className="flex">
                                  {slots.slice(4, 8).map((slot, idx) => (
                                    <Slot key={idx} {...slot} />
                                  ))}
                                </div>
                                <div className="flex">
                                  {slots.slice(8, 12).map((slot, idx) => (
                                    <Slot key={idx} {...slot} />
                                  ))}
                                </div>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting || !upiRefId.trim()}
                        className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Verifying Payment...
                          </>
                        ) : (
                          "Confirm Order"
                        )}
                      </button>
                    </form>
                  </div>
                  
                  <button 
                    onClick={() => { setStep(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="mt-6 text-sm font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors"
                  >
                     <ArrowLeft className="w-4 h-4" /> Back to Payment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Order Summary (sticky) ── */}
          <div className="lg:sticky lg:top-[108px] w-full min-w-0">
            <OrderSummary product={product} color={formData.color} bookingAmount={isBooking ? TOTAL : null} />

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
