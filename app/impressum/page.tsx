import type { Metadata } from 'next';
import ImpressumContent from '@/components/ImpressumContent';

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Impressum - Achim Sommer',
  description: 'Impressum für das Portfolio von Achim Sommer',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function ImpressumPage() {
  return <ImpressumContent />;
}
