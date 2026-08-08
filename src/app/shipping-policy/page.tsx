import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Shipping Policy | Katayayani Enterprises",
  description: "Shipping and freight delivery policy for Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Policy</h1>
          
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Delivery Coverage</h2>
              <p>
                Katayayani Enterprises ships tractor fiber hoods, canopies, and accessories across all states in India directly from our factory in Meerut, Uttar Pradesh.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Processing & Dispatch Time</h2>
              <p>
                In-stock items are processed and handed over to transport carriers within <strong>5 to 6 business days</strong> after payment confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Estimated Delivery Timelines</h2>
              <p>
                Estimated delivery time is <strong>5 to 6 business days</strong> after dispatch, depending on your destination location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Freight Charges</h2>
              <p>
                Shipping costs depend on the shipment weight, canopy size, and delivery location. Charges are communicated clearly during order booking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Delivery Inspection</h2>
              <p>
                Please check the shipment packaging at the time of delivery from the transport driver. Any physical damage must be written on the delivery receipt before signing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact Logistics</h2>
              <p>For shipping status or tracking inquiries, please contact us:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Entity Name:</strong> Katayayani Enterprises</li>
                <li><strong>Phone:</strong> +91 9358273054 / +91 8077004688</li>
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
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
