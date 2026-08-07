import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Return Policy | Katayayani Enterprises",
  description: "Comprehensive statutory framework and procedural guidelines for product returns at Katayayani Enterprises.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ReturnPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Return Policy</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1: Return Window & Eligibility</h2>
              <p className="mb-3">
                Pursuant to the operational directives governing commercial transactions with Katayayani Enterprises (&quot;The Entity&quot;), the initiation of a product return is subject to a strict temporal parameter. Specifically, the customer must establish formal correspondence indicating a return request within seven (7) calendar days from the verified timestamp of delivery. Should said seven-day threshold transpire without explicit documented invocation of a return request, The Entity shall be absolved of any reciprocal obligation to entertain requests for returns or replacements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 2: Reconditions for Return Eligibility</h2>
              <p className="mb-3">
                The admissibility of a return claim is predicated upon clear preconditions. Principally, return requests are entertained exclusively under circumstances where empirical substantiation of structural failure, material discrepancy, or manufacturing defect—directly attributable to Katayayani Enterprises—can be demonstrated. Claims predicated upon purchaser change of mind or preference alterations are not eligible. Furthermore, the product must remain in an unutilized state encapsulated within its original packaging architecture.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 3: Reverse Logistics & Transport Cost</h2>
              <p className="mb-3">
                In the event that a return claim is provisionally entertained by Katayayani Enterprises, the logistics procedure dictates that the item must be routed back to our primary manufacturing locus in Meerut. While we do not impose restocking fees, the shipping and transit carriage costs of the returned item shall be borne by the customer, excepting instances wherein Katayayani Enterprises acknowledges a dispatch error (e.g. dispatch of an incorrect SKU).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 4: Inspection & Refund Routing</h2>
              <p className="mb-3">
                Upon physical receipt of the returned item at our Meerut facility, an inspection process will be conducted. Subsequent to evaluation, the customer will be issued formal notification regarding approval or repudiation. Upon approval, a compensatory refund credit shall be routed back to the original payment method utilized during transaction initiation within 5 to 7 business days.
              </p>
            </section>
            
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 5: Contact & Inquiries</h2>
              <p className="mb-3">
                For inquiries pertaining to return claims or requests, please contact:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Katayayani Enterprises</strong></li>
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
                <li><strong>Phone:</strong> +91 9358273054 / +91 8077004688</li>
                <li><strong>Address:</strong> Tirupati complex wali gali, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh 250002, India</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
