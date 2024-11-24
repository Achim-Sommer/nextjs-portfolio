'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import MainContent from '@/components/MainContent';

export const dynamic = 'force-dynamic';
export const preferredRegion = 'fra1';

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MainContent />
    </Suspense>
  );
}
