"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

const ALL_PRODUCTS = [
  { name: "Swaraj Fiber Hood", slug: "swaraj-frp-canopy" },
  { name: "Mahindra Fiber Hood", slug: "mahindra-frp-canopy" },
  { name: "Sonalika Fiber Hood", slug: "sonalika-frp-canopy" },
  { name: "Eicher Fiber Hood", slug: "eicher-frp-canopy" },
  { name: "New Holland Fiber Hood", slug: "new-holland-frp-canopy" },
  { name: "Massey Ferguson Fiber Hood", slug: "massey-ferguson-frp-canopy" },
  { name: "Deutz Fahr Fiber Hood", slug: "deutz-fahr-frp-canopy" },
  { name: "Farmtrac Fiber Hood", slug: "farmtrac-frp-canopy" },
  { name: "Solis Fiber Hood", slug: "solis-frp-canopy" },
  { name: "Powertrac Fiber Hood", slug: "powertrac-frp-canopy" },
  { name: "Swaraj 744 Fiber Hood", slug: "swaraj-744-fiber-hood" },
  { name: "Swaraj 855 Fiber Hood", slug: "swaraj-855-fiber-hood" },
  { name: "Mahindra 575 Fiber Hood", slug: "mahindra-575-fiber-hood" },
  { name: "Mahindra 475 Fiber Hood", slug: "mahindra-475-fiber-hood" },
  { name: "Sonalika DI 750 Fiber Hood", slug: "sonalika-di-750-fiber-hood" },
  { name: "Massey 1035 Fiber Hood", slug: "massey-1035-fiber-hood" },
  { name: "General Enquiry", slug: "" },
];

interface Props {
  productName?: string;
  productSlug?: string;
}

export default function LeadCapturePopup({ productName, productSlug }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(
    productName
      ? { name: productName, slug: productSlug || "" }
      : { name: "General Enquiry", slug: "" }
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const STORAGE_KEY = "kk_lead_popup_v3";
  const SESSION_KEY = "kk_lead_popup_session_v3";
  const SUPPRESSION_DAYS = 7;

  const shouldShow = useCallback(() => {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown) {
      const diff = Date.now() - parseInt(lastShown, 10);
      if (diff < SUPPRESSION_DAYS * 24 * 60 * 60 * 1000) return false;
    }
    return true;
  }, []);

  const dismiss = useCallback(() => {
    setIsClosing(true);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    sessionStorage.setItem(SESSION_KEY, "1");
    setTimeout(() => setIsVisible(false), 400);
  }, []);

  useEffect(() => {
    if (!shouldShow()) return;

    timerRef.current = setTimeout(() => {
      if (!shouldShow()) return;
      setIsVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [shouldShow]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters)");
      return;
    }
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          productName: selectedProduct.name,
          productSlug: selectedProduct.slug || undefined,
          page: window.location.pathname,
          source: "popup",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.id) {
          localStorage.setItem("kk_customer_lead_id", data.id);
        }
        setSubmitted(true);
        setTimeout(() => dismiss(), 3500);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop — Blocking & Clean */}
      <div
        className="fixed inset-0 z-[998] pointer-events-auto"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          opacity: isClosing ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Popup Card */}
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4 pointer-events-none"
      >
        <style>{`
          @keyframes slideUpFade {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .lead-input {
            width: 100%;
            padding: 14px 16px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            color: #111827;
            font-size: 16px;
            font-weight: 500;
            outline: none;
            transition: all 0.2s;
          }
          .lead-input::placeholder { color: #9ca3af; font-weight: 400; }
          .lead-input:focus {
            border-color: #012d1d;
            background: #ffffff;
            box-shadow: 0 0 0 4px rgba(1,45,29,0.1);
          }
          .lead-select-btn {
            width: 100%;
            padding: 14px 16px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            color: #111827;
            font-size: 16px;
            font-weight: 500;
            text-align: left;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.2s;
          }
          .lead-select-btn:hover {
            background: #f3f4f6;
          }
          .lead-select-btn:focus {
            border-color: #012d1d;
            box-shadow: 0 0 0 4px rgba(1,45,29,0.1);
          }
        `}</style>

        <div
          className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-xl pointer-events-auto flex flex-col"
          style={{
            transform: isClosing ? "translateY(20px)" : "translateY(0)",
            opacity: isClosing ? 0 : 1,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: isClosing ? "none" : "slideUpFade 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }}
        >
          {submitted ? (
            /* Success State */
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
              <p className="text-gray-600">
                We have received your details. Our team will call you shortly with the best price.
              </p>
            </div>
          ) : (
            /* Form State */
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Get the best price</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-bold text-gray-800 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="lead-input"
                    autoComplete="name"
                    maxLength={50}
                    id="lead-name"
                  />
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-bold text-gray-800 mb-1.5">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 9876543210"
                    className="lead-input"
                    autoComplete="tel"
                    maxLength={15}
                    id="lead-phone"
                    inputMode="numeric"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-1.5">
                    Which product are you looking for?
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      className="lead-select-btn"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span className="truncate pr-2">{selectedProduct.name}</span>
                      <ChevronDown
                        className="w-5 h-5 text-gray-400 transition-transform duration-200"
                        style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto z-20 max-h-[220px]">
                        {ALL_PRODUCTS.map((p) => (
                          <button
                            key={p.slug || "general"}
                            type="button"
                            onClick={() => {
                              setSelectedProduct(p);
                              setDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-semibold transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                            style={{
                              color: selectedProduct.slug === p.slug ? "#012d1d" : "#4b5563",
                              backgroundColor: selectedProduct.slug === p.slug ? "#f0fdf4" : "transparent",
                            }}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <p className="text-sm font-semibold text-red-600 bg-red-50 p-3 rounded-lg">
                    {error}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-base font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
                    style={{
                      backgroundColor: "#012d1d",
                      color: "#ffffff",
                    }}
                  >
                    {loading ? "Submitting..." : "Show Price Now"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
