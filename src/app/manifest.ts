import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DataNavigate Limited',
    short_name: 'DataNavigate',
    description: 'Developer-Led ServiceNow & Tech Talent Navigation',
    start_url: '/',
    display: 'standalone',
    background_color: '#080b11',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
