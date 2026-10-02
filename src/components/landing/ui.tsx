import type { ReactNode } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { Container, Eyebrow } from '@/components/home/primitives';

/** Verzögerung für die gestaffelte Einblendung im Hero (reines CSS) */
export const rise = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Kopf einer Landingpage: Eyebrow, große Überschrift, Einleitung, darunter z. B. Buttons */
export function LandingHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header>
      <Container className="pb-16 pt-28 sm:pb-24 sm:pt-36">
        <div className="motion-safe:animate-rise" style={rise(0)}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-6 max-w-5xl hyphens-auto text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-fg">
          {title}
        </h1>
        {intro && (
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted motion-safe:animate-rise" style={rise(120)}>
            {intro}
          </div>
        )}
        {children && (
          <div className="motion-safe:animate-rise" style={rise(220)}>
            {children}
          </div>
        )}
      </Container>
    </header>
  );
}

/** Abschnitt mit Trennlinie oben und einheitlichem Weißraum */
export function LandingSection({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-line py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Kleine Mono-Zeile zur Kennzeichnung von Werbung (Partnerlinks) */
export function AdLabel({ className = '' }: { className?: string }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.16em] text-faint ${className}`}>
      Empfehlung <span className="text-[#4a4946]">/</span> Anzeige
    </p>
  );
}

/** Liste kurzer Fakten in Mono mit Akzent-Quadrat */
export function FactList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Rabattcode im Stil der Empfehlungsboxen */
export function CouponCode({ code, children }: { code: string; children?: ReactNode }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-1.5 border border-dashed border-[#3a3a37] px-3 py-2 font-mono text-xs text-muted">
      Code <span className="tracking-[0.1em] text-fg">{code.toUpperCase()}</span>
      {children ?? <span className="text-accent">20 %</span>}
    </span>
  );
}

const PRIMARY =
  'group inline-flex items-center justify-center gap-2 bg-fg px-5 py-3 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent';
const SECONDARY =
  'inline-flex items-center justify-center gap-2 border border-line px-5 py-3 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent';

export const buttonClass = { primary: PRIMARY, secondary: SECONDARY };

/** Pfeil für externe Links in Buttons */
export function ArrowIcon() {
  return (
    <FiArrowUpRight
      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  );
}
