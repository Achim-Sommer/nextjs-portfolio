'use client';

import { useState } from 'react';

interface ArticleShareProps {
  url: string;
  title: string;
}

/** Schlichte Teilen-Zeile im Stil der Seite */
export const ArticleShare = ({ url, title }: ArticleShareProps) => {
  const [copied, setCopied] = useState(false);

  const targets = [
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { name: 'E-Mail', href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Zwischenablage nicht verfügbar
    }
  };

  const itemClass =
    'border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:border-accent hover:text-fg';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Teilen</span>
      {targets.map((t) => (
        <a key={t.name} href={t.href} target="_blank" rel="noopener noreferrer" className={itemClass}>
          {t.name}
        </a>
      ))}
      <button type="button" onClick={copy} className={itemClass}>
        {copied ? 'Kopiert' : 'Link kopieren'}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Link kopiert' : ''}
      </span>
    </div>
  );
};
