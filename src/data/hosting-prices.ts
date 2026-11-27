/**
 * Zentrale Preise für ZAP-Hosting (Miete und Lifetime), genutzt von
 * Break-even-Diagramm und Preistabellen in den Blogartikeln.
 * Preise ändern? Nur hier anpassen, Tabellen und Diagramme ziehen nach.
 *
 * Stand der Preise: am 27.11.2026 im Shop von ZAP-Hosting abgelesen.
 * Lifetime kostet dort das Elffache des Preises für 30 Tage und setzt laut
 * ZAP-Hosting einen aktiven ZapX Pass voraus (Abo für das ganze Konto).
 */
export type HostingProduct = {
  id: string;
  /** Name in Tabellen */
  name: string;
  /** Kurzer Name für Buttons im Diagramm */
  short: string;
  /** Miete für 30 Tage */
  monthly: number;
  /** Einmaliger Lifetime-Preis */
  lifetime: number;
  /** Zusätzliche laufende Kosten bei Lifetime neben dem ZapX Pass, z. B. Slot für Dedicated Server */
  lifetimeExtra?: number;
};

export const PRICES_AS_OF = 'November 2026';

/** Rabatt mit dem Code ZAPX-M26R79 (gilt nur für Miete) */
export const RENT_DISCOUNT = 0.2;

/** Lifetime-Preis als Vielfaches des Preises für 30 Tage */
export const LIFETIME_FACTOR = 11;

/** ZapX Pass Plus je 30 Tage: kleinste Stufe, deckt zwei Lifetime-Server ab */
export const PASS_MONTHLY = 4.99;
/** ZapX Pass Plus je 30 Tage bei einer Laufzeit von 365 Tagen */
export const PASS_YEARLY = 3.74;
/** Lifetime-Server, die die kleinste Pass-Stufe gleichzeitig abdeckt */
export const PASS_SLOTS = 2;
/** Eigener Lifetime-Slot je Dedicated Server, je 30 Tage */
export const DEDICATED_SLOT = 9.9;

export const HOSTING_PRODUCTS: HostingProduct[] = [
  { id: 'game', name: 'Gameserver (Einstieg)', short: 'Gameserver (Einstieg)', monthly: 4.49, lifetime: 49.39 },
  { id: 'palworld', name: 'Palworld-Server', short: 'Palworld-Server', monthly: 12.99, lifetime: 142.89 },
  { id: 'vserver', name: 'vServer (Einstieg)', short: 'vServer (Einstieg)', monthly: 7.29, lifetime: 80.19 },
  { id: 'vcore', name: 'vServer mit 4 Kernen', short: 'vServer, 4 Kerne', monthly: 11.49, lifetime: 126.39 },
  {
    id: 'dedi',
    name: 'Dedicated Server (Einstieg)',
    short: 'Dedicated Server (Einstieg)',
    monthly: 92.99,
    lifetime: 1664.3,
    lifetimeExtra: DEDICATED_SLOT,
  },
];

export const findProduct = (id: string) => HOSTING_PRODUCTS.find((p) => p.id === id);

/** Laufende Kosten eines Lifetime-Servers je 30 Tage */
export const lifetimeRunning = (p: Pick<HostingProduct, 'lifetimeExtra'>, pass = true) =>
  pass ? PASS_MONTHLY + (p.lifetimeExtra ?? 0) : 0;

/** Gesamtkosten eines Lifetime-Servers nach einer Zahl von Monaten */
export const lifetimeCost = (p: Pick<HostingProduct, 'lifetime' | 'lifetimeExtra'>, months: number, pass = true) =>
  p.lifetime + lifetimeRunning(p, pass) * months;

/**
 * Monate, bis der Kauf günstiger ist als die Miete. Mit `pass` werden die
 * laufenden Kosten des ZapX Pass eingerechnet. Infinity = rechnet sich nie,
 * weil die laufenden Kosten so hoch sind wie die Miete.
 */
export const breakEvenMonths = (
  p: Pick<HostingProduct, 'monthly' | 'lifetime' | 'lifetimeExtra'>,
  discount = 0,
  pass = true,
) => {
  const saved = p.monthly * (1 - discount) - lifetimeRunning(p, pass);
  return saved > 0 ? p.lifetime / saved : Infinity;
};

export const eur = (v: number) => v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

export const months1 = (v: number) => v.toLocaleString('de-DE', { maximumFractionDigits: 1 });
