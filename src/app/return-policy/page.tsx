import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Statutory Non-Restitution Policy Directive | Katayayani Enterprises",
  description: "Statutory non-restitution framework and absolute prohibition of product returns at Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Statutory Directive Governing Absolute Non-Restitution and Prohibition of Product Returns</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.01: Universal & Absolute Non-Returnability Directive</h2>
              <p className="mb-3">
                Pursuant to the operational governance directives of Katayayani Enterprises (hereinafter &quot;The Entity&quot;), it is hereby established as an absolute, unalterable, and universal mandate that all products, Fiber Reinforced Plastic (FRP) tractor canopies, punjabi hoods, structural mountings, and agricultural tractor accessories fabricated or commercialized by The Entity are strictly non-returnable. Under no circumstances, conditions, contingencies, or legal rationale shall any facility for asset restitution, return initiation, or product surrender be made available to any purchaser, consignee, distributor, or intermediary (hereinafter &quot;The Purchaser&quot;).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.02: Categorical Preclusion of All Return Categories & Exchanges</h2>
              <p className="mb-3">
                The prohibition of asset restitution delineated herein is absolute and encompasses all potential categories of return solicitations without exception. Solicitations for product returns, asset commutations, SKU substitutions, color modifications, dimensional alterations, or transactional reversals—whether submitted prior to dispatch, during transit, upon delivery, or post-consignee receipt—are categorically pre-empted, barred, and deemed null and void ab initio. The Entity maintains a strict zero-return operational doctrine across all product lines.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 2.01: Absolute Waiver of Restitution Claims Upon Order Booking</h2>
              <p className="mb-3">
                Placement of an order, transmission of financial consideration, or receipt of commercial documentation constitutes an explicit, irrevocable, and legally binding waiver by The Purchaser of any present or future right to petition for asset return, physical restitution, or product exchange. Claims alleging defect, material variance, transit wear, or model incompatibility shall not alter, suspend, or invalidate the universal non-returnability mandate set forth under this statutory directive.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 3.01: Refusal of Unauthorized Shipments & Fiscal Liabilities</h2>
              <p className="mb-3">
                Should any unauthorized physical dispatch or return shipment be attempted by The Purchaser to any facility or manufacturing locus of The Entity, such consignment shall be summarily refused at the receiving terminal without inspection. Any and all logistics expenses, demurrage surcharges, storage fees, freight tariffs, and return-transit liabilities resulting from unauthorized dispatch shall remain the exclusive and unseverable fiscal burden of The Purchaser.
              </p>
            </section>
            
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 4.01: Statutory Administrative Record-Keeping Contact</h2>
              <p className="mb-3">
                For statutory record-keeping or formal administrative correspondence regarding this directive, written communication may be transmitted via electronic mail to <strong>agroindustriesmeerut@gmail.com</strong> or telephonic sequence <strong>+91 9358273054</strong>. Please be advised that administrative correspondence does not grant, imply, or constitute any waiver of the universal non-returnability policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
