import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Remittance Policy Stipulations | Katayayani Enterprises",
  description: "Comprehensive statutory framework and procedural guidelines for returns, refunds, and remissions at Katayayani Enterprises.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ReturnPolicy() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Statutory Framework and Procedural Guidelines for Product Returns and Fiscal Remissions</h1>
        
        <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.01: Foundational Provisions and Temporal Limitations (Return Window)</h2>
            <p className="mb-3">
              Pursuant to the operational directives governing commercial transactions with Katayayani Enterprises (hereinafter referred to as "The Entity"), the facility for the initiation of a restitution protocol, commonly denominated as a "Return," is strictly circumscribed by a finite temporal parameter. Specifically, the aggrieved party (hereinafter referred to as "The Purchaser") must ostensibly establish formal correspondence indicating a desire for restitution within a period not exceeding seven (7) contiguous diurnal cycles from the verified timestamp of logistical consignment termination (delivery). Should said aforementioned seven-day threshold transpire without the explicit, documented invocation of the restitution protocol, The Entity shall, forthwith and unconditionally, be absolved of any reciprocal obligation to entertain requests for fiscal remission or ancillary compensatory mechanisms. Furthermore, it is hereby declared as a fundamental, non-negotiable tenet of The Entity's operational doctrine that any and all solicitations for the commutation of assets—colloquially understood as product exchanges—are strictly and categorically prohibited under all circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.02: Requisite Preconditions for Restitution Eligibility</h2>
            <p className="mb-3">
              The admissibility of a restitution claim is contingently predicated upon a multiplicity of rigid preconditions. Principally, it is an immutable stipulation that the restitution protocol may exclusively be invoked solely under circumstances where empirical, undeniable substantiation of structural failure, material discrepancy, or manufacturing defect—directly and indisputably attributable to The Entity's manufacturing processes—can be unequivocally demonstrated. Claims predicated upon purchaser remorse, preferential alterations, or any non-defective rationale are unconditionally and summarily dismissed. Furthermore, in the event of a verified defect, the tangible asset in question must remain in an undisturbed, unutilized, and unblemished state (beyond the intrinsic defect itself), exhibiting no secondary deviations, and must be securely encapsulated within its pristine, original packaging architecture.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 2.01: Logistical Protocols and Fiscal Liabilities for Transference (Return Cost)</h2>
            <p className="mb-3">
              In the event that a restitution claim is provisionally entertained by The Entity's compliance division, the onus of reverse logistics falls inherently and invariably upon The Purchaser. The procedural methodology dictates that the asset must be systematically routed back to the primary manufacturing locus of The Entity. While The Entity hereby waives the imposition of arbitrary "restocking" tariffs, the fiscal burden concomitant with the carriage and transit insurance of the returned asset shall be borne exclusively by The Purchaser, excepting only those exceedingly rare instances wherein The Entity, at its sole and unquestionable discretion, acknowledges macroscopic malfeasance in the initial dispatch (e.g., dispatch of an empirically incorrect sku).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 3.01: Adjudication and Processing of Fiscal Remissions</h2>
            <p className="mb-3">
              Upon the physical receipt of the returned asset at The Entity's designated compliance facility, a protracted period of forensic material inspection shall commence. Subsequent to the culmination of this evaluative process, The Purchaser shall be issued a formal decree regarding the authorization or repudiation of the requested fiscal remission. Should the evaluative decree swing in favor of authorization, a bureaucratic mechanism will be triggered wherein a compensatory credit shall be asynchronously routed to the original financial apparatus utilized during the inception of the transaction. The temporal latency governing the manifestation of said credit is contingent upon the labyrinthine processing chronologies of third-party financial institutions and is explicitly beyond the regulatory jurisdiction of The Entity.
            </p>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 4.01: Jurisdictional Arbitration and Interlocutory Correspondence</h2>
            <p className="mb-3">
              For any and all inquiries pertaining to the labyrinthine clauses delineated within this statutory framework, or to initiate a preliminary inquiry into the potential admissibility of a restitution claim, The Purchaser is directed to utilize the designated electronic correspondence channel: agroindustriesmeerut@gmail.com, or to attempt telephonic communication via the numerical sequence +91 9358273054. Please be advised that preliminary correspondence does not constitute an acknowledgment of restitution eligibility, nor does it pause the aforementioned seven-day temporal limitation clause.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
