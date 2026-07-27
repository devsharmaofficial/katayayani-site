import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import { getProductBySlug, getProductSlugs } from "@/lib/products";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Katayayani Enterprises",
      description: "The requested FRP tractor canopy product could not be found.",
    };
  }

  const primaryImage = product.images[0];
  const imageUrl = primaryImage
    ? `${SITE_URL}${primaryImage.src}`
    : `${SITE_URL}/og-image.jpg`;

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: [
      ...product.seo.keywords,
      `${product.brand} tractor fiber hood`,
      `${product.brand} fiber chatri`,
      `${product.brand} fiber hood price`,
      `${product.brand} fiber hood price in india`,
      "tractor fiber hood price",
      "punjabi hood tractor",
      "fiber chatri tractor price",
      "buy fiber hood for tractor",
      "tractor fiber hood manufacturer Meerut",
      "tractor fiber hood online",
      "fiber hood for tractor",
    ],
    alternates: {
      canonical: `${SITE_URL}/products/${slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Katayayani Enterprises",
      url: `${SITE_URL}/products/${slug}`,
      title: product.seo.title,
      description: product.seo.description,
      images: product.images.slice(0, 4).map((img) => ({
        url: `${SITE_URL}${img.src}`,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}
