import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const SITE_URL = "https://katayayanienterprises.vercel.app";

  // Build JSON-LD BreadcrumbList structured data
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url === "/" ? SITE_URL : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <>
      {/* Inject Breadcrumb Schema for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual Breadcrumb Navigation Trail */}
      <nav className="flex items-center flex-wrap gap-1.5 text-label-md text-on-surface-variant mb-[32px] font-medium leading-none select-none">
        <Link
          href="/"
          className="hover:text-primary transition-colors flex items-center gap-1 text-on-surface-variant/80 hover:scale-105 transform active:scale-95 duration-200"
          title="Go to Home"
        >
          <Home className="w-4 h-4" />
          <span className="sr-only">Home</span>
        </Link>

        {items.slice(1).map((item, idx) => {
          const isLast = idx === items.length - 2;
          return (
            <div key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/40" />
              {isLast ? (
                <span className="text-on-surface font-semibold max-w-[200px] truncate" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-primary transition-colors hover:scale-[1.02] transform active:scale-95 duration-200"
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
