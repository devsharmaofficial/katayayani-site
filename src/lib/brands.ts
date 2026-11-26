// ============================================================================
// Katayayani Enterprises — Brand Data
// CMS-ready: Replace with API calls to your headless CMS.
// ============================================================================

import { Brand } from "@/types";

export const brands: Brand[] = [
  {
    id: "all-brands",
    name: "All Brands",
    slug: "all-brands",
    description:
      "All Brands tractor fiber hoods and canopies designed to be compatible with all major tractor brands in India. Features heavy-duty FRP construction and adjustable mounting brackets for a perfect fit on any model.",
    models: ["All Models", "Universal Fit"],
    productCount: 3,
    country: "India",
  },
  {
    id: "swaraj",
    name: "Swaraj",
    slug: "swaraj",
    description:
      "India's leading tractor manufacturer. Our tractor fiber hoods are precision-engineered for Swaraj's most popular models, ensuring a perfect fit and unmatched durability.",
    models: ["Swaraj 855", "Swaraj 744", "Swaraj 963", "Swaraj 735"],
    productCount: 4,
    country: "India",
  },
  {
    id: "mahindra",
    name: "Mahindra",
    slug: "mahindra",
    description:
      "The world's largest tractor company by volume. Our canopies match Mahindra's signature build quality with custom-molded designs for every series.",
    models: [
      "Mahindra 575 DI",
      "Mahindra 475 DI",
      "Mahindra JIVO 245",
      "Mahindra 585 DI",
    ],
    productCount: 4,
    country: "India",
  },
  {
    id: "sonalika",
    name: "Sonalika",
    slug: "sonalika",
    description:
      "India's fastest-growing tractor brand. Custom-fit tractor fiber hoods designed for Sonalika's modern tractor lineup.",
    models: ["Sonalika DI 750 III", "Sonalika DI 60", "Sonalika GT 26"],
    productCount: 3,
    country: "India",
  },
  {
    id: "eicher",
    name: "Eicher",
    slug: "eicher",
    description:
      "Known for reliability and performance. Our canopies integrate seamlessly with Eicher's engineering standards.",
    models: ["Eicher 380", "Eicher 557", "Eicher 485"],
    productCount: 2,
    country: "India",
  },
  {
    id: "new-holland",
    name: "New Holland",
    slug: "new-holland",
    description:
      "A global agricultural powerhouse. Premium tractor fiber hoods built to New Holland's exacting specifications.",
    models: ["New Holland 3630 TX", "New Holland 3230 NX"],
    productCount: 2,
    country: "Italy",
  },
  {
    id: "john-deere",
    name: "John Deere",
    slug: "john-deere",
    description:
      "Iconic green-and-yellow tractors trusted for heavy field work. Our John Deere fiber hoods are molded for 5050 D, 5310, 5045 D, 5210 and 5410 models with a bolt-on, vibration-free fit.",
    models: ["John Deere 5050 D", "John Deere 5310", "John Deere 5045 D", "John Deere 5210"],
    productCount: 3,
    country: "USA",
  },
  {
    id: "massey-ferguson",
    name: "Massey Ferguson",
    slug: "massey-ferguson",
    description:
      "Heritage brand trusted worldwide. Our canopies honor Massey Ferguson's legacy with modern FRP technology.",
    models: ["Massey Ferguson 1035 DI", "Massey Ferguson 7250"],
    productCount: 2,
    country: "USA",
  },
  {
    id: "deutz-fahr",
    name: "Deutz Fahr",
    slug: "deutz-fahr",
    description:
      "German engineering meets Indian agriculture. Precision-fit canopies for Deutz Fahr tractors.",
    models: ["Deutz Fahr Agromaxx 55"],
    productCount: 1,
    country: "Germany",
  },
  {
    id: "farmtrac",
    name: "Farmtrac",
    slug: "farmtrac",
    description:
      "Versatile and dependable. Our tractor fiber hoods provide all-weather protection for Farmtrac operators.",
    models: ["Farmtrac 60", "Farmtrac 45"],
    productCount: 1,
    country: "India",
  },
  {
    id: "solis",
    name: "Solis",
    slug: "solis",
    description:
      "Modern compact tractors for today's farmer. Lightweight tractor fiber hoods designed for Solis's nimble frames.",
    models: ["Solis 5015", "Solis 4515"],
    productCount: 1,
    country: "India",
  },
  {
    id: "powertrac",
    name: "Powertrac",
    slug: "powertrac",
    description:
      "Affordable power for Indian fields. Durable tractor fiber hoods built to withstand demanding agricultural conditions.",
    models: ["Powertrac 439", "Powertrac Euro 50"],
    productCount: 1,
    country: "India",
  },
];

// ============================================================================
// Repository Functions
// ============================================================================

export function getAllBrands(): Brand[] {
  return brands;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandNames(): string[] {
  return brands.map((b) => b.name);
}

export function getModelsByBrand(brandSlug: string): string[] {
  const brand = getBrandBySlug(brandSlug);
  return brand?.models ?? [];
}
