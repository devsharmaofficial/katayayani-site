import { MetadataRoute } from 'next'
import { BUSINESS_NAME } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_NAME,
    short_name: 'Katayayani',
    description: 'India\'s #1 FRP Tractor Canopy Manufacturer — Meerut, Uttar Pradesh',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#012d1d',
    icons: [
      {
        src: '/katayayani-enterprises-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/katayayani-enterprises-logo.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  }
}
