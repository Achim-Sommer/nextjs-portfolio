'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });
const FloatingDock = dynamic(() => import('@/components/FloatingDock'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });

export default function ClientWidgets() {
  return (
    <Suspense>
      <BackToTop />
      <FloatingDock />
      <CookieBanner />
    </Suspense>
  );
}
