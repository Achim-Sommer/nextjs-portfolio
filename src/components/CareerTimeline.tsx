'use client';

import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi';
import { careerStations, education } from '@/data/career';
import { Reveal, Section, SectionHeading } from './home/primitives';

/** Ab dieser Position werden Stationen auf dem Handy eingeklappt. */
const IMMER_OFFEN = 2;
const MOBIL = '(max-width: 639px)';

/** "Aug 2026 bis heute" wird zu zwei Zeilen */
function Period({ value }: { value: string }) {
  const [start, end] = value.split(' bis ');
  return (
    <span className="font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted">
      {start}
      {end && (
        <>
          <br />
          <span className="text-faint">bis</span> {end}
        </>
      )}
    </span>
  );
}

export default function CareerTimeline() {
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

  return (
    <Section id="erfahrung">
      <SectionHeading index="02" label="Werdegang" title={
          <>
            Von der Systemadministration zur{' '}
            <span className="whitespace-nowrap">IT-Leitung.</span>
          </>
        }>
        <p>
          Vom gemeinnützigen Verband über einen IT-Dienstleister und eine Unternehmensgruppe bis zum
          KI-Startup. Dazu seit 2018 eigene Projekte als Entwickler.
        </p>
      </SectionHeading>

      <ol className="mt-20">
        {careerStations.map((station, index) => {
          const einklappbar = istMobil && index >= IMMER_OFFEN;
          const offen = !einklappbar || Boolean(geoeffnet[station.id]);

          return (
            <li key={station.id} className="border-t border-line">
              <Reveal className="grid gap-5 py-10 lg:grid-cols-12 lg:gap-10 lg:py-12">
                {/* Zeitraum */}
                <div className="flex items-start justify-between gap-4 lg:col-span-4 lg:block">
                  <Period value={station.period} />
                  <div className="flex items-center gap-2 lg:mt-4">
                    {station.current && (
                      <span className="border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        Aktuell
                      </span>
                    )}
                    {station.employment && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                        {station.employment}
                      </span>
                    )}
                  </div>
                </div>

                {/* Inhalt */}
                <div className="lg:col-span-8">
                  <h3 className="text-2xl font-medium tracking-[-0.02em] text-fg sm:text-[1.75rem]">
                    {station.role}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-muted">
                    <span className={`h-2 w-2 shrink-0 ${station.accent.dot}`} aria-hidden="true" />
                    {station.companyUrl ? (
                      <a
                        href={station.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-fg underline decoration-[#3a3a37] underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {station.companyFull}
                        <FiArrowUpRight className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="text-fg">{station.companyFull}</span>
                    )}
                    <span className="text-faint">
                      {station.location}
                      {station.workMode && `, ${station.workMode}`}
                    </span>
                  </div>

                  {/* Aufgaben und Tech, auf dem Handy bei älteren Stationen eingeklappt */}
                  <div id={`station-${station.id}-details`} hidden={!offen}>
                    <ul className="mt-7 grid gap-x-10 gap-y-3 xl:grid-cols-2">
                      {station.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                          <span className="mt-[0.7em] h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {station.note && <p className="mt-5 text-sm text-faint">{station.note}</p>}

                    {station.tech.length > 0 && (
                      <p className="mt-7 font-mono text-xs leading-relaxed text-faint">
                        {station.tech.join(' / ')}
                      </p>
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
                      className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
                    >
                      {offen ? 'Weniger anzeigen' : `Aufgaben anzeigen (${station.highlights.length})`}
                      <FiChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${offen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}

        {/* Studium */}
        <li className="border-y border-line">
          <Reveal className="grid gap-5 py-10 lg:grid-cols-12 lg:gap-10 lg:py-12">
            <div className="lg:col-span-4">
              <Period value={education.period} />
            </div>
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-medium tracking-[-0.02em] text-fg sm:text-[1.75rem]">
                {education.degree}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-[15px]">
                <span className={`h-2 w-2 shrink-0 ${education.accent.dot}`} aria-hidden="true" />
                <span className="text-fg">{education.institution}</span>
                <span className="text-faint">Berufsbegleitend</span>
              </div>
            </div>
          </Reveal>
        </li>
      </ol>
    </Section>
  );
}
