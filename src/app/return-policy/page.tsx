import { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { absolute: "Return Policy | Katayayani Enterprises" },
  description: "Return Policy for Katayayani Enterprises.",
  alternates: {
    canonical: `${SITE_URL}/return-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReturnPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Return Policy</h1>
          
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            <p>Replacements/Exchanges request must be raised within 2 working days of delivery.</p>
            <p>We don't provide any return and we provide only replacements/ exchange.</p>
            <p>Replacements/exchanges will be delivered within 7-10 working days.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
