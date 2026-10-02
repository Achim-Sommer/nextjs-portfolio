import type { Metadata } from 'next';
import SiteHeader from '@/components/home/SiteHeader';
import Footer from '@/components/Footer';
import NotFoundContent from '@/components/notfound/NotFoundContent';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader base="/" />
      <main id="main-content">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
