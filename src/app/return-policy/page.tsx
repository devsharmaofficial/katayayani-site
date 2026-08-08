import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cancellation & Return Policy | Katayayani Enterprises",
  description: "Cancellation and return policy guidelines for Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cancellation & Return Policy</h1>
          
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Cancellation Policy</h2>
              <p>
                Customers can cancel their orders at any time before the product is dispatched from our factory. If an order is cancelled prior to dispatch, a full refund will be initiated. Once the product has been dispatched, the order cannot be cancelled.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. No Returns</h2>
              <p>
                At Katayayani Enterprises, all sales are final. All products, including tractor fiber hoods, Punjabi hoods, canopies, and accessories, are <strong>non-returnable</strong> once purchased or delivered. We do not accept returns under any circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. No Exchanges</h2>
              <p>
                We do not offer product exchanges or model replacements. Please make sure to verify your tractor brand, model, canopy size, and color preferences before placing an order.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Pre-Order Verification</h2>
              <p>
                If you have any doubts about model compatibility or fitting for your tractor (Swaraj, Mahindra, Sonalika, Eicher, John Deere, Massey Ferguson, etc.), please contact our sales team before making a payment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Contact Information</h2>
              <p>For any questions or support, reach out to us at:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Entity Name:</strong> Katayayani Enterprises</li>
                <li><strong>Phone:</strong> +91 9358273054 / +91 8077004688</li>
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
                <li><strong>Address:</strong> 30,9A, Tirupati Complex Wali Gali, Baghpat Road, Sabun Godam, Meerut, Uttar Pradesh 250002, India</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
