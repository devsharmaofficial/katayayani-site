import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Store } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const googleMapsUrl = "https://www.google.com/maps/place/Katayayani+Enterprises/@28.97119,77.6657833,17z/data=!4m14!1m7!3m6!1s0x390c65d40d93aa71:0x27d2116f19318fce!2sKatayayani+Enterprises!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5!3m5!1s0x390c65d40d93aa71:0x27d2116f19318fce!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D";
  const email = "agroindustriesmeerut@gmail.com";
  const indiamartUrl = "https://www.indiamart.com/katayayanienterprises/profile.html?srsltid=AfmBOop7_rHYA-qT9ya5XoTm4omHIJ2nd_umeto-mJHGfQDWpkjqOkXv";
  const whatsappNumber = "919358273054";
  const phoneNumber = "+919358273054";

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Brand Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:flex-1">
          <Link href="/" className="group flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#012d1d] via-[#104e33] to-[#795900] bg-clip-text text-transparent group-hover:opacity-90 transition-opacity duration-300">
              Katayayani Enterprises
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#795900] animate-pulse"></span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-medium text-gray-600">
          <Link href="/" className="hover:text-[#012d1d] transition-colors">Home</Link>
          <Link href="/products" className="hover:text-[#012d1d] transition-colors">Products</Link>
          <Link href="/about" className="hover:text-[#012d1d] transition-colors">About</Link>
          <Link href="/gallery" className="hover:text-[#012d1d] transition-colors">Gallery</Link>
        </div>

        {/* Right Side: Contact Icons & Badges */}
        <div className="flex flex-col items-center md:items-end gap-3.5 md:flex-1">
          <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-2.5 w-full sm:w-auto">
            <a
              href="tel:+918077004688"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#ffc641] text-[#012d1d] border border-[#ffd54f] font-extrabold text-[14px] sm:text-[15px] hover:bg-[#ffe259] transition-all shadow-[0_3px_10px_rgba(255,198,65,0.3)] hover:scale-105 active:scale-95"
              title="Call +91 8077004688"
            >
              <Phone className="w-4 h-4 text-[#012d1d] stroke-[2.5px]" />
              <span>+91 8077004688</span>
            </a>
            <a
              href="tel:+919358273054"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#012d1d] text-white border border-[#023e29] font-extrabold text-[14px] sm:text-[15px] hover:bg-[#024a30] transition-all shadow-[0_3px_10px_rgba(1,45,29,0.2)] hover:scale-105 active:scale-95"
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
              className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#012d1d] hover:border-[#012d1d] transition-all duration-300"
              title="View Location on Google Maps"
            >
              <MapPin className="w-[16px] h-[16px]" />
            </Link>

            {/* Email */}
            <Link
              href={`mailto:${email}`}
              className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#012d1d] hover:border-[#012d1d] transition-all duration-300"
              title="Email Us"
            >
              <Mail className="w-[16px] h-[16px]" />
            </Link>

            {/* IndiaMart */}
            <Link
              href={indiamartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#ff6f00] hover:border-[#ff6f00] transition-all duration-300"
              title="IndiaMart Profile"
            >
              <Store className="w-[16px] h-[16px]" />
            </Link>

            {/* WhatsApp */}
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-[16px] h-[16px]" />
            </Link>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full py-2.5 border-t border-gray-100 text-center text-[12px] text-gray-400 bg-white">
        © {currentYear} Katayayani Enterprises. All Rights Reserved.
      </div>
    </footer>
  );
}
