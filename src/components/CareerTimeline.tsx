'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FiMapPin, FiExternalLink, FiChevronDown } from 'react-icons/fi';
import { careerStations } from '@/data/career';

/** Ab dieser Position werden Stationen auf dem Handy eingeklappt. */
const IMMER_OFFEN = 2;
const MOBIL = '(max-width: 639px)';

export default function CareerTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [istMobil, setIstMobil] = useState(false);
  const [geoeffnet, setGeoeffnet] = useState<Record<string, boolean>>({});

  // Erst nach dem Mount auswerten: serverseitig sind alle Stationen ausgeklappt,
  // damit der vollständige Text im HTML steht (Suchmaschinen) und beim
  // Hydrieren nichts auseinanderläuft.
  useEffect(() => {
    const mq = window.matchMedia(MOBIL);
    const update = () => setIstMobil(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Die Linie füllt sich, während die Sektion durchs Bild scrollt
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.85', 'end 0.5'],
  });

  return (
    <section id="erfahrung" className="relative py-20 sm:py-28 bg-black overflow-hidden">
      {/* Trennlinie oben */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Dezente Hintergrund-Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-amber-500/[0.035] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] bg-blue-500/[0.045] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* ── Kopfbereich ─────────────────────────────── */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-amber-400">
              Werdegang
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Beruflicher Werdegang
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed"
          >
            Von der Systemadministration über die SAP-Entwicklung bis zur Leitung
            kompletter IT-Landschaften.
          </motion.p>
        </div>

        {/* ── Zeitachse ───────────────────────────────── */}
        <ol ref={listRef} className="relative">
          {/* Ruhende Linie */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.08]" aria-hidden="true" />

          {/* Mitlaufende Linie */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/60 via-blue-500/50 to-purple-500/40 origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          {careerStations.map((station, index) => {
            const einklappbar = istMobil && index >= IMMER_OFFEN;
            const offen = !einklappbar || Boolean(geoeffnet[station.id]);

            return (
            <motion.li
              key={station.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3) }}
              className="relative pl-9 sm:pl-12 pb-10 sm:pb-12 last:pb-0"
            >
              {/* Punkt auf der Linie */}
              <span className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center">
                {station.current && (
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${station.accent.dot} opacity-40 animate-ping`}
                  />
                )}
                <span
                  className={`relative inline-flex h-3.5 w-3.5 rounded-full ${station.accent.dot} ring-4 ${station.accent.ring}`}
                />
              </span>

              {/* Karte */}
              <div
                className={`
                  rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.02]
                  backdrop-blur-xl p-5 sm:p-7
                  transition-colors duration-500 hover:border-white/[0.14]
                `}
              >
                {/* Zeitraum */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3">
                  <span
                    className={`text-[11px] font-mono font-semibold uppercase tracking-widest ${station.accent.text}`}
                  >
                    {station.period}
                  </span>
                  {station.employment && (
                    <span className="text-[11px] text-gray-600">· {station.employment}</span>
                  )}
                </div>

                {/* Position */}
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {station.role}
                </h3>

                {/* Firma + Ort */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
                  {station.companyUrl ? (
                    <a
                      href={station.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {station.companyFull}
                      <FiExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ) : (
                    <span className="font-medium text-gray-300">{station.companyFull}</span>
                  )}

                  <span className="inline-flex items-center gap-1.5 text-gray-500">
                    <FiMapPin className="w-3.5 h-3.5 shrink-0" />
                    {station.location}
                    {station.workMode && ` · ${station.workMode}`}
                  </span>
                </div>

                {/* Aufgaben, Fußnote und Tech-Tags — auf dem Handy bei älteren
                    Stationen hinter einen Schalter gelegt */}
                <div id={`station-${station.id}-details`} hidden={!offen}>
                  <ul className="mt-5 space-y-2.5">
                    {station.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5 text-sm text-gray-400 leading-relaxed">
                        <span className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${station.accent.dot}`} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {station.note && (
                    <p className="mt-4 text-xs text-gray-600 italic">{station.note}</p>
                  )}

                  {station.tech.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                      {station.tech.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 text-[11px] rounded-lg border ${station.accent.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {einklappbar && (
                  <button
                    type="button"
                    onClick={() =>
                      setGeoeffnet((prev) => ({ ...prev, [station.id]: !prev[station.id] }))
                    }
                    aria-expanded={offen}
                    aria-controls={`station-${station.id}-details`}
                    className={`
                      mt-4 inline-flex items-center gap-1.5 rounded-lg
                      border border-white/[0.08] bg-white/[0.03] px-3 py-1.5
                      text-xs font-medium ${station.accent.text}
                      transition-colors duration-300 hover:bg-white/[0.07]
                    `}
                  >
                    {offen ? 'Weniger anzeigen' : `Aufgaben anzeigen (${station.highlights.length})`}
                    <FiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${offen ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
            </motion.li>
            );
          })}
        </ol>
      </div>

      {/* Trennlinie unten */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
