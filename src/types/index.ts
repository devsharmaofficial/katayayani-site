// ============================================================================
// Kataayani Enterprises — Type Definitions
// CMS-ready: These types mirror what any headless CMS would provide.
// ============================================================================

export interface ColorVariant {
  name: string;
  hex: string;
  slug: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Specification {
  label: string;
  value: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  shortDescription: string;
  brand: string;
  brandSlug: string;
  compatibleModels: string[];
  colorVariants: ColorVariant[];
  images: ProductImage[];
  specifications: Specification[];
  features: string[];
  featureTags: string[];
  category: string;
  seo: SEOMetadata;
  galleryImages: ProductImage[];
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  models: string[];
  productCount: number;
  country: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  tractorBrand: string;
  tractorModel: string;
  message: string;
  productInterest?: string;
  source: "contact" | "product" | "enquiry" | "whatsapp";
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  tractorBrand: string;
  rating: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}
