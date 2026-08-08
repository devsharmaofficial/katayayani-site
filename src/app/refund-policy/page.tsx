import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | Katayayani Enterprises",
  description: "Refund and Cancellation Policy for Katayayani Enterprises.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund and Cancellation policy</h1>
          
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            <p>This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:</p>

            <p>Cancellations will only be considered if the request is made 1 days of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.</p>

            <p>KATAYAYANI ENTERPRISES does not accept cancellation requests for perishable items like flowers, eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.</p>

            <p>In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 1 days of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 1 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.</p>

            <p>In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.</p>

            <p>In case of any refunds approved by KATAYAYANI ENTERPRISES, it will take 1 days for the refund to be processed to you.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
