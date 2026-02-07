import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import MainContent from '@/components/MainContent';
import { getLatestPosts } from '../../lib/blog';

export const revalidate = 3600; // ISR: Seite wird stündlich neu generiert

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MainContent latestPosts={latestPosts} />
    </Suspense>
  );
}
