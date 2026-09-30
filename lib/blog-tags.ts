/**
 * Kuratierte Themen des Blogs. Nur diese Tags bekommen eine eigene Seite
 * unter /blog/tag/<slug>, und nur, wenn mindestens MIN_POSTS_PER_TAG Artikel
 * dazu existieren. Die Einleitung dient zugleich als Meta-Beschreibung.
 */
export type BlogTag = {
  name: string;
  slug: string;
  intro: string;
};

export const MIN_POSTS_PER_TAG = 2;

export const BLOG_TAGS: BlogTag[] = [
  {
    name: 'Linux',
    slug: 'linux',
    intro:
      'Anleitungen für Linux-Server mit Debian und Ubuntu: von der Grundinstallation über Webserver bis zur Verwaltung im Browser, mit allen Befehlen.',
  },
  {
    name: 'Docker',
    slug: 'docker',
    intro:
      'Docker installieren, Container verwalten und Anwendungen mit Portainer und Coolify betreiben: praktische Anleitungen für den eigenen Server.',
  },
  {
    name: 'Self-Hosting',
    slug: 'self-hosting',
    intro:
      'Eigene Dienste auf dem eigenen Server betreiben: Deployment-Plattformen, Monitoring und datenschutzfreundliche Alternativen zu großen Cloud-Diensten.',
  },
  {
    name: 'Server-Hosting',
    slug: 'server-hosting',
    intro:
      'vServer, Rootserver, Dedicated Server oder Gameserver: welche Server-Art zu dir passt, wann sich Mieten lohnt und wann ein Lifetime-Kauf.',
  },
  {
    name: 'Gameserver',
    slug: 'gameserver',
    intro:
      'Eigene Gameserver für Hytale, Palworld und andere Spiele: mieten, einmalig kaufen oder selbst auf einem Linux-Server installieren.',
  },
  {
    name: 'Microsoft 365',
    slug: 'microsoft-365',
    intro:
      'Microsoft 365 sicher betreiben: Tenant absichern, Geräte mit Intune verwalten und die Einstellungen, die in kleinen und mittleren Firmen zählen.',
  },
  {
    name: 'IT-Sicherheit',
    slug: 'it-sicherheit',
    intro:
      'Praktische IT-Sicherheit für kleine und mittlere Unternehmen: Identitäten schützen, Geräte absichern und Daten so sichern, dass die Wiederherstellung klappt.',
  },
  {
    name: 'IT-Administration',
    slug: 'it-administration',
    intro:
      'Werkzeuge und Vorgehen für den IT-Alltag: Server verwalten, Geräte ausrollen, Backups planen und Systeme so aufsetzen, dass sie wartbar bleiben.',
  },
  {
    name: 'Next.js',
    slug: 'nextjs',
    intro:
      'Next.js in der Praxis: SEO, Progressive Web Apps und die Frage, wann Next.js gegenüber reinem React die bessere Wahl ist.',
  },
  {
    name: 'Webentwicklung',
    slug: 'webentwicklung',
    intro:
      'Frameworks, UI-Bibliotheken, Shopsysteme und Analytics: Artikel rund um moderne Webentwicklung mit React, Next.js und Open-Source-Werkzeugen.',
  },
  {
    name: 'KI',
    slug: 'ki',
    intro:
      'KI-Werkzeuge für Entwickler: was Code-Assistenten wirklich können, wo ihre Grenzen liegen und wie du sie sinnvoll in deinen Alltag einbaust.',
  },
];

const byName = new Map(BLOG_TAGS.map((tag) => [tag.name.toLowerCase(), tag]));
const bySlug = new Map(BLOG_TAGS.map((tag) => [tag.slug, tag]));

export function findTagByName(name: string): BlogTag | undefined {
  return byName.get(name.toLowerCase());
}

export function findTagBySlug(slug: string): BlogTag | undefined {
  return bySlug.get(slug);
}
