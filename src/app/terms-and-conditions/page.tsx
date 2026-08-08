import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Katayayani Enterprises",
  description: "Terms and conditions of sale for Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
          
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Agreement to Terms</h2>
              <p>
                By accessing our website or purchasing products from Katayayani Enterprises, you agree to these Terms and Conditions. If you do not agree, please do not place an order.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Products & Sales Policy</h2>
              <p>
                We manufacture and sell high-quality FRP (Fiber Reinforced Plastic) tractor canopies, Punjabi hoods, and tractor accessories. All sales are final. We do not offer returns, refunds, or product exchanges after purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Pricing & Payments</h2>
              <p>
                Prices are listed in Indian Rupees (INR). Payments must be completed through our authorized payment modes (PhonePe Business, UPI, or Direct Bank Transfer) prior to order dispatch.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Intellectual Property</h2>
              <p>
                All brand names, product designs, photos, logos, and content on this website are owned by Katayayani Enterprises and cannot be copied without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Jurisdiction</h2>
              <p>
                Any legal disputes related to our products or services will be subject to the exclusive jurisdiction of the courts in Meerut, Uttar Pradesh, India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact Us</h2>
              <p>For questions or assistance, contact us at:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Entity Name:</strong> Katayayani Enterprises (GSTIN: 09BGDPS3254A1ZL)</li>
                <li><strong>Address:</strong> 30,9A, Tirupati Complex Wali Gali, Baghpat Road, Sabun Godam, Meerut, Uttar Pradesh 250002, India</li>
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
