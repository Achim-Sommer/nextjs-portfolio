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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-8 left-0 right-0 mx-auto w-[90%] max-w-4xl z-50 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie-Einstellungen"
        >
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-lg overflow-hidden shadow-xl">
            {/* Terminal Header */}
            <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="text-sm text-gray-400 font-mono">cookie-consent.tsx</div>
              <div className="w-20" /> {/* Spacer for symmetry */}
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 sm:p-6 font-mono">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="text-green-400/90">
                    <span className="text-blue-400">const</span> <span className="text-yellow-400">cookieConsent</span> = {'{'}
                  </div>
                  <div className="pl-4 text-sm text-gray-300 space-y-1">
                    <div className="break-words">
                      <span className="text-purple-400">required</span>: <span className="text-green-400">true</span>,
                    </div>
                    <div className="break-words">
                      <span className="text-purple-400">message</span>: <span className="text-yellow-400">"Diese Website verwendet Cookies für eine optimale Nutzererfahrung."</span>,
                    </div>
                    <div className="break-words">
                      <span className="text-purple-400">moreInfo</span>: <Link href="/datenschutz" className="text-blue-400 hover:text-blue-300 underline">
                        "/datenschutz"
                      </Link>
                    </div>
                  </div>
                  <div className="text-green-400/90">{'}'}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDecline}
                    aria-label="Cookies ablehnen"
                    className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50 rounded-md transition-colors text-sm font-mono text-gray-300 whitespace-nowrap"
                  >
                    reject()
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAccept}
                    aria-label="Cookies akzeptieren"
                    className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 rounded-md transition-colors text-sm font-mono text-white whitespace-nowrap"
                  >
                    accept()
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
