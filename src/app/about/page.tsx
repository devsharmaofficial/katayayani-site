"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Target, Users, Factory, Check, Star, X, Phone, Mail, MapPin, FileText, FileDown, Award, ExternalLink, ArrowUpRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";
import { AwardBadge } from "@/components/ui/award-badge";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const values = [
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description:
      "We source only the highest-grade raw materials to ensure every canopy meets our rigorous endurance standards.",
  },
  {
    icon: Target,
    title: "Precision Engineering",
    description:
      "Every product is custom-molded for an exact fit to the specific tractor model, eliminating vibration and noise.",
  },
  {
    icon: Users,
    title: "Farmer-First Design",
    description:
      "We listen to the agricultural community, constantly refining our designs based on real field feedback.",
  },
  {
    icon: Factory,
    title: "Advanced Manufacturing",
    description:
      "Our state-of-the-art facility combines automated precision with expert hand-craftsmanship.",
  },
];

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32">
        {/* Visual Breadcrumb Trail */}
        <div className="max-w-[1280px] mx-auto px-[24px] pt-4">
          <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "About Us", url: "/about" }]} />
        </div>

        {/* Trust & Verification Section */}
        <section className="py-[32px] bg-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-[24px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-start">
              
              {/* Left Column: Visual Certificate representation */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <ScrollReveal direction="left">
                  <div 
                    onClick={() => setIsModalOpen(true)}
                    className="group relative mx-auto max-w-[360px] aspect-[1/1.4] rounded-[24px] overflow-hidden bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-outline-variant/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Glossy overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                    
                    {/* The Certificate Image */}
                    <div className="relative w-full h-full rounded-[16px] overflow-hidden border border-gray-100">
                      <Image
                        src="/katayayani-enterprises-indiamart-trust-certificate.png"
                        alt="IndiaMART Trust Seal Certificate of Trust - Katayayani Enterprises"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                  <p className="text-center text-label-sm text-on-surface-variant/75 mt-4 italic">
                    Click to view high-resolution verification certificate
                  </p>
                  
                  {/* IndiaMART Trust Seal Badge */}
                  <div className="mt-8 flex flex-col items-center gap-2">
                    <AwardBadge 
                      type="indiamart-trust-seal"
                      link="https://www.indiamart.com/katayayanienterprises/profile.html?srsltid=AfmBOop7_rHYA-qT9ya5XoTm4omHIJ2nd_umeto-mJHGfQDWpkjqOkXv"
                    />
                    <a 
                      href="https://www.indiamart.com/katayayanienterprises/profile.html?srsltid=AfmBOop7_rHYA-qT9ya5XoTm4omHIJ2nd_umeto-mJHGfQDWpkjqOkXv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-label-xs font-bold text-on-surface-variant/70 hover:text-orange-600 hover:underline transition-all duration-300 mt-2"
                    >
                      <span>Click here to visit our IndiaMART profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Verified Details & Badges */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <ScrollReveal direction="right">
                  <h1 className="text-headline-md text-primary font-black leading-tight">
                    About Katayayani Enterprises — FRP Tractor Canopy Manufacturer
                  </h1>
                  
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">
                    At Katayayani Enterprises, we prioritize transparency and reliability. We are honored to be awarded the <strong className="text-on-surface">IndiaMART Certificate of Trust</strong>, reflecting our steadfast commitment to genuine business operations, financial integrity, and product quality.
                  </p>
                  <p className="text-body-lg text-on-surface-variant leading-relaxed mt-3">
                    Explore our comprehensive <a href="https://katayayanienterprises.online/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Official Business Catalog</a> to discover our full range of premium fiber hoods, complete with detailed specifications and wholesale pricing options tailored for dealers and farmers across India.
                  </p>
                </ScrollReveal>

                {/* Grid of Verified Credentials */}
                <ScrollReveal direction="right" delay={0.1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    
                    {/* GST Verified */}
                    <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-start gap-4 hover:border-primary/20 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-green-600 font-bold" />
                      </div>
                      <div>
                        <h4 className="text-title-sm text-on-surface font-bold">100% Verified GST</h4>
                        <p className="text-body-sm text-on-surface-variant">Fully registered and compliant under GSTIN: <span className="font-extrabold text-[#012d1d] select-all">09BGDPS3254A1ZL</span>.</p>
                      </div>
                    </div>

                    {/* Verified Bank Account */}
                    <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-start gap-4 hover:border-primary/20 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-green-600 font-bold" />
                      </div>
                      <div>
                        <h4 className="text-title-sm text-on-surface font-bold">Verified Bank Account</h4>
                        <p className="text-body-sm text-on-surface-variant">Authenticated primary banking and corporate credit credentials.</p>
                      </div>
                    </div>

                    {/* Address Verified */}
                    <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-start gap-4 hover:border-primary/20 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-green-600 font-bold" />
                      </div>
                      <div>
                        <h4 className="text-title-sm text-on-surface font-bold">Address Verified</h4>
                        <p className="text-body-sm text-on-surface-variant">On-site physical address verification conducted by IndiaMART auditors.</p>
                      </div>
                    </div>

                    {/* Ratings */}
                    <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-start gap-4 hover:border-primary/20 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-title-sm text-on-surface font-bold">Premium 3.9 Rating</h4>
                        <p className="text-body-sm text-on-surface-variant">Consistently rated for high response speed and reliable shipping.</p>
                      </div>
                    </div>

                  </div>
                </ScrollReveal>

                {/* Additional Info / Certificate Meta */}
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/30 flex flex-col sm:flex-row justify-between gap-4 text-center sm:text-left mt-2">
                    <div>
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block opacity-75">Certificate ID</span>
                      <span className="text-body-lg text-primary font-black">131145</span>
                    </div>
                    <div className="w-px bg-outline-variant/20 hidden sm:block"></div>
                    <div>
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block opacity-75">Issue Date</span>
                      <span className="text-body-lg text-primary font-black">September 2025</span>
                    </div>
                    <div className="w-px bg-outline-variant/20 hidden sm:block"></div>
                    <div>
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block opacity-75">Validity Period</span>
                      <span className="text-body-lg text-secondary font-black">Till September 2028</span>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Verification & Download actions */}
                <ScrollReveal direction="right" delay={0.3}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {/* Catalogue Card */}
                    <a
                      href="/katayayani-enterprises-catalogue.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-outline-variant/20 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <FileText className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <h4 className="text-title-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                            Product Catalogue
                          </h4>
                          <p className="text-body-xs text-on-surface-variant mt-0.5 font-medium">
                            PDF • 993 KB
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                        <FileDown className="w-4 h-4" />
                      </div>
                    </a>

                    {/* YouTube Channel Card */}
                    <a
                      href="https://youtube.com/@katayayanienterprises.meerut"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-outline-variant/20 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-red-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-500/5 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                          <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-title-sm text-on-surface font-bold group-hover:text-red-600 transition-colors">
                            Official YouTube
                          </h4>
                          <p className="text-body-xs text-on-surface-variant mt-0.5 font-medium">
                            Video Showcases & Demos
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-on-surface-variant group-hover:bg-red-500/10 group-hover:text-red-500 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>

                    {/* Official Business Catalog Card */}
                    <a
                      href="https://katayayanienterprises.online/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-outline-variant/20 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-[#012d1d]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer sm:col-span-2 lg:col-span-2"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#012d1d]/5 flex items-center justify-center text-[#012d1d] group-hover:bg-[#012d1d] group-hover:text-white transition-all duration-300">
                          <ExternalLink className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <h4 className="text-title-sm text-on-surface font-bold group-hover:text-[#012d1d] transition-colors">
                            Official Business Catalog
                          </h4>
                          <p className="text-body-xs text-on-surface-variant mt-0.5 font-medium">
                            Full product range & wholesale pricing
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-on-surface-variant group-hover:bg-[#012d1d]/10 group-hover:text-[#012d1d] transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* Business Info Section */}
        <section className="py-[48px] bg-white border-t border-gray-100">
          <div className="max-w-[1280px] mx-auto px-[24px]">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto bg-white border border-[#795900]/10 rounded-3xl p-6 sm:p-10 shadow-[0_10px_35px_rgba(121,89,0,0.04)] relative overflow-hidden">
                {/* Visual badge highlight */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffc641]/5 rounded-bl-full pointer-events-none" />
                
                <h3 className="text-headline-sm text-primary font-black text-center mb-8 tracking-tight">
                  Official Corporate Profile
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left block: Owner & Business */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#012d1d]/5 flex items-center justify-center flex-shrink-0 border border-[#012d1d]/10">
                        <Users className="w-5 h-5 text-[#012d1d]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#795900] font-black block mb-1">Owner</span>
                        <h4 className="text-title-md font-bold text-black">Ashok Kumar Sharma</h4>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#012d1d]/5 flex items-center justify-center flex-shrink-0 border border-[#012d1d]/10">
                        <MapPin className="w-5 h-5 text-[#012d1d]" />
                      </div>
                      <div className="w-full">
                        <span className="text-[10px] uppercase tracking-widest text-[#795900] font-black block mb-1">Registered Address</span>
                        <h4 className="text-title-md font-bold text-black font-semibold">Katayayani Enterprises</h4>
                        <p className="text-body-sm text-[#414844] mt-0.5 leading-relaxed">
                          30,9A, Tirupati Complex Wali Gali, Baghpat Road,<br />
                          Sabun Godam, Meerut,<br />
                          Uttar Pradesh - 250002
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pt-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#795900] font-black block mb-1">GST Registration Number</span>
                        <h4 className="text-title-md font-extrabold text-[#012d1d] flex items-center gap-1.5">
                          <span className="select-all">09BGDPS3254A1ZL</span>
                          <span className="text-[9px] uppercase tracking-wider text-emerald-600 font-extrabold bg-emerald-100 px-1 py-0.2 rounded-sm border border-emerald-200">Verified</span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Contacts */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#012d1d]/5 flex items-center justify-center flex-shrink-0 border border-[#012d1d]/10">
                        <Phone className="w-5 h-5 text-[#012d1d]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#795900] font-black block mb-1">Corporate Contact Numbers</span>
                        <div className="space-y-2 mt-1.5">
                          <a 
                            href="tel:+918077004688" 
                            className="inline-flex items-center gap-1.5 text-title-sm font-bold text-[#012d1d] hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#ffc641]" />
                            <span>+91 8077004688</span>
                          </a>
                          <br />
                          <a 
                            href="tel:+919358273054" 
                            className="inline-flex items-center gap-1.5 text-title-sm font-bold text-[#012d1d] hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#ffc641]" />
                            <span>+91 9358273054</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#012d1d]/5 flex items-center justify-center flex-shrink-0 border border-[#012d1d]/10">
                        <Mail className="w-5 h-5 text-[#012d1d]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#795900] font-black block mb-1">Official Email</span>
                        <a 
                          href="mailto:agroindustriesmeerut@gmail.com" 
                          className="block text-title-sm font-bold text-[#012d1d] hover:underline mt-1 break-all"
                        >
                          agroindustriesmeerut@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full-width Map Section */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#795900] font-black block mb-0.5">Factory Location</span>
                      <h4 className="text-title-lg font-black text-black">Find Us on Google Maps</h4>
                    </div>
                    <a 
                      href="https://www.google.com/maps/place/Katayayani+Enterprises/@28.97119,77.6657833,17z/data=!4m14!1m7!3m6!1s0x390c65d40d93aa71:0x27d2116f19318fce!2sKatayayani+Enterprises!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5!3m5!1s0x390c65d40d93aa71:0x27d2116f19318fce!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#012d1d] hover:bg-[#023e29] text-white rounded-xl text-[11px] font-bold transition-all shadow-[0_2px_8px_rgba(1,45,29,0.15)] hover:scale-[1.03]"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#ffc641]" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>

                  {/* Embedded Google Map */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm w-full">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.870375990264!2d77.6657833!3d28.97119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c65d40d93aa71%3A0x27d2116f19318fce!2sKatayayani%20Enterprises!5e0!3m2!1sen!2sin!4v1719000000000!5m2!1sen!2sin" 
                      className="w-full h-[320px] sm:h-[400px] border-0" 
                      allowFullScreen 
                      loading="lazy"
                      title="Katayayani Enterprises Location Map"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Modal for full certificate view */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[90vh] aspect-[1/1.4] w-full md:w-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl p-2 cursor-default animate-in zoom-in-95 duration-300"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src="/katayayani-enterprises-indiamart-trust-certificate.png"
                alt="IndiaMART Certificate of Trust"
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingActions />
    </>
  );
}
