'use client';

import { motion } from 'framer-motion';

/** Einheitliche Seitenbreite und Ränder der Startseite */
export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Dezentes Einblenden beim Scrollen, einmalig */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Kleine Mono-Zeile mit Nummer und Name der Sektion */
export function Eyebrow({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
      {index && <span className="text-accent">{index}</span>}
      {index && <span className="text-faint" aria-hidden="true">/</span>}
      <span>{children}</span>
    </p>
  );
}

/**
 * Kopf jeder Sektion: links Nummer und Name, rechts die eigentliche Aussage.
 * Auf dem Handy untereinander.
 */
export function SectionHeading({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4 lg:pt-3">
        <Eyebrow index={index}>{label}</Eyebrow>
      </div>
      <div className="lg:col-span-8">
        <h2 className="max-w-3xl text-[2rem] font-medium leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl">
          {title}
        </h2>
        {children && (
          <div className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{children}</div>
        )}
      </div>
    </Reveal>
  );
}

/** Schmale Sektion mit Trennlinie oben */
export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-line py-20 sm:py-32 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
