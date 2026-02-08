'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiServer, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const ZAP_GREEN = '#57BB54';

export default function FloatingZapAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent >= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-4 bottom-4 z-[100]"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gray-800 rounded-lg overflow-hidden relative"
            style={{ border: `1px solid ${ZAP_GREEN}` }}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={{
              expanded: { width: '300px', height: 'auto' },
              collapsed: { width: '60px', height: '60px' },
            }}
            transition={{ duration: 0.3 }}
          >
            <button
              aria-label="Toggle ad"
              className="absolute right-2 top-2 z-[2] p-1.5 rounded-md bg-transparent hover:bg-white/10 transition-colors cursor-pointer"
              style={{ color: ZAP_GREEN }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <FiX size={16} /> : <FiServer size={16} />}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4"
                >
                  <div className="flex flex-col gap-3">
                    <p className="text-white text-sm font-bold">
                      VPS / vServer (Linux/Windows)
                    </p>
                    <p className="text-xl font-bold" style={{ color: ZAP_GREEN }}>
                      ab 7,90€/Monat
                    </p>
                    <p className="text-gray-300 text-xs">
                      oder ab 64,00€ Lifetime
                    </p>
                    <a
                      href="https://zap-hosting.com/vserverhomepage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center text-white text-sm font-semibold py-2 px-4 rounded-md transition-opacity hover:opacity-80"
                      style={{ backgroundColor: ZAP_GREEN }}
                    >
                      Jetzt Bestellen
                    </a>
                    <p className="text-gray-300 text-xs text-center">
                      Code: GERMANGAMING (-20%)
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
