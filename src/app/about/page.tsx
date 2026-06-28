"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Target, Users, Factory, Check, Star, X, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
                  <div className="mt-8 flex justify-center">
                    <AwardBadge 
                      type="indiamart-trust-seal"
                      link="https://www.indiamart.com/katayayanienterprises/profile.html?srsltid=AfmBOop7_rHYA-qT9ya5XoTm4omHIJ2nd_umeto-mJHGfQDWpkjqOkXv"
                    />
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Verified Details & Badges */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <ScrollReveal direction="right">
                  <h1 className="text-headline-md text-primary font-black leading-tight">
                    About Katyayani Enterprises — FRP Tractor Canopy Manufacturer
                  </h1>
                  
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">
                    At Katyayani Enterprises, we prioritize transparency and reliability. We are honored to be awarded the <strong className="text-on-surface">IndiaMART Certificate of Trust</strong>, reflecting our steadfast commitment to genuine business operations, financial integrity, and product quality.
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
                        <p className="text-body-sm text-on-surface-variant">Fully registered and compliant under GSTIN: 09***********ZL.</p>
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
                          Tirupati complex wali gali, Baghpat Rd,<br />
                          Sabun Godam, Meerut,<br />
                          Uttar Pradesh - 250002
                        </p>
                        
                        {/* Embedded Google Map */}
                        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 shadow-sm w-full">
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.870375990264!2d77.6657833!3d28.97119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c65d40d93aa71%3A0x27d2116f19318fce!2sKatayayani%20Enterprises!5e0!3m2!1sen!2sin!4v1719000000000!5m2!1sen!2sin" 
                            className="w-full h-[180px] border-0" 
                            allowFullScreen 
                            loading="lazy"
                            title="Katayayani Enterprises Location Map"
                          />
                        </div>
                        <a 
                          href="https://www.google.com/maps/place/Katayayani+Enterprises/@28.97119,77.6657833,17z/data=!4m14!1m7!3m6!1s0x390c65d40d93aa71:0x27d2116f19318fce!2sKatayayani+Enterprises!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5!3m5!1s0x390c65d40d93aa71:0x27d2116f19318fce!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#012d1d] hover:bg-[#023e29] text-white rounded-lg text-[11px] font-bold transition-all shadow-[0_2px_8px_rgba(1,45,29,0.15)] hover:scale-[1.03] mt-3"
                        >
                          <MapPin className="w-3 h-3 text-[#ffc641]" />
                          <span>View on Google Maps</span>
                        </a>
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
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Modal for full certificate view */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[90vh] aspect-[1/1.4] w-full md:w-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl p-2 cursor-default"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingActions />
    </>
  );
}
