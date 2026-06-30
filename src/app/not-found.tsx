import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Katayayani Enterprises — Tractor Fiber Hood Manufacturer",
  description:
    "The page you are looking for could not be found. Visit Katayayani Enterprises for the best price tractor fiber hood, punjabi hood & fiber chatri for all tractor brands. Call +91-9358273054.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <html lang="en-IN">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "60px 20px", background: "#f8faf9" }}>
        <h1 style={{ fontSize: "28px", color: "#012d1d", marginBottom: "12px" }}>
          404 — Page Not Found
        </h1>
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "24px", maxWidth: "480px", margin: "0 auto 24px" }}>
          The page you are looking for does not exist. Visit our homepage to find the best price tractor fiber hood, punjabi hood & fiber chatri.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            background: "#012d1d",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Go to Homepage
        </a>
        <br />
        <br />
        <a
          href="/products"
          style={{
            display: "inline-block",
            color: "#012d1d",
            fontWeight: "bold",
            textDecoration: "underline",
            fontSize: "15px",
          }}
        >
          View All Tractor Fiber Hoods →
        </a>
      </body>
    </html>
  );
}
