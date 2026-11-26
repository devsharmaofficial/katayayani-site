import { Metadata } from "next";
import { getBlogBySlug } from "@/lib/blogs";
import { SITE_URL } from "@/config/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: { absolute: "Blog Not Found | Katayayani Enterprises" },
    };
  }

  return {
    title: { absolute: `${blog.seo.title} | Katayayani Enterprises` },
    description: blog.seo.description,
    keywords: blog.seo.keywords,
    alternates: {
      canonical: `${SITE_URL}/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.seo.title,
      description: blog.seo.description,
      url: `${SITE_URL}/blogs/${blog.slug}`,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author],
      images: [
        {
          url: `${SITE_URL}${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo.title,
      description: blog.seo.description,
      images: [`${SITE_URL}${blog.image}`],
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
