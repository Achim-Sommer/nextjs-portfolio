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
  maximumScale: 1,
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
        <meta name="viewport" content={`${viewport.width}, initial-scale=${viewport.initialScale}, maximum-scale=${viewport.maximumScale}`} />
        <meta name="theme-color" content={viewport.themeColor} />
      </head>
      <body className={`bg-gray-900 text-white font-inter ${inter.className}`}>
        <Script
          async
          src={process.env.NEXT_PUBLIC_UMAMI_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
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
