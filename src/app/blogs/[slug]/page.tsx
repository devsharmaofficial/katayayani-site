"use client";

import { SITE_URL, getAbsoluteImageUrl } from "@/config/site";
import Image from "next/image";
import { use } from "react";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getBlogBySlug } from "@/lib/blogs";
import TractorPriceEstimator from "@/components/blog/TractorPriceEstimator";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Navbar />
      
      {/* Article JSON-LD Schema for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.seo.title,
            description: blog.seo.description,
            image: [getAbsoluteImageUrl(blog.image)],
            datePublished: `${blog.publishedAt}T08:00:00+08:00`,
            dateModified: `${blog.publishedAt}T08:00:00+08:00`,
            author: [{
                "@type": "Organization",
                name: blog.author,
                url: SITE_URL
            }],
            publisher: {
              "@type": "Organization",
              name: "Katayayani Enterprises",
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/katayayani-enterprises-logo.png`
              }
            }
          }),
        }}
      />

      {/* FAQPage JSON-LD Schema for Rich Snippets */}
      {blog.faqs && blog.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: blog.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      <main className="flex-grow pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-[880px] mx-auto px-[24px]">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { name: "Home", url: "/" },
                { name: "Blogs", url: "/blogs" },
                { name: blog.title, url: `/blogs/${blog.slug}` },
              ]}
            />
          </div>

          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-[#012d1d] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>

          <article>
            <ScrollReveal>
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-[#012d1d] mb-6 leading-tight">
                {blog.title}
              </h1>
              <div className="flex items-center gap-6 text-sm font-semibold text-gray-500 mb-10 pb-8 border-b border-gray-100">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-600" />{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-600" />{blog.readTime}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              {blog.images && blog.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {blog.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-[#f4f4f4]">
                      <Image
                        src={img}
                        alt={`${blog.title} - Image ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-102 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative w-full aspect-[16/9] mb-12 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 flex items-center justify-center">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal>
              {blog.content.includes("<!-- PRICE_ESTIMATOR_COMPONENT -->") ? (
                (() => {
                  const [before, after] = blog.content.split("<!-- PRICE_ESTIMATOR_COMPONENT -->");
                  return (
                    <div>
                      <div 
                        className="prose prose-lg prose-emerald max-w-none prose-headings:font-black prose-headings:text-[#012d1d] prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-[#012d1d]"
                        dangerouslySetInnerHTML={{ __html: before }}
                      />
                      <TractorPriceEstimator />
                      <div 
                        className="prose prose-lg prose-emerald max-w-none prose-headings:font-black prose-headings:text-[#012d1d] prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-[#012d1d]"
                        dangerouslySetInnerHTML={{ __html: after }}
                      />
                    </div>
                  );
                })()
              ) : (
                <div 
                  className="prose prose-lg prose-emerald max-w-none prose-headings:font-black prose-headings:text-[#012d1d] prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-[#012d1d]"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}
            </ScrollReveal>
          </article>

          <ScrollReveal>
            <div className="mt-20 p-8 bg-gradient-to-br from-[#f0faf5] to-white border border-[#012d1d]/10 rounded-3xl text-center">
              <h3 className="text-2xl font-black text-[#012d1d] mb-4">Ready for a Premium Fiber Hood?</h3>
              <p className="text-gray-600 mb-6 max-w-[28rem] mx-auto">Get the best price on a heavy-duty tractor fiber hood directly from Katayayani Enterprises.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/products" className="px-6 py-3 bg-[#012d1d] text-white rounded-full font-bold hover:bg-[#024a30] transition-colors shadow-lg">
                  View All Models
                </Link>
                <a href="tel:+919358273054" className="px-6 py-3 bg-[#ffc641] text-[#012d1d] rounded-full font-bold hover:bg-[#ffe259] transition-colors shadow-lg">
                  Call +91-9358273054
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
