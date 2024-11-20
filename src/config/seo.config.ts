import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Achim Sommer',
  defaultTitle: 'Achim Sommer | Portfolio',
  description: 'Portfolio und persönliche Website von Achim Sommer - Webentwickler und Designer.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://achimsommer.com/',
    siteName: 'Achim Sommer Portfolio',
    images: [
      {
        url: 'https://achimsommer.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Achim Sommer Portfolio',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'Achim Sommer',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};

export default config;
