import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Katayayani Enterprises",
  description: "Terms and conditions governing the use of website and commercial transactions with Katayayani Enterprises.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Introduction & Acceptance of Terms</h2>
              <p className="mb-3">
                Welcome to Katayayani Enterprises (&quot;The Entity&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing our website, communicating with our sales representatives, or purchasing our FRP (Fiber Reinforced Plastic) tractor canopies, punjabi hoods, and agricultural tractor accessories, you (&quot;The Customer&quot; or &quot;User&quot;) agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not access or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Products & Specifications</h2>
              <p className="mb-3">
                Katayayani Enterprises specializes in the manufacturing of high-grade FRP tractor canopies, custom fiber hoods, and accessories compatible with various tractor models (including Swaraj, Mahindra, Sonalika, Eicher, New Holland, Massey Ferguson, Farmtrac, etc.). While we strive for absolute accuracy in product specifications, color representations, and dimensions on our catalog, minor manufacturing variations inherent to composite FRP fabrication may occur.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Orders, Pricing & Payment Terms</h2>
              <p className="mb-3">
                All order placements, quotes, and commercial transactions are subject to product availability and order confirmation. Prices displayed or quoted are in Indian Rupees (INR) and are inclusive or exclusive of GST and freight charges as specified during order booking. Payment must be processed through our authorized payment channels, including PhonePe Business, direct bank transfer, or verified UPI gateways. Katayayani Enterprises reserves the right to modify pricing or refuse service at our discretion prior to order confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Intellectual Property</h2>
              <p className="mb-3">
                All content, product photographs, branding materials, logos, layout designs, and text present on this website are the exclusive intellectual property of Katayayani Enterprises. Unauthorized reproduction, modification, distribution, or commercial exploitation without prior written consent is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <p className="mb-3">
                Katayayani Enterprises shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use or inability to use our products or website. Our aggregate liability for any claim shall not exceed the actual purchase price paid by the customer for the specific product giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Governing Law & Jurisdiction</h2>
              <p className="mb-3">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any legal disputes or proceedings arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts located in Meerut, Uttar Pradesh, India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Contact Information</h2>
              <p className="mb-3">
                For any inquiries, clarifications, or statutory communications regarding these Terms and Conditions, please contact us at:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Entity Name:</strong> Katayayani Enterprises</li>
                <li><strong>GSTIN:</strong> 09BGDPS3254A1ZL</li>
                <li><strong>Address:</strong> Tirupati complex wali gali, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh 250002, India</li>
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
                <li><strong>Phone:</strong> +91 9358273054 / +91 8077004688</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
