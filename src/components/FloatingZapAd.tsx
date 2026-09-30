'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiServer, FiX } from 'react-icons/fi';

/**
 * Anzeige unten rechts, sobald die Hälfte des Artikels gelesen ist.
 * Lässt sich zu einem kleinen Symbol einklappen.
 */
export default function FloatingZapAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setIsVisible(max > 0 && window.scrollY / max >= 0.5);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Anzeige: ZAP-Hosting"
          className="fixed bottom-4 right-4 z-[60]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {isExpanded ? (
            <div className="relative w-[288px] border border-line bg-surface/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
              <span className="absolute inset-x-0 top-0 h-px bg-accent" aria-hidden="true" />
              <button
                type="button"
                aria-label="Anzeige einklappen"
                onClick={() => setIsExpanded(false)}
                className="absolute right-3 top-3 p-1 text-muted transition-colors hover:text-fg"
              >
                <FiX className="h-4 w-4" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Anzeige</p>
              <p className="mt-2 text-[15px] font-medium text-fg">vServer (Linux oder Windows)</p>
              <p className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">
                ab 7,90 €<span className="text-sm font-normal text-faint"> / Monat</span>
              </p>
              <p className="text-xs text-muted">oder ab 64,00 € einmalig (Lifetime)</p>
              <a
                href="https://zap-hosting.com/vserverhomepage"
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-fg px-4 py-2.5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
              >
                Jetzt bestellen
                <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-3 text-center font-mono text-[11px] text-muted">
                Code <span className="text-fg">GERMANGAMING</span> <span className="text-accent">20 %</span>
              </p>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Anzeige ZAP-Hosting öffnen"
              onClick={() => setIsExpanded(true)}
              className="flex h-12 w-12 items-center justify-center border border-line bg-surface text-accent shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors hover:border-accent"
            >
              <FiServer className="h-5 w-5" />
            </button>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
