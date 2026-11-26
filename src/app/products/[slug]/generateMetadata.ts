import { SITE_URL, getAbsoluteImageUrl } from "@/config/site";
import type { Metadata } from "next";
import { getProductBySlug, getProductSlugs } from "@/lib/products";

const BRAND = "Katayayani Enterprises";

/**
 * Build a concise, non-duplicated title.
 *
 * Product SEO titles already contain a brand suffix in some entries, and the
 * root layout appends `| Katayayani Enterprises` via its template. That used to
 * produce titles like `... | Katayayani Enterprises | Katayayani Enterprises`.
 * This strips any existing brand suffix, keeps the primary keyword segment and
 * caps the result at a sensible SERP length.
 */
function buildTitle(seoTitle: string): string {
  const cleaned = seoTitle
    .replace(/\s*\|\s*Katayayani(?:\s+Enterprises)?\s*$/i, "")
    .replace(/\s*\|\s*Katayayani\s*$/i, "")
    .trim();

  const primary = cleaned.split("|")[0].trim();
  const withBrand = `${primary} | ${BRAND}`;

  if (withBrand.length <= 62) return withBrand;
  if (primary.length <= 60) return primary;

  const cut = primary.slice(0, 57).replace(/\s+\S*$/, "");
  return `${cut}…`;
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: { absolute: "Product Not Found | Katayayani Enterprises" },
      description: "The requested FRP tractor canopy product could not be found.",
    };
  }

  const primaryImage = product.images[0];
  const imageUrl = primaryImage
    ? getAbsoluteImageUrl(primaryImage.src)
    : `${SITE_URL}/og-image.jpg`;

  return {
    title: { absolute: buildTitle(product.seo.title) },
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
        url: getAbsoluteImageUrl(img.src),
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
