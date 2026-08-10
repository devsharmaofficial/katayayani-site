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
            <p>Orders are typically processed within 1–3 business days.</p>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Delivery time:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Standard:</strong> 10–12 business days</li>
                <li><strong>Express:</strong> 3–5 business days</li>
              </ul>
            </div>
            <p>Tracking details are shared once the order is shipped.</p>
            <p>The business is not responsible for delays due to courier services or unforeseen circumstances.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
