"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
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

export default function LeadCapturePopup() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({
    name: "General Enquiry",
    slug: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hasUserSelected = useRef(false);

  const STORAGE_SUBMITTED_KEY = "kk_lead_submitted";
  const SUPPRESSION_DAYS = 30; // Don't prompt already submitted leads for 30 days

  // Check if lead was already submitted
  const isAlreadySubmitted = useCallback(() => {
    if (typeof window === "undefined") return false;
    const submittedAt = localStorage.getItem(STORAGE_SUBMITTED_KEY);
    if (submittedAt) {
      const diff = Date.now() - parseInt(submittedAt, 10);
      if (diff < SUPPRESSION_DAYS * 24 * 60 * 60 * 1000) return true;
    }
    return false;
  }, []);

  // Update selected product automatically based on current URL slug if user hasn't manually picked
  useEffect(() => {
    if (hasUserSelected.current) return;
    if (pathname && pathname.startsWith("/products/")) {
      const slug = pathname.replace("/products/", "").split("/")[0];
      const matched = ALL_PRODUCTS.find((p) => p.slug === slug);
      if (matched) {
        setSelectedProduct(matched);
      }
    }
  }, [pathname]);

  // Initial trigger after landing: will open after 3.5 seconds and persist across page navigation
  useEffect(() => {
    if (isAlreadySubmitted()) return;

    // Check if exempt path
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/checkout")) {
      return;
    }

    const timer = setTimeout(() => {
      if (!isAlreadySubmitted()) {
        setIsVisible(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [isAlreadySubmitted, pathname]);

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

  const dismiss = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 400);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters)");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
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
        localStorage.setItem(STORAGE_SUBMITTED_KEY, Date.now().toString());
        setSubmitted(true);
        setTimeout(() => dismiss(), 3000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Hide on admin and checkout pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/checkout")) {
    return null;
  }

  // Remove lead capture wall for local development
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop — High Z-Index Blocking */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-auto"
        style={{
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          opacity: isClosing ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Popup Modal */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
      >
        <style>{`
          @keyframes leadSlideUpFade {
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
          className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
          style={{
            transform: isClosing ? "translateY(20px)" : "translateY(0)",
            opacity: isClosing ? 0 : 1,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: isClosing ? "none" : "leadSlideUpFade 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
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
                <h2 className="text-2xl font-black text-gray-900 mb-1.5">Get the best price</h2>
                <p className="text-xs text-gray-500 font-medium">Direct Factory Price & Quick WhatsApp Quotation</p>
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
                              hasUserSelected.current = true;
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
                    className="w-full py-4 rounded-xl text-base font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2 shadow-lg"
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
