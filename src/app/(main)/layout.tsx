'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function MainLayout({
  children,
  github,
}: {
  children: React.ReactNode;
  github: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
      <Suspense fallback={
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      }>
        {github}
      </Suspense>
    </div>
  );
}
