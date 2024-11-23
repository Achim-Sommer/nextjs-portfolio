'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// Dynamische Imports für weniger kritische Komponenten
const AboutMe = dynamic(() => import('@/components/AboutMe'), { ssr: true });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: true });
const Counter = dynamic(() => import('@/components/Counter'), { ssr: true });
const GitHubRepos = dynamic(() => import('@/components/GitHubRepos'), { ssr: true });
const ProjectShowcase = dynamic(() => import('@/components/ProjectShowcase'), { ssr: true });
const ZapHosting = dynamic(() => import('@/components/ZapHosting'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
const SocialMedia = dynamic(() => import('@/components/SocialMedia'), { ssr: true });

// Loading-Komponente
const LoadingComponent = () => <div className="w-full h-32 bg-gray-900 animate-pulse"></div>;

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <main className="min-h-screen bg-black">
        <Navbar />
        <Hero />
        <Suspense fallback={<LoadingComponent />}>
          <AboutMe />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <ZapHosting />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <Counter />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <ProjectShowcase />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <GitHubRepos />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
