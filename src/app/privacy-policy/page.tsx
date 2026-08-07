import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Katayayani Enterprises",
  description: "Data privacy practices, information collection, and security protocols at Katayayani Enterprises.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                Katayayani Enterprises (&quot;The Entity&quot;, &quot;we&quot;, &quot;us&quot;) respects the privacy of every visitor and customer. We collect personal information necessary for processing inquiries, sales, freight logistics, and compliance, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Contact Details:</strong> Name, phone number, email address, and physical shipping address.</li>
                <li><strong>Transactional Information:</strong> Order details, product specifications requested, and transaction IDs (processed securely via payment partners).</li>
                <li><strong>Communication Logs:</strong> Messages sent via inquiry forms, email correspondence, or WhatsApp inquiries.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">
                Information collected is strictly utilized for legitimate business purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fulfilling orders, processing payments, and arranging freight transportation for tractor fiber hoods.</li>
                <li>Providing customer support, price quotes, and responding to technical or product inquiries.</li>
                <li>Complying with legal, tax (GST), and regulatory requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Data Protection & Security</h2>
              <p className="mb-3">
                We implement robust security measures to prevent unauthorized access, alteration, disclosure, or destruction of your personal data. Electronic records are stored on secure servers with encrypted access controls.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Third-Party Sharing & Disclosure</h2>
              <p className="mb-3">
                Katayayani Enterprises does not sell, trade, or rent personal customer data to third parties for marketing purposes. Data is shared exclusively with trusted third-party partners when essential for order fulfillment:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Logistics & Transport Carriers:</strong> To execute physical delivery of ordered goods to your destination.</li>
                <li><strong>Payment Processors (e.g. PhonePe):</strong> To securely process financial transactions.</li>
                <li><strong>Statutory Authorities:</strong> When required by Indian law or legal mandates (e.g., GST billing verification).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Cookies & Analytics</h2>
              <p className="mb-3">
                Our website may utilize standard session cookies and privacy-preserving analytics toolsets (such as Vercel Analytics) to monitor aggregate website traffic performance and improve user navigation experience. No sensitive financial information is collected via cookies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Contact Data Protection Desk</h2>
              <p className="mb-3">
                If you have questions or concerns regarding our privacy practices or wish to update your personal details, please contact:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Katayayani Enterprises</strong></li>
                <li>Tirupati complex wali gali, Baghpat Rd, Sabun Godam, Meerut, Uttar Pradesh 250002, India</li>
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
