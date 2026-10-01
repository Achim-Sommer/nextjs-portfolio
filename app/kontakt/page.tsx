import type { Metadata } from 'next';
import KontaktContent from '@/components/KontaktContent';

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Kontakt - Achim Sommer',
  description: 'Kontakt zu Achim Sommer, Head of IT in Aachen: Fragen zu IT, Projekten oder Artikeln per Formular oder E-Mail.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-512x512.png',
  },
  alternates: {
    canonical: '/kontakt',
  },
};

export default function KontaktPage() {
  return <KontaktContent />;
}
