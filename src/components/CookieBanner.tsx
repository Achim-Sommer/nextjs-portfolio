'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    window.dispatchEvent(new Event('cookie-consent-update'));
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    window.dispatchEvent(new Event('cookie-consent-update'));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einstellungen"
        >
          <div className="border border-[#2a2a28] bg-surface/95 p-4 text-[13px] text-muted shadow-2xl shadow-black/40 backdrop-blur-md sm:p-5 sm:text-sm">
            <p className="leading-relaxed">
              Diese Website verwendet Cookies für eine optimale Nutzererfahrung. Mehr dazu in der{' '}
              <Link
                href="/datenschutz"
                className="text-fg underline decoration-[#3a3a37] underline-offset-4 hover:decoration-accent"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
            <div className="mt-3 flex gap-2 sm:mt-4">
              <button
                type="button"
                onClick={handleAccept}
                className="bg-fg px-4 py-2 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
              >
                Akzeptieren
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="border border-[#2e2e2c] px-4 py-2 text-sm text-fg transition-colors duration-200 hover:border-fg"
              >
                Ablehnen
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
