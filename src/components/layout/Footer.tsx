import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Store, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const googleMapsUrl = "https://www.google.com/maps/place/Katayayani+Enterprises/@28.97119,77.6657833,17z/data=!4m14!1m7!3m6!1s0x390c65d40d93aa71:0x27d2116f19318fce!2sKatayayani+Enterprises!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5!3m5!1s0x390c65d40d93aa71:0x27d2116f19318fce!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D";
  const email = "agroindustriesmeerut@gmail.com";
  const indiamartUrl = "https://www.indiamart.com/katayayanienterprises/profile.html?srsltid=AfmBOop7_rHYA-qT9ya5XoTm4omHIJ2nd_umeto-mJHGfQDWpkjqOkXv";
  const whatsappNumber = "919358273054";
  const phoneNumber = "+919358273054";
  const youtubeUrl = "https://youtube.com/@katayayanienterprises.meerut";

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Brand Logo & Trust Badges */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:flex-1 gap-2.5">
          <Link href="/" className="group flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-black font-serif tracking-tight group-hover:opacity-90 transition-opacity duration-300 drop-shadow-sm">
              <span className="text-[#012d1d]">Katayayani</span> <span className="text-[#b36b00]">Enterprises</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#795900] animate-pulse"></span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-100/50 text-emerald-800 text-[11px] font-bold shadow-sm">
            <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>GSTIN: <span className="font-extrabold select-all">09BGDPS3254A1ZL</span></span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-black bg-emerald-100 px-1 py-0.2 rounded-sm ml-0.5">Verified</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-medium text-gray-600">
          <Link href="/" className="hover:text-[#012d1d] transition-colors py-1">Home</Link>
          <Link href="/products" className="hover:text-[#012d1d] transition-colors py-1">Products</Link>
          <Link href="/blogs" className="hover:text-[#012d1d] transition-colors py-1">Blogs</Link>
          <Link href="/about" className="hover:text-[#012d1d] transition-colors py-1">About</Link>
          <Link href="/gallery" className="hover:text-[#012d1d] transition-colors py-1">Gallery</Link>
          <a href="https://www.katayayanienterprises.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#012d1d] transition-colors font-bold flex items-center gap-1 text-[#012d1d] py-1">
            Full Catalog <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right Side: Contact Icons & Badges */}
        <div className="flex flex-col items-center md:items-end gap-3.5 md:flex-1">
          <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-2.5 w-full sm:w-auto">
            <a
              href="tel:+918077004688"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#ffc641] text-[#012d1d] border border-[#ffd54f] font-extrabold text-[14px] sm:text-[15px] hover:bg-[#ffe259] transition-all shadow-[0_3px_10px_rgba(255,198,65,0.3)] hover:scale-105 active:scale-95 min-h-[48px]"
              title="Call +91 8077004688"
            >
              <Phone className="w-4 h-4 text-[#012d1d] stroke-[2.5px]" />
              <span>+91 8077004688</span>
            </a>
            <a
              href="tel:+919358273054"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#012d1d] text-white border border-[#023e29] font-extrabold text-[14px] sm:text-[15px] hover:bg-[#024a30] transition-all shadow-[0_3px_10px_rgba(1,45,29,0.2)] hover:scale-105 active:scale-95 min-h-[48px]"
              title="Call +91 9358273054"
            >
              <Phone className="w-4 h-4 text-[#ffc641] stroke-[2.5px]" />
              <span>+91 9358273054</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Location */}
            <Link
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#012d1d] hover:border-[#012d1d] transition-all duration-300"
              title="View Location on Google Maps"
              aria-label="View Location on Google Maps"
            >
              <MapPin className="w-[18px] h-[18px]" />
            </Link>

            {/* Email */}
            <Link
              href={`mailto:${email}`}
              className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#012d1d] hover:border-[#012d1d] transition-all duration-300"
              title="Email Us"
              aria-label="Email Us"
            >
              <Mail className="w-[18px] h-[18px]" />
            </Link>

            {/* IndiaMart */}
            <Link
              href={indiamartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#ff6f00] hover:border-[#ff6f00] transition-all duration-300"
              title="IndiaMart Profile"
              aria-label="View IndiaMart Profile"
            >
              <Store className="w-[18px] h-[18px]" />
            </Link>

            {/* YouTube */}
            <Link
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300"
              title="YouTube Channel"
              aria-label="Visit YouTube Channel"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>

            {/* WhatsApp */}
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
              title="WhatsApp Chat"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full py-2.5 border-t border-gray-100 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-3 text-[12px] text-gray-500 bg-white">
        <span>© {currentYear} Katayayani Enterprises. All Rights Reserved.</span>
        <span className="hidden sm:inline text-gray-300">|</span>
        <Link href="/return-policy" className="hover:text-gray-700 transition-colors p-3 min-h-[48px] flex items-center justify-center">Return Policy</Link>
        <span className="hidden sm:inline text-gray-300">|</span>
        <Link href="/store-rating" className="hover:text-gray-700 transition-colors p-3 min-h-[48px] flex items-center justify-center">Store Rating</Link>
      </div>
    </footer>
  );
}
