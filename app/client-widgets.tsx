'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });

export default function ClientWidgets() {
  return (
    <Suspense>
      <BackToTop />
      <CookieBanner />
    </Suspense>
  );
}
