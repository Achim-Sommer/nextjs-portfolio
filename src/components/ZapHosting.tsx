'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiArrowUpRight, FiCheck, FiCopy } from 'react-icons/fi';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import { Eyebrow, Reveal, Section } from './home/primitives';
import { eur, findProduct } from '@/data/hosting-prices';

const ZAP_URL = 'https://zap-hosting.com/achim';
const COUPON = 'GERMANGAMING';

// Preise der Serverprodukte aus der zentralen Preisdatei (src/data/hosting-prices.ts)
const fromPrices = (id: string, name: string) => {
  const p = findProduct(id)!;
  return { name, monthly: eur(p.monthly), lifetime: `${eur(p.lifetime)} Lifetime` };
};

const PRODUCTS = [
  fromPrices('game', 'Gameserver'),
  fromPrices('vserver', 'Linux vServer'),
  fromPrices('winvserver', 'Windows vServer'),
  fromPrices('root', 'Linux Rootserver'),
  fromPrices('dedi', 'Dedicated Server'),
  { name: 'Webspace', monthly: '3,90 €', lifetime: '46,80 € Lifetime' },
  { name: 'Domains', monthly: '7,90 €', lifetime: 'Verschiedene TLDs' },
  { name: 'Plesk Lizenz', monthly: '8,49 €', lifetime: 'Professionelles Hosting' },
];

// Laufband bleibt, die Karten sind aber schlicht im Stil der übrigen Seite
const cards = PRODUCTS.map((p) => ({
  name: p.name,
  color: '',
  icon: (
    <div className="flex w-[20rem] items-end justify-between gap-6">
      <div>
        <p className="text-lg font-medium tracking-[-0.01em] text-fg">{p.name}</p>
        <p className="mt-1 font-mono text-xs text-muted">{p.lifetime}</p>
      </div>
      <p className="whitespace-nowrap font-mono text-sm text-fg">
        <span className="text-faint">ab </span>
        {p.monthly}
        <span className="text-faint">/Monat</span>
      </p>
    </div>
  ),
}));

export default function ZapHosting() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Zwischenablage nicht verfügbar: Code steht ja sichtbar da
    }
  };

  return (
    <Section className="!border-t-0">
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pt-3">
          <Eyebrow>Empfehlung · Anzeige</Eyebrow>
        </div>

        <div className="lg:col-span-8">
          <div className="border border-line bg-surface p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-fg sm:text-4xl">
                  Hosting, das ich selbst nutze.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
                  Für Gameserver, vServer und Testumgebungen setze ich auf ZAP-Hosting. Viele Pakete gibt
                  es auch als Lifetime-Variante: einmal zahlen, dauerhaft nutzen.
                </p>
              </div>
              <Image
                src="/img/zap-hosting-logo.png"
                alt="ZAP-Hosting"
                width={2574}
                height={1022}
                sizes="120px"
                className="h-10 w-auto opacity-90"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copy}
                className="group inline-flex items-center gap-3 border border-dashed border-[#3a3a37] px-4 py-3 font-mono text-sm text-fg transition-colors duration-200 hover:border-accent"
                aria-label={`Rabattcode ${COUPON} kopieren`}
              >
                <span className="text-faint">Code</span>
                <span className="tracking-[0.12em]">{COUPON}</span>
                <span className="text-accent">−20 %</span>
                {copied ? (
                  <FiCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                ) : (
                  <FiCopy className="h-4 w-4 text-muted group-hover:text-fg" aria-hidden="true" />
                )}
              </button>
              <a
                href={ZAP_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group inline-flex items-center gap-2 bg-fg px-5 py-3 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
              >
                Zu ZAP-Hosting
                <FiArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Code kopiert' : ''}
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 -mx-5 sm:-mx-8">
        <InfiniteMovingCards items={cards} speed="slow" direction="right" plain cardClassName="min-w-[22rem]" />
      </div>
    </Section>
  );
}
