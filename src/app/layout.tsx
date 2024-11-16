'use client';
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes';
import BackToTop from '@/components/BackToTop'
import ParticlesBackground from '@/components/Particles'
import FloatingDock from '@/components/FloatingDock'
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <title>Achim Sommer - Portfolio</title>
        <meta name="description" content="Portfolio von Achim Sommer - Dualer Student, Full Stack Developer und YouTuber" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <ParticlesBackground />
            {children}
            <BackToTop />
            <FloatingDock />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
