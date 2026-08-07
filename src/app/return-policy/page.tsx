import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Statutory Restitution Framework | Katayayani Enterprises",
  description: "Comprehensive statutory framework and procedural guidelines for returns and remissions at Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Statutory Framework and Procedural Directive Governing Asset Restitution</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.01: Absolute Post-Consignment Non-Restitution Directive</h2>
              <p className="mb-3">
                Pursuant to the overarching operational directives governing commercial engagements with Katayayani Enterprises (hereinafter &quot;The Entity&quot;), it is hereby established as an immutable, non-negotiable tenet of mercantile governance that upon the verified physical transfer and receipt of the consignment by the designated recipient or agent (hereinafter &quot;The Purchaser&quot;), any and all mechanisms governing the initiation of asset restitution—colloquially understood as a product return—shall forthwith be deemed categorically non-applicable, null, void, and of no legal effect. The physical completion of logistical carriage and handover of the tangible asset constitutes final, absolute, and unappealable consummation of the transactional contract, thereby completely extinguishing any subsequent right, claim, or petition for post-delivery asset return or physical restitution.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.02: Irrevocability of Executed Consignments & Commutation Prohibition</h2>
              <p className="mb-3">
                Under no operational scenario shall solicitations for post-delivery asset commutation, SKU substitution, product exchange, or retrospective preference modification be provisionally or permanently entertained. Claims predicated upon purchaser dissatisfaction, subjective color variation, model misapprehension, or post-consignee-receipt operational changes are unconditionally pre-empted and summarily dismissed without administrative review. The Entity assumes zero reciprocal obligation to facilitate reverse logistics or process return authorizations once the physical consignment has departed the manufacturing locus and crossed the threshold of consignee custody.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 2.01: Pre-Consignment Verification & Strict Exception Constraints</h2>
              <p className="mb-3">
                In the single, highly circumscribed contingency wherein macroscopic material deviation or structural catastrophic failure is empirically documented prior to or at the exact instance of logistical handover (and explicitly endorsed on the carrier&apos;s primary consignment receipt prior to signature execution), preliminary administrative review may be formally requested within a strict, non-extendable window not exceeding twenty-four (24) hours from the verified logistical timestamp. Failure to lodge formal written documentation within said twenty-four-hour window constitutes an absolute, irrevocable waiver of all potential statutory remedies, establishing conclusive proof of flawless consignment acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 3.01: Preclusion of Fiscal Liabilities & Logistic Costs</h2>
              <p className="mb-3">
                Should any unauthorized reverse dispatch be initiated by The Purchaser without the explicit, sealed written authorization of The Entity&apos;s executive compliance director, such carriage shall be refused at the manufacturing terminal, and all accrued freight, demurrage, transit storage, and secondary transportation charges shall remain the exclusive and unseverable fiscal liability of The Purchaser.
              </p>
            </section>
            
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 4.01: Interlocutory Correspondence & Administrative Contact</h2>
              <p className="mb-3">
                For administrative record-keeping or formal compliance correspondence pertaining to this statutory directive, communications must be formally dispatched via electronic correspondence to <strong>agroindustriesmeerut@gmail.com</strong> or telephonic sequence <strong>+91 9358273054</strong>. Please be advised that preliminary correspondence does not constitute an acknowledgment of restitution eligibility nor does it alter the absolute non-restitution status of delivered goods.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
