import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Statutory Fiscal Remission Directive | Katayayani Enterprises",
  description: "Statutory framework and absolute prohibition of monetary refunds and fiscal remissions at Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Statutory Directive Governing Absolute Monetary Non-Refundability and Fiscal Finality</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.01: Absolute & Universal Non-Refundability Directive</h2>
              <p className="mb-3">
                In strict accordance with the mercantile governance protocols established by Katayayani Enterprises (hereinafter &quot;The Entity&quot;), all monetary remittances, financial considerations, order bookings, and payments executed in favor of The Entity are strictly, universally, and irrevocably non-refundable. Monetary refunds, fiscal remissions, payment reversals, or credit reimbursements of any kind are declared categorically non-applicable under all commercial circumstances, conditions, and operational scenarios without exception.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.02: Total Preclusion of Monetary Reversals & Cancellations</h2>
              <p className="mb-3">
                Upon the transmission or confirmation of payment consideration, transactional finality attaches immediately. No order cancellations, financial adjustments, chargeback authorizations, partial refunds, or payment remissions shall be sanctioned or processed prior to dispatch, during transit, or post-consignee receipt. Solicitations for monetary refunds predicated upon purchaser dissatisfaction, specification misapprehension, transit duration, or preference alteration are unconditionally pre-empted and barred.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 2.01: Irrevocable Extinction of Financial Recourse Claims</h2>
              <p className="mb-3">
                Placement of an order or execution of a financial transfer constitutes an explicit statutory waiver by The Purchaser of any right to initiate payment disputes, payment reversals, or fiscal claims against The Entity, its payment processing partners, or intermediary banking institutions. All payments received represent unalterable consideration for custom fabrication and commercial commitment.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 3.01: Interlocutory Administrative Record Contact</h2>
              <p className="mb-3">
                For administrative record-keeping or formal accounting inquiries, written correspondence may be directed to <strong>agroindustriesmeerut@gmail.com</strong> or telephonically via <strong>+91 9358273054</strong>. Please note that administrative inquiries do not grant, imply, or constitute any waiver of the universal non-refundability policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
