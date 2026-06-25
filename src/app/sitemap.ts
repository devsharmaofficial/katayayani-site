import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/gallery',
    '/enquiry',
    '/products/swaraj-frp-canopy',
    '/products/mahindra-frp-canopy',
    '/products/john-deere-frp-canopy',
    '/products/sonalika-frp-canopy',
    '/products/eicher-frp-canopy',
    '/products/new-holland-frp-canopy',
    '/products/massey-ferguson-frp-canopy',
    '/products/deutz-fahr-frp-canopy',
    '/products/farmtrac-frp-canopy',
    '/products/solis-frp-canopy',
    '/products/powertrac-frp-canopy',
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
