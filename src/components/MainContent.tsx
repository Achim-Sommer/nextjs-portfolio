'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LatestPosts from '@/components/LatestPosts';
import type { BlogListItem } from '../../lib/blog';

/** Einheitliche Skeleton-Ladekomponente */
function SectionSkeleton({ height = 'h-[300px]' }: { height?: string }) {
  return (
    <div className={`w-full ${height} mx-auto max-w-7xl px-4`}>
      <div className="h-full rounded-2xl bg-gray-900/50 animate-pulse" />
    </div>
  );
}

// Lazy Loading Components
const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: true,
  loading: () => (
    <section className="relative min-h-screen bg-black flex items-center justify-center">
      <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl text-white">Hey, ich bin Achim</h1>
    </section>
  )
});

const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: true,
  loading: () => <div className="w-full h-[80px] bg-gray-900/50 animate-pulse rounded-lg" />
});

const AboutMe = dynamic(() => import('@/components/AboutMe'), {
  loading: () => <SectionSkeleton height="h-[400px]" />,
  ssr: true
});

const GitHubFeed = dynamic(() => import('@/components/GitHubRepos'), {
  loading: () => <SectionSkeleton height="h-[300px]" />,
  ssr: false
});

const ServicesOverview = dynamic(() => import('@/components/ServicesOverview'), {
  loading: () => <SectionSkeleton height="h-[400px]" />,
  ssr: true
});

const ZapHosting = dynamic(() => import('@/components/ZapHosting'), {
  loading: () => <SectionSkeleton height="h-[400px]" />,
  ssr: true
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <SectionSkeleton height="h-[200px]" />,
  ssr: true
});

interface MainContentProps {
  latestPosts?: BlogListItem[];
}

export default function MainContent({ latestPosts }: MainContentProps) {
  return (
    <div className="relative">
      <main id="main-content" className="min-h-screen bg-black">
        <Suspense fallback={<SectionSkeleton height="h-[80px]" />}>
          <Navbar />
        </Suspense>
        
        <Hero />

        <div className="content-wrapper">
          <Suspense fallback={<SectionSkeleton height="h-[400px]" />}>
            <AboutMe />
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="h-[400px]" />}>
            <ServicesOverview />
          </Suspense>

          {latestPosts && latestPosts.length > 0 && (
            <LatestPosts posts={latestPosts} />
          )}

          <Suspense fallback={<SectionSkeleton height="h-[300px]" />}>
            <div id="github-section">
              <GitHubFeed />
            </div>
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="h-[400px]" />}>
            <div id="zap-hosting">
              <ZapHosting />
            </div>
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="h-[200px]" />}>
            <Footer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
