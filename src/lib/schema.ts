/**
 * Gemeinsame strukturierte Daten (schema.org) für App- und Pages-Router.
 * Person und Website tragen feste @ids, damit Artikel per Verweis auf
 * dieselbe Person zeigen und Google alles einer Entität zuordnet.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://achimsommer.com';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_IMAGE = `${SITE_URL}/img/achim-sommer.jpg`;

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Achim Sommer',
  alternateName: 'achimsommer',
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: PERSON_IMAGE,
    width: 400,
    height: 500,
  },
  jobTitle: 'Head of IT',
  description:
    'Head of IT in Aachen: IT-Infrastruktur, Security und Microsoft 365. Nebenbei Web-Apps mit Next.js.',
  worksFor: {
    '@type': 'Organization',
    name: 'amber Tech GmbH',
    url: 'https://ambersearch.de/',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'FOM Hochschule für Oekonomie und Management',
    alternateName: 'FOM',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Aachen',
    addressRegion: 'NRW',
    addressCountry: 'DE',
  },
  knowsAbout: [
    'IT-Leitung',
    'IT-Infrastruktur',
    'IT-Sicherheit',
    'Microsoft 365',
    'Netzwerktechnik',
    'Systemadministration',
    'Linux',
    'Docker',
    'Next.js',
    'TypeScript',
    'React',
  ],
  sameAs: [
    'https://github.com/Achim-Sommer',
    'https://www.linkedin.com/in/achim-sommer-b898a2185/',
    'https://www.instagram.com/achim.sommer/',
    'https://www.youtube.com/@achimsommer',
    'https://www.facebook.com/achim.sommer1',
    'https://twitch.tv/achim1337',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Achim Sommer',
  url: SITE_URL,
  inLanguage: 'de-DE',
  publisher: { '@id': PERSON_ID },
};

/** Verweis auf die Person, z. B. als author oder publisher eines Artikels */
export const personRef = { '@type': 'Person', '@id': PERSON_ID, name: 'Achim Sommer', url: SITE_URL };

/** Liefert einen JSON-String, der gefahrlos in ein <script>-Tag passt */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
