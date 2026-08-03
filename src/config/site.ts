export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://katayayanienterprises.vercel.app";
export const BUSINESS_NAME = "Katayayani Enterprises";

export function getAbsoluteImageUrl(src?: string): string {
  if (!src) return `${SITE_URL}/og-image.jpg`;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}
