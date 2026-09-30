import type { DefaultSeoProps } from 'next-seo/pages';
import { ogImageUrl } from '@/lib/og-image';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Achim Sommer',
  defaultTitle: 'Achim Sommer (achimsommer) | Head of IT in Aachen',
  description: 'Achim Sommer, Head of IT in Aachen: IT-Infrastruktur, Security und Microsoft 365. Nebenbei Web-Apps mit Next.js.',
  robotsProps: {
    maxImagePreview: 'large',
    maxSnippet: -1,
    maxVideoPreview: -1,
  },
  canonical: 'https://achimsommer.com',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://achimsommer.com',
    siteName: 'Achim Sommer Portfolio',
    title: 'Achim Sommer | Head of IT in Aachen',
    description: 'Achim Sommer, Head of IT in Aachen: IT-Infrastruktur, Security und Microsoft 365. Nebenbei Web-Apps mit Next.js.',
    images: [
      {
        url: ogImageUrl({ title: 'Achim Sommer', subtitle: 'Head of IT in Aachen' }),
        width: 1200,
        height: 630,
        alt: 'Achim Sommer, Head of IT in Aachen',
        type: 'image/png',
      },
    ],
    profile: {
      firstName: 'Achim',
      lastName: 'Sommer',
      username: 'achimsommer',
      gender: 'male',
    },
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'author',
      content: 'Achim Sommer',
    },
    {
      name: 'keywords',
      content: 'Achim Sommer, achimsommer, Head of IT, IT-Infrastruktur, IT-Sicherheit, Microsoft 365, Linux, Docker, Next.js, Aachen',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'format-detection',
      content: 'telephone=yes',
    },
    {
      name: 'geo.region',
      content: 'DE-NW',
    },
    {
      name: 'geo.placename',
      content: 'Aachen',
    },
    {
      name: 'geo.position',
      content: '50.7753455;6.0838868',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
      type: 'image/x-icon',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],
};

export default config;
