import { Metadata } from "next";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Tractor Fiber Hood Blogs & Insights | Katayayani Enterprises",
  description: "Read the latest news, guides, and tips about premium tractor fiber hoods, fiber chatris, and punjabi hoods for Swaraj, Mahindra, John Deere, and more.",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    title: "Tractor Fiber Hood Blogs & Insights | Katayayani Enterprises",
    description: "Read the latest news, guides, and tips about premium tractor fiber hoods, fiber chatris, and punjabi hoods for Swaraj, Mahindra, John Deere, and more.",
    url: `${SITE_URL}/blogs`,
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
