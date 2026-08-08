const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://achimsommer.com';

/**
 * Version des OG-Bild-Designs. WhatsApp, Facebook & LinkedIn cachen Vorschaubilder
 * pro URL sehr lange – nach einer Layout-Änderung hochzählen, damit die Crawler
 * das neue Bild wirklich holen.
 */
const OG_VERSION = '2';

type OgImageOptions = {
  title?: string;
  subtitle?: string;
  baseUrl?: string;
};

/** Baut die URL zum dynamisch generierten Open-Graph-Bild (`pages/api/og.tsx`). */
export function ogImageUrl({ title, subtitle, baseUrl }: OgImageOptions = {}): string {
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  if (subtitle) params.set('subtitle', subtitle);
  params.set('v', OG_VERSION);

  return `${baseUrl ?? DEFAULT_SITE_URL}/api/og?${params.toString()}`;
}
