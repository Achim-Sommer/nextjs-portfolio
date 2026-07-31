import type { Metadata } from 'next';
import KontaktContent from '@/components/KontaktContent';

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Kontakt - Achim Sommer',
  description: 'Kontaktformular für Anfragen an Achim Sommer – Head of IT und Full Stack Developer aus Aachen.',
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
