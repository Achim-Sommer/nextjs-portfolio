import '@/styles/fonts.css'
import './globals.css'
import { Suspense } from 'react'
import BackToTop from '@/components/BackToTop'
import FloatingDock from '@/components/FloatingDock'
import CookieBanner from '@/components/CookieBanner'
import Script from 'next/script'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

// Dynamically import PWA register component
const PWARegister = dynamic(() => import('@/components/PWARegister'), {
  ssr: false
});

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
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-512x512.png',
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
      <body className={`bg-gray-900 text-white font-inter ${inter.className}`}>
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
        <Script
          async
          src={process.env.NEXT_PUBLIC_UMAMI_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          data-auto-track="true"
          data-domains="achimsommer.com"
          strategy="afterInteractive"
        />
        <Providers>
          <div className="min-h-screen">
            {children}
            <Suspense>
              <BackToTop />
              <FloatingDock />
              <CookieBanner />
            </Suspense>
            <PWARegister />
          </div>
        </Providers>
      </body>
    </html>
  )
}
