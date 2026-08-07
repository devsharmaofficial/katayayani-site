import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Statutory Freight & Logistical Carriage Policy | Katayayani Enterprises",
  description: "Logistical directives, freight carriage terms, and risk transference provisions governing Katayayani Enterprises consignments.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ShippingPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Statutory Freight Carriage and Logistical Transference Directive</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.01: Logistical Locus & Carriage Dispatch Protocols</h2>
              <p className="mb-3">
                All physical consignments originating from Katayayani Enterprises (&quot;The Entity&quot;) are dispatched from the central manufacturing complex situated in Meerut, Uttar Pradesh. Logistical carriage is executed via licensed third-party heavy freight transporters, surface cargo networks, or commercial logistics carriers servicing regional and national destinations across India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 2.01: Transference of Title, Risk of Loss, & Delivery Finality</h2>
              <p className="mb-3">
                Risk of loss, damage, and title to the physical asset transfer irrevocably to The Purchaser upon consignment tender to the designated freight carrier or upon physical handover at the destination point. Consequent upon physical delivery termination, all post-consignment return, exchange, or fiscal remission mechanisms become unconditionally non-applicable and legally extinguished.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 3.01: Temporal Carriage Chronologies & Volumetric Tariffs</h2>
              <p className="mb-3">
                Estimated transit chronologies (typically 3–10 diurnal cycles contingent upon geographical zone) are indicative operational estimates provided by freight carriers and do not constitute guaranteed temporal commitments by The Entity. Freight tariffs, volumetric surcharges, and transit insurance costs are assessed based on destination distance and carrier fee structures.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 4.01: Mandatory Delivery Inspection Protocol</h2>
              <p className="mb-3">
                The Purchaser must conduct an immediate forensic physical inspection of the packaging architecture and asset integrity at the exact moment of delivery. Any observable external transit damage must be noted explicitly on the carrier&apos;s primary Lorry Receipt (LR) copy prior to signature execution. Omission of explicit written endorsement on the LR copy at delivery constitutes irrebuttable legal proof of pristine consignment receipt, permanently barring subsequent damage or restitution claims.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 5.01: Logistical Administrative Contact</h2>
              <p className="mb-3">
                For logistical tracking or formal carriage records:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Entity:</strong> Katayayani Enterprises, Meerut, UP</li>
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
                <li><strong>Telephone:</strong> +91 9358273054 / +91 8077004688</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
