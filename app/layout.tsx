import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Providers } from './providers'
import ClientWidgets from './client-widgets'
import { ogImageUrl } from '@/lib/og-image'
import { jsonLd, personSchema, websiteSchema } from '@/lib/schema'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://achimsommer.com';
const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const siteTitle = 'Achim Sommer (achimsommer) | Head of IT in Aachen';
const siteDescription =
  'Achim Sommer, Head of IT in Aachen: IT-Infrastruktur, Security und Microsoft 365. Nebenbei Web-Apps mit Next.js.';
const ogImage = ogImageUrl({
  title: 'Achim Sommer',
  subtitle: 'Head of IT in Aachen',
  baseUrl: siteUrl,
});

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: 'yes',
};

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s | Achim Sommer',
  },
  description: siteDescription,
  keywords: [
    'Achim Sommer',
    'achimsommer',
    'Full Stack Developer',
    'FiveM Entwickler',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Webentwicklung',
    'Aachen',
    'Portfolio',
    'Software Engineer',
    'Wirtschaftsinformatik',
  ],
  authors: [{ name: 'Achim Sommer', url: siteUrl }],
  creator: 'Achim Sommer',
  metadataBase: new URL(siteUrl),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-512x512.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Achim Sommer Portfolio',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Achim Sommer, Head of IT in Aachen',
      },
    ],
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@achimsommer',
    creator: '@achimsommer',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
      </head>
      <body className={`bg-canvas text-fg ${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-canvas"
        >
          Zum Inhalt springen
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }} />
        {umamiUrl && umamiWebsiteId && (
          <Script
            id="umami-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function loadUmami() {
                    if (localStorage.getItem('cookieConsent') === 'accepted') {
                      if (!document.getElementById('umami-script')) {
                        var s = document.createElement('script');
                        s.id = 'umami-script';
                        s.async = true;
                        s.src = '${umamiUrl}';
                        s.setAttribute('data-website-id', '${umamiWebsiteId}');
                        s.setAttribute('data-auto-track', 'true');
                        s.setAttribute('data-domains', 'achimsommer.com');
                        document.head.appendChild(s);
                      }
                    }
                  }
                  loadUmami();
                  window.addEventListener('cookie-consent-update', loadUmami);
                })()
              `,
            }}
          />
        )}
        <div className="grain" aria-hidden="true" />
        <Providers>
          <div className="min-h-screen">
            {children}
            <ClientWidgets />
          </div>
        </Providers>
      </body>
    </html>
  )
}
