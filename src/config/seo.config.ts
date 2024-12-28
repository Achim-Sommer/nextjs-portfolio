import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Achim Sommer (achimsommer)',
  defaultTitle: 'Achim Sommer (achimsommer) | Full Stack Developer & FiveM Entwickler',
  description: 'Achim Sommer (achimsommer) - Full Stack Developer aus Aachen, spezialisiert auf TypeScript, React, Next.js und FiveM Entwicklung. Dualer Student der Wirtschaftsinformatik.',
  canonical: 'https://achimsommer.com',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://achimsommer.com',
    siteName: 'Achim Sommer Portfolio',
    title: 'Achim Sommer | Full Stack Developer & FiveM Entwickler',
    description: 'Full Stack Developer aus Aachen, spezialisiert auf TypeScript, React, Next.js und FiveM Entwicklung. Dualer Student der Wirtschaftsinformatik.',
    images: [
      {
        url: 'https://achimsommer.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Achim Sommer - Full Stack Developer Portfolio',
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
      content: 'Achim Sommer, achimsommer, Full Stack Developer, FiveM Entwickler, TypeScript, React, Next.js, Node.js, Webentwicklung, Aachen, Portfolio, Software Engineer, Wirtschaftsinformatik',
    },
    {
      name: 'theme-color',
      content: '#1e3a8a',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      property: 'article:author',
      content: 'https://www.linkedin.com/in/achim-sommer-b898a2185/',
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
