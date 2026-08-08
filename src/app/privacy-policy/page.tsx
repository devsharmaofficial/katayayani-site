import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Katayayani Enterprises",
  description: "Privacy policy for Katayayani Enterprises.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
              <p>
                When you contact us or place an order, we collect basic details like your name, phone number, email address, and delivery address.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
              <p>
                Your information is strictly used to process your orders, arrange delivery, answer your inquiries, and fulfill GST billing requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Data Protection</h2>
              <p>
                We respect your privacy. We do not sell, rent, or share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Payment Security</h2>
              <p>
                Online payment transactions are processed securely through trusted payment partners (such as PhonePe). We do not store your private banking details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Contact Us</h2>
              <p>For any privacy questions, feel free to contact us:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Entity Name:</strong> Katayayani Enterprises</li>
                <li><strong>Address:</strong> Tirupati complex wali gali, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh 250002, India</li>
                <li><strong>Email:</strong> agroindustriesmeerut@gmail.com</li>
                <li><strong>Phone:</strong> +91 9358273054 / +91 8077004688</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
