"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp, Phone, MessageCircle, MapPin, Truck, Award } from "lucide-react";
import { useState } from "react";

// ─── FAQ DATA — Targeting Every Tier 1 Keyword (English Only) ───────────────
const faqData = [
  {
    question: "What is the price of a tractor fiber hood in India?",
    answer:
      "Tractor fiber hood price at Katayayani Enterprises starts from a competitive factory-direct rate depending on the brand and model. We offer the best price on punjabi tractor hoods, fiber chatri, and tractor fiber hoods for Swaraj, Mahindra, Sonalika, Eicher, New Holland, Massey Ferguson, Farmtrac and all other brands. Call us at +91-9358273054 for an exact quote.",
  },
  {
    question: "What is the price of Swaraj 744 fiber hood?",
    answer:
      "Katayayani Enterprises offers the best price for Swaraj 744 fiber hood and Swaraj 855 fiber hood. Our Swaraj tractor fiber hood is precision-molded for a perfect fit on Swaraj 744 FE, 744 XT, 855 FE, 855 XM and all Swaraj series models. Call +91-9358273054 or WhatsApp for the latest Swaraj fiber hood price.",
  },
  {
    question: "What is the Mahindra tractor fiber hood price?",
    answer:
      "Katayayani Enterprises manufactures Mahindra tractor fiber hood (fiber chatri) at the best factory price. Our Mahindra fiber hood fits Mahindra 575 DI, 475 DI, Arjun Novo, Yuvo, Oja and all Mahindra models. It features an integrated heat shield that reduces cabin temperature by up to 15°C. Contact us at +91-9358273054 for Mahindra tractor fiber hood price.",
  },
  {
    question: "What is the Sonalika tractor fiber hood price?",
    answer:
      "Our Sonalika tractor fiber hood (fiber chatri) is available at the best price in India. It fits Sonalika DI 750 III, Tiger 50, Tiger 55, DI 60 and all Sonalika series. Katayayani Enterprises provides home delivery across India. Call +91-9358273054 for the current Sonalika fiber hood price.",
  },
  {
    question: "What is a Punjabi tractor hood (Punjabi hood)?",
    answer:
      "Punjabi tractor hood (also known as punjabi hood or fiber chatri) is an FRP (Fiber Reinforced Plastic) roof cover for tractors that protects the operator from intense sun, heavy rain, and high winds. Katayayani Enterprises in Meerut, UP is India's #1 manufacturer of punjabi tractor hoods for all major brands — Mahindra, Swaraj, Sonalika, Eicher, New Holland, Massey Ferguson, and Farmtrac.",
  },
  {
    question: "Is home delivery available for tractor fiber hood?",
    answer:
      "Yes! Katayayani Enterprises delivers tractor fiber hood (punjabi hood / fiber chatri) to any state in India — Punjab, Haryana, Uttar Pradesh, Gujarat, Maharashtra, Rajasthan, Madhya Pradesh, and all other states. Delivery typically takes 4–5 days. Order online via WhatsApp or call us at +91-9358273054.",
  },

  {
    question: "What are the Eicher, Farmtrac, and New Holland tractor fiber hood prices?",
    answer:
      "Katayayani Enterprises manufactures fiber hoods for Eicher (Eicher 380, 485, 551), Farmtrac (Farmtrac 60, 45, 6055), and New Holland (New Holland 3630 TX, 5620 TX Plus) at competitive prices. Each fiber chatri is custom-fit for the specific model with all-weather protection. Call +91-9358273054 for the best price.",
  },
  {
    question: "What is the difference between fiber hood and fiber chatri?",
    answer:
      "Fiber hood and fiber chatri are two names for the same product — both refer to an FRP (Fiber Reinforced Plastic) tractor roof canopy. It is also known as a punjabi hood or tractor chatri. Katayayani Enterprises manufactures all types of fiber hood / fiber chatri for all major tractor brands at the best factory price in India.",
  },
  {
    question: "Where is Katayayani Enterprises located?",
    answer:
      "Katayayani Enterprises is located at: 30,9A, Tirupati Complex Wali Gali, Baghpat Road, Sabun Godam, Meerut, Uttar Pradesh — 250002, India. We are India's #1 tractor fiber hood manufacturer. For factory visits, bulk orders, or dealer inquiries, call: +91-9358273054 or WhatsApp us.",
  },
];

