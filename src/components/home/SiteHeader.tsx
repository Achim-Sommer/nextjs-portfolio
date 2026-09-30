'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

// Die Anker-IDs bleiben dieselben wie früher, damit bestehende Links weiter funktionieren
const NAV = [
  { label: 'Profil', href: '#about-me' },
  { label: 'Werdegang', href: '#erfahrung' },
  { label: 'Projekte', href: '#github-section' },
  { label: 'Blog', href: '/blog' },
  { label: 'Zap-Hosting', href: '#zap-hosting' },
];

/**
 * base: Präfix für die Anker der Startseite. Auf Unterseiten (Blog) "/",
 * damit "#about-me" zu "/#about-me" wird.
 */
export default function SiteHeader({ base = '' }: { base?: string }) {
  const nav = NAV.map((item) => (item.href.startsWith('#') ? { ...item, href: `${base}${item.href}` } : item));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menü schließen, wenn der Bildschirm breit genug für die normale Navigation wird
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-line bg-canvas/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em] text-fg">
          <span className="h-2 w-2 bg-accent transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
          Achim Sommer
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-1.5 border border-[#2e2e2c] px-3.5 py-1.5 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Kontakt
            <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="font-mono text-xs uppercase tracking-[0.16em] text-fg lg:hidden"
        >
          {open ? 'Schließen' : 'Menü'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Hauptnavigation" className="border-t border-line lg:hidden">
          <ul className="mx-auto max-w-[1320px] px-5 py-4 sm:px-8">
            {[...nav, { label: 'Kontakt', href: '/kontakt' }].map((item, i) => (
              <li key={item.href} className="border-b border-line last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3.5 text-2xl font-medium tracking-[-0.02em] text-fg"
                >
                  <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
