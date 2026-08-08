import { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Shipping Policy | Katayayani Enterprises",
  description: "Shipping Policy for Katayayani Enterprises.",
  alternates: {
    canonical: `${SITE_URL}/shipping-policy`,
  },
  robots: {
    index: true,
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
          
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            <p>The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within 10 days from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is not refundable.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
