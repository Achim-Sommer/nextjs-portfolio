import '@/styles/fonts.css'
import './globals.css'
import { Suspense } from 'react'
import BackToTop from '@/components/BackToTop'
import FloatingDock from '@/components/FloatingDock'
import CookieBanner from '@/components/CookieBanner'
import Script from 'next/script'

export const metadata = {
  title: 'Achim Sommer - Portfolio',
  description: 'Portfolio von Achim Sommer - Dualer Student, Full Stack Developer und YouTuber',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="dark">
      <body className="bg-gray-900 text-white font-inter" suppressHydrationWarning>
        <Script
          async
          src={process.env.NEXT_PUBLIC_UMAMI_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
        <div className="min-h-screen">
          {children}
          <Suspense>
            <BackToTop />
            <FloatingDock />
            <CookieBanner />
          </Suspense>
        </div>
      </body>
    </html>
  )
}
