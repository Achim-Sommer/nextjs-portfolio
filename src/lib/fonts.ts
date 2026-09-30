import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';

/** Schriften der Seite für den Pages-Router (Blog). Gleiche Konfiguration wie app/layout.tsx. */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-plex-mono',
});
