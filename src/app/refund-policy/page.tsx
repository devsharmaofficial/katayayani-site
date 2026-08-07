import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund Policy | Katayayani Enterprises",
  description: "Refund policy and non-dispatch refund guidelines for Katayayani Enterprises.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund Policy</h1>
          
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. General Refund Policy</h2>
              <p>
                Payments made to Katayayani Enterprises for ordered products are non-refundable once an order is processed and dispatched from our factory.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. 15-Day Non-Dispatch Refund Guarantee</h2>
              <p>
                If an ordered product is <strong>not dispatched</strong> from our factory within <strong>15 days</strong> of payment confirmation, the customer is entitled to a full refund. In such cases, the complete payment will be credited back to the customer&apos;s original payment method (PhonePe, UPI, Credit/Debit card, or Bank Account) within 5 to 7 working days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Order Verification</h2>
              <p>
                Please ensure all order details, tractor brand model, dimensions, and quantity are accurate before submitting payment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Contact Information</h2>
              <p>For any questions or status updates regarding your order, please contact us:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Phone:</strong> +91 9358273054 / +91 8077004688</li>
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
                <li><strong>Address:</strong> Katayayani Enterprises, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh 250002, India</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