// ─── BRAND MODEL DATA ─────────────────────────────────────────────────────────
const brandModels = [
  {
    brand: "Swaraj",
    keyword: "Swaraj Tractor Fiber Hood",
    slug: "swaraj-frp-canopy",
    models: ["Swaraj 744 FE", "Swaraj 855 FE", "Swaraj 963 FE", "Swaraj 735 FE"],
  },
  {
    brand: "Mahindra",
    keyword: "Mahindra Tractor Fiber Hood",
    slug: "mahindra-frp-canopy",
    models: ["Mahindra 575 DI", "Mahindra 475 DI", "Mahindra Arjun Novo", "Mahindra 275 DI"],
  },
  {
    brand: "Sonalika",
    keyword: "Sonalika Tractor Fiber Hood",
    slug: "sonalika-frp-canopy",
    models: ["Sonalika DI 750 III", "Sonalika Tiger 50", "Sonalika Tiger 55", "Sonalika DI 60"],
  },

  {
    brand: "Eicher",
    keyword: "Eicher Tractor Fiber Hood",
    slug: "eicher-frp-canopy",
    models: ["Eicher 380", "Eicher 485", "Eicher 551", "Eicher 333"],
  },
  {
    brand: "New Holland",
    keyword: "New Holland Tractor Fiber Hood",
    slug: "new-holland-frp-canopy",
    models: ["New Holland 3630 TX", "New Holland 5620 TX Plus", "New Holland 3230 NX"],
  },
  {
    brand: "Massey Ferguson",
    keyword: "Massey Ferguson Tractor Fiber Hood",
    slug: "massey-ferguson-frp-canopy",
    models: ["Massey 1035 DI", "Massey 241 DI", "Massey 7250 PowerUp"],
  },
  {
    brand: "Farmtrac",
    keyword: "Farmtrac Tractor Fiber Hood",
    slug: "farmtrac-frp-canopy",
    models: ["Farmtrac 60", "Farmtrac 45", "Farmtrac 6055", "Farmtrac 50"],
  },
];

