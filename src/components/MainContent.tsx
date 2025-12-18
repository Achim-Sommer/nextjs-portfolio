'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy Loading Components
const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false,
  loading: () => <div className="w-full h-[80px] bg-gray-900/50 animate-pulse rounded-lg" />
});

const AboutMe = dynamic(() => import('@/components/AboutMe'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const GitHubFeed = dynamic(() => import('@/components/GitHubRepos'), {
  loading: () => <div className="w-full h-[300px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: false
});

const ProjectShowcase = dynamic(() => import('@/components/ProjectShowcase'), {
  loading: () => <div className="w-full h-[400px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: false
});

const ZapHosting = dynamic(() => import('@/components/ZapHosting'), {
  loading: () => <div className="w-full h-[400px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: false
});

const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const Counter = dynamic(() => import('@/components/Counter'), {
  loading: () => <div className="w-full h-[100px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: false
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="w-full h-[200px] bg-gray-900/50 animate-pulse rounded-lg" />,
  ssr: false
});

export default function MainContent() {
  return (
    <div className="relative">
      <main className="flex min-h-screen flex-col items-center justify-between bg-black">
        <Suspense fallback={<div className="w-full h-[80px] bg-gray-900/50 animate-pulse rounded-lg" />}>
          <Navbar />
        </Suspense>
        
        <Hero />

        <Suspense fallback={<LoadingSpinner />}>
          <AboutMe />
        </Suspense>

        <Suspense fallback={<div className="w-full h-[300px] bg-gray-900/50 animate-pulse rounded-lg" />}>
          <GitHubFeed />
        </Suspense>

        <Suspense fallback={<div className="w-full h-[400px] bg-gray-900/50 animate-pulse rounded-lg" />}>
          <section className="py-20 w-full">
            <ProjectShowcase />
          </section>

          <section className="py-20 w-full">
            <ZapHosting />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<div className="w-full h-[100px] bg-gray-900/50 animate-pulse rounded-lg" />}>
          <Counter />
        </Suspense>

        <Suspense fallback={<div className="w-full h-[200px] bg-gray-900/50 animate-pulse rounded-lg" />}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
