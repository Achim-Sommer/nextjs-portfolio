import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { getLatestPosts } from '../../lib/blog';
import LatestPosts from '@/components/LatestPosts';

// Dynamische Imports für weniger kritische Komponenten
const AboutMe = dynamic(() => import('@/components/AboutMe'), { ssr: true });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Counter = dynamic(() => import('@/components/Counter'), { ssr: true });
const GitHubRepos = dynamic(() => import('@/components/GitHubRepos'), { ssr: true });
const ProjectShowcase = dynamic(() => import('@/components/ProjectShowcase'), { ssr: true });
const ZapHosting = dynamic(() => import('@/components/ZapHosting'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

// Loading-Komponente
const LoadingComponent = () => <div className="w-full h-[300px] bg-gray-900 animate-pulse rounded-lg"></div>;

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <div style={{ position: 'relative' }}>
      <main id="main-content" className="min-h-screen bg-black">
        <Navbar />
        <Hero />
        <div className="content-wrapper">
          <Suspense fallback={<LoadingComponent />}>
            <AboutMe />
          </Suspense>
          <div className="w-full">
            <Skills />
          </div>
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
          <LatestPosts posts={latestPosts} />
          <Suspense fallback={<LoadingComponent />}>
            <Footer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
