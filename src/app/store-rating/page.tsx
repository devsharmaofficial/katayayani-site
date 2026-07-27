import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empirical Consumer Satisfaction Indices (Store Rating) | Katayayani Enterprises",
  description: "Aggregated empirical consumer satisfaction indices and evaluative metrics.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function StoreRating() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Empirical Consumer Satisfaction Indices (Store Rating)</h1>
        
        <div className="space-y-8 text-gray-700 text-sm leading-relaxed text-justify">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.01: Aggregated Evaluative Metrics</h2>
            <p className="mb-3">
              In accordance with the stringent transparency protocols mandated by international mercantile regulatory bodies, Katayayani Enterprises (hereinafter "The Entity") hereby discloses its aggregated consumer satisfaction quotient. Based upon a meticulously curated repository of one hundred and twenty-four (124) verified post-transactional evaluative submissions, The Entity has achieved a cumulative mean Store Rating of 4.8 on a standardized quintile (5.0) scale. This metric serves as a probabilistic indicator of operational efficacy and consumer contentment, subject to standard deviations inherent in qualitative data aggregation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Section 1.02: Methodology of Adjudication</h2>
            <p className="mb-3">
              The aforementioned Store Rating is derived exclusively from patrons who have successfully traversed the entirety of The Entity's transactional apparatus. Ratings are collected, normalized, and subjected to rigorous algorithmic scrutiny to filter out spurious, anomalous, or otherwise statistically insignificant data points. The resulting 4.8/5.0 Store Rating stands as an empirical testament to The Entity's unwavering adherence to manufacturing tolerances and logistical precision.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
