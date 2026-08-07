import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund Policy | Katayayani Enterprises",
  description: "Refund policy guidelines for Katayayani Enterprises.",
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
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. No Refunds</h2>
              <p>
                All payments made to Katayayani Enterprises are <strong>non-refundable</strong>. Once an order is placed and payment is completed (via PhonePe, UPI, credit/debit card, or direct bank transfer), refunds will not be issued under any circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Order Cancellations</h2>
              <p>
                Once payment is confirmed or an order enters processing, cancellations are not accepted and money will not be refunded.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Payment Confirmation</h2>
              <p>
                Please ensure all order details, quantity, and product choices are correct before submitting your payment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Contact Information</h2>
              <p>For questions regarding your transaction, please contact us:</p>
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
