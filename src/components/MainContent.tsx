'use client';

import dynamic from 'next/dynamic';
import { MotionConfig } from 'framer-motion';
import SiteHeader from '@/components/home/SiteHeader';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import CareerTimeline from '@/components/CareerTimeline';
import Studies from '@/components/home/Studies';
import LatestPosts from '@/components/LatestPosts';
import Contact from '@/components/home/Contact';
import Footer from '@/components/Footer';
import type { BlogListItem } from '../../lib/blog';

/** Platzhalter für Sektionen, die erst im Browser geladen werden */
function SectionSkeleton({ height }: { height: string }) {
  return <div className={`w-full border-t border-line ${height}`} aria-hidden="true" />;
}

// Lädt Daten von der GitHub-API und den Beitragskalender, daher nur im Browser
const GitHubRepos = dynamic(() => import('@/components/GitHubRepos'), {
  ssr: false,
  loading: () => <SectionSkeleton height="h-[900px]" />,
});

const ZapHosting = dynamic(() => import('@/components/ZapHosting'), {
  loading: () => <SectionSkeleton height="h-[400px]" />,
});

interface MainContentProps {
  latestPosts?: BlogListItem[];
}

export default function MainContent({ latestPosts }: MainContentProps) {
  return (
    // Wer im System reduzierte Bewegung eingestellt hat, bekommt keine Einblend-Animationen
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main id="main-content" className="min-h-screen bg-canvas">
        <Hero />
        <AboutMe />
        <CareerTimeline />
        <Studies />
        <GitHubRepos />
        {latestPosts && latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}
        <div id="zap-hosting" className="scroll-mt-20 border-t border-line">
          <ZapHosting />
        </div>
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
