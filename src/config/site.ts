const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.katayayanienterprises.online";
export const SITE_URL =
  rawSiteUrl.includes("katayayanienterprises.online") && !rawSiteUrl.includes("www.katayayanienterprises.online")
    ? rawSiteUrl.replace("katayayanienterprises.online", "www.katayayanienterprises.online")
    : rawSiteUrl;
export const BUSINESS_NAME = "Katayayani Enterprises";

export function getAbsoluteImageUrl(src?: string): string {
  if (!src) return `${SITE_URL}/og-image.jpg`;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}
