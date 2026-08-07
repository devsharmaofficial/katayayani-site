import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Shipping & Freight Logistics Policy | Katayayani Enterprises",
  description: "Logistics, freight dispatch guidelines, delivery timelines, and transit inspection terms for Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping & Freight Logistics Policy</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Operational Scope & Dispatch Infrastructure</h2>
              <p className="mb-3">
                Katayayani Enterprises (&quot;The Entity&quot;) manufactures and dispatches premium FRP tractor fiber hoods, canopies, and accessories directly from our manufacturing hub in Meerut, Uttar Pradesh. We ship to customers, dealers, and agricultural machinery distributors across all states and Union Territories in India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Order Processing & Fulfillment Timelines</h2>
              <p className="mb-3">
                Standard orders for in-stock tractor fiber hoods are processed and dispatched within <strong>2 to 4 business days</strong> from receipt of payment or order booking confirmation. Custom paint requests, specialized tractor mounting hardware, or bulk commercial orders may require additional processing time, which will be explicitly communicated during order booking.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Freight Partners & Estimated Delivery Windows</h2>
              <p className="mb-3">
                Due to the structural size and weight of FRP tractor canopies, shipments are routed via accredited heavy logistics transport networks and surface cargo couriers. Estimated transit times:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Northern India (UP, Haryana, Punjab, Delhi NCR, Rajasthan, UK):</strong> 3 to 5 business days.</li>
                <li><strong>Central & Western India (MP, Gujarat, Maharashtra):</strong> 5 to 7 business days.</li>
                <li><strong>Southern & Eastern India (Karnataka, AP, TN, WB, Bihar, Odisha, etc.):</strong> 7 to 10 business days.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Freight Costs & Payment</h2>
              <p className="mb-3">
                Shipping and freight charges are calculated based on shipment destination, volumetric weight, and carrier rates. Freight fees are either included in the final invoice amount or charged at actuals as agreed upon during order placement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Delivery Inspection & Transit Damage Protocol</h2>
              <p className="mb-3">
                Customers are strongly advised to inspect the outer packaging and canopy structure upon physical delivery from the transport carrier. In the rare event of visible structural damage caused during transit:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Note the damage explicitly on the carrier&apos;s delivery receipt / LR copy before signing.</li>
                <li>Capture clear photographs and video of the damaged packaging and product.</li>
                <li>Notify Katayayani Enterprises within <strong>48 hours</strong> at <strong>agroindustriesmeerut@gmail.com</strong> or <strong>+91 9358273054</strong>.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Contact Logistics Division</h2>
              <p className="mb-3">
                For shipment tracking, freight status updates, or shipping inquiries, please contact:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Logistics Desk:</strong> Katayayani Enterprises, Meerut, UP</li>
                <li><strong>Phone:</strong> +91 9358273054 / +91 8077004688</li>
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
