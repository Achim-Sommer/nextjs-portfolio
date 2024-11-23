'use client';
import { Inter } from 'next/font/google'
import './globals.css'
import BackToTop from '@/components/BackToTop'
import FloatingDock from '@/components/FloatingDock'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="dark">
      <head>
        <title>Achim Sommer - Portfolio</title>
        <meta name="description" content="Portfolio von Achim Sommer - Dualer Student, Full Stack Developer und YouTuber" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link 
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          as="style"
          onLoad={(e) => {
            const target = e.currentTarget;
            target.onload = null;
            target.rel = 'stylesheet';
          }}
          crossOrigin="anonymous"
          fetchPriority="low"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            crossOrigin="anonymous"
          />
        </noscript>
        <script
          async
          src={process.env.NEXT_PUBLIC_UMAMI_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`} suppressHydrationWarning>
        <div className="min-h-screen">
          {children}
          <BackToTop />
          <FloatingDock />
          <CookieBanner />
        </div>
      </body>
    </html>
  )
}
