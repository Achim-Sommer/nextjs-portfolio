import './globals.css'
import { Suspense } from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import ClientWidgets from './client-widgets'
import { ogImageUrl } from '@/lib/og-image'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://achimsommer.com';
const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const siteTitle = 'Achim Sommer (achimsommer) | Head of IT & Full Stack Developer';
const siteDescription =
  'Achim Sommer (achimsommer) – Head of IT aus Aachen mit Schwerpunkt Netzwerktechnik, Server-Architektur und IT-Infrastruktur. Full Stack Developer mit TypeScript, React, Next.js und FiveM Entwicklung. Wirtschaftsinformatik-Student an der FOM Köln.';
const ogImage = ogImageUrl({
  title: 'Achim Sommer',
  subtitle: 'Head of IT & Full Stack Developer',
  baseUrl: siteUrl,
});

export const viewport = {
  themeColor: '#000000',
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
        alt: 'Achim Sommer - Full Stack Developer Portfolio',
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
      <body className={`bg-gray-900 text-white ${inter.variable}`} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Achim Sommer",
              "url": "https://achimsommer.com",
              "image": "https://achimsommer.com/logo.png",
              "jobTitle": "Head of IT",
              "worksFor": {
                "@type": "Organization",
                "name": "amber Tech GmbH",
                "url": "https://ambersearch.de/"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "FOM Hochschule"
              },
              "sameAs": [
                "https://github.com/Achim-Sommer",
                "https://www.linkedin.com/in/achim-sommer-b898a2185/",
                "https://www.instagram.com/achim.sommer/",
                "https://www.youtube.com/channel/UCJRVHx9owERZiRu5hcI_JLA",
                "https://www.youtube.com/@achimsommer"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Aachen",
                "addressRegion": "NRW",
                "addressCountry": "DE"
              },
              "legalName": "Achim Sommer",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Impressum",
                "url": "https://achimsommer.com/impressum"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Achim Sommer Portfolio",
              "url": "https://achimsommer.com",
              "inLanguage": "de-DE",
              "publisher": {
                "@type": "Person",
                "name": "Achim Sommer"
              }
            })
          }}
        />
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
