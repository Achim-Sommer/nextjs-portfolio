'use client';

import { FiServer, FiShield, FiCpu, FiCode, FiGift } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ZAP_GREEN = '#57BB54';

export default function BlogZapHosting() {
  return (
    <div className="flex flex-col gap-8 w-full my-8">
      {/* Smart Context Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 relative overflow-hidden"
      >
        {/* Top gradient bar (_before replacement) */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${ZAP_GREEN} 0%, ${ZAP_GREEN}80 100%)` }}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <FiServer className="w-5 h-5 md:w-6 md:h-6 shrink-0" style={{ color: ZAP_GREEN }} />
            <p className="text-gray-100 text-base md:text-lg font-bold font-mono">
              Jetzt bei Zap-Hosting deployen
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 pl-4 md:pl-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FiShield className="w-4 h-4 md:w-5 md:h-5 shrink-0" style={{ color: ZAP_GREEN }} />
                <span className="text-gray-100 text-sm md:text-base">DDoS Schutz</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCpu className="w-4 h-4 md:w-5 md:h-5 shrink-0" style={{ color: ZAP_GREEN }} />
                <span className="text-gray-100 text-sm md:text-base">Root Zugriff</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FiCode className="w-4 h-4 md:w-5 md:h-5 shrink-0" style={{ color: ZAP_GREEN }} />
                <span className="text-gray-100 text-sm md:text-base">Sofort Verfügbar</span>
              </div>
              <div className="flex items-center gap-2">
                <FiServer className="w-4 h-4 md:w-5 md:h-5 shrink-0" style={{ color: ZAP_GREEN }} />
                <span className="text-gray-100 text-sm md:text-base">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Try it yourself Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 font-mono"
      >
        <div className="flex flex-col gap-6">
          <p className="text-gray-100 text-xs md:text-sm">
            Starte deinen eigenen vServer/VPS (Linux oder Windows)
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
            {/* Monthly Plan */}
            <div className="flex-1 flex flex-col items-center gap-2 bg-gray-900 p-4 rounded-md border border-gray-700 w-full">
              <p className="text-gray-100 text-base md:text-lg">Monatlich</p>
              <p className="text-xl md:text-2xl font-bold" style={{ color: ZAP_GREEN }}>ab 7,90€</p>
              <p className="text-gray-100 text-xs md:text-sm">/Monat</p>
              <a
                href="https://zap-hosting.com/vserverhomepage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-white text-xs md:text-sm py-3 md:py-4 rounded-md font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: ZAP_GREEN }}
              >
                Jetzt Starten
              </a>
            </div>

            {/* Lifetime Plan */}
            <div
              className="flex-1 flex flex-col items-center gap-2 bg-gray-900 p-4 rounded-md w-full relative"
              style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: ZAP_GREEN }}
            >
              {/* "Bester Deal" badge (replaces _before pseudo) */}
              <span
                className="absolute -top-3 text-[10px] md:text-xs text-white px-2 py-0.5 rounded-md"
                style={{ backgroundColor: ZAP_GREEN }}
              >
                Bester Deal
              </span>

              <p className="text-gray-100 text-base md:text-lg">Lifetime</p>
              <p className="text-xl md:text-2xl font-bold" style={{ color: ZAP_GREEN }}>ab 64,00€</p>
              <p className="text-gray-100 text-xs md:text-sm">einmalig</p>
              <a
                href="https://zap-hosting.com/vserverhomepage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-white text-xs md:text-sm py-3 md:py-4 rounded-md font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: ZAP_GREEN }}
              >
                Lifetime Sichern
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <FiGift className="w-4 h-4 md:w-5 md:h-5 shrink-0" style={{ color: ZAP_GREEN }} />
            <span className="text-gray-100 text-xs md:text-sm">
              Code GERMANGAMING für 20% Rabatt
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
