"use client";

import * as z from "zod";
import { Phone, Mail, MapPin, Send, Loader2, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactPageProps {
  isEnquiry?: boolean;
}

export default function ContactPage({ isEnquiry = false }: ContactPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      setIsSubmitting(true);
      
      const whatsappMessage = `Hello Katayayani Enterprises! 👋\n\nI am interested in your FRP tractor canopies and would like to get more information.\n\nHere are my details:\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n\n📝 My Message / Requirements:\n${formData.message}\n\nLooking forward to your response!`;
      const whatsappUrl = `https://wa.me/919358273054?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const breadcrumbItems = isEnquiry
    ? [
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" },
        { name: "Send Enquiry", url: "/enquiry" },
      ]
    : [
        { name: "Home", url: "/" },
        { name: "Contact Us", url: "/contact" },
      ];

  const pageTitle = isEnquiry
    ? "Request Katyayani Enterprises FRP Canopy Price Quote"
    : "Contact Katyayani Enterprises — Get Tractor Fiber Hood Quote";

  const pageDescription = isEnquiry
    ? "Fill out the quick form below to request factory-direct pricing, custom color availability, or dealer rates for our premium tractor canopies."
    : "Have questions about our FRP canopies? Want a custom quote? Fill out the form below or contact us directly.";

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32">
        {/* Visual Breadcrumb Trail */}
        <div className="max-w-[1280px] mx-auto px-[24px] pt-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="max-w-[1280px] mx-auto px-[24px] pb-[48px]">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-[64px]">
              <h1 className="text-[26px] md:text-[36px] font-black text-[#012d1d] leading-tight mb-[16px]">
                {pageTitle}
              </h1>
              <p className="text-body-lg text-[#414844] leading-relaxed">
                {pageDescription}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-[48px] max-w-5xl mx-auto">
            {/* Contact Info (2 cols) */}
            <div className="lg:col-span-2 space-y-[32px]">
              <ScrollReveal direction="left">
                <div className="bg-white/40 backdrop-blur-md text-on-surface rounded-[16px] p-[32px] shadow-[0_8px_32px_rgba(31,38,135,0.07)] border border-white/50">
                  <h2 className="text-headline-sm mb-[24px]">Contact Information</h2>
                  
                  <div className="space-y-[24px]">
                    <div className="flex items-start gap-[16px]">
                      <div className="w-[40px] h-[40px] rounded-full bg-primary-fixed/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary-fixed" />
                      </div>
                      <div>
                        <h3 className="text-label-md text-primary-fixed/80 uppercase tracking-wider mb-[4px]">Phone</h3>
                        <p className="text-body-lg">
                          <a href="tel:+918077004688" className="hover:underline block">+91 8077004688</a>
                          <a href="tel:+919358273054" className="hover:underline block">+91 9358273054</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-[16px]">
                      <div className="w-[40px] h-[40px] rounded-full bg-primary-fixed/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary-fixed" />
                      </div>
                      <div>
                        <h3 className="text-label-md text-primary-fixed/80 uppercase tracking-wider mb-[4px]">Email</h3>
                        <p className="text-body-lg break-all">
                          <a href="mailto:agroindustriesmeerut@gmail.com" className="hover:underline">agroindustriesmeerut@gmail.com</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-[16px]">
                      <div className="w-[40px] h-[40px] rounded-full bg-primary-fixed/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary-fixed" />
                      </div>
                      <div>
                        <h3 className="text-label-md text-primary-fixed/80 uppercase tracking-wider mb-[4px]">Location</h3>
                        <p className="text-body-lg leading-relaxed">
                          Tirupati complex wali gali,<br />
                          Baghpat Rd, Sabun Godam, Meerut,<br />
                          Uttar Pradesh 250002, India
                        </p>
                        <a 
                          href="https://www.google.com/maps/place/Katayayani+Enterprises/@28.97119,77.6657833,17z/data=!4m14!1m7!3m6!1s0x390c65d40d93aa71:0x27d2116f19318fce!2sKatayayani+Enterprises!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5!3m5!1s0x390c65d40d93aa71:0x27d2116f19318fce!8m2!3d28.97119!4d77.6657833!16s%2Fg%2F11q7fxf2h5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-[12px] font-bold text-primary hover:underline mt-2"
                        >
                          View on Google Maps →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Form (3 cols) */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <div className="bg-white/40 backdrop-blur-md rounded-[16px] p-[32px] shadow-[0_8px_32px_rgba(31,38,135,0.07)] border border-white/50">
                  {isSuccess ? (
                    <div className="text-center py-[48px]">
                      <div className="w-16 h-16 bg-primary-fixed/30 rounded-full flex items-center justify-center mx-auto mb-[24px]">
                        <Check className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-headline-sm text-primary mb-[12px]">Message Sent Successfully!</h3>
                      <p className="text-body-md text-on-surface-variant mb-[24px]">
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="text-primary hover:underline font-label-md"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-[24px]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                        {/* Name */}
                        <div>
                          <label className="block text-label-md text-on-surface mb-[8px]">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full bg-white/50 border ${errors.name ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'} rounded-lg px-[16px] py-[12px] text-body-md text-on-surface outline-none focus:ring-1`}
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="text-label-sm text-error mt-[4px]">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-label-md text-on-surface mb-[8px]">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full bg-white/50 border ${errors.phone ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'} rounded-lg px-[16px] py-[12px] text-body-md text-on-surface outline-none focus:ring-1`}
                            placeholder="+91 8077004688"
                          />
                          {errors.phone && <p className="text-label-sm text-error mt-[4px]">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-label-md text-on-surface mb-[8px]">Your Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className={`w-full bg-white/50 border ${errors.message ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'} rounded-lg px-[16px] py-[12px] text-body-md text-on-surface outline-none focus:ring-1 resize-y`}
                          placeholder="Tell us about your requirements..."
                        />
                        {errors.message && <p className="text-label-sm text-error mt-[4px]">{errors.message}</p>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary text-label-md px-[32px] py-[14px] rounded-lg hover:bg-primary-container transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
