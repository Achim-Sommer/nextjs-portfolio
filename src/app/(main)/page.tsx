import { Suspense } from 'react';
import { headers } from 'next/headers';
import dynamic from 'next/dynamic';

// Kritische Komponenten (Above the fold)
import Hero from '@/components/Hero';

// Lazy Loading Components
const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: true
});

const AboutMe = dynamic(() => import('@/components/AboutMe'), {
  ssr: true
});

// Parallele Routen
const GitHubFeed = dynamic(() => import('./@github/page'), {
  loading: () => <div className="w-full h-[300px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: true
});

const Projects = dynamic(() => import('./@projects/page'), {
  loading: () => <div className="w-full h-[400px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: true
});

// Nicht-kritische Komponenten
const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <div className="w-full h-[300px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: true
});

const Counter = dynamic(() => import('@/components/Counter'), {
  loading: () => <div className="w-full h-[100px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: true
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="w-full h-[200px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: true
});

// Performance Konfiguration
export const fetchCache = 'force-cache';
export const revalidate = 3600; // 1 Stunde
export const runtime = 'edge';
export const preferredRegion = 'fra1';

export default async function Home() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  const isMobile = userAgent?.toLowerCase().includes('mobile');

  return (
    <div className="relative">
      <main className="min-h-screen bg-black">
        {/* Kritische Komponente (Hero) */}
        <Hero />

        {/* Navigation (Lazy loaded) */}
        <Suspense fallback={<div className="h-16 bg-gray-900/50 animate-pulse" />}>
          <Navbar />
        </Suspense>

        {/* Content Sections */}
        <Suspense>
          <AboutMe />
        </Suspense>

        <Suspense>
          <Skills />
        </Suspense>

        {/* Parallele Routen */}
        <Suspense>
          <GitHubFeed />
        </Suspense>

        <Suspense>
          <Projects />
        </Suspense>

        {/* Nicht-kritische Komponenten */}
        {!isMobile && (
          <Suspense>
            <Counter />
          </Suspense>
        )}

        <Suspense>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
