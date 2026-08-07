import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Statutory Fiscal Remission Policy | Katayayani Enterprises",
  description: "Regulatory provisions and statutory directives governing fiscal remissions and monetary non-refundability at Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Statutory Directive Governing Monetary Remissions and Fiscal Finality</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.01: Absolute Post-Delivery Fiscal Non-Remission (Non-Refundability)</h2>
              <p className="mb-3">
                In strict accordance with the financial governance protocols mandated by Katayayani Enterprises (hereinafter &quot;The Entity&quot;), all monetary transactions, fiscal remittances, and consideration payments executed in favor of The Entity become absolute, unalterable, and non-refundable upon the physical arrival, consignment receipt, or logistical transfer of the ordered asset to The Purchaser or their designated carrier. Post-delivery fiscal remissions—colloquially understood as monetary refunds—are explicitly declared strictly non-applicable under all commercial circumstances. The physical delivery of the asset extinguishes any and all monetary recourse or transactional reversal claims.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.02: Extinction of Post-Receipt Compensatory Claims</h2>
              <p className="mb-3">
                No financial adjustment, partial refund, chargeback authorization, or monetary reimbursement shall be sanctioned subsequent to the successful receipt of the consignment. Factors including but not limited to post-consignee preference modifications, installation incompatibilities resulting from third-party tractor modifications, or subjective aesthetic variances do not constitute valid grounds for fiscal remission and are summarily barred from administrative review.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 2.01: Pre-Dispatch Cancellation Constraints & Processing Protocol</h2>
              <p className="mb-3">
                Monetary refunds may exclusively be provisionally evaluated solely prior to the initiation of material fabrication or logistical carriage dispatch. Should a formal cancellation petition be lodged within six (6) hours of order inception and prior to factory assembly dispatch, The Entity may, at its sole discretion, process a pre-dispatch refund less applicable administrative processing fees. Once an order has entered the dispatch sequence or passed to third-party freight carriers, the non-refundability protocol activates automatically and permanently.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 3.01: Processing Latency of Pre-Approved Fiscal Adjustments</h2>
              <p className="mb-3">
                In the rare instance where a pre-dispatch cancellation refund is formally authorized in writing by The Entity&apos;s executive board, the monetary credit shall be asynchronously routed to the original financial apparatus (UPI / PhonePe / Direct Bank Transfer). The manifestation timeline for said credit is subject to the clearing chronologies of intermediary banking networks (typically 7–14 business days) and lies entirely beyond the administrative control of The Entity.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 4.01: Interlocutory Fiscal Inquiries</h2>
              <p className="mb-3">
                For administrative record-keeping or formal accounting inquiries, correspondence must be directed to <strong>agroindustriesmeerut@gmail.com</strong> or telephonically via <strong>+91 9358273054</strong>. Please note that submission of inquiries does not modify or suspend the post-delivery non-refundability mandate.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
