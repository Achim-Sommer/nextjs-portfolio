import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';

import { eur, findProduct } from '@/data/hosting-prices';

const ZAP_VSERVER_URL = 'https://zap-hosting.com/vserverhomepage';

const VSERVER = findProduct('vserver')!;

const PLANS = [
  { name: 'Monatlich', price: `ab ${eur(VSERVER.monthly)}`, unit: 'pro Monat', cta: 'Jetzt starten', highlight: false },
  { name: 'Lifetime', price: `ab ${eur(VSERVER.lifetime)}`, unit: 'einmalig', cta: 'Lifetime sichern', highlight: true },
];

const FEATURES = ['DDoS-Schutz', 'Root-Zugriff', 'Sofort verfügbar', 'Support rund um die Uhr'];

/** Werbung für ZAP-Hosting am Ende jedes Artikels (Partnerlinks) */
export default function BlogZapHosting() {
  return (
    <aside className="not-article mt-14 border border-line bg-surface" aria-label="Anzeige: ZAP-Hosting">
      <div className="flex flex-wrap items-start justify-between gap-6 border-b border-line p-5 sm:p-7">
        <div className="max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            Empfehlung <span className="text-[#4a4946]">/</span> Anzeige
          </p>
          <p className="mt-2 text-2xl font-medium tracking-[-0.02em] text-fg">Eigenen vServer starten</p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Linux oder Windows, mit Root-Zugriff. Genau das, was du für die Anleitungen hier im Blog brauchst.
          </p>
        </div>
        <Image src="/img/zap-hosting-logo.png" alt="ZAP-Hosting" width={2574} height={1022} sizes="120px" className="h-9 w-auto opacity-90" />
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line px-5 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:px-7">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <div className="grid sm:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col gap-1 p-5 sm:p-7 ${plan.highlight ? 'bg-[#141312]' : 'border-b border-line sm:border-b-0 sm:border-r'}`}
          >
            {plan.highlight && (
              <span className="absolute right-5 top-5 bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-canvas sm:right-7 sm:top-7">
                Bester Deal
              </span>
            )}
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{plan.name}</p>
            <p className="mt-2 text-3xl font-medium tracking-[-0.03em] text-fg">{plan.price}</p>
            <p className="text-sm text-faint">{plan.unit}</p>
            <a
              href={ZAP_VSERVER_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className={`group mt-5 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                plan.highlight ? 'bg-accent text-canvas hover:bg-accent-strong' : 'bg-fg text-canvas hover:bg-accent'
              }`}
            >
              {plan.cta}
              <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>

      <p className="border-t border-line px-5 py-4 font-mono text-xs text-muted sm:px-7">
        Code <span className="tracking-[0.1em] text-fg">GERMANGAMING</span> für <span className="text-accent">20 %</span> Rabatt
      </p>
    </aside>
  );
}
