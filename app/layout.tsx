import './globals.css'
import { Suspense } from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import ClientWidgets from './client-widgets'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://achimsommer.com';
const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: 'yes',
};

export const metadata: Metadata = {
  title: 'Achim Sommer - Portfolio',
  description: 'Portfolio von Achim Sommer - Dualer Student, Full Stack Developer und YouTuber',
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
    title: 'Achim Sommer - Portfolio',
    description: 'Portfolio von Achim Sommer - Dualer Student, Full Stack Developer und YouTuber',
    url: siteUrl,
    siteName: 'Achim Sommer',
    images: [
      {
        url: `${siteUrl}/api/og?title=${encodeURIComponent('Achim Sommer - Portfolio')}`,
        width: 1200,
        height: 630,
        alt: 'Achim Sommer Portfolio',
      },
    ],
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@achimsommer',
    creator: '@achimsommer',
    title: 'Achim Sommer - Portfolio',
    description: 'Portfolio von Achim Sommer - Dualer Student, Full Stack Developer und YouTuber',
    images: [`${siteUrl}/api/og?title=${encodeURIComponent('Achim Sommer - Portfolio')}`],
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
        <meta name="viewport" content={`${viewport.width}, initial-scale=${viewport.initialScale}, maximum-scale=${viewport.maximumScale}, user-scalable=${viewport.userScalable}`} />
        <meta name="theme-color" content={viewport.themeColor} />
      </head>
      <body className={`bg-gray-900 text-white ${inter.variable}`}>
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
              "jobTitle": "Full Stack Developer & FiveM Entwickler",
              "worksFor": {
                "@type": "Organization",
                "name": "Achim Sommer Portfolio"
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
              "url": "https://achimsommer.com",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Startseite",
                    "item": "https://achimsommer.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://achimsommer.com/blog"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Services",
                    "item": "https://achimsommer.com/services"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "FiveM Template Server",
                    "item": "https://achimsommer.com/fivem-template-server"
                  }
                ]
              }
            })
          }}
        />
        {umamiUrl && umamiWebsiteId && (
          <Script
            async
            src={umamiUrl}
            data-website-id={umamiWebsiteId}
            data-auto-track="true"
            data-domains="achimsommer.com"
            strategy="afterInteractive"
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
