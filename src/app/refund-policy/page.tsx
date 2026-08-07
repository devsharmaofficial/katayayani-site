import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund Policy | Katayayani Enterprises",
  description: "Refund terms, eligibility criteria, and processing timelines for transactions with Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Refund Eligibility</h2>
              <p className="mb-3">
                At Katayayani Enterprises, customer satisfaction and statutory compliance are paramount. Refunds are provisionally entertained under two primary conditions:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Order Cancellation prior to Dispatch:</strong> If an order is cancelled before freight dispatch or custom fabrication initiation.</li>
                <li><strong>Verified Material Defect upon Delivery:</strong> If a returned product is verified by our compliance division to have manufacturing defects or transit damage beyond standard tolerances, as outlined in our Return Policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Order Cancellation Protocol</h2>
              <p className="mb-3">
                Customers may request order cancellation within 24 hours of order confirmation or prior to shipment dispatch. To initiate a cancellation, please email us at <strong>agroindustriesmeerut@gmail.com</strong> or call <strong>+91 9358273054</strong> with your order details. If the order has not yet been processed or dispatched, a full refund will be initiated without cancellation surcharges.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Refund Processing & Mode of Payment</h2>
              <p className="mb-3">
                Upon approval of a refund (following order cancellation or receipt and inspection of a returned item), the refund credit will automatically be routed back to the customer&apos;s original financial instrument used during transaction initiation (e.g., PhonePe, net banking, UPI, or credit/debit card).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Processing Timelines</h2>
              <p className="mb-3">
                Approved refunds are initiated by Katayayani Enterprises within <strong>2 to 3 business days</strong>. The time required for the funds to reflect in your account typically ranges from <strong>5 to 7 business days</strong>, depending on the processing timelines of intermediary financial institutions and payment gateways.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Exceptions & Non-Refundable Charges</h2>
              <p className="mb-3">
                Freight carriage costs incurred for reverse logistics are non-refundable unless the return is due to a verified dispatch error or manufacturing defect caused by Katayayani Enterprises. Custom color modifications or bespoke structural additions requested by the customer are subject to review prior to refund processing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Inquiries & Escalation</h2>
              <p className="mb-3">
                For questions regarding pending refunds or financial reconciliation, please contact:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
                <li><strong>Phone:</strong> +91 9358273054 / +91 8077004688</li>
                <li><strong>Entity Address:</strong> Katayayani Enterprises, Tirupati complex wali gali, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh 250002, India</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
