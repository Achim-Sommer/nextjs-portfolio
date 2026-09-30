import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import NetworkDiagram from './home/network/NetworkDiagram';
import { Container } from './home/primitives';

const FACTS = [
  { term: 'Aktuell', value: 'Head of IT bei amber Tech' },
  { term: 'Standort', value: 'Aachen, hybrid' },
  { term: 'Studium', value: 'B.Sc. Wirtschaftsinformatik, FOM' },
  { term: 'Entwicklung', value: 'Web und Tools seit 2018' },
];

/** Trennlinien: auf dem Handy 2 × 2, ab lg eine Zeile mit vier Spalten */
const FACT_CELL = [
  '',
  'border-l pl-4 lg:pl-6',
  'border-t lg:border-l lg:border-t-0 lg:pl-6',
  'border-l border-t pl-4 lg:border-t-0 lg:pl-6',
];

/** Verzögerung für die gestaffelte Einblendung (reines CSS, kein JS nötig) */
const rise = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <Container className="grid items-center gap-y-10 pb-14 pt-12 sm:pt-20 lg:min-h-[calc(100svh-4rem-7rem)] lg:grid-cols-12 lg:gap-x-10 lg:pb-10 lg:pt-10">
        <div className="relative z-10 lg:col-span-6 xl:col-span-5">
          <p
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted motion-safe:animate-rise sm:tracking-[0.16em]"
            style={rise(0)}
          >
            <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
            Infrastruktur · Security · Entwicklung
          </p>

          <h1 className="mt-7 text-[clamp(3.4rem,9vw,7.25rem)] font-medium leading-[0.9] tracking-[-0.055em] text-fg">
            Achim
            <br />
            Sommer
          </h1>

          <p
            className="mt-8 max-w-[33rem] text-lg leading-relaxed text-muted motion-safe:animate-rise sm:text-xl"
            style={rise(120)}
          >
            Head of IT in Aachen. Ich plane, baue und betreibe IT-Landschaften, die sicher sind und mit
            dem Unternehmen wachsen.{' '}
            <span className="text-fg">Nach Feierabend entwickle ich Web-Apps mit Next.js und TypeScript.</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3 motion-safe:animate-rise" style={rise(220)}>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 bg-fg px-4 py-3 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent sm:px-5"
            >
              Kontakt aufnehmen
              <FiArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="#erfahrung"
              className="inline-flex items-center border border-[#2e2e2c] px-4 py-3 text-sm text-fg transition-colors duration-200 hover:border-fg sm:px-5"
            >
              Werdegang ansehen
            </Link>
          </div>
        </div>

        <div className="relative motion-safe:animate-rise lg:col-span-6 xl:col-span-7" style={rise(160)}>
          <NetworkDiagram />
        </div>
      </Container>

      <Container>
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <div key={fact.term} className={`border-line py-5 pr-4 sm:py-6 ${FACT_CELL[i]}`}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{fact.term}</dt>
              <dd className="mt-2 text-sm text-fg sm:text-[15px]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
