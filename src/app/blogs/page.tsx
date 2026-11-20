"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getAllBlogs } from "@/lib/blogs";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-gray-50 min-h-screen w-full max-w-full overflow-x-clip">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-[24px]">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { name: "Home", url: "/" },
                { name: "Blogs", url: "/blogs" },
              ]}
            />
          </div>

          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-black text-[#012d1d] mb-4">
                Tractor Fiber Hood Insights
              </h1>
              <p className="text-gray-600 text-lg">
                Read our latest articles, guides, and tips on choosing the perfect fiber chatri and punjabi hood for your tractor.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <ScrollReveal key={blog.id} delay={index * 0.1}>
                <Link href={`/blogs/${blog.slug}`} className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 flex items-center justify-center">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-3">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{blog.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#012d1d] mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                      {blog.excerpt}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#012d1d] group-hover:text-emerald-700">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