// ─── FAQ ACCORDION ───────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left group min-h-[48px]"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? `Collapse answer for: ${q}` : `Expand answer for: ${q}`}
      >
        <span className="text-[14px] md:text-[15px] font-semibold text-[#012d1d] leading-snug group-hover:text-[#104e33] transition-colors">
          {q}
        </span>
        <span className="shrink-0 mt-0.5 text-[#012d1d]/60 group-hover:text-[#012d1d] transition-colors">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[13px] md:text-[14px] text-gray-500 leading-relaxed pr-6">
          {a}
        </p>
      )}
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function HomepageSEOContent() {
  // FAQ JSON-LD — unlocks Google Featured Snippets (Position 0)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ════════════════════════════════════════════════════════════
          SECTION A — H1 + INTRO (invisible to casual users, visible to Google)
          Placed inside a clean contained block at the page bottom
          ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f8faf9] border-t border-[#012d1d]/8 py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6">

          {/* ── Top header ── */}
          <div className="text-center max-w-[720px] mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#012d1d]/5 text-[#012d1d] text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-5">
              <Award size={13} />
              India's #1 Tractor Fiber Hood Manufacturer
            </div>
            <h1 className="text-[28px] md:text-[38px] font-black text-[#012d1d] leading-tight mb-4">
              Tractor Fiber Hood Price in India
            </h1>
            <p className="text-[24px] md:text-[20px] font-semibold text-[#795900] mb-5">
              Punjabi Hood · Fiber Chatri · All Brands
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              <strong>Katayayani Enterprises</strong>, Meerut (UP) — factory-direct{" "}
              <strong>tractor fiber hood</strong> for <strong>Mahindra, Swaraj 744/855,
              Sonalika, Eicher, New Holland, Massey Ferguson</strong> and all
              other brands. Best price guaranteed. Home delivery all over India.
            </p>
            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
              <a
                href="tel:+919358273054"
                className="inline-flex items-center justify-center gap-2 bg-[#012d1d] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#104e33] transition-all shadow-md text-[14px]"
              >
                <Phone size={16} />
                Call for Price: +91-9358273054
              </a>
              <a
                href="https://wa.me/919358273054?text=Hello%20Katayayani%20Enterprises%2C%0A%0AI%20am%20interested%20in%20exploring%20your%20premium%20tractor%20fiber%20hoods.%20Could%20you%20please%20share%20your%20latest%20catalog%20and%20pricing%20details%3F%0A%0AThank%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-[#012d1d] font-bold px-7 py-3.5 rounded-full hover:bg-[#1da851] hover:text-white transition-all shadow-md text-[14px]"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-[12px] text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><Truck size={12} className="text-[#012d1d]" /> Home Delivery India</span>
              <span className="flex items-center gap-1.5"><Award size={12} className="text-[#012d1d]" /> Factory Direct Price</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#012d1d]" /> Meerut, Uttar Pradesh</span>
            </div>
          </div>

          {/* ── Brand × Model Grid ── */}
          <div className="mb-14">
            <h2 className="text-[18px] md:text-[22px] font-black text-[#012d1d] text-center mb-2">
              Fiber Hood Price — Brand Wise
            </h2>
            <p className="text-center text-[13px] text-gray-500 mb-8">
              Click your tractor brand to view models &amp; get the best price
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {brandModels.map((b) => (
                <Link
                  key={b.slug}
                  href={`/products/${b.slug}`}
                  className="group block bg-white border border-gray-100 rounded-xl p-4 hover:border-[#012d1d]/25 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#795900] mb-1.5 leading-tight">
                    {b.keyword}
                  </div>
                  <div className="text-[15px] font-black text-[#012d1d] mb-2.5 group-hover:text-[#104e33] transition-colors leading-tight">
                    {b.brand} Fiber Hood
                  </div>
                  <ul className="space-y-1 mb-3">
                    {b.models.map((m) => (
                      <li key={m} className="text-[11px] text-gray-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#795900] shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-bold text-[#795900] group-hover:text-[#012d1d] transition-colors">
                    View Price →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── About Section (keyword-rich body text) ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-14 shadow-sm">
            <h2 className="text-[20px] md:text-[24px] font-black text-[#012d1d] mb-5">
              About Katayayani Enterprises — Tractor Fiber Hood Manufacturer
            </h2>
            <div className="text-[14px] text-gray-600 leading-relaxed space-y-4 max-w-[900px]">
              <p>
                <strong>Katayayani Enterprises</strong> is India's leading manufacturer and supplier of{" "}
                <strong>tractor fiber hood</strong> (punjabi hood / fiber chatri), based in{" "}
                <strong>Meerut, Uttar Pradesh</strong>. We deliver our premium quality FRP hoods all across India.
              </p>
              <p>
                Our <strong>punjabi tractor hoods</strong> are manufactured using premium FRP (Fiber
                Reinforced Plastic) — lightweight yet ultra-durable, providing complete overhead
                protection from sun, rain, and high winds. The{" "}
                <strong>tractor fiber hood price</strong> at Katayayani Enterprises is the most
                competitive in India because we sell factory-direct with no middlemen.
              </p>
              <p>
                <strong>Swaraj 744 fiber hood</strong> and <strong>Swaraj 855 fiber hood</strong> are
                our bestselling products — precision-molded for a perfect fit with zero vibration.{" "}
                <strong>Mahindra tractor fiber hood</strong> features an integrated heat shield that
                reduces cabin temperature significantly. <strong>Sonalika tractor fiber chatri</strong>{" "}
                fits DI 750, Tiger 50/55 with reinforced anti-vibration mounts.
              </p>
              <p>
                <strong>Eicher tractor fiber hood</strong>, <strong>New Holland tractor fiber hood</strong>,{" "}
                <strong>Massey tractor fiber hood</strong>, and <strong>Farmtrac tractor fiber hood</strong>{" "}
                — all available at the best price with pan-India home delivery.
              </p>
              <p>
                Order your <strong>tractor fiber hood online</strong> — simply WhatsApp or call us and
                we ship anywhere in India within 4–5 days. Bulk orders and dealership inquiries welcome.
              </p>
            </div>
          </div>

          {/* ── Top Searched Tractor Fiber Hoods (Internal Links for SEO) ── */}
          <div className="mb-14">
            <h2 className="text-[18px] md:text-[22px] font-black text-[#012d1d] text-center mb-6">
              Top Searched Tractor Fiber Hoods &amp; Prices
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-[1000px] mx-auto">
              <Link href="/products/swaraj-744-fiber-hood" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Swaraj 744 Fiber Hood Price</Link>
              <Link href="/products/mahindra-frp-canopy" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Mahindra Tractor Fiber Hood Price</Link>
              <Link href="/products/sonalika-di-750-fiber-hood" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Sonalika Tractor Fiber Hood Price</Link>

              <Link href="/products/swaraj-855-fiber-hood" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Swaraj 855 Fiber Hood Price</Link>
              <Link href="/products/sonalika-frp-canopy" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Sonalika Fiber Chatri Price</Link>
              <Link href="/products/mahindra-frp-canopy" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Mahindra Tractor Fiber Chatri Price</Link>
              <Link href="/products" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Fiber Hood For Tractor Price</Link>
              <Link href="/products" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Punjabi Tractor Hood Price</Link>
              <Link href="/products" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Tractor Fiber Chatri Price</Link>
              <Link href="/products" className="bg-white border border-gray-200 text-[#012d1d] text-[13px] font-semibold px-4 py-2 rounded-full hover:border-[#012d1d] hover:bg-[#f8faf9] transition-all shadow-sm">Punjabi Hood Tractor</Link>
            </div>
          </div>

          {/* ── FAQ Section ── */}
          <div>
            <h2 className="text-[20px] md:text-[24px] font-black text-[#012d1d] text-center mb-2">
              Tractor Fiber Hood — Frequently Asked Questions
            </h2>
            <p className="text-center text-[13px] text-gray-500 mb-8">
              Everything you need to know about Punjabi Hood Price, Fiber Chatri &amp; More
            </p>

            <div className="bg-white border border-gray-100 rounded-2xl px-6 md:px-8 shadow-sm max-w-[860px] mx-auto">
              {faqData.map((f, i) => (
                <FaqItem key={i} q={f.question} a={f.answer} />
              ))}
            </div>

            <div className="text-center mt-8">
              <a
                href="tel:+919358273054"
                className="inline-flex items-center gap-2 bg-[#012d1d] text-white font-bold px-8 py-4 rounded-full hover:bg-[#104e33] transition-all shadow-md text-[14px]"
              >
                <Phone size={16} />
                Have more questions? Call: +91-9358273054
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
