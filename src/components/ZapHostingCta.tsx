import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';

type ZapHostingCtaProps = {
  href: string;
  buttonText?: string;
  title?: string;
  description?: string;
  couponCode?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

/** Empfehlungsbox für ZAP-Hosting im Artikeltext (Partnerlink) */
export default function ZapHostingCta({
  href,
  buttonText = 'Hytale Server jetzt holen',
  title = 'Hytale Server in Minuten starten',
  description = 'Einfach bestellen, im Panel verwalten und direkt loslegen.',
  couponCode = 'GermanGaming',
  imageSrc,
  imageAlt = 'Hytale Charakter',
  imageWidth = 280,
  imageHeight = 287,
}: ZapHostingCtaProps) {
  const resolvedImageSrc = imageSrc ?? (href.includes('/hytale') ? '/img/blog/hytale-character.png' : undefined);

  return (
    <aside className="not-article relative my-10 overflow-hidden border border-line bg-surface p-5 sm:p-7">
      <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
      <div className="flex items-center gap-6">
        {resolvedImageSrc ? (
          <Image
            src={resolvedImageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="hidden h-28 w-auto shrink-0 object-contain md:block"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            Empfehlung <span className="text-[#4a4946]">/</span> Anzeige
          </p>
          <p className="mt-2 text-xl font-medium tracking-[-0.02em] text-fg">{title}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-fg px-4 py-2.5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
            >
              {buttonText}
              <FiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            {couponCode ? (
              <span className="border border-dashed border-[#3a3a37] px-3 py-2 font-mono text-xs text-muted">
                Code <span className="tracking-[0.1em] text-fg">{couponCode.toUpperCase()}</span>{' '}
                <span className="text-accent">20 %</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
