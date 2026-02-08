'use client';

import { FiGift, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

const ZAP_GREEN = '#57BB54';

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
    <div
      className="my-8 bg-gray-800 rounded-lg border border-gray-700 p-4 md:p-6 relative overflow-hidden"
    >
      {/* Green gradient top border (replaces _before pseudo) */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${ZAP_GREEN} 0%, ${ZAP_GREEN}80 100%)` }}
      />

      <div className="flex flex-col gap-4 relative z-[1]">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 items-stretch md:items-center">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {resolvedImageSrc ? (
              <div className="shrink-0 hidden md:block pointer-events-none">
                <Image
                  src={resolvedImageSrc}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  style={{ height: '120px', width: 'auto', objectFit: 'contain' }}
                  priority={false}
                />
              </div>
            ) : null}

            <div className="flex flex-col gap-1 min-w-0 flex-1 items-start">
              <p className="text-gray-100 text-base md:text-lg font-bold font-mono">
                {title}
              </p>
              <p className="text-gray-100 text-sm md:text-base opacity-90">
                {description}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <FiGift style={{ color: ZAP_GREEN }} className="shrink-0" />
                <p className="text-gray-100 text-xs md:text-sm">
                  Rabattcode: <span className="font-mono font-bold">{couponCode}</span> (20% sparen)
                </p>
              </div>
            </div>
          </div>

          <a
            href={href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 self-start md:self-center px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white font-semibold rounded-md no-underline hover:no-underline transition-colors shrink-0"
            style={{ backgroundColor: ZAP_GREEN, color: 'white' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${ZAP_GREEN}90`)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ZAP_GREEN)}
          >
            {buttonText}
            <FiExternalLink className="inline-block" />
          </a>
        </div>
      </div>
    </div>
  );
}
