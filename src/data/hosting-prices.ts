/**
 * Zentrale Preise für ZAP-Hosting (Miete und Lifetime), genutzt von
 * Break-even-Diagramm und Preistabellen in den Blogartikeln.
 * Preise ändern? Nur hier anpassen, Tabellen und Diagramme ziehen nach.
 */
export type HostingProduct = {
  id: string;
  /** Name in Tabellen */
  name: string;
  /** Kurzer Name für Buttons im Diagramm */
  short: string;
  monthly: number;
  lifetime: number;
};

export const PRICES_AS_OF = 'Oktober 2026';

/** Rabatt mit dem Code GermanGaming (gilt nur für Miete) */
export const RENT_DISCOUNT = 0.2;

export const HOSTING_PRODUCTS: HostingProduct[] = [
  { id: 'game', name: 'Gameserver (Einstieg)', short: 'Gameserver (Einstieg)', monthly: 2.76, lifetime: 45 },
  { id: 'palworld', name: 'Palworld-Server', short: 'Palworld-Server', monthly: 7.14, lifetime: 60 },
  { id: 'vserver', name: 'Linux vServer', short: 'Linux vServer', monthly: 7.9, lifetime: 64 },
  { id: 'winvserver', name: 'Windows vServer', short: 'Windows vServer', monthly: 9.9, lifetime: 99 },
  {
    id: 'vserver32',
    name: 'vServer mit 8 Kernen und 32 GB RAM',
    short: 'vServer 8 Kerne, 32 GB',
    monthly: 28.8,
    lifetime: 301.8,
  },
  { id: 'root', name: 'Linux Rootserver', short: 'Linux Rootserver', monthly: 12.9, lifetime: 154.8 },
  { id: 'dedi', name: 'Dedicated Server (Einstieg)', short: 'Dedicated Server (Einstieg)', monthly: 41.35, lifetime: 498.32 },
  {
    id: 'dedi256',
    name: 'Dedicated Server mit 40 Kernen und 256 GB RAM',
    short: 'Dedicated 40 Kerne, 256 GB',
    monthly: 186.78,
    lifetime: 2231.36,
  },
];

export const findProduct = (id: string) => HOSTING_PRODUCTS.find((p) => p.id === id);

export const breakEvenMonths = (p: Pick<HostingProduct, 'monthly' | 'lifetime'>, discount = 0) =>
  p.lifetime / (p.monthly * (1 - discount));

export const eur = (v: number) => v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

export const months1 = (v: number) => v.toLocaleString('de-DE', { maximumFractionDigits: 1 });
