"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronDown, Phone, User, Package, CheckCircle, Sparkles } from "lucide-react";

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
  const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const STORAGE_KEY = "kk_lead_popup";
  const SESSION_KEY = "kk_lead_popup_session";
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
    if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
    setTimeout(() => setIsVisible(false), 400);
  }, []);

  useEffect(() => {
    if (!shouldShow()) return;

    let scrolled = false;
    const onScroll = () => {
      const scrolled40 =
        window.scrollY / (document.body.scrollHeight - window.innerHeight) > 0.35;
      if (scrolled40 && !scrolled) {
        scrolled = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Show after 25s but only if scrolled
    timerRef.current = setTimeout(() => {
      if (!shouldShow()) return;
      setIsVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");

      // Auto-dismiss after 90s
      autoCloseRef.current = setTimeout(() => dismiss(), 90000);
    }, 25000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
    };
  }, [shouldShow, dismiss]);

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
    if (!/^\+?[0-9\s\-]{10,15}$/.test(phone.trim())) {
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
      {/* Backdrop — subtle, not blocking */}
      <div
        className="fixed inset-0 z-[998] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)",
          opacity: isClosing ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Popup Card */}
      <div
        className="fixed z-[999] bottom-0 left-0 right-0 sm:bottom-5 sm:right-5 sm:left-auto"
        style={{
          transform: isClosing ? "translateY(110%)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: isClosing ? "none" : "slideUpIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        <style>{`
          @keyframes slideUpIn {
            from { transform: translateY(110%); }
            to { transform: translateY(0); }
          }
          @keyframes successPop {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.15); }
            100% { transform: scale(1); opacity: 1; }
          }
          .lead-input {
            width: 100%;
            padding: 10px 14px 10px 40px;
            border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.15);
            background: rgba(255,255,255,0.07);
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            outline: none;
            transition: border-color 0.2s, background 0.2s;
            backdrop-filter: blur(4px);
          }
          .lead-input::placeholder { color: rgba(255,255,255,0.4); }
          .lead-input:focus {
            border-color: rgba(214,245,74,0.6);
            background: rgba(255,255,255,0.1);
          }
          .lead-select-btn {
            width: 100%;
            padding: 10px 14px 10px 40px;
            border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.15);
            background: rgba(255,255,255,0.07);
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            text-align: left;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: border-color 0.2s, background 0.2s;
            backdrop-filter: blur(4px);
          }
          .lead-select-btn:hover {
            border-color: rgba(214,245,74,0.6);
            background: rgba(255,255,255,0.1);
          }
        `}</style>

        <div
          className="relative w-full sm:w-[360px] overflow-hidden rounded-t-2xl sm:rounded-2xl shadow-2xl"
          style={{
            background: "linear-gradient(145deg, #012d1d 0%, #0a3d26 50%, #021f14 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), 0 0 60px rgba(1,45,29,0.5)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(214,245,74,0.12) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(1,45,29,0.6) 0%, transparent 70%)" }}
          />

          {/* Close Button */}
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {submitted ? (
            /* Success State */
            <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: "rgba(214,245,74,0.15)",
                  animation: "successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
                }}
              >
                <CheckCircle className="w-8 h-8" style={{ color: "#d6f54a" }} />
              </div>
              <p className="text-white text-lg font-black mb-1">Thank you, {name.split(" ")[0]}! 🙏</p>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                Our team will call you back shortly to share the best price!
              </p>
            </div>
          ) : (
            /* Form State */
            <div className="relative z-10 p-5">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(214,245,74,0.15)" }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: "#d6f54a" }} />
                </div>
                <div>
                  <p className="text-white font-black text-[15px] leading-tight">
                    Get Best Price — Free Delivery 🚚
                  </p>
                  <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                    We'll call you back with factory pricing
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                {/* Name Field */}
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="lead-input"
                    autoComplete="name"
                    maxLength={50}
                    id="lead-name"
                  />
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp / Phone Number"
                    className="lead-input"
                    autoComplete="tel"
                    maxLength={15}
                    id="lead-phone"
                    inputMode="numeric"
                  />
                </div>

                {/* Product Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <Package
                    className="absolute left-3 top-[11px] w-4 h-4 pointer-events-none z-10"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  />
                  <button
                    type="button"
                    className="lead-select-btn"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="truncate pr-2">{selectedProduct.name}</span>
                    <ChevronDown
                      className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  {dropdownOpen && (
                    <div
                      className="absolute bottom-full mb-1 left-0 right-0 rounded-xl overflow-y-auto z-20"
                      style={{
                        background: "linear-gradient(145deg, #012d1d, #0a3d26)",
                        border: "1.5px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 -8px 30px rgba(0,0,0,0.4)",
                        maxHeight: "200px",
                      }}
                    >
                      {ALL_PRODUCTS.map((p) => (
                        <button
                          key={p.slug || "general"}
                          type="button"
                          onClick={() => {
                            setSelectedProduct(p);
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors duration-150"
                          style={{
                            color:
                              selectedProduct.slug === p.slug
                                ? "#d6f54a"
                                : "rgba(255,255,255,0.75)",
                            background:
                              selectedProduct.slug === p.slug
                                ? "rgba(214,245,74,0.08)"
                                : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              "rgba(255,255,255,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              selectedProduct.slug === p.slug
                                ? "rgba(214,245,74,0.08)"
                                : "transparent";
                          }}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <p
                    className="text-[12px] font-semibold px-1"
                    style={{ color: "#ff7070" }}
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-[14px] font-black tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-60"
                  style={{
                    background: loading
                      ? "rgba(214,245,74,0.3)"
                      : "linear-gradient(135deg, #d6f54a 0%, #c5ea2c 100%)",
                    color: "#012d1d",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(214,245,74,0.3)",
                  }}
                >
                  {loading ? "Submitting..." : "Get Best Price Now →"}
                </button>

                <p
                  className="text-center text-[10px] font-medium"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  No spam. We'll call you once with pricing details.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
